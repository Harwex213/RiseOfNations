import * as React from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import PersonIcon from "@mui/icons-material/Person";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { menu } from "../../../common/localization";
import { observer } from "mobx-react-lite";
import { stores } from "../../../store";
import { routes } from "../../../common/constants";
import { useLocation, useNavigate } from "react-router-dom";

const globalState = stores.globalState;

const PlayerMenu = observer(({ navigate, currentPath }) => (
    <>
        <MenuItem selected={currentPath.includes(routes.games)} onClick={() => navigate(routes.games)}>
            <ListItemIcon>
                <PlayCircleFilledIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{menu.menuItems.games}</ListItemText>
        </MenuItem>
        <MenuItem selected={currentPath.includes(routes.profile)} onClick={() => navigate(routes.profile)}>
            <ListItemIcon>
                <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{menu.menuItems.profile}</ListItemText>
        </MenuItem>
        <MenuItem selected={currentPath.includes(routes.realms)} onClick={() => navigate(routes.realms)}>
            <ListItemIcon>
                <AccountBalanceIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{menu.menuItems.realms}</ListItemText>
        </MenuItem>
    </>
));

const GuestMenu = observer(({ navigate, currentPath }) => (
    <>
        <MenuItem selected={currentPath.includes(routes.games)} onClick={() => navigate(routes.games)}>
            <ListItemIcon>
                <PlayCircleFilledIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{menu.menuItems.games}</ListItemText>
        </MenuItem>
        <MenuItem selected={currentPath.includes(routes.login)} onClick={() => navigate(routes.login)}>
            <ListItemIcon>
                <PersonSearchIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{menu.menuItems.login}</ListItemText>
        </MenuItem>
        <MenuItem
            selected={currentPath.includes(routes.registration)}
            onClick={() => navigate(routes.registration)}
        >
            <ListItemIcon>
                <PersonAddIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{menu.menuItems.registration}</ListItemText>
        </MenuItem>
    </>
));

export const Menu = observer(() => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <Paper sx={{ width: "100%", height: "100%" }}>
            <Typography
                variant="h5"
                sx={{
                    paddingTop: 1,
                    textAlign: "center",
                }}
                color="primary.main"
            >
                {menu.mainTitle}
            </Typography>
            <MenuList>
                {globalState.user.isAuthenticated ? (
                    <PlayerMenu navigate={navigate} currentPath={location.pathname} />
                ) : (
                    <GuestMenu navigate={navigate} currentPath={location.pathname} />
                )}
            </MenuList>
        </Paper>
    );
});
