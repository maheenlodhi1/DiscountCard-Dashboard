import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCurrentUser, login } from "@/features/auth/authApi";
import { useEffect } from "react";
import { useRouter } from "next/router";

import {
  getAuthError,
  getAuthLoading,
  getIsLoggedIn,
} from "@/features/auth/authSlice";

import LoginForm from "@/components/LoginForm";
import AuthLayout from "@/layouts/AuthLayout";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const loading = useSelector(getAuthLoading);
  const error = useSelector(getAuthError);

  const handleLogin = (values) => {
    dispatch(login(values));
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token && !isLoggedIn) {
      dispatch(getCurrentUser());
    }

    if (token && isLoggedIn) router.replace("/app");
  }, [isLoggedIn, router, dispatch]);

  return (
    <AuthLayout>
      <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Admin Login
      </h2>

      <LoginForm loading={loading} error={error} onLogin={handleLogin} />
    </AuthLayout>
  );
}
