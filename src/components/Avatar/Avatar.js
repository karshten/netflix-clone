import React from "react";
import avatar from '../../assets/images/default_avatar.avif'
import './avatar.css';
import { Button } from "../Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../constants/constants";
import { useSelector } from "react-redux";

export const Avatar = () => {
  const navigate = useNavigate();
  const {user} = useSelector(state => state.auth);
  const { pathname } = useLocation()

  if (pathname === PATH.login || pathname === PATH.signUp) return null;

  const handleLogIn = (e) => {
    navigate(PATH.login);
  }

  return (
    <div className="avatar">
      {user ? <img className="avatar__img" src={avatar} alt="avatar"/> : <Button onClick={handleLogIn}>Sign in</Button>}
    </div>
  );
};
