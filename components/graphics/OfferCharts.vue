<template>
  <div>
    <div v-if="priceLabels.length > 1" class="card-detail-graphic">
      <main-page-chart
        class="w-100"
        :labels="priceLabels"
        :values="priceValues"
        title="Динамика цены на товар"
      />
    </div>
    <div v-if="productDealsLabels.length > 1" class="card-detail-graphic">
      <main-page-chart
        class="w-100"
        :labels="productDealsLabels"
        :values="productDealsValues"
        title="Сделок с этим товаром"
      />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    priceData() {
      return Object.values(this.$store.state.graphics.products || {})
    },
    priceLabels() {
      return this.priceData.length > 0
        ? this.priceData[0].map(({ date }) => date)
        : []
    },
    priceValues() {
      return this.priceData.length > 0
        ? this.priceData[0].map((product) => product.avg_price)
        : []
    },
    productDeals() {
      return this.$store.state.graphics.productDeals
    },
    productDealsLabels() {
      return this.productDeals.map((product) => product.date)
    },
    productDealsValues() {
      return this.productDeals.map((product) => product.count_deals)
    },
  },
  methods: {},
}
</script>
