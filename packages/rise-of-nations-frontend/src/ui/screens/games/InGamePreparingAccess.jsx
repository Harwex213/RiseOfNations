import { observer } from "mobx-react-lite";
import { stores } from "../../../store";
import { Navigate } from "react-router-dom";
import { gameConstants, routes } from "../../../common/constants";

const gameStore = stores.currentGame;
const gameStatuses = gameConstants.statuses;

export const InGamePreparingAccess = observer(({ children }) => {
    if (gameStore.isInGame === false) {
        return <Navigate to=".." replace={true} />;
    }

    if (gameStore.info.status === gameStatuses.preparing) {
        return children;
    }

    return <Navigate to={routes.game} replace={true} />;
});
