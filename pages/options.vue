<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Options</h1>
      <div class="box">
        <div class="media">
          <div class="media-content">
            <template v-if="$auth.loggedIn">
              <b-button type="is-primary" @click="signOut"> Sign out </b-button>
              <br /><br />
            </template>
            <b-button type="is-danger" @click="removeAll">
              Remove all items
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    async signOut() {
      await this.$auth.logout()
    },
    removeAll() {
      this.$buefy.dialog.confirm({
        message: 'Are you sure you would like to remove all items?',
        onConfirm: () => this.$store.commit('items/removeAll')
      })
    }
  }
}
</script>
