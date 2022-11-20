import React from "react";
import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { AppLayout } from "./layout/AppLayout";
import { UserList, UserCreate, UserEdit } from "./users";

const App = () => (
    <Admin layout={AppLayout} dataProvider={simpleRestProvider(process.env.REACT_APP_REST_API_URL)}>
        <Resource name="users" list={UserList} create={UserCreate} edit={UserEdit} />
    </Admin>
);

export default App;
