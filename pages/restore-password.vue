<template>
  <main class="content">
    <section class="autho-section">
      <div class="container">
        <div class="container-autho">
          <h2>Укажите почту для восстановления пароля</h2>
          <ValidationObserver
            ref="observer"
            v-slot="{ valid }"
            tag="form"
            class=""
            @submit.prevent=""
          >
            <div class="col-12 pb-3">
              <input-validate
                ref="email"
                v-model.trim="form.email"
                :disable-root-classes="true"
                :disable-input-classes="true"
                vid="email"
                label="E-mail"
                placeholder=""
                rules="required"
                type="email"
              />
            </div>
            <my-button
              :disabled="!valid"
              class="btn btn-primary"
              :loader="loader"
              text="Отправить заявку"
              @click="restore"
            />
          </ValidationObserver>
        </div>
      </div>
    </section>
    <client-only>
      <RestoreLinkSend />
    </client-only>
  </main>
</template>

<script>
export default {
  name: 'RestorePasswordPage',
  data() {
    return {
      loader: false,
      form: {
        email: null,
      },
    }
  },
  methods: {
    async restore() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) return

      this.loader = true

      try {
        await this.$axios.$post('/auth/forgot-password', this.form)
        this.$bvModal.show('restore-link-send')
      } catch (e) {
        this.$refs.observer.setErrors(e?.response?.data.errors)
      } finally {
        this.loader = false
      }
    },
  },
}
</script>

<style scoped></style>
