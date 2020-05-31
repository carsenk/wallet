import Vue from 'vue'

const ensureNetworkWalletTree = (ref, network, walletId, initialValue) => {
  if (!ref[network]) Vue.set(ref, network, {})
  if (!ref[network][walletId]) Vue.set(ref[network], walletId, initialValue)
}

export default {
  CHANGE_ACTIVE_WALLETID (state, { walletId }) {
    state.activeWalletId = walletId
  },
  CHANGE_PASSWORD (state, { key, encryptedWallets }) {
    state.key = key
    state.encryptedWallets = encryptedWallets
  },
  LOCK_WALLET (state) {
    state.key = null
    state.unlockedAt = null
    state.wallets = null
  },
  UNLOCK_WALLET (state, { key, wallets, unlockedAt }) {
    state.key = key
    state.wallets = wallets
    state.unlockedAt = unlockedAt
  },
  NEW_WALLET (state, { newWallet, encryptedWallets }) {
    state.encryptedWallets = encryptedWallets
    state.wallets.push(newWallet)
  },
  NEW_ORDER (state, { network, walletId, order }) {
    ensureNetworkWalletTree(state.history, network, walletId, [])

    state.history[network][walletId].push(order)
  },
  NEW_TRASACTION (state, { network, walletId, transaction }) {
    ensureNetworkWalletTree(state.history, network, walletId, [])

    state.history[network][walletId].push(transaction)
  },
  UPDATE_HISTORY (state, { network, walletId, id, updates }) {
    const item = state.history[network][walletId].find(i => i.id === id)
    Object.assign(item, updates)
  },
  REMOVE_ORDER (state, { network, walletId, id }) {
    Vue.set(state.history[network], walletId, state.history[network][walletId].filter(i => i.id !== id))
  },
  UPDATE_UNUSED_ADDRESS (state, { network, walletId, asset, address }) {
    ensureNetworkWalletTree(state.addresses, network, walletId, {})

    Vue.set(state.addresses[network][walletId], asset, address)
  },
  UPDATE_BALANCE (state, { network, walletId, asset, balance }) {
    ensureNetworkWalletTree(state.balances, network, walletId, {})

    Vue.set(state.balances[network][walletId], asset, balance)
  },
  UPDATE_MARKET_DATA (state, { network, marketData }) {
    Vue.set(state.marketData, network, marketData)
  }
}