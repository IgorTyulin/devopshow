<template>
  <section class="section">
    <div class="container">
      <p v-if="empty" class="title">Add your first section</p>

      <draggable v-model="sectionIds" handle=".handle" :animation="100">
        <section-media
          v-for="sectionId in sectionIds"
          :id="sectionId"
          :key="sectionId"
        />
      </draggable>

      <hr v-if="!empty" />

      <div class="box">
        <article class="media">
          <div class="media-content">
            <form action="javascript:void(0);">
              <b-field grouped>
                <b-input
                  v-model="newSectionTitle"
                  expanded
                  rounded
                  placeholder="New section name"
                />
                <b-button
                  type="is-primary"
                  native-type="submit"
                  :disabled="addButtonDisabled"
                  @click.stop.prevent="add"
                >
                  Add section
                </b-button>
              </b-field>
            </form>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      newSectionTitle: ''
    }
  },
  computed: {
    sectionIds: {
      get() {
        return this.$store.state.sections.sections.map((section) => section.id)
      },
      set(value) {
        this.$store.commit('sections/reorder', value)
      }
    },
    addButtonDisabled() {
      return this.newSectionTitle === ''
    },
    empty() {
      return this.sectionIds.length === 0
    }
  },
  methods: {
    add() {
      this.$store.commit('sections/add', this.newSectionTitle)
      this.newSectionTitle = ''
    }
  }
}
</script>
