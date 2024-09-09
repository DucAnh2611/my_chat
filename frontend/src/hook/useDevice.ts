import { useEffect, useState } from "react";

// Define breakpoints for device types
const breakpoints = {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
};

type DeviceType = "mobile" | "tablet" | "desktop" | "largeDesktop";

const useDeviceType = (): DeviceType => {
    const [deviceType, setDeviceType] = useState<DeviceType>("desktop");

    const handleResize = () => {
        const width = window.innerWidth;

        if (width <= breakpoints.mobile) {
            setDeviceType("mobile");
        } else if (width <= breakpoints.tablet) {
            setDeviceType("tablet");
        } else if (width <= breakpoints.desktop) {
            setDeviceType("desktop");
        } else {
            setDeviceType("largeDesktop");
        }
    };

    useEffect(() => {
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return deviceType;
};

export default useDeviceType;
