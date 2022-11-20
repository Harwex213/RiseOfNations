import React, { useCallback } from "react";
import { Edit, SimpleForm, TextInput, useRedirect, useNotify, useUpdate } from "react-admin";

export const UserEdit = () => {
    const redirect = useRedirect();
    const notify = useNotify();
    const [update] = useUpdate();
    const save = useCallback(
        async (values) => {
            try {
                const id = values.id;
                delete values.id;
                await update("users", { id: id, data: values }, { returnPromise: true });
                notify("ra.notification.updated", {
                    type: "info",
                    messageArgs: { smart_count: 1 },
                });
                redirect("list");
            } catch (error) {
                console.log(error.body);
                if (error.body.errors) {
                    return error.body.errors;
                }
                return {
                    username: error.body.message,
                };
            }
        },
        [update, notify, redirect]
    );

    return (
        <Edit>
            <SimpleForm onSubmit={save}>
                <TextInput disabled label="Id" source="id" />
                <TextInput source="username" fullWidth />
                <TextInput source="email" type="email" fullWidth />
            </SimpleForm>
        </Edit>
    );
};
