import { ITEM_LIST, PERCENTAGE } from './mutation-types'

const getItemList = async ({ commit, _dispatch }) => {
  const apiKey = window.$nuxt.$config.apiKey
  const { data } = await window.$nuxt.$axios.get('freeSelectItemList', {
    headers: { 'x-api-key': apiKey, accept: 'application/json;api.v=1' },
  })
  const { round, items } = data.data
  commit(ITEM_LIST, { round, items })
  return { round, items }
}

const updatePercentage = ({ commit, _dispatch }, payload) => {
  commit(PERCENTAGE, payload)
}

export default {
  getItemList,
  updatePercentage,
}
