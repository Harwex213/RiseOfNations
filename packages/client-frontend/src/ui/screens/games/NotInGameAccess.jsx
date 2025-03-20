import { observer } from "mobx-react-lite";
import { stores } from "../../../store";
import { Navigate } from "react-router-dom";
import { gameConstants, routes } from "../../../common/constants";

const gameStore = stores.currentGame;
const gameStatuses = gameConstants.statuses;

export const NotInGameAccess = observer(({ children }) => {
    if (gameStore.isInGame === false) {
        return children;
    }

    if (gameStore.info.status === gameStatuses.preparing) {
        return <Navigate to={routes.gamesNested.preparing} replace={true} />;
    }

    return <Navigate to={routes.game} replace={true} />;
});
