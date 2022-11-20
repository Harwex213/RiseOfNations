import { Menu } from "react-admin";

import PeopleIcon from "@mui/icons-material/People";

export const AppMenu = () => (
    <Menu>
        <Menu.Item to="/users" primaryText="Users" leftIcon={<PeopleIcon />} />
    </Menu>
);
