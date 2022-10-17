<template>
  <div>
    <h4 class="mt-5">{{ productData[0].product_name }}</h4>

    <div class="row">
      <div v-if="labels.length > 1" class="col-6">
        <h5 class="mb-3">Динамика цены</h5>
        <line-chart-main :labels="labels" :values="lineValues" />
      </div>
      <div class="col-6">
        <h5 class="mb-3">Динамика объема</h5>
        <bar-chart-main :labels="labels" :values="barValues" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    productData: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {}
  },
  computed: {
    labels() {
      return this.productData.map((item) => item.date)
    },
    barValues() {
      return this.productData.map((item) => item.stocks)
    },
    lineValues() {
      return this.productData.map((item) => item.avg_price)
    },
  },
  methods: {},
}
</script>
