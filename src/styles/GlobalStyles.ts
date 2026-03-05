import { createGlobalStyle } from 'styled-components';
import { media } from './theme';

export const GlobalStyles = createGlobalStyle`
  :root {
    font-family: system-ui, -apple-system, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    -webkit-text-size-adjust: 100%;
  }

  #root {
    min-height: 100vh;
  }

  ${media.mobile} {
    .ant-table-cell {
      padding: 6px 8px !important;
    }
  }
`;
