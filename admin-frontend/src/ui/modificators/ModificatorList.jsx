import { Datagrid, List, DateField, NumberField, ReferenceField, TextField } from "react-admin";
import { resources } from "../../common/constants";

export const ModificatorList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="description" />
                <ReferenceField
                    source="affectedGameVariableId"
                    label="Affected Game Variable"
                    reference={resources.gameVariables}
                >
                    <TextField source="name" />
                </ReferenceField>
                <NumberField source="modificatorValue" />
                <DateField source="created" showTime />
                <DateField source="updated" showTime />
            </Datagrid>
        </List>
    );
};
