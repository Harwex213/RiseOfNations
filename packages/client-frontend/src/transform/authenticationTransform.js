export const authenticationTransform = {
    mapToLogin: ({ username = "", password = "" }) => ({
        username,
        password,
    }),
    mapToRegister: ({ username = "", email = null, password = "", repeatPassword = "" }) => ({
        username,
        email: email === "" ? null : email,
        password,
        repeatPassword,
    }),
    mapUserIdentity: (values) => ({
        id: values.id,
        username: values.username,
    }),
};
