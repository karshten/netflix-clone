import React, { useState } from "react";
import banner from '../../assets/images/banner.jpg'
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { setEmail } from "../../features/auth";
import cross from '../../assets/icons/cross.svg'
import { validateEmail } from "../../helpers/validate";
import './guest.css';


const invalidEmailMsg = 'Please enter a valid email address';

export const Guest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tmpEmail } = useSelector(state => state.auth);
  const [error, setError] = useState('');

  const handleLogIn = (e) => {
    e.preventDefault();
    if (error) return;

    navigate(PATH.login);
  }

  const handleChangeEmail = (e) => {
    dispatch(setEmail(e.target.value));
  }

  const handleValidate = () => {
    if (!validateEmail(tmpEmail)) {
      setError(invalidEmailMsg);
      return;
    }
    setError('');
  }

  return (
    <div
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)),
          url(${banner})
        `
      }} 
      className="background-attached"
    >
      <div className="container guest__content">
        <h1 className="guest__title">Unlimited movies, TV shows, and more</h1>
        <h3 className="guest__description">Watch anywhere. Cancel anytime.</h3>
        <p className="guest__join-text">Ready to watch? Enter your email to create or restart your membership.</p>

       <form onSubmit={handleLogIn} className="guest__form">
          <div className="guest__input-container">
            <input 
              id="guest_email"
              className="guest__input"
              placeholder="Email address"
              onChange={handleChangeEmail}
              onBlur={handleValidate}
            />
            {!!error && <label htmlFor="guest_email" className="guest__email-error">
              <img src={cross} alt='error'/>
              {error}
            </label>}
          </div>
          <Button className="guest__btn">Get started</Button>
       </form>
      </div>
    </div>
  );
};
