import useUser from "@/hook/useUser";
import { ComponentType, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface WithAuthProps {}

export default function withAuth<T extends WithAuthProps>(
    WrappedComponent: ComponentType<T>
) {
    const ComponentWithAuth = (props: T) => {
        const { isAuth } = useUser();
        const navigate = useNavigate();

        useEffect(() => {
            if (!isAuth) {
                navigate("/login");
            }
        }, [isAuth, navigate]);

        if (isAuth) {
            return <WrappedComponent {...props} />;
        }

        return <div>Loading...</div>;
    };
    return ComponentWithAuth;
}
