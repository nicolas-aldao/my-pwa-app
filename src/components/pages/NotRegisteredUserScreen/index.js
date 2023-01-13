import React, { useContext } from 'react';
import { Context } from '../../../Context';
import { Context as AuthContext } from '../../../context/AuthContext';
import { UserForm } from '../../organisms/UserForm';
import { useRegisterMutation } from '../../../hooks/useRegisterMutation';
import { useLoginMutation } from '../../../hooks/useLoginMutation';
import { Context as OldContext } from '../../../Context';

export default () => {
  const { registerMutation, loading, error } = useRegisterMutation();
  const {
    login,
    loading: loadingLogin,
    error: errorLogin,
  } = useLoginMutation();
  const { state, signIn, clearErrorMessages } = useContext(AuthContext);
  console.log('🚀 ~ file: index.js:16 ~ state', state);
  const { activateAuth } = useContext(OldContext);

  return (
    <Context.Consumer>
      {({ activateAuth }) => {
        const onSubmit = ({ email, password }) => {
          const input = { email, password };
          const variables = { input };
          registerMutation({ variables }).then(data => {
            const { signup } = data.data;
            activateAuth(signup);
          });
        };

        const onSubmitLogin = async ({ email, password }) => {
          // const input = { email, password };
          // const variables = { input };
          // login({ variables }).then(data => {
          //   const { login } = data.data;
          //   console.log(login);
          //   activateAuth(login);
          // });
          const token = await signIn({ email, password });
          await activateAuth(token);
        };

        const errorMsg = error && 'The user already exists.';

        const errorMsgLogin =
          errorLogin && 'The user or password is incorrect.';

        return (
          <>
            <UserForm
              disabled={loading}
              error={errorMsg}
              title="Sign up"
              onSubmit={onSubmit}
            />
            <UserForm
              disabled={loadingLogin}
              error={errorMsgLogin}
              title="Sign in"
              onSubmit={onSubmitLogin}
            />
          </>
        );
      }}
    </Context.Consumer>
  );
};
