import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBeeKeeperByOwner } from "../../Redux/action/GetBeeKeeperByOwner";
import { Notification } from "@/components/utils/Notifications";
import BeeKeeperDashboard from "./BeeKeeperDashboard";
import BeeKeeperSignUp from "../../components/Mycomponent/CreateBeekeeperProfile";
import Loader from "@/components/utils/Loader";

const BeeKeeper = () => {
  const dispatch = useDispatch();

  // Get state from Redux store
  const { beeKeeper, loading, error } = useSelector((state) => state.beekeeper);

  const fetchBeeKeeper = () => {
    dispatch(getBeeKeeperByOwner());
  };

  useEffect(() => {
    fetchBeeKeeper();
  }, []);

  return (
    <>
      <Notification />
      {!loading ? (
        beeKeeper?.firstName ? (
          <main>
            <BeeKeeperDashboard beeKeeper={beeKeeper} />
          </main>
        ) : (
          <BeeKeeperSignUp fetchBeeKeeper={fetchBeeKeeper} />
        )
      ) : (
        <Loader />
      )}
    </>
  );
};

export default BeeKeeper;
