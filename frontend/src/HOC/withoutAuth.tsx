import useUser from "@/hook/userUser";
import { ComponentType, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface WithoutAuthProps {}

export default function withoutAuth<T extends WithoutAuthProps>(
    WrappedComponent: ComponentType<T>
) {
    const ComponentWithAuth = (props: T) => {
        const { isAuth } = useUser();
        const navigate = useNavigate();

        useEffect(() => {
            if (isAuth) {
                navigate("/");
            }
        }, [isAuth, navigate]);

        if (!isAuth) {
            return <WrappedComponent {...props} />;
        }

        return <div>Loading...</div>;
    };
    return ComponentWithAuth;
}
