<template>
  <main class="content">
    <BreadCrumbs :slug="{ name: slug, title: offerTitle }" />
    <section v-if="Boolean(offer)" class="marketplace-detail">
      <div class="container">
        <div class="row">
          <div class="col-8">
            <div class="card-detail">
              <div class="card-detail-img">
                <img :src="image" alt="" />
              </div>
              <div class="card-detail-info">
                <h4 class="card-detail-title" v-text="offerTitle" />
                <a
                  v-if="!isUserOwner"
                  href="/"
                  class="card-detail-favorite h6"
                  @click.prevent="toggleFavourites"
                >
                  В избранное
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
                <div v-if="inStock" class="card-detail-number text-2">
                  В наличии: <span v-text="quantityText" />
                </div>
                <div v-if="saleFrom" class="card-detail-number text-2">
                  Минимальная сделка: <span v-text="saleFromText" />
                </div>
                <div class="card-detail-company text-2">
                  <div v-if="companyTitle" class="card-company-left">
                    Производитель:
                    <span v-text="companyTitle" />
                  </div>

                  <div v-if="rating" class="card-rate">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
                        fill="#FFD600"
                      />
                    </svg>
                    {{ rating }}
                  </div>
                </div>
                <div v-if="!isUserOwner" class="card-detail-bottom-wrapper">
                  <div class="card-detail-bottom">
                    <button
                      v-if="!inStock"
                      type="button"
                      class="btn btn-primary-unactive"
                    >
                      Нет в наличии
                    </button>
                    <button
                      v-if="isInCart"
                      type="button"
                      class="btn btn-primary"
                      @click="removeFromCart"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.1617 1.77455C14.261 1.67327 14.3794 1.59281 14.5102 1.53788C14.6409 1.48294 14.7813 1.45465 14.9231 1.45465C15.065 1.45465 15.2054 1.48294 15.3361 1.53788C15.4669 1.59281 15.5853 1.67327 15.6846 1.77455C16.1006 2.19492 16.1064 2.87419 15.6991 3.30183L7.09842 13.4691C7.00077 13.5763 6.88227 13.6625 6.75017 13.7224C6.61807 13.7822 6.47514 13.8145 6.33014 13.8172C6.18513 13.82 6.0411 13.7931 5.90684 13.7382C5.77259 13.6834 5.65094 13.6017 5.54933 13.4982L0.315874 8.19492C0.114037 7.98908 0.000976562 7.71229 0.000976562 7.42401C0.000976562 7.13573 0.114037 6.85894 0.315874 6.6531C0.415141 6.55181 0.533617 6.47135 0.664366 6.41642C0.795115 6.36149 0.935509 6.3332 1.07733 6.3332C1.21915 6.3332 1.35954 6.36149 1.49029 6.41642C1.62104 6.47135 1.73952 6.55181 1.83878 6.6531L6.27806 11.152L14.1326 1.80655C14.1416 1.79531 14.1514 1.78463 14.1617 1.77455Z"
                          fill="white"
                        />
                      </svg>
                      В корзине
                    </button>
                    <button
                      v-if="inStock && !isInCart"
                      type="button"
                      class="btn btn-primary"
                      @click="AddToCart"
                    >
                      В корзину
                    </button>
                    <div class="card-detail-price h4" v-text="unitPrice" />
                    <div class="card-detail-number-choice">
                      <span
                        @click.exact="count--"
                        @click.ctrl.exact="count -= 10"
                        @click.shift.exact="count -= 100"
                        @click.ctrl.shift.exact="count -= 1000"
                        >-</span
                      >
                      <InputValidate
                        v-model="count"
                        type="number"
                        class="number"
                        @change="changeCount"
                        @input="inputCount"
                      />
                      <span
                        @click.exact="count++"
                        @click.ctrl.exact="count += 10"
                        @click.shift.exact="count += 100"
                        @click.ctrl.shift.exact="count += 1000"
                        >+</span
                      >
                      <div
                        class="type"
                        v-text="countUnit === 'килограмм' ? 'кг' : 'кг'"
                      />
                    </div>
                  </div>
                </div>
                <div
                  v-else
                  class="card-detail-bottom-wrapper disabled"
                  v-text="
                    'Вы не можете купить или добавить в избранное свой товар.'
                  "
                ></div>
              </div>
            </div>
          </div>
          <div class="col-4 right">
            <div class="card-detail-info-right text-2">
              <!-- TODO реализовать в будущем -->
              Регион: <span>Московская область</span>
            </div>
            <div v-if="typeVMP" class="card-detail-info-right text-2">
              Вид ВМР: <span v-text="typeVMP" />
            </div>
            <div v-if="impurityPercent" class="card-detail-info-right text-2">
              Процент примеси: <span v-text="impurityPercent" />
            </div>
            <div v-if="type" class="card-detail-info-right text-2">
              Реалтайм / Фьючерс: <span v-text="type" />
            </div>
            <div
              v-if="type === 'Фьючерс'"
              class="card-detail-info-right text-2"
            >
              Поставка от: <span v-text="dateFrom" />
            </div>
            <div
              v-if="type === 'Фьючерс'"
              class="card-detail-info-right text-2"
            >
              Поставка до: <span v-text="dateTo" />
            </div>
            <div class="btn btn-outline" @click="openChatWithSeller">
              Написать продавцу
              <svg
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.25 6.97519e-09H16.75C17.5801 -5.43467e-05 18.3788 0.317554 18.9822 0.887671C19.5856 1.45779 19.948 2.23719 19.995 3.066L20 3.25V12.75C20.0001 13.5801 19.6824 14.3788 19.1123 14.9822C18.5422 15.5856 17.7628 15.948 16.934 15.995L16.75 16H3.25C2.41986 16.0001 1.62117 15.6824 1.01777 15.1123C0.414367 14.5422 0.0519987 13.7628 0.00500012 12.934L6.97518e-09 12.75V3.25C-5.43467e-05 2.41986 0.317554 1.62117 0.887672 1.01777C1.45779 0.414367 2.23719 0.0519987 3.066 0.00500012L3.25 6.97519e-09H16.75H3.25ZM18.5 5.373L10.35 9.663C10.258 9.71161 10.1568 9.74054 10.053 9.74795C9.94921 9.75535 9.84499 9.74106 9.747 9.706L9.651 9.664L1.5 5.374V12.75C1.50002 13.1892 1.66517 13.6123 1.96268 13.9354C2.26019 14.2585 2.6683 14.4579 3.106 14.494L3.25 14.5H16.75C17.1893 14.5 17.6126 14.3347 17.9357 14.037C18.2588 13.7392 18.4581 13.3309 18.494 12.893L18.5 12.75V5.373ZM16.75 1.5H3.25C2.81081 1.50002 2.38768 1.66517 2.06461 1.96268C1.74154 2.26019 1.54214 2.6683 1.506 3.106L1.5 3.25V3.679L10 8.152L18.5 3.678V3.25C18.5 2.81065 18.3347 2.38739 18.037 2.06429C17.7392 1.74119 17.3309 1.5419 16.893 1.506L16.75 1.5Z"
                  fill="#01FFDB"
                />
              </svg>
            </div>
            <ChatWithSeller ref="chatWithSeller" :offer="offer" />
          </div>
        </div>
        <div class="row justify-content-end">
          <div
            v-if="Boolean(description) || Boolean(productContent)"
            class="col-8"
          >
            <div v-if="description" class="card-detail-text">
              <h4>Комментарий продавца</h4>
              <div class="text-2" v-html="description" />
            </div>
            <div v-if="productContent" class="card-detail-text">
              <h4>Информация о товаре</h4>
              <div class="text-2" v-html="productContent" />
            </div>
          </div>
          <offer-charts class="col-4" />
        </div>
      </div>
      <client-only>
        <AddToCart />
        <DefaultModal
          modal-class="get-prices-modal"
          close-button-text="Понятно"
          modal-id="noYourOwnCompany"
          title="Этот товар уже ваш"
          text="Вы не можите купить товар который и так принадлежит вам"
        />
      </client-only>
    </section>
  </main>
</template>

<script>
import { imageUrlOrNotFound, pluralize } from '~/helpers'
import { priceFormatter } from '~/helpers/converter'
import { getTypeName } from '~/helpers/product'

export default {
  name: 'OfferPage',
  fetchOnServer: false,
  data() {
    return {
      offer: null,
      loader: false,
      count: 1,
    }
  },
  async fetch() {
    await this.fetchOffer()
  },
  head() {
    return {
      title: this.offerTitle,
    }
  },
  computed: {
    isAuth() {
      return Boolean(this.$auth.user)
    },
    image() {
      return imageUrlOrNotFound(this.offer?.image || this.offer.product?.image)
    },
    typeVMP() {
      return this.offer.product.name
    },
    offerTitle() {
      return this?.offer?.product?.name || null
    },
    declensions() {
      return this.offer?.unit?.declensions || []
    },
    countUnit() {
      return pluralize(this.count, this.declensions, false)
    },
    companyTitle() {
      return this.offer?.company?.short_name
    },
    rating() {
      return this.offer?.company?.rating || null
    },
    quantityText() {
      return pluralize(this.offer.quantity, this.declensions)
    },
    impurityPercent() {
      return this.offer.impurity_percent + '%'
    },
    saleFromText() {
      return pluralize(this.offer.sale_from, this.declensions)
    },
    saleFrom() {
      return this.offer.sale_from || 0
    },
    inStock() {
      return this.offer.quantity > 0
    },
    unitPrice() {
      return priceFormatter(this.offer.price)
    },
    description() {
      return this.offer?.description
    },
    productContent() {
      return this.offer?.product?.content || null
    },
    slug() {
      return this.offer?.slug || null
    },
    type() {
      return getTypeName(this.offer.type)
    },
    isInFavourites() {
      return this.$store.getters['favourites/isInFavourites'](this.offer.id)
    },
    meCreator() {
      return this.offer?.me_creator || false
    },
    isUserOwner() {
      return this.offer?.company?.id === this.$auth.user?.company?.id
    },
    dateFrom() {
      return this.$moment(this.offer?.date_from).format('DD-MM-YY') || null
    },
    dateTo() {
      return this.$moment(this.offer?.date_to).format('DD-MM-YY') || null
    },
    isInCart() {
      return this.$store.getters['cart/isInCart'](this.offer.id, this.isAuth)
    },
  },
  watch: {
    offer(value) {
      const productId = value.product?.id || null
      if (productId) {
        this.$store.dispatch('graphics/fetchProducts', {
          productIds: [productId],
        })
        this.$store.dispatch('graphics/fetchProductDeals', { productId })
      }
    },
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
  mounted() {},
  methods: {
    async fetchOffer() {
      try {
        this.loader = true
        const url = `/offers/${this.$route.params.slug}`
        const response = await this.$axios.$get(url)
        this.offer = response.data
        this.count = response.data?.sale_from || 1
      } catch (e) {
        if (e.response.status === 404) {
          this.$nuxt.error({ statusCode: 404, message: 'Page not found' })
        } else {
          // eslint-disable-next-line no-console
          console.error(e)
        }
      } finally {
        this.loader = false
      }
    },
    AddToCart() {
      if (this.meCreator) {
        return
      }
      if (this.offer.company.id === this.$auth.user?.company?.id) {
        this.$bvModal.show('noYourOwnCompany')
        return
      }
      this.$store.dispatch('cart/addToCart', {
        offerID: this.offer.id,
        quantity: this.count,
        auth: this.isAuth,
      })
      this.$bvModal.show('add-to-cart')
    },
    removeFromCart() {
      this.$store.dispatch('cart/removeFromCart', {
        offersID: this.offer.id,
        auth: this.isAuth,
      })
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
    openChatWithSeller() {
      if (this.$auth.check().valid) {
        this.$refs.chatWithSeller.open()
      } else {
        this.$bvModal.show('login-form')
      }
    },
  },
}
</script>

<style scoped>
.disabled {
  color: #bcbcbc !important;
}
</style>
