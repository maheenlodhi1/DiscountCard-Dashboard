import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "@/features/auth/authApi";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getIsLoggedIn } from "@/features/auth/authSlice";
import SpinnerLarge from "@/components/Loaders/Spinner/SpinnerLarge";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);

  useEffect(() => {
    const token = localStorage.getItem("accessToken") || "";
    if (!token) router.replace("/auth/login");

    if (token && !isLoggedIn) {
      dispatch(getCurrentUser());
    }
    if (token && isLoggedIn) {
      router.replace("/app");
    }
  }, [isLoggedIn, router, dispatch]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <SpinnerLarge />
    </div>
  );
}
