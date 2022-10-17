<template>
  <div class="header-bottom-menu">
    <ul>
      <li>
        <nuxt-link to="/graphics" tag="a" class="h7" active-class="active"
          >графики</nuxt-link
        >
      </li>
      <li>
        <nuxt-link to="/catalog" tag="a" class="h7" active-class="active"
          >маркетплэйс</nuxt-link
        >
      </li>
      <li v-if="$auth.user">
        <nuxt-link to="/deals" tag="a" class="h7" active-class="active"
          >мои сделки</nuxt-link
        >
      </li>
      <li>
        <nuxt-link to="/news" tag="a" class="h7" active-class="active"
          >новости</nuxt-link
        >
      </li>
      <li v-if="$auth.user">
        <nuxt-link to="/my-goods" tag="a" class="h7" active-class="active"
          >мои товары</nuxt-link
        >
      </li>
      <li>
        <nuxt-link to="/contacts" tag="a" class="h7" active-class="active"
          >контакты</nuxt-link
        >
      </li>
      <li v-if="$auth.user">
        <a class="h7 pointer" @click="logout">Выход</a>
      </li>
    </ul>
    <div class="btn-wrapper">
      <nuxt-link
        v-if="$auth.user"
        class="person d-flex"
        to="/personal"
        @click.prevent
      >
        <div class="text-2 mr-4">
          {{ fullname }}
        </div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 22.492H22.502L22.5 21.99C22.4975 21.3703 22.1418 19.7627 20.6896 18.3104C19.2743 16.8952 16.6837 15.5 12 15.5C7.31424 15.5 4.72563 16.8953 3.31045 18.3104C1.85751 19.7634 1.50503 21.3707 1.50002 21.9879L1.49592 22.492H2H22ZM15.8891 9.88909C14.8576 10.9205 13.4587 11.5 12 11.5C10.5413 11.5 9.14236 10.9205 8.11091 9.88909C7.07946 8.85764 6.5 7.45869 6.5 6C6.5 4.54131 7.07946 3.14236 8.11091 2.11091C9.14236 1.07946 10.5413 0.5 12 0.5C13.4587 0.5 14.8576 1.07946 15.8891 2.11091C16.9205 3.14236 17.5 4.54131 17.5 6C17.5 7.45869 16.9205 8.85764 15.8891 9.88909ZM15.182 9.18198C16.0259 8.33807 16.5 7.19347 16.5 6C16.5 4.80653 16.0259 3.66193 15.182 2.81802C14.3381 1.97411 13.1935 1.5 12 1.5C10.8065 1.5 9.66193 1.97411 8.81802 2.81802C7.9741 3.66193 7.5 4.80653 7.5 6C7.5 7.19347 7.9741 8.33807 8.81802 9.18198C9.66193 10.0259 10.8065 10.5 12 10.5C13.1935 10.5 14.3381 10.0259 15.182 9.18198ZM23.5 22C23.5 22.4125 23.3983 22.6886 23.2715 22.8789C23.1426 23.0723 22.9671 23.2074 22.7764 23.3028C22.5837 23.3991 22.3851 23.4498 22.2303 23.4756C22.1541 23.4883 22.0917 23.4944 22.0503 23.4974C22.0353 23.4984 22.0232 23.4991 22.0144 23.4995C22.0111 23.4996 22.0082 23.4997 22.0058 23.4998L21.9984 23.5L21.9991 23.5H21.9978H2.00218H2.00089L2.0016 23.5L1.9942 23.4998C1.98544 23.4995 1.9703 23.4988 1.94969 23.4974C1.90829 23.4944 1.84589 23.4883 1.7697 23.4756C1.61495 23.4498 1.41625 23.3991 1.22361 23.3028C1.03292 23.2074 0.857447 23.0723 0.728525 22.8789C0.60169 22.6886 0.5 22.4125 0.5 22C0.5 21.1284 0.950272 19.2568 2.60355 17.6036C4.24218 15.9649 7.10545 14.5 12 14.5C16.8946 14.5 19.7578 15.9649 21.3964 17.6036C23.0497 19.2568 23.5 21.1284 23.5 22Z"
            stroke="#01FFDB"
          />
        </svg>
      </nuxt-link>
      <nuxt-link to="/favourites" class="favorite">
        <svg
          width="20"
          height="24"
          viewBox="0 0 20 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.407 0H6.38306C5.89577 0 5.42844 0.193574 5.08387 0.538139C4.73931 0.882703 4.54573 1.35003 4.54573 1.83732V3.67464H2.70841C2.22113 3.67464 1.7538 3.86822 1.40923 4.21278C1.06467 4.55734 0.871094 5.02467 0.871094 5.51196V22.9665C0.871094 23.2102 0.967881 23.4438 1.14016 23.6161C1.31245 23.7884 1.54611 23.8852 1.78975 23.8852C1.98307 23.8845 2.17151 23.8244 2.32947 23.7129L8.22038 19.4986L14.1228 23.7129C14.2589 23.8132 14.4207 23.8729 14.5894 23.8851C14.758 23.8973 14.9267 23.8615 15.0759 23.7818C15.2241 23.7031 15.3482 23.5858 15.4351 23.4422C15.5221 23.2987 15.5686 23.1343 15.5697 22.9665V18.4536L17.7974 20.0383C17.9504 20.151 18.1356 20.2114 18.3256 20.2105C18.5693 20.2105 18.8029 20.1137 18.9752 19.9415C19.1475 19.7692 19.2443 19.5355 19.2443 19.2919V1.83732C19.2443 1.35003 19.0507 0.882703 18.7062 0.538139C18.3616 0.193574 17.8943 0 17.407 0ZM13.7323 21.1866L8.74861 17.6268C8.59561 17.5141 8.41039 17.4537 8.22038 17.4545C8.02706 17.4552 7.83862 17.5153 7.68066 17.6268L2.70841 21.1866V5.51196H13.7323V21.1866ZM17.407 17.512L15.5697 16.1914V5.51196C15.5697 5.02467 15.3761 4.55734 15.0315 4.21278C14.687 3.86822 14.2196 3.67464 13.7323 3.67464H6.38306V1.83732H17.407V17.512Z"
            fill="#01FFDB"
          />
        </svg>
        <span>{{ favouritesCount }}</span>
      </nuxt-link>
      <nuxt-link to="/cart" class="cart" href="">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
            stroke="#01FFDB"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
            stroke="#01FFDB"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
            stroke="#01FFDB"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>{{ isAuth ? basketAuthCount : basketLocalCount }}</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomMenu',

  fetchOnServer: false,

  async fetch() {
    if (!this.isFavouritesRoute) {
      await this.$store.dispatch(
        'favourites/loadInitialFavourites',
        this.isAuth
      )
    }
    await this.$store.dispatch('cart/loadInitialCart', this.isAuth)
    await this.$store.dispatch('cart/loadCart', this.isAuth)
  },

  computed: {
    isFavouritesRoute() {
      return this.$route.name === 'favourites'
    },
    isAuth() {
      return Boolean(this.$auth.user)
    },
    fullname() {
      return (
        this.$auth?.user?.name +
        ' ' +
        this.$auth?.user?.surname +
        ' ' +
        this.$auth?.user?.patronymic[0] +
        '.'
      )
    },
    favouritesCount() {
      return this.$store.getters['favourites/getFavouritesCount'] || 0
    },
    basketLocalCount() {
      return this.$store.getters['cart/getLocalCartCount'] || 0
    },
    basketAuthCount() {
      return this.$store.getters['cart/getAuthCartCount'] || 0
    },
    cartCount() {
      return this.$store.getters['cart/getCartCount'] || 0
    },
  },

  methods: {
    async logout() {
      await this.$store.commit('cart/setCartToDefault')
      await this.$store.dispatch('favourites/removeFavouritesOnLogOut')
      await this.$auth.logout()
    },
  },
}
</script>

<style scoped></style>
