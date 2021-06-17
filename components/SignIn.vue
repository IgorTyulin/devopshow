<template>
  <form action="javascript:void(0);">
    <div class="modal-card add-items">
      <div class="modal-card-body">
        <b-field label="Password">
          <b-input
            v-model="password"
            type="password"
            password-reveal
            expanded
            rounded
          />
        </b-field>
        <hr />
        <b-button
          type="is-primary"
          native-type="submit"
          @click.stop.prevent="signIn"
        >
          Sign in
        </b-button>
        <template v-if="error !== ''">
          <br /><br />
          <b-message type="is-danger">{{ error }}</b-message>
        </template>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      error: ''
    }
  },
  methods: {
    async signIn() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            password: this.password
          }
        })
        this.$parent.close()
      } catch (e) {
        this.error = e.response.data
        this.loading = false
      }
    }
  }
}
</script>
