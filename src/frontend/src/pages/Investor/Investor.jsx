import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvestorByOwner } from "@/Redux/action/GeInvestorByOwner";
import { Notification } from "@/components/utils/Notifications";
import InvestorDashboard from "./InvestorDashboard";
import InvestorSignup from "../../components/Mycomponent/CreateInvestorProfile";
import Loader from "@/components/utils/Loader";

const Investor = () => {
  const dispatch = useDispatch();

  // Get state from Redux store
  const { investor, loading, error } = useSelector((state) => state.investor);

  const fetchInvestor = () => {
    dispatch(getInvestorByOwner());
  };

  useEffect(() => {
    fetchInvestor();
  }, []);

  return (
    <>
      <Notification />
      {!loading ? (
        investor?.firstName ? (
          <main>
            <InvestorDashboard investor={investor} />
          </main>
        ) : (
          <InvestorSignup fetchInvestor={fetchInvestor} />
        )
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Investor;