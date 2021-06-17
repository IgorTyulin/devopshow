<template>
  <div>
    <button class="button" @click="open = !open">
      <span>{{ chosenSection ? chosenSection : 'Pick a section' }}</span>
      <b-icon :icon="open ? 'menu-up' : 'menu-down'"></b-icon>
    </button>
    <template v-if="open">
      <br />
      <b-dropdown
        v-model="chosenSectionId"
        aria-role="list"
        inline
        class="section-dropdown"
        @input="sectionChange"
      >
        <b-dropdown-item
          v-for="section in sections"
          :key="section.id"
          :value="section.id"
          aria-role="listitem"
        >
          {{ section.section }}
        </b-dropdown-item>

        <b-dropdown-item v-if="sections.length === 0" custom>
          <nuxt-link to="/sections" @click.native="close">
            Add some sections
          </nuxt-link>
        </b-dropdown-item>
      </b-dropdown>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      open: false,
      chosenSectionId: this.value
    }
  },
  computed: {
    sections() {
      return this.$store.state.sections.sections
    },
    chosenSection() {
      const chosenSectionObject = this.sections.find(
        (section) => section.id === this.chosenSectionId
      )
      if (chosenSectionObject) return chosenSectionObject.section
      return null
    }
  },
  methods: {
    sectionChange(section) {
      this.open = false
      this.$emit('input', section)
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
