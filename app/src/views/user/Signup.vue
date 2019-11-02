<template>
  <div class="ma-3">
    <h2 class="headline">Sign up</h2>
    <v-form ref="form" v-model="isValid" @submit.prevent="handleSubmit">
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Name"
        :loading="isLoading"
        :disabled="isLoading"
        required
        autocomplete="off"
        @input="handleInput"
      />
      <v-text-field
        v-model="password"
        :errors="passwordRules"
        label="Password"
        :loading="isLoading"
        :disabled="isLoading"
        required
        type="password"
      />
      <div class="d-flex flex-column flex-sm-row justify-center">
        <v-btn text type="reset" @click="handleReset" :disabled="isLoading">
          Reset
        </v-btn>
        <v-btn
          :disabled="!isValid"
          color="primary"
          type="submit"
          class="ms-sm-2"
          :loading="isLoading"
        >
          Join
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import { size } from 'lodash-es'
import { mapActions } from 'vuex'

export default {
  name: 'Signup',
  data: () => ({
    isValid: true,
    isLoading: false,
    serverError: null,
    name: '',
    password: ''
  }),
  computed: {
    nameRules() {
      return [
        v => !!v || 'You must choose a name.',
        v => size(v) >= 3 || 'Your name must be at least 3 characters long.',
        v =>
          /^[a-zA-Z0-9]+$/.test(v) ||
          'Your name can only contain alphanumerical characters.',
        () => !this.serverError || this.serverError
      ]
    },
    passwordRules() {
      return [
        v => !!v || 'You must define a password.',
        v => size(v) >= 8 || 'Your password must be at least 8 characters long.'
      ]
    }
  },
  methods: {
    ...mapActions(['signup']),
    handleSubmit() {
      this.isLoading = true
      this.signup({ name: this.name })
        .then(() => {
          this.$router.push({ name: 'game' })
        })
        .catch(error => {
          switch (error.response.status) {
            case 409:
              this.serverError =
                'Someone alreay uses this name, please try another.'
              break
            default:
              console.error(error)
              this.serverError = 'Unexpected netword error.'
          }
          this.$refs.form.validate() // trigger validation to take serverError into account
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    handleReset() {
      this.$refs.form.reset()
    },
    handleInput() {
      this.serverError = null
    }
  }
}
</script>
