import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withRouteProtect = (WrappedComponent) => {
  return function RouteProtect(props) {
    const router = useRouter();
    const [isAvailable, setIsAvailable] = useState(true);

    useEffect(() => {
      if (!window.localStorage.getItem("accessToken")) {
        router.replace("/");
        setIsAvailable(false);
      }
    }, [router]);

    return isAvailable ? <WrappedComponent {...props} /> : null;
  };
};

export default withRouteProtect;
