<template>
  <div v-show="labels.length > 1">
    <div class="main-graphics-title">
      <template v-if="diff < 0">-</template>
      <template v-else>+</template>
      <span>{{ Math.abs(diff) }}</span>
    </div>
    <div class="main-graphics-subtitle">
      {{ title }}
      <!--    <a-->
      <!--      id="main-graphics-filter3"-->
      <!--      type="button"-->
      <!--      data-toggle="dropdown"-->
      <!--      aria-expanded="false"-->
      <!--    >-->
      за все время
      <!--    </a>-->
      <div
        aria-labelledby="main-graphics-filter"
        class="dropdown-menu main-graphics-subtitle-filter"
      >
        <a class="dropdown-item" href="">последнюю неделю</a>
        <a class="dropdown-item" href="">последний год</a>
      </div>
    </div>
    <div class="main-graphics-graphic">
      <LineChartMain :labels="labels" :values="valueArr" />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    labels: {
      required: true,
      type: Array,
    },
    values: {
      required: true,
      type: Array,
    },
    title: {
      required: true,
      type: String,
    },
    cumulativeSum: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {}
  },
  computed: {
    valueArr() {
      if (this.cumulativeSum) {
        // eslint-disable-next-line no-return-assign
        return this.values.map((sum => value => sum += value)(0))
      }
      return this.values
    },
    diff() {
      return this.getDiff(this.valueArr)
    },
  },
  methods: {
    getDiff(arr) {
      if (arr.length === 0) {
        return 0
      }
      const first = arr[0]
      const last = arr[arr.length - 1]
      return Math.round(last - first)
    },
  },
}
</script>
