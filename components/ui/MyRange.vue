<template>
  <div class="my-range">
    <div class="wrapInput wrapRange">
      <input
        v-model="model[0]"
        type="number"
        :min="minVal"
        :max="maxVal"
        class="input-range-num"
        @change="changeValue"
      />
      <span>&mdash;</span>
      <input
        v-model="model[1]"
        type="number"
        :min="minVal"
        :max="maxVal"
        class="input-range-num"
        @change="changeValue"
      />
    </div>
    <vue-range-slider
      ref="range"
      v-model="model"
      :min="minVal"
      :max="maxVal"
      :step="step"
      :interval="interval"
      @change="changeValue"
    />
  </div>
</template>

<script>
export default {
  name: 'MyRange',
  props: {
    minVal: null,
    maxVal: null,
    value: [],
    step: {
      type: Number,
      default: 1,
    },
    interval: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      model: this.value,
    }
  },
  watch: {
    model(value) {},
  },
  mounted() {},
  methods: {
    checkMin() {
      if (this.model[0] < this.minVal) {
        this.model[0] = this.minVal
      }
      if (this.model[1] > this.maxVal) {
        this.model[1] = this.maxVal
      }
      if (this.model[0] >= this.model[1]) {
        this.model[0] = this.model[1]
      }
      if (this.model[1] <= this.model[0]) {
        this.model[1] = this.model[0]
      }
      console.log(this.maxVal, this.minVal)
    },
    changeValue() {
      this.$emit('change', this.model)
      console.log('change even emit', this.model)
    },
  },
}
</script>

<style scoped>
.my-range {
  margin-top: 8px;
}
.wrapRange {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
}
.input-range-num {
  width: 45% !important;
  padding: 2px 16px !important;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
