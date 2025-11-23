// blacklist luu cac token bi vo hieu hoa
const tokenBlackList = new Set();

// them token vao blacklist
const addToBlacklist = (token) => tokenBlackList.add(token);

// kiem tra token co trong blacklist
const isTokenBlacklisted = (token) => tokenBlackList.has(token);

// xoa token khoi blacklist
const removeFromBlacklist = (token) => tokenBlackList.delete(token);

module.exports = {
  addToBlacklist,
  isTokenBlacklisted,
  removeFromBlacklist,
};
