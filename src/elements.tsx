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
  <svg xmlns="http://www.w3.org/2000/svg" width={size} viewBox="0 0 230 50">
    <path
      fill={color}
      d="M23.2 46.2v-1.7c3.5-.4 4-.7 4-4.6v-9.8c0-5-1.9-7.5-5.9-7.4-2.3 0-4.7 1.1-6.4 3.1V40c0 3.9.5 4.3 4.1 4.6v1.7H5.8v-1.7c3.5-.3 4.3-.6 4.3-4.6V11c0-3.2-.2-4-4.2-4.3V5.1c3.2-.3 6.8-1.2 8.9-2v20.4c2.2-2.2 5.5-4.4 8.7-4.4 4.9 0 8.3 3.1 8.3 10.3V40c0 4 .5 4.3 4 4.6v1.7H23.2zM52.9 19.2c7.5 0 13.1 5.7 13.1 13.4 0 9.7-7.2 14.3-13.1 14.3-8.3 0-13.3-6.7-13.3-13.4-.1-9.7 7.6-14.3 13.3-14.3zm-.8 2c-3.7 0-7 3.5-7 10.5 0 7.6 3.4 13.1 8.3 13.1 3.7 0 6.8-2.7 6.8-10.9.1-7-2.8-12.7-8.1-12.7zM99.5 44.9c-2.9.4-6.1 1.2-9.2 2.1v-4.6C87.1 45 84.5 47 81.2 47c-4 0-7.5-2.5-7.5-9V26.3c0-3.2-.5-3.6-2-3.9l-1.7-.3v-1.6c2.6-.1 6.5-.7 8.6-1.1-.2 1.9-.2 4.8-.2 8.8v8.2c0 5.3 2.8 6.8 5.5 6.8 2.2 0 4.4-1 6.5-2.9v-14c0-3.2-.7-3.7-2.8-4l-1.9-.2v-1.6c3.8-.2 8-.8 9.4-1.1v20.1c0 3 .5 3.4 2.8 3.5l1.7.1v1.8zM116.3 46.2h-13.8v-1.7c3.8-.4 4.1-.7 4.1-4.6V27.5c0-4-.2-4.1-3.7-4.6v-1.5c2.9-.5 5.6-1.2 8.5-2.5v6.6c2.1-3.1 4.6-6.4 7.6-6.4 2.2 0 3.5 1.4 3.5 2.9 0 1.4-1 2.7-2 3.3-.6.4-1.1.3-1.6-.1-.9-.9-1.6-1.5-2.7-1.5-1.3 0-3.5 1.9-4.8 4.9v11.3c0 4 .3 4.3 4.9 4.6v1.7zM140.6 27c-1.1-3.5-2.8-5.9-6.4-5.9-2.1 0-3.8 1.5-3.8 3.9 0 2.6 2 3.9 5.2 5.3 4.9 2.2 7.7 4.1 7.7 8.2 0 5.5-5 8.3-9.8 8.3-3.1 0-5.9-1-7.1-1.7-.3-1.7-.8-5.2-1.1-7.1l1.7-.3c1.1 3.8 3.2 7.1 7.4 7.1 2.3 0 4.3-1.6 4.3-4.1 0-2.7-1.6-4.1-4.9-5.6-3.9-1.8-7.7-3.8-7.7-8.3 0-4.4 3.8-7.7 9.5-7.7 2.5 0 4.7.6 5.9.8.2 1.4.6 5.2.9 6.7l-1.8.4zM175.9 44.9c-2.9.4-6.1 1.2-9.2 2.1v-4.6c-3.2 2.7-5.9 4.6-9.2 4.6-4 0-7.5-2.5-7.5-9V26.3c0-3.2-.5-3.6-2-3.9l-1.7-.3v-1.6c2.6-.1 6.5-.7 8.6-1.1-.2 1.9-.2 4.8-.2 8.8v8.2c0 5.3 2.8 6.8 5.5 6.8 2.2 0 4.4-1 6.5-2.9v-14c0-3.2-.7-3.7-2.8-4l-1.9-.2v-1.6c3.8-.2 8-.8 9.4-1.1v20.1c0 3 .5 3.4 2.8 3.5l1.7.1v1.8zM211.8 46.2v-1.7c3.5-.4 4-.6 4-4.8v-10c0-4.3-1.4-7-5.2-7-2.3 0-4.4 1.3-6.7 3.1.1.7.2 1.4.2 2.6V40c0 3.8.5 4.1 3.8 4.4v1.7h-12.8v-1.7c3.7-.4 4.3-.6 4.3-4.6V29.7c0-4.4-1.4-6.9-5-6.9-2.4 0-4.7 1.6-6.6 3.1V40c0 4 .4 4.2 3.8 4.6v1.7h-12.9v-1.7c4-.4 4.3-.6 4.3-4.6V27.6c0-3.8-.2-4.1-3.6-4.7v-1.5c2.8-.4 5.6-1.2 8.3-2.4v4.9c1.3-1 2.5-2 4.4-3.1 1.5-1 2.8-1.6 4.7-1.6 2.9 0 5.3 1.8 6.5 4.9 1.7-1.3 3.2-2.3 4.7-3.4 1.3-.8 3-1.6 4.7-1.6 4.7 0 7.6 3.4 7.6 9.2V40c0 4 .4 4.2 3.8 4.6v1.7h-12.3z"
    />
  </svg>
);
