import { toObjectWithCamelCaseKeys } from "../common/utils";

export const apiService = {
    suspenseError: (action, defaultKeyForError) => async (values) => {
        try {
            await action(values);
        } catch (error) {
            if (error.body.errors) {
                return toObjectWithCamelCaseKeys(error.body.errors);
            }
            return {
                [defaultKeyForError]: error.body.message,
            };
        }
    },
    createEntity: async ({
        create,
        notify,
        redirect,
        resource,
        redirectOnSuccessTo,
        defaultKeyForError,
        values,
    }) => {
        try {
            await create(resource, { data: values }, { returnPromise: true });
            notify("ra.notification.created", {
                type: "info",
                messageArgs: { smart_count: 1 },
            });
            redirect(redirectOnSuccessTo);
        } catch (error) {
            if (error.body.errors) {
                return toObjectWithCamelCaseKeys(error.body.errors);
            }
            return {
                [defaultKeyForError]: error.body.message,
            };
        }
    },
    updateEntity: async ({
        update,
        notify,
        redirect,
        resource,
        redirectOnSuccessTo,
        defaultKeyForError,
        values,
    }) => {
        try {
            const id = values.id;
            delete values.id;
            await update(resource, { id: id, data: values }, { returnPromise: true });
            notify("ra.notification.updated", {
                type: "info",
                messageArgs: { smart_count: 1 },
            });
            redirect(redirectOnSuccessTo);
        } catch (error) {
            if (error.body.errors) {
                return toObjectWithCamelCaseKeys(error.body.errors);
            }
            return {
                [defaultKeyForError]: error.body.message,
            };
        }
    },
};
