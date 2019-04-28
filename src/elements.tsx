import styled from 'styled-components';
import { lighten } from 'polished';
import { COLOR_GRAY } from 'config';

export const Container = styled.div`
  min-width: 800px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 10px;
`;

export const Grid = styled.div`
  display: flex;
`;

export const Cell = styled.div`
  flex: 1;
`;

export const Button = styled.button`
  color: white;
  background-color: ${COLOR_GRAY};
  border: 0;
  text-transform: uppercase;
  padding: 6px 15px;
  margin-right: 2px;

  :hover {
    background-color: ${lighten(.2, COLOR_GRAY)};
    cursor: pointer;
  }

  :disabled {
    background-color: ${lighten(.5, COLOR_GRAY)};
    color: ${lighten(.67, COLOR_GRAY)};
    cursor: default;
  }

  :focus {
    outline: 0;
  }
`;