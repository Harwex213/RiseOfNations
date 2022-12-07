export const login = {
    pageTitle: "Sign in",
    fields: {
        username: "Username",
        password: "Password",
    },
    submitButton: "Sign in",
    registrationProposal: "Don't have an account? Sign Up",
    validationSchema: {
        username: {
            required: "Username is required",
        },
        password: {
            required: "Password is required",
        },
    },
};
