<template>
  <div class="swiper-slide">
    <div class="swiper-slide-titles">
      <span>Сделка от {{ dealDateCreated }}</span>
      <span>{{ dealTimeCreated }}</span>
    </div>
    <ul>
      <li v-for="(offer, index) in deal.offers" :key="index">
        <div class="last-deal-product-name">
          {{ offer.title }} <span>{{ offer.quantity }}</span>
        </div>
        <div class="last-deal-product-price">
          {{ priceFormat(offer.price) }}
        </div>
      </li>
    </ul>
    <div class="swiper-slide-bottom">
      <div class="deal-price">
        Сумма сделки: <span>{{ totalPrice }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { priceFormatter } from '~/helpers/converter'

export default {
  name: 'MainLastDealItem',
  props: {
    deal: {
      type: Object,
      required: true,
    },
  },
  computed: {
    createdAt() {
      return this.$moment(this.deal.created_at)
    },
    dealDateCreated() {
      return this.createdAt.format('DD.MM.YYYY')
    },
    dealTimeCreated() {
      return this.createdAt.format('HH : mm')
    },
    totalPrice() {
      return priceFormatter(this.deal.price)
    },
  },
  methods: {
    priceFormat(price) {
      return priceFormatter(price)
    },
  },
}
</script>
