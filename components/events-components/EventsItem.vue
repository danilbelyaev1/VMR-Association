<template>
  <div v-if="isFirst">
    <NuxtLink
      :to="linkToEvent"
      :style="{
        background: `linear-gradient(360deg, rgba(66, 71, 84, 0.9) 0%, rgba(66, 71, 84, 0.9) 25.67%, rgba(55, 60, 73, 0.474394) 47.54%, rgba(0, 0, 0, 0) 68.83%),
           url(${image}) center center /cover no-repeat`,
      }"
      class="news-big"
    >
      <div class="news-info">
        <div class="news-date text-3">{{ dateString }}</div>
        <NuxtLink
          :to="linkToEvent"
          class="news-title h4"
        >
        {{
          eventItem.title
        }}
        </NuxtLink>
        <div class="news-subtitle text-1">{{ eventItem.short_desc }}</div>
      </div>
    </NuxtLink>
  </div>
  <NuxtLink v-else :to="linkToEvent">
    <div
      :style="{
        background: `url(${image}) center center /cover no-repeat`,
      }"
      class="news-top"
    ></div>
    <div class="news-info">
      <div class="news-date text-3">{{ dateString }}</div>
      <NuxtLink :to="linkToEvent" class="news-title h5" @click.prevent>{{ eventItem.title }}</NuxtLink>
      <div class="news-subtitle text-2">{{ eventItem.short_desc }}</div>
    </div>
  </NuxtLink>
</template>

<script>
import { imageUrlOrNotFound } from '~/helpers'

export default {
  name: 'EventsItem',
  props: {
    eventItem: {
      type: Object,
      default() {
        return {}
      },
    },
    isFirst: {
      type: Boolean,
      default() {
        return false
      },
    },
    type: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      date: new Date(this.eventItem.date),
    }
  },
  computed: {
    linkToEvent() {
      return {
        name: this.type === 1 ? 'news-slug' : 'events-slug',
        params: { slug: this.eventItem.slug },
      }
    },
    image() {
      return imageUrlOrNotFound(this.eventItem?.image)
    },
    dateString() {
      return this.date.toLocaleDateString()
    },
  },
}
</script>

<style scoped>
.news-subtitle {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.3em;
  height: 3.9em;
}
</style>
