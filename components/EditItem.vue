<template>
  <div class="modal-card add-items">
    <div class="modal-card-body">
      <b-field label="Item name">
        <b-input v-model="name" />
      </b-field>
      <b-field label="Section">
        <section-dropdown v-model="sectionId" @close="$parent.close()" />
      </b-field>
      <hr />
      <b-button type="is-danger" @click="removeItem">Delete</b-button>
    </div>
  </div>
</template>

<script>
import SectionDropdown from '~/components/SectionDropdown.vue'

export default {
  components: {
    SectionDropdown
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    name: {
      get() {
        return this.$store.state.items.items[this.id].name
      },
      set(value) {
        this.$store.commit('items/update', {
          id: this.id,
          item: { name: value, sectionId: this.sectionId }
        })
      }
    },
    sectionId: {
      get() {
        return this.$store.state.items.items[this.id].sectionId
      },
      set(value) {
        this.$store.commit('items/update', {
          id: this.id,
          item: { name: this.name, sectionId: value }
        })
      }
    }
  },
  methods: {
    removeItem() {
      this.$parent.close()
      this.$buefy.dialog.confirm({
        message: 'Are you sure you would like to delete this item?',
        onConfirm: () => this.$store.commit('items/remove', this.id)
      })
    }
  }
}
</script>
