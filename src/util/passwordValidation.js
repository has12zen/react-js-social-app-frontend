export const validateOnChange = (newValue, key, state) => (dispatch) => {
  if (key === 'password') {
    if (newValue.length < 8) {
      return {
        errors: {
          ...state.errors,
          password: { properties: { message: 'Password too short' } },
        },
        clientValidateError: true,
      };
    } else if (state.errors.confirmPassword === undefined) {
      return {
        errors: { ...state.errors, password: undefined },
        clientValidateError: false,
      };
    } else {
      return {
        errors: { ...state.errors, password: undefined },
      };
    }
  } else if (key === 'confirmPassword') {
    if (newValue !== state.password) {
      return {
        errors: {
          ...state.errors,
          passwordConfirm: {
            properties: { message: 'Passwords do not match' },
          },
        },
        clientValidateError: true,
      };
    } else if (state.errors.password === undefined) {
      return {
        errors: { ...state.errors, passwordConfirm: undefined },
        clientValidateError: false,
      };
    } else {
      return {
        errors: { ...state.errors, passwordConfirm: undefined },
      };
    }
  }
};
