import React, { useCallback } from "react";
import {
    Edit,
    ImageField,
    ImageInput,
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
import { fileToBase64 } from "../../common/utils";

export const RealmEdit = () => {
    const redirect = useRedirect();
    const notify = useNotify();
    const [update] = useUpdate();
    const save = async (values) => {
        try {
            if (values.flag) {
                values.flagFileName = values.flag.title;
                const result = await fileToBase64(values.flag.rawFile);
                values.flagBase64 = result.split("base64,")[1];
            }
            delete values.flag;
            await apiService.updateEntity({
                update,
                notify,
                redirect,
                values,
                resource: resources.realms,
                redirectOnSuccessTo: routes.toRealms,
                defaultKeyForError: "name",
            });
        } catch (e) {
            return {
                flag: "Error while trying to convert file to base64 string",
            };
        }
    };

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
                <ImageInput source="flag" label="Realm flag" accept=".png,.jpg,.jpeg,.webp" maxSize={1000000}>
                    <ImageField source="src" title="title" />
                </ImageInput>
            </SimpleForm>
        </Edit>
    );
};
