<template>
  <section class="section">
    <div class="container">
      <template v-if="empty">
        <p class="title">Add your first item</p>
        <add-items />
      </template>

      <item-section
        v-for="section in sectionedItemIds"
        :key="section.section"
        :section="section.section"
        :item-ids="section.itemIds"
      />

      <template v-if="!empty">
        <br />
        <div class="buttons">
          <b-button type="is-primary" @click="addItems">
            Add more items
          </b-button>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import AddItems from '~/components/AddItems.vue'

export default {
  computed: {
    items() {
      return this.$store.state.items.items
    },
    empty() {
      return Object.keys(this.items).length === 0
    },
    sections() {
      return this.$store.state.sections.sections
    },
    sectionedItemIds() {
      const sectionedItemIds = this.sections.map(
        ({ id: sectionId, section }) => ({
          sectionId,
          section,
          itemIds: []
        })
      )
      sectionedItemIds.push({
        sectionId: null,
        section: 'No section chosen',
        itemIds: []
      })
      Object.entries(this.items).forEach(([id, item]) => {
        const section = sectionedItemIds.find(
          (section) => section.sectionId === item.sectionId
        )
        if (section) {
          section.itemIds.push(id)
        } else {
          sectionedItemIds[sectionedItemIds.length - 1].itemIds.push(id)
        }
      })
      return sectionedItemIds.filter(({ itemIds }) => itemIds.length !== 0)
    }
  },
  methods: {
    addItems() {
      this.$buefy.modal.open({
        parent: this,
        component: AddItems,
        hasModalCard: true
      })
    }
  }
}
</script>
