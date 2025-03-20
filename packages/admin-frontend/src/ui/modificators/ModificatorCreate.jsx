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
    NumberInput,
} from "react-admin";
import { resources, routes } from "../../common/constants";
import { apiService } from "../../service";

const gameVariableOption = (record) => `${record.name}. Default value: ${record.defaultValue}`;
export const ModificatorCreate = () => {
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
                resource: resources.modificators,
                redirectOnSuccessTo: routes.toModificators,
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
                <ReferenceInput
                    source="affectedGameVariableId"
                    label="Affected game variable"
                    reference={resources.gameVariables}
                >
                    <SelectInput optionText={gameVariableOption} fullWidth />
                </ReferenceInput>
                <NumberInput source="modificatorValue" label="Modificator value" fullWidth />
            </SimpleForm>
        </Create>
    );
};
