export const INITIALIZE_WALLET = "INITIALIZE_WALLET";
export const ADD_COINS = "ADD_COINS";
export const SUBTRACT_COINS = "SUBTRACT_COINS";

export const initializeWallet = (userId) => {
  return {
    type: "INITIALIZE_WALLET",
    payload: {
      userId,
      balance: 10,
    },
  };
};

// Add coins to a user's wallet
export const addCoins = (userId, coins) => {
  return {
    type: "ADD_COINS",
    payload: {
      userId,
      coins,
    },
  };
};

export const subtractCoins = (amount) => ({
  type: SUBTRACT_COINS,
  amount,
});
