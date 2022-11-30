import { Datagrid, DateField, List, ReferenceField, TextField } from "react-admin";
import { resources } from "../../common/constants";

export const RealmList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="description" />
                <ReferenceField source="userId" label="User" reference={resources.users}>
                    <TextField source="username" />
                </ReferenceField>
                <ReferenceField source="modificatorId" label="Modificator" reference={resources.modificators}>
                    <TextField source="name" />
                </ReferenceField>
                <DateField source="created" showTime />
                <DateField source="updated" showTime />
            </Datagrid>
        </List>
    );
};
