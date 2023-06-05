import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import banner from '../../assets/images/banner.jpg';
import { login, setEmail } from "../../features/auth";
import { Button } from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../../constants/constants";
import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { formatAuthError } from "../../helpers/formaters";
import './auth.css';


export const SignInModal = () => {
  const { tmpEmail } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = useRef('');
  
  const [error, setError] = useState(null);

  const handleChangeEmail = (e) => {
    dispatch(setEmail(e.target.value));
    setError('');
  }

  const handleChangePassword = (e) => {
    password.current = e.target.value;
    setError('');
  }
  
  const handleSignIn = async (e) => {
    e.preventDefault();

    if (tmpEmail.length === 0 || password.current.length === 0) {
      setError('Please fill all these fields');
      return;
    }

    try {
      const response = await signInWithEmailAndPassword(auth, tmpEmail, password.current);
      dispatch(login(response));

      navigate(PATH.home);
    } catch (err) {
      setError(formatAuthError(err));
    }
  }

  return (
    <div
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)),
          url(${banner})
        `
      }} 
      className="signIn"
    >
      <div className="modal">
        <h1 className="modal__title">Sign in</h1>
        {error && <h4 className="error">{error}</h4>}
        <form onSubmit={handleSignIn} className="modal__form">
          <input
            className="modal__input"
            type="email"
            placeholder="Email address"
            value={tmpEmail}
            onChange={handleChangeEmail}
          />

          <input
            className="modal__input"
            type="password"
            placeholder="password"
            onChange={handleChangePassword}
          />

          <Button className="modal__submit-btn">Sign in</Button>
        </form>
        <p className="modal__authText">
          New to Netflix? <Link to={PATH.signUp}>Sign up now.</Link>
        </p>
      </div>
    </div>
  );
};
