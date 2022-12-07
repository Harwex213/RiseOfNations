export const suspenseServiceError = (action, notify) => async (values) => {
    try {
        return await action(values);
    } catch (e) {
        notify(e.message, { variant: "error" });
    }
};
