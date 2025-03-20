import React from "react";
import {
    Create,
    ImageField,
    ImageInput,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextInput,
    useCreate,
    useNotify,
    useRedirect,
} from "react-admin";
import { resources, routes } from "../../common/constants";
import { options } from "./utils";
import { fileToBase64 } from "../../common/utils";
import { apiService } from "../../service";

export const RealmCreate = () => {
    const redirect = useRedirect();
    const notify = useNotify();
    const [create] = useCreate();
    const save = async (values) => {
        try {
            if (values.flag) {
                values.flagFileName = values.flag.title;
                const result = await fileToBase64(values.flag.rawFile);
                values.flagBase64 = result.split("base64,")[1];
            }
            delete values.flag;
            await apiService.createEntity({
                create,
                notify,
                redirect,
                values,
                resource: resources.realms,
                redirectOnSuccessTo: routes.toRealms,
                defaultKeyForError: "name",
            });
        } catch (e) {
            console.error("Error while trying to convert file to base64 string");
        }
    };

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
                <ImageInput source="flag" label="Realm flag" accept=".png,.jpg,.jpeg,.webp" maxSize={1000000}>
                    <ImageField source="src" title="title" />
                </ImageInput>
            </SimpleForm>
        </Create>
    );
};
