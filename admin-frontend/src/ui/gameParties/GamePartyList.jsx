import { Datagrid, DateField, List, ReferenceField, TextField } from "react-admin";
import { resources } from "../../common/constants";

export const GamePartyList = () => {
    return (
        <List>
            <Datagrid bulkActionButtons={false}>
                <TextField source="id" />
                <TextField source="name" />
                <ReferenceField source="winnerUserId" label="Winner" reference={resources.users}>
                    <TextField source="username" />
                </ReferenceField>
                <TextField source="turnsCompleted" />
                <TextField source="turnDuration" />
                <DateField source="created" showTime />
                <DateField source="updated" showTime />
            </Datagrid>
        </List>
    );
};
