import { ConfigProvider, Button, theme as antdTheme } from 'antd';
import trTR from 'antd/locale/tr_TR';
import { useTheme } from 'styled-components';
import { useUI } from './hooks/useUI';
import { useThemeMode } from './hooks/useThemeMode';
import { TaskList } from './components/organisms/TaskList';
import { TaskDrawer } from './components/organisms/TaskDrawer';
import { GanttChart } from './components/organisms/GanttChart';
import { PlusOutlined } from '@ant-design/icons';
import { ThemeToggle } from './components/atoms';
import {
  AppLayout,
  AppHeader,
  AppTitle,
  AppSidebar,
  AppMain,
} from './App.styles';

function App() {
  const { openDrawer } = useUI();
  const theme = useTheme();
  const { mode, toggleMode } = useThemeMode();

  return (
    <ConfigProvider
      locale={trTR}
      theme={{
        algorithm: mode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: theme.colors.primary,
          colorText: theme.colors.text,
          colorBgContainer: theme.colors.background,
          colorBgElevated: theme.colors.background,
          colorBorder: theme.colors.border,
          borderRadius: 6,
        },
        components: {
          Button: {
            primaryShadow: 'none',
            colorIcon: theme.colors.textMuted,
            colorIconHover: theme.colors.primary,
          },
          Table: {
            headerBg: theme.colors.backgroundSecondary,
            rowHoverBg: theme.colors.backgroundSecondary,
          },
        },
      }}
    >
      <AppLayout>
        <AppHeader>
          <AppTitle>Gantt Görev Planlayıcı</AppTitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <ThemeToggle isDark={mode === 'dark'} onToggle={toggleMode} />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => openDrawer({ mode: 'add' })}
            >
              Yeni Ekle
            </Button>
          </div>
        </AppHeader>
        <AppSidebar>
          <TaskList />
        </AppSidebar>
        <AppMain>
          <GanttChart />
        </AppMain>
      </AppLayout>
      <TaskDrawer />
    </ConfigProvider>
  );
}

export default App;
