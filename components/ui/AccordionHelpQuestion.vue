<template>
  <div>
    <button
      class="btnAccordion text-left btnNone w-100 position-relative"
      :class="
        accordionData.answer ? 'opacityAccordion-h' : 'opacityAccordion-h'
      "
      @click="toggleOpen"
    >
      <span class="question-text">{{ accordionData.question }}</span>
      <br />
      <span class="date-text">
        {{ 'Вопрос от ' + date }}
      </span>
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
  name: 'AccordionHelpQuestion',
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
  computed: {
    date() {
      return new Date(this.accordionData?.created_at).toLocaleDateString()
    },
  },
  methods: {
    toggleOpen() {
      if (this.accordionData.answer) {
        this.isOpen = !this.isOpen
      }
    },
  },
}
</script>

<style scoped>
.open {
  max-height: 666px !important;
}
.opacityAccordion-h:after {
  background-image: none !important;
}
.question-text {
  line-height: 140%;
}
.date-text {
  font-size: 16px;
  color: #bcbcbc;
  line-height: 140%;
  font-weight: 400;
}
</style>
