import { useMemo, useCallback, useState } from 'react';
import { Table, Popconfirm, message } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { removeTask, updateTask } from '../../store/slices/taskSlice';
import type { Task } from '../../types/task.types';
import { formatDisplayDate, getTaskDurationDays, getMainTaskRange } from '../../utils/dateHelpers';
import { getTaskTree, sortTaskTree, type TaskSortKey } from '../../utils/sortHelpers';
import { validateTitle, validateMainTaskUnique } from '../../utils/taskValidators';
import { useUI } from '../../hooks/useUI';
import { IconButton, SortableHeader, TaskTitle } from '../atoms';

interface TableRow extends Task {
  key: string;
  children?: TableRow[];
}

export function TaskList() {
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const dispatch = useDispatch();
  const {
    openDrawer,
    expandedMainTaskIds,
    toggleMainTaskExpanded,
    taskSortKey: sortKey,
    taskSortOrder: sortOrder,
    setTaskSort,
  } = useUI();

  const tree = useMemo(() => {
    const t = getTaskTree(tasks);
    return sortTaskTree(t, sortKey, sortOrder);
  }, [tasks, sortKey, sortOrder]);

  const dataSource: TableRow[] = useMemo(
    () =>
      tree.map(({ main, children }) => {
        const range = getMainTaskRange(main, children);
        return {
          ...main,
          startDate: range.start,
          endDate: range.end,
          key: main.id,
          children:
            children.length > 0
              ? children.map((c) => ({ ...c, key: c.id }))
              : undefined,
        };
      }),
    [tree]
  );

  const handleSort = (key: TaskSortKey) => {
    if (sortKey === key) {
      setTaskSort(key, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setTaskSort(key, 'asc');
    }
  };

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const handleRename = useCallback(
    (record: TableRow, newTitle: string) => {
      const titleCheck = validateTitle(newTitle);
      if (!titleCheck.valid) {
        message.error(titleCheck.error);
        return;
      }

      if (record.type === 'main') {
        const uniqueCheck = validateMainTaskUnique(newTitle, tasks.filter((t) => t.id !== record.id));
        if (!uniqueCheck.valid) {
          message.error(uniqueCheck.error);
          return;
        }
      }

      dispatch(updateTask({ id: record.id, updates: { title: newTitle } }));
      setEditingTaskId(null);
    },
    [tasks, dispatch],
  );

  const columns: ColumnsType<TableRow> = [
    {
      title: (
        <SortableHeader
          label="Görevler"
          active={sortKey === 'title'}
          direction={sortOrder}
          onClick={() => handleSort('title')}
        />
      ),
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      render: (title: string, record) => (
        <TaskTitle
          title={title}
          type={record.type}
          editing={editingTaskId === record.id}
          onSave={(newTitle) => handleRename(record, newTitle)}
          onCancel={() => setEditingTaskId(null)}
        />
      ),
    },
    {
      title: (
        <SortableHeader
          label="Başlangıç Tarihleri"
          active={sortKey === 'startDate'}
          direction={sortOrder}
          onClick={() => handleSort('startDate')}
        />
      ),
      dataIndex: 'startDate',
      key: 'startDate',
      width: 110,
      render: (date: string) => formatDisplayDate(date),
    },
    {
      title: (
        <SortableHeader
          label="Süre"
          active={sortKey === 'duration'}
          direction={sortOrder}
          onClick={() => handleSort('duration')}
        />
      ),
      key: 'duration',
      width: 50,
      align: 'center',
      render: (_: unknown, record: TableRow) =>
        getTaskDurationDays(record.startDate, record.endDate),
    },
    {
      title: (
        <IconButton
          icon={<PlusOutlined />}
          ariaLabel="Yeni ana görev ekle"
          onClick={() => openDrawer({ mode: 'add' })}
        />
      ),
      key: 'add',
      width: 40,
      align: 'center',
      render: (_: unknown, record: TableRow) =>
        record.type === 'main' ? (
          <IconButton
            icon={<PlusOutlined />}
            ariaLabel="Alt görev ekle"
            onClick={(e) => {
              e.stopPropagation();
              openDrawer({ parentId: record.id, mode: 'add' });
            }}
          />
        ) : null,
    },
    {
      title: '',
      key: 'edit',
      width: 40,
      align: 'center',
      render: (_: unknown, record: TableRow) => (
        <IconButton
          icon={<EditOutlined />}
          ariaLabel="Görevi düzenle"
          onClick={(e) => {
            e.stopPropagation();
            setEditingTaskId(record.id);
          }}
        />
      ),
    },
    {
      title: '',
      key: 'delete',
      width: 40,
      align: 'center',
      render: (_: unknown, record: TableRow) => (
        <Popconfirm
          title={
            record.type === 'main'
              ? 'Bu görev ve tüm alt görevleri silinecek. Emin misiniz?'
              : 'Bu alt görev silinecek. Emin misiniz?'
          }
          onConfirm={(e) => {
            e?.stopPropagation();
            dispatch(removeTask(record.id));
          }}
          onCancel={(e) => e?.stopPropagation()}
          okText="Sil"
          cancelText="İptal"
        >
          <IconButton
            icon={<DeleteOutlined />}
            danger
            ariaLabel="Görevi sil"
            onClick={(e) => e.stopPropagation()}
          />
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table<TableRow>
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      size="small"
      showHeader
      expandedRowKeys={expandedMainTaskIds}
      onExpand={(_expanded, record) => toggleMainTaskExpanded(record.id)}
    />
  );
}
