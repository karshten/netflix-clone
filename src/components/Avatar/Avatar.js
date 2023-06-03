import React from "react";
import avatar from '../../assets/images/default_avatar.avif'
import './avatar.css';

export const Avatar = () => {

  return (
    <div className="avatar">
      <img className="avatar__img" src={avatar} alt="avatar"/>
    </div>
  );
};
