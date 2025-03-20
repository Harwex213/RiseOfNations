import React, { useCallback } from "react";
import {
    Edit,
    NumberInput,
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

const gameVariableOption = (record) => `${record.name}. Default value: ${record.defaultValue}`;
export const ModificatorEdit = () => {
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
                resource: resources.modificators,
                redirectOnSuccessTo: routes.toModificators,
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
                <ReferenceInput
                    source="affectedGameVariableId"
                    label="Affected game variable"
                    reference={resources.gameVariables}
                >
                    <SelectInput optionText={gameVariableOption} fullWidth />
                </ReferenceInput>
                <NumberInput source="modificatorValue" label="Modificator value" fullWidth />
            </SimpleForm>
        </Edit>
    );
};
