import { observer } from "mobx-react-lite";
import { stores } from "../../../store";
import { routes } from "../../../common/constants";
import { Navigate } from "react-router-dom";

const globalState = stores.globalState;

export const AuthenticatedAccess = observer(({ redirect = routes.login, children }) => {
    if (globalState.user.isAuthenticated) {
        return children;
    }

    return <Navigate to={redirect} replace={true} />;
});
