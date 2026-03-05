import { useEffect } from 'react';
import { Drawer, Form, Input, Radio, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { addTask } from '../../store/slices/taskSlice';
import type { Task, TaskType } from '../../types/task.types';
import { useUI } from '../../hooks/useUI';
import { useIsMobile } from '../../hooks/useIsMobile';
import { FormDateField } from '../molecules';
import { PrimaryButton } from '../atoms';
import { toDateString } from '../../utils/dateHelpers';
import { generateTaskId } from '../../utils/taskId';
import {
  titleFormRule,
  parentFormRule,
  validateMainTaskUnique,
  validateSubTaskConflict,
} from '../../utils/taskValidators';
import type { Dayjs } from 'dayjs';

interface FormValues {
  title: string;
  type: TaskType;
  parentId?: string;
  startDate: Dayjs;
  endDate: Dayjs;
}

export function TaskDrawer() {
  const [form] = Form.useForm<FormValues>();
  const { drawerOpen, closeDrawer, drawerMode, selectedParentId } = useUI();
  const isMobile = useIsMobile();
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const dispatch = useDispatch();

  const mainTasks = tasks.filter((t) => t.type === 'main');
  const isSubMode = drawerMode === 'add' && selectedParentId != null;

  useEffect(() => {
    if (drawerOpen) {
      form.setFieldsValue({
        title: '',
        startDate: undefined,
        endDate: undefined,
        type: isSubMode ? 'sub' : 'main',
        parentId: isSubMode ? selectedParentId : undefined,
      });
    }
  }, [drawerOpen, isSubMode, selectedParentId, form]);

  const handleClose = () => {
    form.resetFields();
    closeDrawer();
  };

  const onFinish = (values: FormValues) => {
    const type: TaskType = values.type;
    const startDate = toDateString(values.startDate);
    const endDate = toDateString(values.endDate);
    const parentId = type === 'sub' ? values.parentId : undefined;

    if (values.endDate.isBefore(values.startDate, 'day')) {
      message.error('Bitiş tarihi başlangıç tarihinden önce olamaz.');
      return;
    }

    if (type === 'main') {
      const uniqueCheck = validateMainTaskUnique(values.title, tasks);
      if (!uniqueCheck.valid) {
        message.error(uniqueCheck.error!);
        return;
      }
    }

    if (type === 'sub' && parentId) {
      const conflictCheck = validateSubTaskConflict(parentId, startDate, endDate, tasks);
      if (!conflictCheck.valid) {
        message.error(conflictCheck.error!);
        return;
      }
    }

    const newTask: Task = {
      id: generateTaskId(),
      title: values.title.trim(),
      startDate,
      endDate,
      type,
      ...(parentId && { parentId }),
    };

    dispatch(addTask(newTask));
    message.success('Görev eklendi.');
    handleClose();
  };

  return (
    <Drawer
      title="Yeni görev"
      open={drawerOpen}
      onClose={handleClose}
      width={isMobile ? '100%' : 400}
      destroyOnClose
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ type: isSubMode ? 'sub' : 'main' }}
      >
        <Form.Item
          name="title"
          label="Görev adı"
          rules={[titleFormRule()]}
        >
          <Input placeholder="Görev adını girin" />
        </Form.Item>

        <Form.Item name="type" label="Tip">
          <Radio.Group disabled={isSubMode}>
            <Radio value="main">Ana Görev</Radio>
            <Radio value="sub">Alt Görev</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item noStyle shouldUpdate={(prev, cur) => prev.type !== cur.type}>
          {() => {
            const currentType = form.getFieldValue('type');
            const isMain = currentType === 'main';
            return (
              <Form.Item
                name="parentId"
                label="Üst görev"
                rules={[parentFormRule(() => form.getFieldValue('type'))]}
              >
                <Select
                  placeholder={isMain ? 'Ana görevde üst görev seçilmez' : 'Üst görev seçin'}
                  disabled={isMain || isSubMode}
                  allowClear={!isSubMode && !isMain}
                  options={mainTasks.map((t) => ({ value: t.id, label: t.title }))}
                  showSearch
                />
              </Form.Item>
            );
          }}
        </Form.Item>

        <FormDateField name="startDate" label="Başlangıç tarihi" />
        <Form.Item noStyle shouldUpdate={(prev, cur) => prev.startDate !== cur.startDate}>
          {() => {
            const startDate = form.getFieldValue('startDate') as Dayjs | undefined;
            return (
              <FormDateField
                name="endDate"
                label="Bitiş tarihi"
                disabled={!startDate}
                minDate={startDate}
                disabledDate={startDate ? (current) => current.isBefore(startDate, 'day') : undefined}
              />
            );
          }}
        </Form.Item>

        <Form.Item style={{ marginTop: 24 }}>
          <PrimaryButton htmlType="submit" block>
            Ekle
          </PrimaryButton>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
