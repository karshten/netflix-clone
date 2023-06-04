import React, { useRef, useState } from "react";
import './select.css'
import { Arrow } from "../Arrow/Arrow";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../../hooks/useOutSideClick";


export const Select = ({options, label, changeOption}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const handleToggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const handleChangeOption = (option) => {
    handleToggleMenu();
    changeOption(option);
  }

  const closeSelect = () => {
    setIsOpen(false);
  };

  useOutsideClick(selectRef, closeSelect, isOpen);

  return (
    <div className="select">
      <div onClick={handleToggleMenu} className={`toggle ${isOpen ? 'open' : ''}`}>
        {label} <Arrow direction={isOpen ? 'up' : 'down'}/>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ translateY: -10, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: -10, opacity: 0 }}
            transition={{ duration: .3 }}
            className='select__menu'
          >
            <ul>
              {!!options.length && options.map(option => (
                <li
                  className="select__item"
                  onClick={() => handleChangeOption(option)}
                  key={option.title}
                >{option.title}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
