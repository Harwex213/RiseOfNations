import { Menu } from "react-admin";

import PeopleIcon from "@mui/icons-material/People";
import ExtensionIcon from "@mui/icons-material/Extension";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { routes } from "../../common/constants";

export const AppMenu = () => (
    <Menu>
        <Menu.Item to={routes.toUsers} primaryText="Users" leftIcon={<PeopleIcon />} />
        <Menu.Item to={routes.toRealms} primaryText="Realms" leftIcon={<AccountBalanceIcon />} />
        <Menu.Item to={routes.toModificators} primaryText="Modificatores" leftIcon={<AutoFixHighIcon />} />
        <Menu.Item to={routes.toGameVariables} primaryText="Game Variables" leftIcon={<ExtensionIcon />} />
    </Menu>
);
