import styled from 'styled-components';
import { Button } from 'antd';

export const PrimaryButton = styled(Button).attrs({ type: 'primary' })`
  && {
    font-weight: 500;
  }
`;
