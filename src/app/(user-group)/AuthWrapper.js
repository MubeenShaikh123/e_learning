"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setUser } from "@/lib/features/user/userSlice";

export default function AuthWrapper({ user, children }) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log("AuthWrapper called");
    if (user) {
      dispatch(setUser({
        name: user.name,
        email: user.email,
        image: user.image,
        id: user._id || user.id,
      }));
    } else {
      router.push("/auth/login");
    }
  }, [user]);

  return <>{children}</>;
}
