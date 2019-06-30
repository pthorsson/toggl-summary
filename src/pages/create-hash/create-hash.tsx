import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { AppContext } from 'context';
import togglApi from 'lib/toggl-api';
import googleSheetsApi from 'lib/google-sheets-api';

import { COLOR_RED } from 'config';
import { validateEmail } from 'lib/utils';
import { cipher } from 'lib/auth';
import { stringifySettings } from 'lib/settings-parser';

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
  toggl:
    'Invalid Toggle settings - please check your token, workspace ID or email.',
  google: 'Invalid Google Sheets ID - not found.',
  email: 'Invalid email address',
  passwordLength: 'Password must be atleast 6 characters',
  passwordMatch: 'Password confirmation does not match',
};

interface IProps {
  history: any;
}

export const CreateHash = ({ history }: IProps) => {
  const { actions } = useContext(AppContext);

  const [formState, setFormState] = useState({
    loading: false,
    error: null,
  });

  const [dataState, setDataState] = useState({
    togglToken: '',
    togglWorkspace: '',
    togglEmail: '',
    googleSpreatsheet: '',
    password: '',
    passwordConfirm: '',
    config: '',
    hash: '',
  });

  const updateField = (e: any) => {
    setFormState({ error: null, loading: false });
    setDataState({
      ...dataState,
      [e.target.name]: e.target.value,
    });
  };

  const generateHash = async () => {
    setFormState({ error: null, loading: true });

    if (!validateEmail(dataState.togglEmail)) {
      return setFormState({
        error: 'email',
        loading: false,
      });
    }

    const togglStatus = await togglApi.authenticate(dataState);

    if (!togglStatus) {
      return setFormState({
        error: 'toggl',
        loading: false,
      });
    }

    if (dataState.password.length < 6) {
      return setFormState({
        error: 'passwordLength',
        loading: false,
      });
    }

    if (dataState.googleSpreatsheet.length > 0) {
      try {
        await googleSheetsApi.checkIfAvailable(dataState.googleSpreatsheet);
      } catch (error) {
        return setFormState({
          error: 'google',
          loading: false,
        });
      }
    }

    if (dataState.password !== dataState.passwordConfirm) {
      return setFormState({
        error: 'passwordMatch',
        loading: false,
      });
    }

    const config = stringifySettings(dataState);
    const hash = cipher(config, dataState.togglEmail, dataState.password);

    actions.setConfig(hash, config, dataState.togglEmail);
    history.push(`/calendar/${hash}`);
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
              marginTop: '10vh',
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
              Create calendar hash
            </div>
          </div>
        </Cell>
      </Grid>
      <FormWrapper>
        <InputLabel hasError={hasError(['toggl', 'email'])}>
          Toggl email
        </InputLabel>
        <Input
          type="text"
          name="togglEmail"
          hasError={hasError(['toggl', 'email'])}
          disabled={formState.loading}
          value={dataState.togglEmail}
          onChange={updateField}
        />

        <InputLabel hasError={hasError(['toggl'])}>Toggl token</InputLabel>
        <Input
          type="text"
          name="togglToken"
          hasError={hasError(['toggl'])}
          disabled={formState.loading}
          value={dataState.togglToken}
          onChange={updateField}
        />
        <InputLabel hasError={hasError(['toggl'])}>Toggl space id</InputLabel>
        <Input
          type="text"
          name="togglWorkspace"
          hasError={hasError(['toggl'])}
          disabled={formState.loading}
          value={dataState.togglWorkspace}
          onChange={updateField}
        />

        <InputLabel hasError={hasError(['google'])}>Google sheet id</InputLabel>
        <Input
          type="text"
          name="googleSpreatsheet"
          placeholder="Leave blank to skip"
          hasError={hasError(['google'])}
          disabled={formState.loading}
          value={dataState.googleSpreatsheet}
          onChange={updateField}
        />

        <InputLabel hasError={hasError(['passwordLength', 'passwordMatch'])}>
          Choose a password
        </InputLabel>
        <Input
          type="password"
          name="password"
          hasError={hasError(['passwordLength', 'passwordMatch'])}
          disabled={formState.loading}
          value={dataState.password}
          onChange={updateField}
        />
        <InputLabel hasError={hasError(['passwordMatch'])}>
          Confirm password
        </InputLabel>
        <Input
          type="password"
          name="passwordConfirm"
          hasError={hasError(['passwordMatch'])}
          disabled={formState.loading}
          value={dataState.passwordConfirm}
          onChange={updateField}
        />
        {formState.error && (
          <ErrorMessage>{ERROR_MESSAGES[formState.error]}</ErrorMessage>
        )}
        <Grid alignItems="center" justifyContent="space-between">
          <Cell collapse>
            <Button
              onClick={generateHash}
              disabled={formState.loading || formState.error}
            >
              Create calendar
            </Button>
          </Cell>
          <Cell collapse>
            <Anchor to="/authenticate">Authenticate</Anchor>
          </Cell>
        </Grid>
      </FormWrapper>
    </Container>
  );
};
