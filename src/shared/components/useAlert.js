import React, { useState, useEffect } from "react";

const useAlert = (error) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let timer1 = setTimeout(() => setIsOpen(false), 5000);
    if (error) {
      setIsOpen(true);
    }
    return () => {
      clearTimeout(timer1);
    };
  }, [error]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return { isOpen, handleClose };
};

export default useAlert;
