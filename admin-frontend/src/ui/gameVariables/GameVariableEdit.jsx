import React, { useCallback } from "react";
import { Edit, SimpleForm, TextInput, useNotify, useRedirect, useUpdate } from "react-admin";
import { resources, routes } from "../../common/constants";
import { apiService } from "../../service";

export const GameVariableEdit = () => {
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
                resource: resources.gameVariables,
                redirectOnSuccessTo: routes.toGameVariables,
                defaultKeyForError: "defaultValue",
            });
        },
        [update, notify, redirect]
    );

    return (
        <Edit>
            <SimpleForm onSubmit={save}>
                <TextInput disabled label="Id" source="id" fullWidth />
                <TextInput disabled label="Name" source="name" fullWidth />
                <TextInput source="defaultValue" fullWidth />
            </SimpleForm>
        </Edit>
    );
};
