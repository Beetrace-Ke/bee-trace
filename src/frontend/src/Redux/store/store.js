import { configureStore } from "@reduxjs/toolkit";
import CreateUserProfile from "../slice/CreateSlice";
import CreateInvestorProfile from "../slice/CreateInvestorSlice";
import GetAllPropertySlice from "../slice/AllPropertySlice";
import GetOnePropertySlice from "../slice/GetOneSlice";
import PaySlice from "../slice/PaySlice";
import getMyPropertySlice from "../slice/MyPropertySlice";
import MyBookingSlice from "../slice/MyBookingSlice";
import BookByPropertySlice from "../slice/BookByPropertySlice";
import BeekeeperSlice from "../slice/BeekeeperSlice";
import InvestorSlice from "../slice/InvestorSlice";
import CreateHive from "../slice/CreateHiveSlice";
import CreateHoneyBatch from "../slice/CreateHoneyBatchSlice";
import CreateInvestment from "../slice/CreateInvestmentSlice";
import GetMyHives from "../slice/GetMyHivesSlice";

const store = configureStore({
  reducer: {
    CreateUserProfile: CreateUserProfile,
    CreateInvestorProfile: CreateInvestorProfile,
    GetAllProperty: GetAllPropertySlice,
    getMyProperty: getMyPropertySlice,
    GetOneProperty: GetOnePropertySlice,
    Pay: PaySlice,
    MyBooking: MyBookingSlice,
    BookByProperty: BookByPropertySlice,
    beekeeper: BeekeeperSlice,
    investor: InvestorSlice,
    CreateHive: CreateHive,
    CreateHoneyBatch: CreateHoneyBatch,
    CreateInvestment: CreateInvestment,
    GetMyHives: GetMyHives,
  },
});

export default store;
