import { useState } from "react";

const useDrawer = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const DrawerToogle = () => {
    setOpen(!open);
  };

  return { open, handleDrawerOpen, handleDrawerClose, DrawerToogle };
};

export default useDrawer;
