<template>
  <div class="offer-card">
    <div class="offer-card-left">
      <a href="" class="offer-title">{{ title }}</a>
      <div class="offer-quantity text-2">{{ quantityText }}</div>
    </div>
    <div class="offer-card-right">
      <div class="offer-price h4">{{ totalPrice }} ₽</div>
    </div>
  </div>
</template>

<script>
import { pluralize } from '~/helpers'

export default {
  name: 'CartOfferItem',
  props: {
    offer: {
      type: Object,
      required: true,
    },
  },
  computed: {
    totalPrice() {
      return this.offer.quantity * this.offer.price
    },
    title() {
      return this.offer.title
    },
    declensions() {
      return this.offer.unit?.declensions
    },
    quantity() {
      return this.offer.quantity
    },
    quantityText() {
      return pluralize(this.quantity, this.declensions)
    },
  },
}
</script>

<style scoped></style>
