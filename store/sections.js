import { nanoid } from 'nanoid'
import Vue from 'vue'

export const state = () => ({
  sections: []
})

const numberEnd = /[0-9]+$/

const getUniqueSection = (state, newSection, id) => {
  const existingSection = state.sections.find(
    (section) => section.section === newSection && section.id !== id
  )
  if (existingSection === undefined) return newSection
  if (!numberEnd.test(newSection)) {
    return getUniqueSection(state, `${newSection} 2`, id)
  } else {
    return getUniqueSection(
      state,
      newSection.replace(
        numberEnd,
        (match) => String(parseInt(match, 10) + 1),
        id
      )
    )
  }
}

export const mutations = {
  add(state, section) {
    const id = nanoid(10)
    state.sections.push({ id, section: getUniqueSection(state, section, id) })
  },
  remove(state, id) {
    state.sections.splice(
      state.sections.findIndex((section) => section.id === id),
      1
    )
  },
  updateSection(state, { id, section }) {
    Vue.set(
      state.sections.find((section) => section.id === id),
      'section',
      getUniqueSection(state, section, id)
    )
  },
  reorder(state, ids) {
    state.sections = ids.map((id) =>
      state.sections.find((section) => section.id === id)
    )
  },
  load(state, sections) {
    state.sections = sections
  }
}
