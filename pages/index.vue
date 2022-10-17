<template>
  <main class="content">
    <MainLogo />
    <MainGraphicsList />
    <MainLast />
    <MainLastDeal />
    <MainLastMap />
    <MainAd />
    <MailSubcribeConfirmModal
      v-if="subscribe_confirm_token"
      ref="subscribeModal"
      :token="subscribe_confirm_token"
    />
  </main>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      loader: {
        confirm_subscribe: false,
      },
      subscribe_confirm_token: this.$route.query.subscribe_confirm_token,
    }
  },
  head: {
    title: 'Домашняя страница',
  },
  mounted() {
    this.showConfirmSubscribeModal()
  },
  methods: {
    showConfirmSubscribeModal() {
      this.$refs.subscribeModal?.show()
    },
  },
}
</script>
