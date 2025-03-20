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

export const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
