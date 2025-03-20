import React from "react";
import { Admin, Resource } from "react-admin";
import { AppLayout } from "./layout/AppLayout";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { resources } from "../common/constants";
import { UserList, UserCreate, UserEdit } from "./users";
import { GameVariableList, GameVariableEdit } from "./gameVariables";
import { ModificatorList, ModificatorCreate, ModificatorEdit } from "./modificators";
import { RealmList, RealmCreate, RealmEdit } from "./realms";
import { GamePartyList } from "./gameParties";

const App = () => (
    <Admin layout={AppLayout} dataProvider={dataProvider} authProvider={authProvider} requireAuth>
        <Resource name={resources.users} list={UserList} create={UserCreate} edit={UserEdit} />
        <Resource name={resources.realms} list={RealmList} create={RealmCreate} edit={RealmEdit} />
        <Resource
            name={resources.modificators}
            list={ModificatorList}
            create={ModificatorCreate}
            edit={ModificatorEdit}
        />
        <Resource name={resources.gameVariables} list={GameVariableList} edit={GameVariableEdit} />
        <Resource name={resources.gameParties} list={GamePartyList} />
    </Admin>
);

export default App;
