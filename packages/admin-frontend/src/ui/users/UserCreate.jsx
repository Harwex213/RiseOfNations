import React, { useCallback } from "react";
import { Create, SimpleForm, TextInput, useCreate, useNotify, useRedirect } from "react-admin";
import { resources, routes } from "../../common/constants";
import { apiService } from "../../service";

export const UserCreate = () => {
    const redirect = useRedirect();
    const notify = useNotify();
    const [create] = useCreate();
    const save = useCallback(
        async (values) => {
            return await apiService.createEntity({
                create,
                notify,
                redirect,
                values,
                resource: resources.users,
                redirectOnSuccessTo: routes.toUsers,
                defaultKeyForError: "username",
            });
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
