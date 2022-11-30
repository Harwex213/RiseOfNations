import React from "react";
import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { AppLayout } from "./layout/AppLayout";
import { resources } from "../common/constants";
import { UserList, UserCreate, UserEdit } from "./users";
import { GameVariableList, GameVariableEdit } from "./gameVariables";
import { ModificatorList, ModificatorCreate, ModificatorEdit } from "./modificators";
import { RealmList, RealmCreate, RealmEdit } from "./realms";

const App = () => (
    <Admin layout={AppLayout} dataProvider={simpleRestProvider(process.env.REACT_APP_REST_API_URL)}>
        <Resource name={resources.users} list={UserList} create={UserCreate} edit={UserEdit} />
        <Resource name={resources.realms} list={RealmList} create={RealmCreate} edit={RealmEdit} />
        <Resource
            name={resources.modificators}
            list={ModificatorList}
            create={ModificatorCreate}
            edit={ModificatorEdit}
        />
        <Resource name={resources.gameVariables} list={GameVariableList} edit={GameVariableEdit} />
    </Admin>
);

export default App;
