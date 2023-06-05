import React, { useRef, useState } from "react";
import { Button } from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../../constants/constants";
import banner from '../../assets/images/banner.jpg';
import { useDispatch, useSelector } from "react-redux";
import { login, setEmail } from "../../features/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { formatAuthError } from "../../helpers/formaters";
import './auth.css';


export const SignUpModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tmpEmail } = useSelector(state => state.auth);
  const password = useRef('');
  const displayName = useRef('');
  const [error, setError] = useState(null);

  const handleChangeEmail = (e) => {
    dispatch(setEmail(e.target.value));
    setError('');
  }

  const handleChange = (e, ref) => {
    ref.current = e.target.value;
    setError('');
  }
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    
    try {
      const response = await createUserWithEmailAndPassword(auth, tmpEmail, password.current);
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
        <h1 className="modal__title">Sign up</h1>
        {!!error && <h4 className="error">{error}</h4>}
        <form onSubmit={handleSignUp} className="modal__form">
          <input
            className="modal__input"
            placeholder="Name"
            onChange={e => handleChange(e, displayName)}
          />

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
            onChange={e => handleChange(e, password)}
          />

          <Button className="modal__submit-btn">Sign up</Button>
        </form>
        <p className="modal__authText">
          Already have an account? <Link to={PATH.login}>Sign in here.</Link>
        </p>
      </div>
    </div>
  );
};
