<template>
  <div class="media">
    <div class="media-content is-clipped">
      <b-field grouped>
        <div class="handle">
          <b-icon icon="dots-vertical" size="is-medium" />
        </div>
        <b-input
          :value="section"
          expanded
          rounded
          size="is-medium"
          placeholder="Section name"
          @change.native="section = $event.target.value"
        />
        <b-button
          icon-right="close"
          type="is-text"
          size="is-medium"
          @click="remove"
        />
      </b-field>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    section: {
      get() {
        return this.$store.state.sections.sections.find(
          (section) => section.id === this.id
        ).section
      },
      set(value) {
        const section = value.trim()
        if (section === '') return null
        this.$store.commit('sections/updateSection', {
          id: this.id,
          section
        })
      }
    }
  },
  methods: {
    remove() {
      this.$store.commit('sections/remove', this.id)
    }
  }
}
</script>
