<template>
  <div class="deal-card-content-product">
    <div class="left">
      <h6>{{ title }}</h6>
    </div>
    <div class="right">
      <div class="text-2">
        <span>Количество:</span>{{ quantity + ' ' + unit_title }}
      </div>
      <div class="text-2">
        <span>Цена за единицу:</span>{{ priceByUnit + ' ' + '₽' }}
      </div>
      <div class="text-2">
        <span>Стоимость:</span>{{ priceTotal + ' ' + '₽' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DealOfferItem',
  props: {
    offer: {
      type: Object,
      required: true,
    },
  },
  computed: {
    title() {
      return this.offer?.title || ''
    },
    quantity() {
      return this.offer?.quantity || ''
    },
    unit_title() {
      return this.offer?.unit.title || ''
    },
    priceByUnit() {
      return this.offer?.offer.price || ''
    },
    priceTotal() {
      return this.priceByUnit * this.quantity
    },
  },
}
</script>

<style scoped></style>
