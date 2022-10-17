<template>
  <div class="deal-card-content">
    <DealOfferItem
      v-for="offer in offers"
      :key="offer.id"
      :offer="offer"
      class="deal-card-content-product"
    />
  </div>
</template>

<script>
export default {
  name: 'DealOfferList',
  props: {
    offers: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped></style>
