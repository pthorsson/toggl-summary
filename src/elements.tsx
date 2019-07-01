import React from 'react';
import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import { FONT_FAMILY, COLOR_GRAY, COLOR_RED } from 'config';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  min-width: 800px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 10px;
`;

export const Grid: any = styled.div`
  display: flex;

  ${(props: any) =>
    props.alignItems &&
    css`
      align-items: ${props.alignItems};
    `}

  ${(props: any) =>
    props.justifyContent &&
    css`
      justify-content: ${props.justifyContent};
    `}
`;

export const Cell: any = styled.div`
  flex: 1;

  ${(props: any) =>
    props.collapse &&
    css`
      flex: 0 1 auto;
    `}
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

export const Anchor = styled(Link)`
  color: ${COLOR_GRAY};

  &:hover {
    opacity: 0.7;
  }
`;

export const Logo = ({ color = COLOR_GRAY, size = '150px' }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} viewBox="0 0 120 50">
    <path
      fill={color}
      d="M33 10.1c1.7 0 3.1-1.5 3.1-3.2 0-1.9-1.4-3.3-3.1-3.3-1.7 0-3.2 1.4-3.2 3.3.1 1.7 1.6 3.2 3.2 3.2zM95.5 28.3c7.1-.2 14.5-.8 15.7-1 1-.2 1.1-.8 1.2-2 0-4.8-4-9.3-9.2-9.3-3.1 0-6.4 1.6-8.9 4.4-1.9 2.1-3.2 4.8-3.7 7.9h4.9zm6.3-10c3.4 0 5.5 2.9 5.4 6.1 0 .9-.4 1.2-1.4 1.2-3.5.2-6.9.2-10.3.2.9-4.9 3.6-7.5 6.3-7.5zM47.3 24.5v3.9H52v-5.6c1.9-1.5 4.2-3.1 6.6-3.1 3.7 0 5 2.5 5 6.9v1.8h4.7v-3c0-1.1-.1-1.9-.2-2.6 2.3-1.9 4.4-3.1 6.7-3.1 3.7 0 5.2 2.7 5.2 7v1.7h4.7v-3.1c0-5.9-2.9-9.2-7.6-9.2-1.7 0-3.4.7-4.7 1.6-1.5 1-3.1 2-4.7 3.4-1.2-3.1-3.7-4.9-6.5-4.9-1.9 0-3.2.6-4.7 1.6-1.9 1.1-3.2 2.2-4.4 3.1V16c-2.7 1.2-5.5 2-8.3 2.4v1.5c3.2.5 3.5.7 3.5 4.6zM11.9 19.2v9.1h4.7v-9.1h6.5c.7-.5.9-1.9.4-2.5h-6.8c0-2.9.1-6.4.2-8.9l-.9-.1c-1.1 1.2-2.9 2.8-4 4v5H9.2l-1.6 1.7.2.7h4.1zM31 24.3v4h4.7v-4.8-7.6c-2.6 1.1-5.4 1.9-8.5 2.4v1.4c3.6.7 3.8.9 3.8 4.6zM84.8 36.9v-4.8c-1.5.1-3.1.1-4.7.2v4.3c0 4.2-.4 4.4-4 4.8v1.7h12.5v-1.7c-3.5-.3-3.8-.5-3.8-4.5zM68.4 37v-4.2c-1.5.1-3.1.1-4.7.2v3.8c0 4-.5 4.2-4.3 4.6v1.7h12.8v-1.7c-3.3-.3-3.8-.6-3.8-4.4zM104.2 39.7c-3.6 0-7.7-2.4-8.7-7.9-.1 0-2 .1-5 .2.4 6.5 4.8 11.9 11.7 11.9 1.9 0 6.1-1 10-5.8l-1-1.4c-2.2 2-4.5 3-7 3zM20.1 42.9c-1.6 0-3.5-.9-3.5-5.8v-.7c-1.7.2-3.2.4-4.7.6v2.2c0 4.8 2 7.1 5.9 7.1.6 0 1.6-.2 2.6-.8l4-2.1-.6-1.4c-.8.4-2.2.9-3.7.9zM35.7 36.7v-2c-1.6.1-3.2.2-4.7.4v1.6c0 4.1-.4 4.4-4.2 4.7v1.7h13.3v-1.7c-3.9-.3-4.4-.6-4.4-4.7zM52 36.9v-3.2c-1.6.1-3.2.2-4.7.3v2.9c0 4-.4 4.2-4.3 4.6v1.7h12.9v-1.7c-3.5-.4-3.9-.7-3.9-4.6z"
    />
  </svg>
);
