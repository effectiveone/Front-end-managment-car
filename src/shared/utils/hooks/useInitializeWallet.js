import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeWallet } from "../../../store/actions/walletActions";

export const useInitializeWallet = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser && localUser.mail) {
      dispatch(initializeWallet(localUser.mail));
    }
  }, [dispatch]);
};
