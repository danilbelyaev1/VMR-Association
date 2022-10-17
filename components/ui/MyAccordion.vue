<template>
  <div>
    <button
      class="btnAccordion text-left btnNone opacityAccordion-h w-100 position-relative"
      @click="toggleOpen"
    >
      {{ accordionData.question }}
    </button>
    <div class="mainAccordion-content w-100" :class="isOpen ? 'open' : ''">
      <div class="opacityAccordion-content w-100">
        <p>
          {{ accordionData.answer }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyAccordion',
  props: {
    accordionData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style scoped>
.open {
  max-height: 666px !important;
}
</style>
