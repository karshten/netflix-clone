import { useLayoutEffect } from "react";
import { auth } from "../firebase/config";
import { useDispatch } from "react-redux";
import { login, logout } from "../features/auth";
import { useNavigate } from "react-router-dom";

export const useUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const unsub = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(login(authUser));
      } else {
        dispatch(logout());
      };
    })

    return unsub;
  }, [dispatch, navigate]);
}