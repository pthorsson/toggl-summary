import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

import { AppContext } from 'context';

import { COLOR_RED } from 'config';
import { delay } from 'lib/utils';
import { decipher } from 'lib/auth';

import {
  Container,
  FormWrapper,
  Input,
  InputLabel,
  Button,
  Anchor,
  Grid,
  Cell,
  Logo,
} from 'elements';

const ErrorMessage: any = styled.div`
  font-size: 14px;
  margin-bottom: 15px;
  color: ${COLOR_RED};
`;

const ERROR_MESSAGES: any = {
  couldNotDecrypt: 'Hash, email and/or password is invalid.',
};

interface IProps {
  hash: string;
  history: any;
}

export const DecryptHash = ({ hash = '', history }: IProps) => {
  const { actions } = useContext(AppContext);

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const [formState, setFormState] = useState({
    loading: false,
    error: null,
  });

  const [dataState, setDataState] = useState({
    hash,
    email: '',
    password: '',
  });

  const decryptHash = async () => {
    const { hash, email, password } = dataState;
    let result: any = false;

    setFormState({ loading: true, error: null });

    await delay(500);

    try {
      result = decipher(hash, email, password);
    } catch (error) {}

    setFormState({ loading: false, error: !result && 'couldNotDecrypt' });

    if (result) {
      actions.setConfig(hash, result, dataState.email);
      history.push(`/calendar/${hash}`);
    }
  };

  const updateField = (e: any) => {
    setFormState({ error: null, loading: false });
    setDataState({
      ...dataState,
      [e.target.name]: e.target.value,
    });
  };

  const hasError = (errors: string[]) => errors.indexOf(formState.error) > -1;

  return (
    <Container>
      <Grid justifyContent="center">
        <Cell collapse>
          <div
            style={{
              textAlign: 'center',
              marginBottom: '40px',
              marginTop: '15vh',
            }}
          >
            <Logo />
            <div
              style={{
                marginTop: '10px',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '.05em',
              }}
            >
              Open calendar hash
            </div>
          </div>
        </Cell>
      </Grid>
      <FormWrapper>
        <InputLabel>Hash</InputLabel>
        <Input
          type="text"
          name="hash"
          hasError={hasError(['couldNotDecrypt'])}
          disabled={formState.loading}
          value={dataState.hash}
          onChange={updateField}
        />

        <InputLabel>Email</InputLabel>
        <Input
          type="text"
          name="email"
          hasError={hasError(['couldNotDecrypt'])}
          disabled={formState.loading}
          value={dataState.email}
          onChange={updateField}
        />

        <InputLabel>Password</InputLabel>
        <Input
          type="password"
          name="password"
          hasError={hasError(['couldNotDecrypt'])}
          disabled={formState.loading}
          value={dataState.password}
          onChange={updateField}
        />

        {formState.error && (
          <ErrorMessage>{ERROR_MESSAGES[formState.error]}</ErrorMessage>
        )}
        <Grid alignItems="center" justifyContent="space-between">
          <Cell collapse>
            <Button
              onClick={decryptHash}
              disabled={formState.loading || formState.error}
            >
              Open calendar
            </Button>
          </Cell>
          <Cell collapse>
            <Anchor to="/create-calendar">Create new calendar</Anchor>
          </Cell>
        </Grid>
      </FormWrapper>
    </Container>
  );
};
