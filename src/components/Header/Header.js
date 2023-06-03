import React, { useEffect, useState } from "react";
import './header.css';
import { Logo } from "../Logo/Logo";
import { Avatar } from "../Avatar/Avatar";
import { AnimatePresence, motion } from "framer-motion";

const headerHeight = 100;

export const Header = () => {
  const [isHeaderShow, setIsHeaderShow] = useState(true);

  useEffect(() => {

    const handler = () => {

      const isOpen = window.pageYOffset === 0;

      setIsHeaderShow(isOpen);

    }

    window.addEventListener('scroll', handler);

    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <AnimatePresence>
      {isHeaderShow && (
         <motion.header 
          className="header"
          initial={{opacity: 0, translateY: -headerHeight}}
          animate={{opacity: 1, translateY: 0}}
          exit={{opacity: 0, translateY: -headerHeight}}
          transition={{duration: .3}}
         >
          <nav className="header__nav container">
            <Logo/>

            <Avatar/>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
};
