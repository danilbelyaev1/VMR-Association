<template>
  <footer>
    <div class="container">
      <div class="footer-wrapper">
        <div class="footer-wrapper-top">
          <a href="/"
            ><img
              src="~assets/img/main-logo.svg"
              alt="main logo"
              class="footer-logo"
          /></a>
          <ul class="footer-top-column">
            <li><nuxt-link to="/about">О нас</nuxt-link></li>
            <li><nuxt-link to="/state">Государство - вам</nuxt-link></li>
            <li>
              <nuxt-link to="/events">Реализованные мероприятия</nuxt-link>
            </li>
            <li><nuxt-link to="/faq">Часто задаваемые вопросы</nuxt-link></li>
          </ul>
          <ul class="footer-top-column">
            <li><nuxt-link to="/contacts">Контакты</nuxt-link></li>
            <li><nuxt-link to="/reviews">Отзывы</nuxt-link></li>
            <li><nuxt-link to="/terms">Оферта</nuxt-link></li>
            <li>
              <nuxt-link to="/policy">Политика конфиденциальности</nuxt-link>
            </li>
          </ul>
          <a href="#" class="footer-btn-top">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.7071 3.29289C12.3166 2.90237 11.6834 2.90237 11.2929 3.29289L4.92893 9.65685C4.53841 10.0474 4.53841 10.6805 4.92893 11.0711C5.31946 11.4616 5.95262 11.4616 6.34315 11.0711L12 5.41421L17.6569 11.0711C18.0474 11.4616 18.6805 11.4616 19.0711 11.0711C19.4616 10.6805 19.4616 10.0474 19.0711 9.65685L12.7071 3.29289ZM13 20V4H11L11 20H13Z"
                fill="#008282"
              />
            </svg>

            <h6>Наверх</h6>
          </a>
        </div>
        <div class="footer-wrapper-bot">
          <SocButtons class="footer-wrapper-bot-social"> </SocButtons>
          <a :href="`tel:${contact_phone.value}`" class="footer-number">{{
            contact_phone.value
          }}</a>
          <a :href="`mailto: ${contact_email.value}`" class="footer-mail">{{
            contact_email.value
          }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'DefaultFooter',
  fetchOnServer: true,

  // async fetch() {
  //   await this.$store.dispatch('setting/fetchSetting')
  // },

  data() {
    return {
      data: [],
    }
  },
  computed: {
    contact_phone() {
      return this.$store.getters['setting/getSettingByKey']('contact_phone')
    },
    contact_email() {
      return this.$store.getters['setting/getSettingByKey']('contact_email')
    },
    social() {
      return this.$store.getters['setting/getSettingByKey']('social')
    },
  },
}
</script>

<style scoped></style>
