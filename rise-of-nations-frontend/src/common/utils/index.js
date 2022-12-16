export const suspenseServiceError =
    (action, { notify, onError = () => {} }) =>
    async (values, ...rest) => {
        try {
            return await action(values, ...rest);
        } catch (e) {
            onError(e);
            notify(e.message, { variant: "error" });
        }
    };

export const describeSseError = () => {};
