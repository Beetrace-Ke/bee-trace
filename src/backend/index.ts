/**
 * @file BeeTrace Canister - Decentralized Beekeeping Platform (Refactored)
 * @description A comprehensive beekeeping management system on the Internet Computer
 * handling honey traceability, hive management, carbon credits, and tokenized crowdfunding
 */

import {
  Canister,
  Err,
  Ok,
  Principal,
  Record,
  Result,
  StableBTreeMap,
  Variant,
  Vec,
  ic,
  nat64,
  query,
  update,
  text,
  Null,
  Opt,
  None,
  Some,
  float64,
  bool,
} from "azle/experimental";
import { fi } from "date-fns/locale";
import { v4 as uuidv4 } from "uuid";

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Hive Status Variant
 */
const HiveStatus = Variant({
  Active: text,
  Inactive: text,
  Maintenance: text,
});

type HiveStatus = typeof HiveStatus.tsType;

/**
 * Batch Quality Variant
 */
const BatchQuality = Variant({
  Premium: text,
  Standard: text,
  Organic: text,
});

type BatchQuality = typeof BatchQuality.tsType;

/**
 * Beekeeper Status Enum
 */
const BeekeeperStatus = Variant({
  Active: text,
  Inactive: text,
  Suspended: text,
  PendingVerification: text,
});

type BeekeeperStatus = typeof BeekeeperStatus.tsType;

/**
 * Investor Status Enum
 */
const InvestorStatus = Variant({
  Active: text,
  Inactive: text,
  Suspended: text,
  PendingKYC: text,
});

type InvestorStatus = typeof InvestorStatus.tsType;

/**
 * Investment Status Enum
 */
const InvestmentStatus = Variant({
  Active: text,
  Completed: text,
  Withdrawn: text,
  Pending: text,
});

type InvestmentStatus = typeof InvestmentStatus.tsType;

/**
 * Verification Status Enum
 */
const VerificationStatus = Variant({
  Pending: text,
  Approved: text,
  Rejected: text,
});

type VerificationStatus = typeof VerificationStatus.tsType;

/**
 * Beekeeper Profile Struct
 */
const BeekeeperProfile = Record({
  id: text,
  owner: Principal,
  firstName: text,
  lastName: text,
  email: text,
  phoneNumber: text,
  county: text,
  location: text,
  yearsOfExperience: nat64,
  totalHives: nat64,
  totalBatches: nat64,
  totalHoneyProduced: float64, // in kg
  reputationScore: nat64, // 0-100
  certifications: Vec(text),
  status: BeekeeperStatus,
  verified: bool,
  hives: Vec(text), // Array of hive IDs
  createdAt: text,
  updatedAt: text,
});

type BeekeeperProfile = typeof BeekeeperProfile.tsType;

/**
 * Investor Profile Struct
 */
const InvestorProfile = Record({
  id: text,
  owner: Principal,
  firstName: text,
  lastName: text,
  email: text,
  phoneNumber: text,
  location: text,
  investorType: text, // "Individual", "Institution", "Fund"
  totalInvestments: nat64,
  totalInvested: float64, // Total amount invested in $BEE tokens
  activeInvestments: nat64,
  kycCompleted: bool,
  investments: Vec(text), // Array of investment IDs
  createdAt: text,
  updatedAt: text,
});

type InvestorProfile = typeof InvestorProfile.tsType;

/**
 * Hive Record Type
 */
const Hive = Record({
  id: text,
  beekeeperId: text,
  beekeeper: Principal,
  location: text,
  installationDate: text,
  status: HiveStatus,
  estimatedYield: float64,
  currentInvestment: float64, // in $BEE tokens
  targetInvestment: float64, // in $BEE tokens
  investors: Vec(text), 
  honeyBatches: Vec(text), 
  carbonCredits: Vec(text),
  createdAt: text,
  updatedAt: text,
});

type Hive = typeof Hive.tsType;

/**
 * Honey Batch Record Type
 */
const HoneyBatch = Record({
  id: text,
  hiveId: text,
  beekeeperId: text,
  beekeeper: Principal,
  harvestDate: text,
  quantity: float64, // in kg
  quality: BatchQuality,
  qualityScore: nat64, // 0-100
  location: text,
  verificationStatus: VerificationStatus,
  verifierId: Opt(text),
  nftTokenId: Opt(text),
  pricePerKg: Opt(float64),
  createdAt: text,
  updatedAt: text,
});

type HoneyBatch = typeof HoneyBatch.tsType;

/**
 * Carbon Credit Record Type
 */
const CarbonCredit = Record({
  id: text,
  hiveId: text,
  beekeeperId: text,
  beekeeper: Principal,
  pollinationArea: float64, // in hectares
  carbonOffset: float64, // in tons CO2
  issueDate: text,
  expiryDate: text,
  verificationStatus: VerificationStatus,
  verifierId: Opt(text),
  nftTokenId: Opt(text),
  pricePerTon: Opt(float64),
  createdAt: text,
  updatedAt: text,
});

type CarbonCredit = typeof CarbonCredit.tsType;

/**
 * Investment Record Type
 */
const Investment = Record({
  id: text,
  investorId: text,
  investor: Principal,
  hiveId: text,
  beekeeperId: text,
  amount: float64, // in $BEE tokens
  investmentDate: text,
  expectedReturn: float64, // percentage
  actualReturn: Opt(float64), // actual return when completed
  status: InvestmentStatus,
  maturityDate: Opt(text),
  createdAt: text,
  updatedAt: text,
});

type Investment = typeof Investment.tsType;

// ============================================================================
// Message Responses
// ============================================================================

const Message = Variant({
  Success: text,
  Error: text,
  NotFound: text,
  InvalidPayload: text,
  Unauthorized: text,
  AlreadyExists: text,
  InsufficientFunds: text,
  SystemError: text,
});

type Message = typeof Message.tsType;

// ============================================================================
// Payload Definitions
// ============================================================================

/**
 * Beekeeper Profile Payload
 */
const BeekeeperProfilePayload = Record({
  firstName: text,
  lastName: text,
  email: text,
  phoneNumber: text,
  county: text,
  location: text,
  yearsOfExperience: nat64,
  certifications: Vec(text),
});

type BeekeeperProfilePayload = typeof BeekeeperProfilePayload.tsType;

/**
 * Investor Profile Payload
 */
const InvestorProfilePayload = Record({
  firstName: text,
  lastName: text,
  email: text,
  phoneNumber: text,
  location: text,
  investorType: text,
});

type InvestorProfilePayload = typeof InvestorProfilePayload.tsType;

/**
 * Hive Creation Payload
 */
const HivePayload = Record({
  location: text,
  installationDate: text,
  estimatedYield: float64,
  targetInvestment: float64,
});

type HivePayload = typeof HivePayload.tsType;

/**
 * Honey Batch Creation Payload
 */
const HoneyBatchPayload = Record({
  hiveId: text,
  harvestDate: text,
  quantity: float64,
  quality: BatchQuality,
  qualityScore: nat64,
  location: text,
  pricePerKg: Opt(float64),
});

type HoneyBatchPayload = typeof HoneyBatchPayload.tsType;

/**
 * Carbon Credit Creation Payload
 */
const CarbonCreditPayload = Record({
  hiveId: text,
  pollinationArea: float64,
  carbonOffset: float64,
  issueDate: text,
  expiryDate: text,
  pricePerTon: Opt(float64),
});

type CarbonCreditPayload = typeof CarbonCreditPayload.tsType;

/**
 * Investment Creation Payload
 */
const InvestmentPayload = Record({
  hiveId: text,
  amount: float64,
  expectedReturn: float64,
  maturityDate: Opt(text),
});

type InvestmentPayload = typeof InvestmentPayload.tsType;

// ============================================================================
// Storage
// ============================================================================

const beekeepersStorage = StableBTreeMap<text, BeekeeperProfile>(0);
const investorsStorage = StableBTreeMap<text, InvestorProfile>(1);
const hivesStorage = StableBTreeMap<text, Hive>(2);
const honeyBatchesStorage = StableBTreeMap<text, HoneyBatch>(3);
const carbonCreditsStorage = StableBTreeMap<text, CarbonCredit>(4);
const investmentsStorage = StableBTreeMap<text, Investment>(5);

// ============================================================================
// Helper Functions
// ============================================================================

function generateId(): string {
  return uuidv4();
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidName(name: string): boolean {
  return name.length >= 2 && name.length <= 50 && /^[a-zA-Z\s-]+$/.test(name);
}

function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

// ============================================================================
// Canister Definition
// ============================================================================

export default Canister({
  /**
   * Creates a new beekeeper profile
   */
  createBeekeeperProfile: update([BeekeeperProfilePayload], Result(BeekeeperProfile, Message), (payload) => {
    try {
      if (typeof payload !== "object" || Object.keys(payload).length === 0) {
        return Err({ InvalidPayload: "Invalid payload provided" });
      }

      if (!isValidName(payload.firstName) || !isValidName(payload.lastName)) {
        return Err({ InvalidPayload: "First and last names must be between 2 and 50 characters" });
      }

      if (!isValidEmail(payload.email)) {
        return Err({ InvalidPayload: "Invalid email format" });
      }

      const principal = ic.caller();
      
      // Check if beekeeper already exists for this principal
      const existingBeekeeper = Array.from(beekeepersStorage.values()).find(
        (beekeeper) => beekeeper.owner.toText() === principal.toText()
      );

      if (existingBeekeeper) {
        return Err({ AlreadyExists: "Beekeeper profile already exists for this principal" });
      }

      // Check if email is already taken
      const emailExists = Array.from(beekeepersStorage.values()).find(
        (beekeeper) => beekeeper.email.toLowerCase() === payload.email.toLowerCase()
      );

      if (emailExists) {
        return Err({ AlreadyExists: `Beekeeper with email ${payload.email} already exists` });
      }

      const timestamp = getCurrentTimestamp();
      const beekeeperId = generateId();

      const newBeekeeper: BeekeeperProfile = {
        id: beekeeperId,
        owner: principal,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        county: payload.county,
        location: payload.location,
        yearsOfExperience: payload.yearsOfExperience,
        totalHives: BigInt(0),
        totalBatches: BigInt(0),
        totalHoneyProduced: 0.0,
        reputationScore: BigInt(50), // Starting reputation
        certifications: payload.certifications,
        status: { PendingVerification: "Awaiting verification" },
        verified: false,
        hives: [],
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      beekeepersStorage.insert(beekeeperId, newBeekeeper);
      return Ok(newBeekeeper);
    } catch (error) {
      return Err({
        SystemError: `Error creating beekeeper profile: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    }
  }),

  /**
   * Creates a new investor profile
   */
  createInvestorProfile: update([InvestorProfilePayload], Result(InvestorProfile, Message), (payload) => {
    try {
      if (typeof payload !== "object" || Object.keys(payload).length === 0) {
        return Err({ InvalidPayload: "Invalid payload provided" });
      }

      if (!isValidName(payload.firstName) || !isValidName(payload.lastName)) {
        return Err({ InvalidPayload: "First and last names must be between 2 and 50 characters" });
      }

      if (!isValidEmail(payload.email)) {
        return Err({ InvalidPayload: "Invalid email format" });
      }

      const principal = ic.caller();
      
      // Check if investor already exists for this principal
      const existingInvestor = Array.from(investorsStorage.values()).find(
        (investor) => investor.owner.toText() === principal.toText()
      );

      if (existingInvestor) {
        return Err({ AlreadyExists: "Investor profile already exists for this principal" });
      }

      // Check if email is already taken
      const emailExists = Array.from(investorsStorage.values()).find(
        (investor) => investor.email.toLowerCase() === payload.email.toLowerCase()
      );

      if (emailExists) {
        return Err({ AlreadyExists: `Investor with email ${payload.email} already exists` });
      }

      const timestamp = getCurrentTimestamp();
      const investorId = generateId();

      const newInvestor: InvestorProfile = {
        id: investorId,
        owner: principal,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        location: payload.location,
        investorType: payload.investorType,
        totalInvestments: BigInt(0),
        totalInvested: 0.0,
        activeInvestments: BigInt(0),
        kycCompleted: false,
        investments: [],
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      investorsStorage.insert(investorId, newInvestor);
      return Ok(newInvestor);
    } catch (error) {
      return Err({
        SystemError: `Error creating investor profile: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    }
  }),

  /**
   * Gets beekeeper profile by owner (caller)
   */
  getBeeKeeperProfileByOwner: query([], Result(BeekeeperProfile, Message), () => {
    try {
      const principal = ic.caller();
      const beekeeper = beekeepersStorage.values().find(
        (b) => b.owner.toText() === principal.toText()
      );

      if (!beekeeper) {
        return Err({ NotFound: "Beekeeper profile not found for this principal" });
      }
      return Ok(beekeeper);
    } catch (error) {
      return Err({
        SystemError: `Error retrieving beekeeper profile: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    }
  }),

  /**
   * Gets investor profile by owner (caller)
   */
  getInvestorProfileByOwner: query([], Result(InvestorProfile, Message), () => {
    try {
      const principal = ic.caller();
      const investor = investorsStorage.values().find(
        (i) => i.owner.toText() === principal.toText()
      );

      if (!investor) {
        return Err({ NotFound: "Investor profile not found for this principal" });
      }
      return Ok(investor);
    } catch (error) {
      return Err({
        SystemError: `Error retrieving investor profile: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    }
  }),

  /**
   * Gets beekeeper profile by ID
   */
  getBeekeeperProfile: query([text], Result(BeekeeperProfile, Message), (beekeeperId) => {
    try {
      const beekeeper = beekeepersStorage.get(beekeeperId);
      if (!beekeeper) {
        return Err({ NotFound: `Beekeeper with ID ${beekeeperId} not found` });
      }
      return Ok(beekeeper);
    } catch (error) {
      return Err({
        SystemError: `Error retrieving beekeeper: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    }
  }),

  /**
   * Lists all beekeepers
   */
  listBeekeepers: query([], Result(Vec(BeekeeperProfile), Message), () => {
    try {
      const beekeepers = beekeepersStorage.values();
      if (beekeepers.length === 0) {
        return Err({ NotFound: "No beekeepers found in the system" });
      }
      return Ok(beekeepers);
    } catch (error) {
      return Err({
        SystemError: `Error listing beekeepers: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    }
  }),

  /**
   * Lists all investors
   */
  listInvestors: query([], Result(Vec(InvestorProfile), Message), () => {
    try {
      const investors = investorsStorage.values();
      if (investors.length === 0) {
        return Err({ NotFound: "No investors found in the system" });
      }
      return Ok(investors);
    } catch (error) {
      return Err({
        SystemError: `Error listing investors: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    }
  }),

  /**
   * Creates a new hive
   */
  createHive: update([HivePayload], Result(Hive, Message), (payload) => {
    try {
      const principal = ic.caller();
      const beekeeper = beekeepersStorage.values().find(
        (b) => b.owner.toText() === principal.toText()
      );

      if (!beekeeper) {
        return Err({ NotFound: "Beekeeper profile not found. Please create a profile first." });
      }

      if (payload.estimatedYield <= 0 || payload.targetInvestment <= 0) {
        return Err({ InvalidPayload: "Estimated yield and target investment must be positive" });
      }

      const timestamp = getCurrentTimestamp();
      const hiveId = generateId();

      const newHive: Hive = {
        id: hiveId,
        beekeeperId: beekeeper.id,
        beekeeper: principal,
        location: payload.location,
        installationDate: payload.installationDate,
        status: { Active: "Operational" },
        estimatedYield: payload.estimatedYield,
        currentInvestment: 0.0,
        targetInvestment: payload.targetInvestment,
        investors: [],
        honeyBatches: [],
        carbonCredits: [],
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      hivesStorage.insert(hiveId, newHive);

      // Update beekeeper's total hives and add hive to their list
      const updatedBeekeeper: BeekeeperProfile = {
        ...beekeeper,
        totalHives: beekeeper.totalHives + BigInt(1),
        hives: [...beekeeper.hives, hiveId],
        updatedAt: timestamp,
      };
      beekeepersStorage.insert(beekeeper.id, updatedBeekeeper);

      return Ok(newHive);
    } catch (error) {
      return Err({
        SystemError: `Error creating hive: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    }
  }),

  /**
   * Creates a new honey batch
   */
  createHoneyBatch: update([HoneyBatchPayload], Result(HoneyBatch, Message), (payload) => {
    try {
      const principal = ic.caller();
      const hive = hivesStorage.get(payload.hiveId);
      
      if (!hive) {
        return Err({ NotFound: `Hive with ID ${payload.hiveId} not found` });
      }

      if (hive.beekeeper.toText() !== principal.toText()) {
        return Err({ Unauthorized: "You can only create batches for your own hives" });
      }

      if (payload.quantity <= 0 || payload.qualityScore > 100) {
        return Err({ InvalidPayload: "Invalid quantity or quality score" });
      }

      const timestamp = getCurrentTimestamp();
      const batchId = generateId();

      const newBatch: HoneyBatch = {
        id: batchId,
        hiveId: payload.hiveId,
        beekeeperId: hive.beekeeperId,
        beekeeper: principal,
        harvestDate: payload.harvestDate,
        quantity: payload.quantity,
        quality: payload.quality,
        qualityScore: payload.qualityScore,
        location: payload.location,
        verificationStatus: { Pending: "Awaiting verification" },
        verifierId: None,
        nftTokenId: None,
        pricePerKg: payload.pricePerKg,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      honeyBatchesStorage.insert(batchId, newBatch);

      // Update hive's honey batches
      const updatedHive: Hive = {
        ...hive,
        honeyBatches: [...hive.honeyBatches, batchId],
        updatedAt: timestamp,
      };
      hivesStorage.insert(payload.hiveId, updatedHive);

      // Update beekeeper's stats
      const beekeeper = beekeepersStorage.get(hive.beekeeperId);
      if (beekeeper) {
        const updatedBeekeeper: BeekeeperProfile = {
          ...beekeeper,
          totalBatches: beekeeper.totalBatches + BigInt(1),
          totalHoneyProduced: beekeeper.totalHoneyProduced + payload.quantity,
          updatedAt: timestamp,
        };
        beekeepersStorage.insert(beekeeper.id, updatedBeekeeper);
      }

      return Ok(newBatch);
    } catch (error) {
      return Err({
        SystemError: `Error creating honey batch: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    }
  }),

  /**
   * Creates an investment
   */
  createInvestment: update([InvestmentPayload], Result(Investment, Message), (payload) => {
    try {
      const principal = ic.caller();
      const investor = investorsStorage.values().find(
        (i) => i.owner.toText() === principal.toText()
      );

      if (!investor) {
        return Err({ NotFound: "Investor profile not found. Please create a profile first." });
      }

      const hive = hivesStorage.get(payload.hiveId);
      if (!hive) {
        return Err({ NotFound: `Hive with ID ${payload.hiveId} not found` });
      }

      if (payload.amount <= 0) {
        return Err({ InvalidPayload: "Investment amount must be positive" });
      }

      if (hive.currentInvestment + payload.amount > hive.targetInvestment) {
        return Err({ InvalidPayload: "Investment exceeds target investment for this hive" });
      }

      const timestamp = getCurrentTimestamp();
      const investmentId = generateId();

      const newInvestment: Investment = {
        id: investmentId,
        investorId: investor.id,
        investor: principal,
        hiveId: payload.hiveId,
        beekeeperId: hive.beekeeperId,
        amount: payload.amount,
        investmentDate: timestamp,
        expectedReturn: payload.expectedReturn,
        actualReturn: None,
        status: { Active: "Investment is active" },
        maturityDate: payload.maturityDate,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      investmentsStorage.insert(investmentId, newInvestment);

      // Update hive's current investment and investors
      const updatedHive: Hive = {
        ...hive,
        currentInvestment: hive.currentInvestment + payload.amount,
        investors: [...hive.investors, investor.id],
        updatedAt: timestamp,
      };
      hivesStorage.insert(payload.hiveId, updatedHive);

      // Update investor's stats
      const updatedInvestor: InvestorProfile = {
        ...investor,
        totalInvestments: investor.totalInvestments + BigInt(1),
        totalInvested: investor.totalInvested + payload.amount,
        activeInvestments: investor.activeInvestments + BigInt(1),
        investments: [...investor.investments, investmentId],
        updatedAt: timestamp,
      };
      investorsStorage.insert(investor.id, updatedInvestor);

      return Ok(newInvestment);
    } catch (error) {
      return Err({
        SystemError: `Error creating investment: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    }
  }),

  /**
   * Lists all hives
   */
  listHives: query([], Result(Vec(Hive), Message), () => {
    try {
      const hives = hivesStorage.values();
      if (hives.length === 0) {
        return Err({ NotFound: "No hives found in the system" });
      }
      return Ok(hives);
    } catch (error) {
      return Err({
        SystemError: `Error listing hives: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    }
  }),

  /**
   * Lists all honey batches
   */
  listHoneyBatches: query([], Result(Vec(HoneyBatch), Message), () => {
    try {
      const batches = honeyBatchesStorage.values();
      if (batches.length === 0) {
        return Err({ NotFound: "No honey batches found" });
      }
      return Ok(batches);
    } catch (error) {
      return Err({
        SystemError: `Error listing honey batches: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    }
  }),

  /**
   * Lists all investments
   */
  listInvestments: query([], Result(Vec(Investment), Message), () => {
    try {
      const investments = investmentsStorage.values();
      if (investments.length === 0) {
        return Err({ NotFound: "No investments found" });
      }
      return Ok(investments);
    } catch (error) {
      return Err({
        SystemError: `Error listing investments: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    }
  }),

  /**
   * Gets my investments (for the calling investor)
   */
  getMyInvestments: query([], Result(Vec(Investment), Message), () => {
    try {
      const principal = ic.caller();
      const investments = investmentsStorage.values().filter(
        (investment) => investment.investor.toText() === principal.toText()
      );

      if (investments.length === 0) {
        return Err({ NotFound: "No investments found for this investor" });
      }
      return Ok(investments);
    } catch (error) {
      return Err({
        SystemError: `Error retrieving investments: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    }
  }),

  /**
   * Gets my hives (for the calling beekeeper)
   */
  getMyHives: query([], Result(Vec(Hive), Message), () => {
    try {
      const principal = ic.caller();
      const hives = hivesStorage.values().filter(
        (hive) => hive.beekeeper.toText() === principal.toText()
      );

      if (hives.length === 0) {
        return Err({ NotFound: "No hives found for this beekeeper" });
      }
      return Ok(hives);
    } catch (error) {
      return Err({
        SystemError: `Error retrieving hives: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    }
  }),
});