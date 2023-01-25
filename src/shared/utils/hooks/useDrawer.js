import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../../../store/actions/drawerActions";

const useDrawer = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.drawer.drawerState);

  const DrawerToogle = useCallback(() => {
    dispatch(toggleDrawer());
  }, [dispatch]);

  return {
    open,
    DrawerToogle,
  };
};

export default useDrawer;
