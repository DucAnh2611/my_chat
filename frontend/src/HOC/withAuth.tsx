import useUser from "@/hook/userUser";
import { ComponentType, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface WithAuthProps {}

export default function withAuth<T extends WithAuthProps>(
    WrappedComponent: ComponentType<T>
) {
    const ComponentWithAuth = (props: T) => {
        const { isAuth } = useUser(); // Get authentication status from the UserContext
        const navigate = useNavigate();

        useEffect(() => {
            if (!isAuth) {
                navigate("/login");
            }
        }, [isAuth, navigate]);

        if (isAuth) {
            return <WrappedComponent {...props} />;
        }

        // Optionally show a loading spinner or fallback UI while checking auth status
        return <div>Loading...</div>;
    };
    return ComponentWithAuth;
}
