import React, { useCallback } from "react";
import { Create, SimpleForm, TextInput, useCreate, useNotify, useRedirect } from "react-admin";

export const UserCreate = () => {
    const redirect = useRedirect();
    const notify = useNotify();
    const [create] = useCreate();
    const save = useCallback(
        async (values) => {
            try {
                await create("users", { data: values }, { returnPromise: true });
                notify("ra.notification.created", {
                    type: "info",
                    messageArgs: { smart_count: 1 },
                });
                redirect("list");
            } catch (error) {
                if (error.body.errors) {
                    return error.body.errors;
                }
                return {
                    username: error.body.message,
                };
            }
        },
        [create, notify, redirect]
    );

    return (
        <Create>
            <SimpleForm onSubmit={save}>
                <TextInput source="username" fullWidth />
                <TextInput source="password" type="password" fullWidth />
                <TextInput source="email" type="email" fullWidth />
            </SimpleForm>
        </Create>
    );
};
