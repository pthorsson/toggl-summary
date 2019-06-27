import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import { FONT_FAMILY, COLOR_GRAY, COLOR_RED } from 'config';

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
    background-color: ${lighten(0.2, COLOR_GRAY)};
    cursor: pointer;
  }

  :disabled {
    background-color: ${lighten(0.5, COLOR_GRAY)};
    color: ${lighten(0.67, COLOR_GRAY)};
    cursor: default;
  }

  :focus {
    outline: 0;
  }
`;

export const Input: any = styled.input`
  color: ${COLOR_GRAY};
  border: 2px solid ${COLOR_GRAY};
  padding: 10px 15px;
  font-family: ${FONT_FAMILY};
  display: block;
  width: 100%;
  margin-bottom: 15px;

  :hover {
    border-color: ${lighten(0.2, COLOR_GRAY)};
  }

  :disabled {
    color: ${lighten(0.67, COLOR_GRAY)};
    border-color: ${lighten(0.5, COLOR_GRAY)};
  }

  :focus {
    outline: 0;
  }

  ::placeholder {
    opacity: 0.3;
  }

  ${(props: any) =>
    props.hasError &&
    css`
      border-color: ${COLOR_RED} !important;
    `}
`;

export const InputLabel: any = styled.label`
  font-size: 85%;
  display: block;
  margin-bottom: 5px;
  text-transform: uppercase;

  ${(props: any) =>
    props.hasError &&
    css`
      color: ${COLOR_RED} !important;
    `}
`;

export const FormWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;
