import { useLayoutEffect } from "react";
import { auth } from "../firebase/config";
import { useDispatch } from "react-redux";
import { login, logout } from "../features/auth";

export const useUser = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const unsub = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(login(authUser));
      } else {
        dispatch(logout());
      };
  }, [])

    return unsub;
  }, [dispatch]);
}