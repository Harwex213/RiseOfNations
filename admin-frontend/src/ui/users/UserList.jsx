import { List, Datagrid, TextField, DateField } from "react-admin";

export const UserList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="username" />
            <TextField source="email" />
            <DateField source="created" showTime />
            <DateField source="updated" showTime />
        </Datagrid>
    </List>
);
