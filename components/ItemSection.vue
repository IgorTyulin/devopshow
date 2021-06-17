<template>
  <div class="media">
    <div class="media-content">
      <div class="media">
        <div class="media-content">
          <span class="title is-4">
            {{ section }}
          </span>
        </div>
      </div>
      <item v-for="id in itemIds" :id="id" :key="id" />
    </div>
  </div>
</template>

<script>
import Item from '~/components/Item'

export default {
  components: {
    Item
  },
  props: {
    section: {
      type: String,
      required: true
    },
    itemIds: {
      type: Array,
      required: true
    }
  }
}
</script>
