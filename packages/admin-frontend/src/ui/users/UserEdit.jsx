import React, { useCallback } from "react";
import { Edit, SimpleForm, TextInput, useRedirect, useNotify, useUpdate } from "react-admin";
import { resources, routes } from "../../common/constants";
import { apiService } from "../../service";

export const UserEdit = () => {
    const redirect = useRedirect();
    const notify = useNotify();
    const [update] = useUpdate();
    const save = useCallback(
        async (values) => {
            return await apiService.updateEntity({
                update,
                notify,
                redirect,
                values,
                resource: resources.users,
                redirectOnSuccessTo: routes.toUsers,
                defaultKeyForError: "username",
            });
        },
        [update, notify, redirect]
    );

    return (
        <Edit>
            <SimpleForm onSubmit={save}>
                <TextInput disabled label="Id" source="id" fullWidth />
                <TextInput source="username" fullWidth />
                <TextInput source="email" type="email" fullWidth />
            </SimpleForm>
        </Edit>
    );
};
