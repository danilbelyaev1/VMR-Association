<template>
  <div class="marketplace-card">
    <div>
      <div class="mobile-wrapper-cart">
        <div
          :style="{
            background: `url(${image}) center center / cover no-repeat`,
          }"
          class="last-img"
        ></div>
        <div class="last-title text-2">{{ productName }}</div>
      </div>
      <div v-if="offerStockLessThenQuantity">
        <span>
          Осталось {{ quantityInStock + ' ' + unitTitle }}.
          <span
            @click.prevent="alert"
            v-text="'Купить максимально возможное количество'"
          />
        </span>
      </div>
    </div>
    <div class="mobile-wrapper-cart2">
      <div class="card-detail-number-choice">
        <span
          class="no-user-select"
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
          input-class="no-border"
          :disable-root-classes="true"
          :disable-input-classes="true"
          :disabled="offerStockLessThenQuantity"
        />
        <span
          class="no-user-select"
          @click.exact="count++"
          @click.ctrl.exact="count += 10"
          @click.shift.exact="count += 100"
          @click.ctrl.shift.exact="count += 1000"
          >+</span
        >
        <div class="type">{{ unitTitle }}</div>
      </div>
      <h6 class="last-price">
        {{ price }} ₽
        <span class="last-subtitle text-3">за {{ unitTitle }}</span>
      </h6>
    </div>

    <div v-if="false" class="last-company-rate">
      <div class="company">ООО «Компания №1»</div>
      <div class="rate">
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
        <span>4,6</span>
      </div>
    </div>
    <div class="last-bottom">
      <a href="" class="left" @click.prevent="toggleFavourites">
        <span>В избранное</span>
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
    </div>
    <a href="" class="delete" @click.prevent="removeFromCart">
      <IconCrossSvg />
    </a>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { imageUrlOrNotFound } from '~/helpers'

export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      count: this.item?.quantity,
    }
  },
  computed: {
    isAuth() {
      return Boolean(this.$auth.user)
    },
    isInFavourites() {
      return this.$store.getters['favourites/isInFavourites'](
        this.item.offer.id
      )
    },
    image() {
      return imageUrlOrNotFound(
        this.item?.offer?.image || this.item?.offer?.product?.image
      )
    },
    productName() {
      return this.item?.offer?.product?.name
    },
    quantity() {
      return this.item?.quantity
    },
    quantityDelta() {
      return this.count - this.quantity
    },
    quantityInStock() {
      return this.item?.offer.quantity
    },
    price() {
      return this.item?.offer?.price
    },
    unit() {
      return this.$store.getters['cart/findUnitById'](this.item?.offer?.unit_id)
    },
    unitTitle() {
      return this.unit?.title
    },
    saleFrom() {
      return this.item?.offer?.sale_from || 1
    },
    offerStockLessThenQuantity() {
      return this.quantity > this.quantityInStock
    },
  },
  watch: {
    count(value) {
      if (value <= this.saleFrom) {
        this.count = this.saleFrom
      }
      if (value >= this.quantityInStock) {
        this.count = this.quantityInStock
      }
      this.debouncedDispatchCount()
    },
    // quantityDelta() {
    //   this.debouncedDispatchCount()
    // }
  },
  created() {
    this.debouncedDispatchCount = debounce(this.dispatchCount, 300)
  },
  methods: {
    change() {
      this.debouncedDispatchCount()
    },
    async dispatchCount() {
      await this.$store.dispatch('cart/addToCart', {
        offerID: this.item.offer.id,
        quantity: this.quantityDelta,
        auth: this.isAuth,
      })
    },
    changeCount() {},
    inputCount() {},
    toggleFavourites() {
      this.$store.dispatch('favourites/toggleFavourites', {
        favourite: this.item.offer,
        auth: this.isAuth,
      })
    },
    removeFromCart() {
      this.$emit('remove-from-cart')
      this.$store.dispatch('cart/removeFromCart', {
        offersID: this.item.offer.id,
        auth: this.isAuth,
      })
      console.log('remove emit', this.item.offer.id, this.isAuth)
    },
  },
}
</script>

<style scoped>
.no-user-select {
  user-select: none;
}
</style>
