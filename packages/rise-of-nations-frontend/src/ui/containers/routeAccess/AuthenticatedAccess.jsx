import { observer } from "mobx-react-lite";
import { stores } from "../../../store";
import { routes } from "../../../common/constants";
import { Navigate } from "react-router-dom";

const userStore = stores.user;

export const AuthenticatedAccess = observer(({ redirect = routes.login, children }) => {
    if (userStore.user.isAuthenticated) {
        return children;
    }

    return <Navigate to={redirect} replace={true} />;
});
