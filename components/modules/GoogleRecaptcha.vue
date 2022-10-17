<!--suppress JSUnresolvedVariable -->
<template>
  <input v-if="isLoad" name="recaptcha" type="hidden" />
</template>

<script>
/* eslint-disable no-undef */
export default {
  name: 'GoogleRecaptcha',
  data() {
    return {
      isLoad: false,
    }
  },
  computed: {
    googleKey() {
      return (
        this.$store.getters['setting/getSettingByKey'](
          'google_recaptcha_site_key'
        )?.value || ''
      )
    },
    googleSecretKey() {
      return (
        this.$store.getters['setting/getSettingByKey'](
          'google_recaptcha_secret'
        )?.value || ''
      )
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.isLoad) {
        return
      }
      if (!this.googleKey) {
        // eslint-disable-next-line no-console
        console.error('Google Recaptcha key not received')
        return
      }

      const $this = this

      this.$loadScript(
        `https://www.google.com/recaptcha/api.js?render=${this.googleKey}`
      )
        .then(() => {
          grecaptcha.ready(function () {
            $this.isLoad = true
          })
        })
        .catch(() => {
          return null
        })
    },
    async getToken() {
      try {
        return await grecaptcha.execute(this.googleKey)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
        return null
      }
    },
  },
}
</script>

<style>
.grecaptcha-badge {
  visibility: hidden;
}
</style>
