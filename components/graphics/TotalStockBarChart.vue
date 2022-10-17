<template>
  <div>
    <h4>Наличие ВМР</h4>

    <div class="text-2">
      График показывает объем предложения товара на начало дня и % предложения
      товара на данный момент.
    </div>

    <bar-chart-main :labels="labels" :values="values" />
  </div>
</template>

<script>
export default {
  computed: {
    labels() {
      return this.$store.getters['graphics/getTotalStockLabels']
    },
    values() {
      return this.$store.getters['graphics/getTotalStockValues']
    },
  },
  methods: {},
}
</script>
