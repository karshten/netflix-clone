import React from "react";
import { Button } from "../../components/Button/Button";
import banner from '../../assets/images/banner.jpg'
import './notfound.css'
import { PATH } from "../../constants/constants";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate(PATH.home);    
  }

  return (
     <div
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)),
          url(${banner})
        `
      }} 
      className="background-attached notfound"
    >
      <div className="container notfound__content">
        <h1 className="notfound__title title">
          Lost your way?
        </h1>
        <p className="notfound__description description">
          Sorry, we can't find that page. You'll find lots to explore on the home page. 
        </p>

        <Button onClick={handleNavigateHome} className="notFound__btn">Netflix Home</Button>
      </div>
    </div>
  );
};
