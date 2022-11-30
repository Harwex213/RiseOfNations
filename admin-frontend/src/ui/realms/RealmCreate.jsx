import React, { useCallback } from "react";
import {
    Create,
    SimpleForm,
    TextInput,
    useCreate,
    useNotify,
    useRedirect,
    ReferenceInput,
    SelectInput,
} from "react-admin";
import { resources, routes } from "../../common/constants";
import { apiService } from "../../service";
import { options } from "./utils";

export const RealmCreate = () => {
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
                resource: resources.realms,
                redirectOnSuccessTo: routes.toRealms,
                defaultKeyForError: "name",
            });
        },
        [create, notify, redirect]
    );

    return (
        <Create>
            <SimpleForm onSubmit={save}>
                <TextInput source="name" fullWidth />
                <TextInput source="description" multiline fullWidth />
                <ReferenceInput label="User" source="userId" reference={resources.users}>
                    <SelectInput optionText={options.userOption} fullWidth />
                </ReferenceInput>
                <ReferenceInput source="modificatorId" reference={resources.modificators}>
                    <SelectInput optionText={options.modificatorOption} fullWidth />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    );
};
