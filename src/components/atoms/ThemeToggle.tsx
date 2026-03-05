import { Switch } from 'antd';
import { BulbOutlined, SunOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  transform: scale(1.35);
  transform-origin: center;
`;

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <Wrapper>
      <Switch
        checked={isDark}
        onChange={onToggle}
        checkedChildren={<SunOutlined />}
        unCheckedChildren={<BulbOutlined />}
        title={isDark ? 'Koyu mod' : 'Açık mod'}
      />
    </Wrapper>
  );
}
