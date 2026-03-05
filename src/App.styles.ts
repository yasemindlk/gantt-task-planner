import styled from 'styled-components';

export const AppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 440px 1fr;
  min-height: 100vh;
`;

export const AppHeader = styled.header`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
`;

export const AppTitle = styled.h1`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

export const AppSidebar = styled.aside`
  overflow: auto;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

export const AppMain = styled.main`
  overflow: auto;
  padding: 16px;
  background: ${({ theme }) => theme.colors.background};
`;

export const Placeholder = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`;
