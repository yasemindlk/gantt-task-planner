import styled from 'styled-components';
import { media } from './styles/theme';

export const AppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 440px 1fr;
  min-height: 100vh;

  ${media.tablet} {
    grid-template-columns: 320px 1fr;
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr;
  }
`;

export const AppHeader = styled.header`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};

  ${media.mobile} {
    padding: 10px 12px;
  }
`;

export const AppTitle = styled.h1`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};

  ${media.mobile} {
    font-size: 0.875rem;
  }
`;

export const MobileTabBar = styled.nav`
  display: none;

  ${media.mobile} {
    display: flex;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }
`;

export const MobileTab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 10px 0;
  border: none;
  border-bottom: 2px solid
    ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  background: transparent;
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.textMuted)};
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;

  &:active {
    opacity: 0.7;
  }
`;

export const AppSidebar = styled.aside<{ $hidden?: boolean }>`
  overflow: auto;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSecondary};

  ${media.mobile} {
    border-right: none;
    display: ${({ $hidden }) => ($hidden ? 'none' : 'block')};
  }
`;

export const AppMain = styled.main<{ $hidden?: boolean }>`
  overflow: auto;
  padding: 16px;
  background: ${({ theme }) => theme.colors.background};

  ${media.mobile} {
    padding: 12px;
    display: ${({ $hidden }) => ($hidden ? 'none' : 'block')};
  }
`;

export const Placeholder = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`;
