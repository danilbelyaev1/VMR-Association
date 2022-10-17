<template>
  <div class="marketplace-catalog-wrapper not-found">
    <slot />
    <h3>Возможно, вас заинтересует</h3>
    <div class="row">
      <EventsItem
        v-for="event in newsRecommendations"
        :key="event.id"
        :event-item="event"
        :type="eventType"
        class="col-3"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    eventType: {
      required: true,
      type: Number,
    },
  },
  computed: {
    newsRecommendations() {
      return this.$store.state.news.recommendations
    },
  },
}
</script>
