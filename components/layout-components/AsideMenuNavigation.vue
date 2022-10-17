<template>
  <div>
    <ul v-if="$auth.user" class="auth-menu">
      <li @click="close"><nuxt-link to="/graphics">Графики</nuxt-link></li>
      <li @click="close"><nuxt-link to="/catalog">Маркетплэйс</nuxt-link></li>
      <li @click="close"><nuxt-link to="/deals">Мои сделки</nuxt-link></li>
      <li @click="close"><nuxt-link to="/news">Новости</nuxt-link></li>
      <li @click="close"><nuxt-link to="/my-goods">Мои товары</nuxt-link></li>
      <li @click="close"><nuxt-link to="/contacts">Контакты</nuxt-link></li>
      <li @click="close"><nuxt-link to="/personal">Профиль</nuxt-link></li>
      <li @click="logout">Выйти</li>
    </ul>
    <ul>
      <li @click="close"><nuxt-link to="/about">О нас</nuxt-link></li>
      <li @click="close">
        <nuxt-link to="/state">Государство — вам</nuxt-link>
      </li>
      <li @click="close">
        <nuxt-link to="/events">Реализованные мероприятия</nuxt-link>
      </li>
      <li @click="close"><nuxt-link to="/contacts">Контакты</nuxt-link></li>
      <li @click="close"><nuxt-link to="/reviews">Отзывы</nuxt-link></li>
      <li @click="close"><nuxt-link to="/terms">Оферта</nuxt-link></li>
      <li @click="close">
        <nuxt-link to="/policy">Политика конфиденциальности</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AsideMenuNavigation',
  methods: {
    close() {
      this.$emit('close')
    },
    async logout() {
      await this.$store.commit('cart/setCartToDefault')
      await this.$store.dispatch('favourites/removeFavouritesOnLogOut')
      await this.$auth.logout()
      this.$emit('close')
    },
  },
}
</script>

<style scoped>
.auth-menu {
  text-transform: uppercase;
}
</style>
