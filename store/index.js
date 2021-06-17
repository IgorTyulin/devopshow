export const actions = {
  async save({ rootState }) {
    await this.$axios.post('/.netlify/functions/save', {
      sections: rootState.sections.sections,
      items: rootState.items.items
    })
  },
  async load({ commit }) {
    const { sections, items } = await this.$axios.$get(
      '/.netlify/functions/load'
    )
    commit('sections/load', sections, { root: true })
    commit('items/load', items, { root: true })
  }
}
