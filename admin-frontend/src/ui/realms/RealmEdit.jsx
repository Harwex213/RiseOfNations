import React, { useCallback } from "react";
import {
    Edit,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextInput,
    useNotify,
    useRedirect,
    useUpdate,
} from "react-admin";
import { resources, routes } from "../../common/constants";
import { apiService } from "../../service";
import { options } from "./utils";

export const RealmEdit = () => {
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
                resource: resources.realms,
                redirectOnSuccessTo: routes.toRealms,
                defaultKeyForError: "name",
            });
        },
        [update, notify, redirect]
    );

    return (
        <Edit>
            <SimpleForm onSubmit={save}>
                <TextInput disabled label="Id" source="id" fullWidth />
                <TextInput source="name" fullWidth />
                <TextInput source="description" multiline fullWidth />
                <ReferenceInput label="User" source="userId" reference={resources.users}>
                    <SelectInput disabled optionText={options.userOption} fullWidth />
                </ReferenceInput>
                <ReferenceInput source="modificatorId" reference={resources.modificators}>
                    <SelectInput optionText={options.modificatorOption} fullWidth />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    );
};
