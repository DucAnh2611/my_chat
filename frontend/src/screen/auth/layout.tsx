import withoutAuth from "@/HOC/withoutAuth";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <Outlet />
        </div>
    );
}

const AuthLayout = withoutAuth(Layout);
export default AuthLayout;
