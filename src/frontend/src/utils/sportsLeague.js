
// User Management
const registerUser = async (payload) => {
  return await window.canister.PropeonCanister.registerUser(payload);
};

const updateUser = async (payload) => {
  return await window.canister.PropeonCanister.updateUser(payload);
};

const getUser = async (id) => {
  return await window.canister.PropeonCanister.getUser(id);
};

const getUserByOwner = async (owner) => {
  return await window.canister.PropeonCanister.getUserByOwner(owner);
};

const listUsers = async () => {
  return await window.canister.PropeonCanister.listUsers();
};

// Team Management
const createTeam = async (payload) => {
  return await window.canister.PropeonCanister.createTeam(payload);
};

const getTeam = async (id) => {
  return await window.canister.PropeonCanister.getTeam(id);
};

const listTeams = async () => {
  return await window.canister.PropeonCanister.listTeams();
};

const getTeamsBySportType = async (sportType) => {
  return await window.canister.PropeonCanister.getTeamsBySportType(
    sportType
  );
};

const addMemberToTeam = async (payload) => {
  return await window.canister.PropeonCanister.addMemberToTeam(payload);
};

const assignCoachToTeam = async (payload) => {
  return await window.canister.PropeonCanister.assignCoachToTeam(payload);
};

// League Management
const createLeague = async (payload) => {
  return await window.canister.PropeonCanister.createLeague(payload);
};

const getLeague = async (id) => {
  return await window.canister.PropeonCanister.getLeague(id);
};

const listLeagues = async () => {
  return await window.canister.PropeonCanister.listLeagues();
};

const getLeaguesByOwner = async () => {
  return await window.canister.PropeonCanister.getLeaguesByOwner();
};

// Tournament Management
const createTournament = async (payload) => {
  return await window.canister.PropeonCanister.createTournament(payload);
};

const getTournament = async (id) => {
  return await window.canister.PropeonCanister.getTournament(id);
};

const getTournaments = async () => {
  return await window.canister.PropeonCanister.getTournaments();
};

// Match Management
const scheduleMatch = async (payload) => {
  return await window.canister.PropeonCanister.scheduleMatch(payload);
};

const getMatch = async (id) => {
  return await window.canister.PropeonCanister.getMatch(id);
};

const getMatches = async () => {
  return await window.canister.PropeonCanister.getMatches();
};

const getMatchesByTeam = async (teamId) => {
  return await window.canister.PropeonCanister.getMatchesByTeam(teamId);
};

const getMatchesBySport = async (sportType) => {
  return await window.canister.PropeonCanister.getMatchesBySport(
    sportType
  );
};

const submitMatchResult = async (payload) => {
  return await window.canister.PropeonCanister.submitMatchResult(payload);
};

// Leaderboard Management
const getLeaderboards = async (sportTypeOpt) => {
  return await window.canister.PropeonCanister.getLeaderboards(
    sportTypeOpt
  );
};

export {
  registerUser,
  updateUser,
  getUser,
  getUserByOwner,
  listUsers,
  createTeam,
  getTeam,
  listTeams,
  getTeamsBySportType,
  addMemberToTeam,
  assignCoachToTeam,
  createLeague,
  getLeague,
  listLeagues,
  getLeaguesByOwner,
  createTournament,
  getTournament,
  getTournaments,
  scheduleMatch,
  getMatch,
  getMatches,
  getMatchesByTeam,
  getMatchesBySport,
  submitMatchResult,
  getLeaderboards,
};
