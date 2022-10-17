<template>
  <div class="row">
    <template v-if="events.length">
      <EventsItem
        v-for="(event, idx) in events"
        :key="event.id"
        :event-item="event"
        :type="type"
        :is-first="idx === 0"
        :class="idx === 0 ? 'col-6' : 'col-3'"
      />
      <Pagination :meta="meta" @paginate="paginate" />
    </template>
    <div v-else class="h4 mt-4 col-12">Нет новостей</div>
  </div>
</template>

<script>
export default {
  name: 'EventsList',
  props: {
    events: {
      type: Array,
      required: true,
    },
    meta: {
      type: Object,
      default: () => {},
    },
    type: {
      type: Number,
      required: true,
    },
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page)
    },
  },
}
</script>

<style scoped></style>
