import { observer } from "mobx-react-lite";
import { stores } from "../../../store";
import { routes } from "../../../common/constants";
import { Navigate } from "react-router-dom";

const globalState = stores.globalState;

export const OnlyGuestAccess = observer(({ redirect = routes.profile, children }) => {
    if (globalState.user.isAuthenticated) {
        return <Navigate to={redirect} replace={true} />;
    }

    return children;
});
