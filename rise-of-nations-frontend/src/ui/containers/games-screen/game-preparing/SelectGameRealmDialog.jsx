import React from "react";
import { Dialog, DialogTitle, List, ListItem, ListItemText } from "@mui/material";
import { observer } from "mobx-react-lite";
import { stores } from "../../../../store";
import { gamePreparingScreen } from "../../../../common/localization";

const userStore = stores.user;
const gameInfoStore = stores.globalGameInfo;

export const SelectGameRealmDialog = observer(({ isOpen, onClose }) => {
    const handleClose = () => {
        onClose(null);
    };

    return (
        <Dialog onClose={handleClose} open={isOpen}>
            <DialogTitle>{gamePreparingScreen.playerBox.actions.selectRealm}</DialogTitle>
            <List sx={{ width: 500, pt: 0 }}>
                {userStore.userRealms.map((realm) => {
                    const modificator = gameInfoStore.getModificator(realm.modificatorId);
                    return (
                        <ListItem key={realm.id} button onClick={() => onClose(realm)}>
                            <ListItemText
                                primary={realm.name}
                                secondary={`${modificator.name}. ${modificator.description}`}
                            />
                        </ListItem>
                    );
                })}
            </List>
        </Dialog>
    );
});
