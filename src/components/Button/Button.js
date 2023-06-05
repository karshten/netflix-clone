import React from "react";
import './button.css'

export const Button = ({children, className, ...props}) => {
  return <button className={`primary-button ${className}`} {...props}>{children}</button>;
};
