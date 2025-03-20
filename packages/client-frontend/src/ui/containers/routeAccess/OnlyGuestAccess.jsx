import { observer } from "mobx-react-lite";
import { stores } from "../../../store";
import { routes } from "../../../common/constants";
import { Navigate } from "react-router-dom";

const userStore = stores.user;

export const OnlyGuestAccess = observer(({ redirect = routes.profile, children }) => {
    if (userStore.user.isAuthenticated) {
        return <Navigate to={redirect} replace={true} />;
    }

    return children;
});
