import { Principal } from "@dfinity/principal";

// Beekeeper functions
const createBeekeeperProfile = async (beekeeperPayload) => {
  console.log("Creating beekeeper profile with payload:", beekeeperPayload);
  return await window.canister.BeeTraceCanister.createBeekeeperProfile(
    beekeeperPayload
  );
};

const getBeeKeeperProfileByOwner = async () => {
  return await window.canister.BeeTraceCanister.getBeeKeeperProfileByOwner();
};

const getUser = async (userId) => {
  return await window.canister.BeeTraceCanister.getUser(userId);
};

const listUsers = async () => {
  return await window.canister.BeeTraceCanister.listUsers();
};

const getBeekeeperByUserId = async (userId) => {
  return await window.canister.BeeTraceCanister.getBeekeeperByUserId(userId);
};

//Investor functions
const createInvestorProfile = async (investorPayload) => {
  return await window.canister.BeeTraceCanister.createInvestorProfile(
    investorPayload
  );
};

const getInvestorProfileByOwner = async () => {
  return await window.canister.BeeTraceCanister.getInvestorProfileByOwner();
};

// Hive functions
const createHive = async (hivePayload) => {
  return await window.canister.BeeTraceCanister.createHive(hivePayload);
};

const getHive = async (hiveId) => {
  return await window.canister.BeeTraceCanister.getHive(hiveId);
};

const listHives = async () => {
  return await window.canister.BeeTraceCanister.listHives();
};

const getHivesByBeekeeper = async (beekeeperId) => {
  return await window.canister.BeeTraceCanister.getHivesByBeekeeper(
    beekeeperId
  );
};

// Honey batch functions
const createHoneyBatch = async (honeyBatchPayload) => {
  return await window.canister.BeeTraceCanister.createHoneyBatch(
    honeyBatchPayload
  );
};

const getHoneyBatch = async (batchId) => {
  return await window.canister.BeeTraceCanister.getHoneyBatch(batchId);
};

const listHoneyBatches = async () => {
  return await window.canister.BeeTraceCanister.listHoneyBatches();
};

// Carbon credit functions
const createCarbonCredit = async (carbonCreditPayload) => {
  return await window.canister.BeeTraceCanister.createCarbonCredit(
    carbonCreditPayload
  );
};

const listCarbonCredits = async () => {
  return await window.canister.BeeTraceCanister.listCarbonCredits();
};

// Investment functions
const createInvestment = async (investmentPayload) => {
  return await window.canister.BeeTraceCanister.createInvestment(
    investmentPayload
  );
};

const listInvestments = async () => {
  return await window.canister.BeeTraceCanister.listInvestments();
};

const getInvestmentsByHive = async (hiveId) => {
  return await window.canister.BeeTraceCanister.getInvestmentsByHive(hiveId);
};

export {
  createBeekeeperProfile,
  getBeeKeeperProfileByOwner,
  createInvestorProfile,
  getInvestorProfileByOwner,
  getUser,
  listUsers,
  getBeekeeperByUserId,
  createHive,
  getHive,
  listHives,
  getHivesByBeekeeper,
  createHoneyBatch,
  getHoneyBatch,
  listHoneyBatches,
  createCarbonCredit,
  listCarbonCredits,
  createInvestment,
  listInvestments,
  getInvestmentsByHive,
};
