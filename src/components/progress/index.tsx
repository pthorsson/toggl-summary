import React, { useContext } from 'react';
import styled, { css } from 'styled-components';

import { AppContext } from 'context';

export const Progress = () => {
  const { state, actions } = useContext(AppContext);

  return (
    <>
      progress
    </>
  );
};