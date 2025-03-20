export const registration = {
    pageTitle: "Sign up",
    fields: {
        username: "Username",
        email: "Email",
        password: "Password",
        repeatPassword: "Repeat password",
    },
    submitButton: "Sign up",
    registrationProposal: "Already have an account? Sign in",
    validationSchema: {
        username: {
            required: "Username is required",
        },
        password: {
            required: "Password is required",
        },
        email: {
            invalid: "Email should be valid",
        },
        repeatPassword: {
            required: "Repeat your password",
            invalid: "Password are not equal",
        },
    },
};
