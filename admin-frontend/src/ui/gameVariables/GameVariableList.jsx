import { Datagrid, DateField, List, TextField } from "react-admin";

export const GameVariableList = () => {
    return (
        <List>
            <Datagrid rowClick="edit" bulkActionButtons={false}>
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="defaultValue" />
                <DateField source="created" showTime />
                <DateField source="updated" showTime />
            </Datagrid>
        </List>
    );
};
