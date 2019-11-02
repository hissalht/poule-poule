<template>
  <v-form
    ref="form"
    v-model="isValid"
    class="ma-3"
    @submit.prevent="handleSubmit"
  >
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
    <div class="d-flex flex-column flex-sm-row justify-center">
      <v-btn text type="reset" @click="handleReset" :disabled="isLoading"
        >Reset</v-btn
      >
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
</template>

<script>
import { size } from 'lodash-es'
import { mapActions } from 'vuex'

export default {
  name: 'Signup',
  data: () => ({
    isValid: true,
    isLoading: false,
    name: '',
    serverError: null
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
