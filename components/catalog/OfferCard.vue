<template>
  <div class="marketplace-card">
    <NuxtLink :to="linkToOffer" class="marketplace-card-a">
      <div
        :style="{ background: `url(${image}) center center / cover no-repeat` }"
        class="last-img"
      ></div>
      <div class="marketplace-card-titles">
        <NuxtLink
          tag="div"
          :to="linkToOffer"
          class="last-title pointer text-2"
          >{{ productName }}</NuxtLink
        >

        <h6 class="last-price" :class="isUserOwner ? 'disabled' : ''">
          <template v-if="inStock">
            {{ price }} ₽
            <span v-if="unitTitle" class="last-subtitle text-3">
              за {{ unitTitle }}
            </span>
          </template>
          <span v-else class="last-subtitle text-3">Нет в наличии</span>
        </h6>
      </div>
      <div class="marketplace-card-description">
        <div v-if="!short" class="last-company-rate">
          <div v-if="companyTitle" class="company">
            {{ companyTitle }}
          </div>
          <div
            v-if="rating"
            class="rate"
            :class="isUserOwner ? 'disabled' : ''"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                v-if="!isUserOwner"
                d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
                fill="#FFD600"
              />
              <path
                v-else
                d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
                fill="#BCBCBC"
              />
            </svg>
            <span>{{ rating }}</span>
          </div>
        </div>
        <div v-if="saleFrom" class="last-company-rate">
          <div class="company">Продажа от:</div>
          <div class="rate">
            <span v-text="saleFromText"></span>
          </div>
        </div>
        <div class="last-company-rate">
          <div class="company">Остаток:</div>
          <div class="rate">
            <span>{{ quantity }} кг</span>
          </div>
        </div>
      </div>
    </NuxtLink>
    <div v-if="!short && !isUserOwner" class="last-bottom">
      <a href="" class="left" @click.prevent="toggleFavourites">
        <span :class="{ isFavouritesRoute: '' }">В избранное</span>
        <svg
          v-if="!isInFavourites"
          width="24"
          height="26"
          viewBox="0 0 24 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.1 24.2501V24.25V4C21.1 3.17783 20.7734 2.38933 20.192 1.80797C19.6107 1.22661 18.8222 0.9 18 0.9H6C5.17783 0.9 4.38933 1.22661 3.80797 1.80797C3.22661 2.38933 2.9 3.17783 2.9 4L2.9 24.25L2.9 24.2501C2.90008 24.4038 2.94186 24.5547 3.02089 24.6865C3.09993 24.8184 3.21325 24.9264 3.3488 24.999C3.48435 25.0715 3.63704 25.106 3.79061 25.0986C3.9426 25.0914 4.08982 25.0434 4.21691 24.9599L12 20.7651L19.7831 24.9599C19.9102 25.0434 20.0574 25.0914 20.2094 25.0986C20.363 25.106 20.5157 25.0715 20.6512 24.999C20.7867 24.9264 20.9001 24.8184 20.9791 24.6865C21.0581 24.5547 21.0999 24.4038 21.1 24.2501ZM5.01005 3.01005C5.2726 2.7475 5.6287 2.6 6 2.6H18C18.3713 2.6 18.7274 2.7475 18.9899 3.01005C19.2525 3.2726 19.4 3.6287 19.4 4V22.6835L12.4664 19.0398C12.3279 18.9489 12.1658 18.9004 12 18.9004C11.8342 18.9004 11.6721 18.9489 11.5336 19.0398L4.6 22.6835V4C4.6 3.6287 4.7475 3.2726 5.01005 3.01005Z"
            fill="#01FFDB"
            stroke="#01FFDB"
            stroke-width="0.2"
          />
        </svg>
        <svg
          v-else
          width="24"
          height="26"
          viewBox="0 0 20 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.1 24.2501V24.25V4C19.1 3.17783 18.7734 2.38933 18.192 1.80797C17.6107 1.22661 16.8222 0.9 16 0.9H4C3.17783 0.9 2.38933 1.22661 1.80797 1.80797C1.22661 2.38933 0.9 3.17783 0.9 4L0.9 24.25L0.9 24.2501C0.900079 24.4038 0.941861 24.5547 1.02089 24.6865C1.09993 24.8184 1.21325 24.9264 1.3488 24.999C1.48435 25.0715 1.63704 25.106 1.79061 25.0986C1.9426 25.0914 2.08982 25.0434 2.21691 24.9599L10 20.7651L17.7831 24.9599C17.9102 25.0434 18.0574 25.0914 18.2094 25.0986C18.363 25.106 18.5157 25.0715 18.6512 24.999C18.7867 24.9264 18.9001 24.8184 18.9791 24.6865C19.0581 24.5547 19.0999 24.4038 19.1 24.2501Z"
            fill="#01FFDB"
            stroke="#01FFDB"
            stroke-width="0.2"
          />
        </svg>
      </a>
      <div class="center">
        <div
          class="minus"
          @click.exact="count--"
          @click.ctrl.exact="count -= 10"
          @click.shift.exact="count -= 100"
          @click.ctrl.shift.exact="count -= 1000"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="0.75"
              y1="4.66669"
              x2="9.25"
              y2="4.66669"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <InputValidate
          v-model="count"
          type="number"
          class="number"
          :disable-root-classes="true"
          :disable-input-classes="true"
          @change="changeCount"
          @input="inputCount"
        />
        <div
          class="plus"
          @click.exact="count++"
          @click.ctrl.exact="count += 10"
          @click.shift.exact="count += 100"
          @click.ctrl.shift.exact="count += 1000"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 0C4.63664 0 4.34211 0.294553 4.34211 0.657895V4.34212H0.657895C0.294553 4.34212 0 4.63666 0 5.00002C0 5.36337 0.294553 5.65791 0.657895 5.65791H4.34211V9.34211C4.34211 9.70545 4.63664 10 5 10C5.36336 10 5.6579 9.70545 5.6579 9.34211V5.65791H9.34211C9.70545 5.65791 10 5.36337 10 5.00002C10 4.63666 9.70545 4.34212 9.34211 4.34212H5.6579V0.657895C5.6579 0.294553 5.36336 0 5 0Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <a v-if="!isInCart" href="/" class="right" @click.prevent="AddToCart">
        В корзину
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
      </a>
      <a v-else href="/" class="right" @click.prevent="removeFromCart">
        В корзине
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.1617 1.77455C14.261 1.67327 14.3794 1.59281 14.5102 1.53788C14.6409 1.48294 14.7813 1.45465 14.9231 1.45465C15.065 1.45465 15.2054 1.48294 15.3361 1.53788C15.4669 1.59281 15.5853 1.67327 15.6846 1.77455C16.1006 2.19492 16.1064 2.87419 15.6991 3.30183L7.09842 13.4691C7.00077 13.5763 6.88227 13.6625 6.75017 13.7224C6.61807 13.7822 6.47514 13.8145 6.33014 13.8172C6.18513 13.82 6.0411 13.7931 5.90684 13.7382C5.77259 13.6834 5.65094 13.6017 5.54933 13.4982L0.315874 8.19492C0.114037 7.98908 0.000976562 7.71229 0.000976562 7.42401C0.000976562 7.13573 0.114037 6.85894 0.315874 6.6531C0.415141 6.55181 0.533617 6.47135 0.664366 6.41642C0.795115 6.36149 0.935509 6.3332 1.07733 6.3332C1.21915 6.3332 1.35954 6.36149 1.49029 6.41642C1.62104 6.47135 1.73952 6.55181 1.83878 6.6531L6.27806 11.152L14.1326 1.80655C14.1416 1.79531 14.1514 1.78463 14.1617 1.77455Z"
            fill="#01FFDB"
          />
        </svg>
      </a>
    </div>
    <div
      v-else
      class="last-bottom no-owner"
      v-text="'Вы не можете купить или добавить в избранное свой товар.'"
    ></div>
  </div>
</template>

<script>
import { imageUrlOrNotFound } from '~/helpers'

export default {
  name: 'OfferCard',
  props: {
    offer: {
      type: Object,
      required: true,
    },
    short: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      count: this.offer?.sale_from || 1,
    }
  },
  computed: {
    isAuth() {
      return Boolean(this.$auth.user)
    },
    isInFavourites() {
      return this.$store.getters['favourites/isInFavourites'](this.offer.id)
    },
    image() {
      return imageUrlOrNotFound(this.offer?.image || this.product?.image)
    },
    user() {
      return this.$auth.user
    },
    meCreator() {
      return this.offer?.me_creator || false
    },
    company() {
      return (
        this.$store.getters['catalog/findCompanyById'](this.offer.company_id) ||
        this.$store.getters['favourites/findCompanyById'](this.offer.company_id)
      )
    },
    rating() {
      return this.company?.rating || null
    },
    companyTitle() {
      return this.company?.short_name
    },
    inStock() {
      return this.offer.quantity > 0
    },
    quantity() {
      return this.offer.quantity
    },
    product() {
      return (
        this.$store.getters['catalog/findProductById'](this.offer.product_id) ||
        this.$store.getters['favourites/findProductById'](this.offer.product_id)
      )
    },
    productName() {
      return this.product?.name
    },
    unit() {
      return (
        this.$store.getters['catalog/findUnitById'](this.offer.unit_id) ||
        this.$store.getters['favourites/findUnitById'](this.offer.unit_id)
      )
    },
    unitTitle() {
      return this.unit?.title
    },
    linkToOffer() {
      return {
        name: 'catalog-slug',
        params: { slug: this.offer.slug },
      }
    },
    price() {
      return this.offer.price
    },
    isFavouritesRoute() {
      return this.$route.name === 'favourites'
    },
    saleFrom() {
      return this.offer?.sale_from
    },
    saleFromText() {
      return this.saleFrom + ' ' + this.unitTitle
    },
    isUserOwner() {
      return this.offer.company_id === this.$auth.user?.company?.id
    },
    isInCart() {
      return this.$store.getters['cart/isInCart'](this.offer.id, this.isAuth)
    },
  },
  watch: {
    count(value) {
      if (this.saleFrom) {
        if (value < this.saleFrom) {
          this.count = this.saleFrom
        } else if (value > this.offer.quantity) {
          this.count = this.offer.quantity
        }
      } else if (value < 0) {
        this.count = 0
      } else if (value > this.offer.quantity) {
        this.count = this.offer.quantity
      }
      if ((value[0] === '0' || value[0] === 0) && value.length > 1) {
        this.count *= 10
      }
    },
  },
  methods: {
    AddToCart() {
      if (this.meCreator) {
        return
      }
      if (this.isUserOwner) {
        this.$bvModal.show('noYourOwnCompany')
        return
      }
      this.$store.dispatch('cart/addToCart', {
        offerID: this.offer.id,
        quantity: this.count,
        auth: this.isAuth,
      })
      this.$emit('add-to-cart')
    },
    removeFromCart() {
      this.$store.dispatch('cart/removeFromCart', {
        offersID: this.offer.id,
        auth: this.isAuth,
      })
      this.$emit('remove-from-cart')
    },
    toggleFavourites() {
      this.$store.dispatch('favourites/toggleFavourites', {
        favourite: this.offer,
        auth: this.isAuth,
      })
    },
    changeCount() {
      if (this.count < this.saleFrom) {
        this.count = this.saleFrom
      } else if (this.count > this.offer.quantity) {
        this.count = this.offer.quantity
      }
    },
    inputCount() {
      if (!this.count) {
        this.count = 0
      }
    },
  },
}
</script>

<style scoped>
.favourites-active {
  fill: #01ffdb;
}
.no-owner {
  padding: 15px;
  text-align: center;
  color: #bcbcbc;
  font-size: 14px;
}
.disabled {
  color: #bcbcbc !important;
}
.disabled span {
  color: #bcbcbc;
}
</style>
