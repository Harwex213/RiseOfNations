import { Datagrid, DateField, List, ReferenceField, TextField, FunctionField } from "react-admin";
import { apiRoutes, resources } from "../../common/constants";

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
                <FunctionField
                    render={(record) => (
                        <img
                            style={{ maxWidth: 120, maxHeight: 80, objectFit: "contain" }}
                            src={`${apiRoutes.images.realms}/${record.flagId}${record.flagExtension}`}
                            title="flag"
                            alt="realm flag"
                            onError={(e) => {
                                e.target.src = apiRoutes.images.defaultRealmFlag;
                            }}
                        />
                    )}
                />
                <DateField source="created" showTime />
                <DateField source="updated" showTime />
            </Datagrid>
        </List>
    );
};
