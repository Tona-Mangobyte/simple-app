import { ITEM_LIST, PERCENTAGE } from './mutation-types'

export default {
  [ITEM_LIST](state, payload = {}) {
    const { items, round } = payload
    state.round = round
    state.all = items.map((item) => {
      item.percentage = '0%'
      return item
    })
  },
  [PERCENTAGE](state, payload = {}) {
    const { itemId, rate } = payload
    const index = state.all.findIndex((item) => item.id === itemId)
    const item = state.all[index]
    item.percentage = `${rate}%`
  },
}
