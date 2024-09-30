import { Navigate } from "react-router-dom";
// import { TUser } from "../../Types/TUser"
import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { TUserState } from "../../Store/UserSlice";

type TRouteGuard = {
    children: React.ReactNode,
    // user: TUser,
    bizOnly?: boolean,
    adminOnly?: boolean,
};

const RouteGuard = (props: TRouteGuard) => {
    // const { children, user } = props;
    const { children, bizOnly, adminOnly } = props;
    const userState = useSelector((state: TRootState) => state.UserSlice) as TUserState;
    const user = userState.user!;

    if (!userState.isLoggedIn) {
        return <Navigate to="/login" />
    };

    if (bizOnly && !user.isBusiness) {
        return <Navigate to="/" />
    };

    if (adminOnly && !user.isAdmin) {
        return <Navigate to="/" />
    };

    return <>{children}</>;

    // return user ? <> {children} </> : <Navigate to={"/"} />

};

export default RouteGuard;