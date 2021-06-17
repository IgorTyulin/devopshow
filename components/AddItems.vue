<template>
  <form action="javascript:void(0);">
    <div class="modal-card add-items">
      <div class="modal-card-body">
        <b-field label="Item name">
          <b-input v-model="name" />
        </b-field>
        <b-field label="Section">
          <section-dropdown v-model="sectionId" @close="$parent.close()" />
        </b-field>
        <hr />
        <b-button
          type="is-primary"
          native-type="submit"
          :disabled="!submittable"
          @click.stop.prevent="addItem"
        >
          Add item
        </b-button>
      </div>
    </div>
  </form>
</template>

<script>
import SectionDropdown from '~/components/SectionDropdown.vue'

export default {
  components: {
    SectionDropdown
  },
  data() {
    return {
      name: '',
      sectionId: null
    }
  },
  computed: {
    submittable() {
      return this.name !== '' && this.sectionId !== null
    }
  },
  methods: {
    addItem() {
      if (!this.submittable) return false
      this.$store.commit('items/add', {
        name: this.name,
        sectionId: this.sectionId
      })
      this.name = ''
    }
  }
}
</script>
