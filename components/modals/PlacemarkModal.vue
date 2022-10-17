<template>
  <b-modal
    id="placemark-modal"
    hide-header-close
    hide-footer
    centered
    content-class="placemodal-content"
    header-class="placemodal-header"
    size="sm"
  >
    <template #modal-header="{}">
      <div
        class="image"
        :style="{ background: `url(${image}) center center / cover no-repeat` }"
      >
        <button class="btnNone ic close" @click="close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </template>
    <!--    <div class="image" :style="{background: `url(${image}) center center / cover no-repeat`}"></div>-->
    <h5 class="placemark-name">{{ placemarkName }}</h5>
    <div class="d-flex mt-4 flex-column">
      <div v-if="placeAddress" class="">{{ placeAddress.value }}</div>
      <div v-if="placeSchedule" class="mt-3">{{ placeSchedule.value }}</div>
      <div v-if="placePhones">
        <div v-for="(phone, i) in placePhones" :key="i" class="mt-3">
          {{ phone.value || '' }}
        </div>
      </div>
      <div v-if="placeUrl" class="mt-3 mb-5">
        <a class="placemark-link" :href="placeUrl.value">{{ placemarkName }}</a>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { imageUrlOrNotFound } from '~/helpers'

export default {
  name: 'PlacemarkModal',
  props: {
    modalShow: {
      type: Boolean,
      default: false,
    },
    placemarkDetail: {
      type: Array,
      required: true,
    },
    placemarkName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    placeAddress() {
      return (
        this.placemarkDetail?.find((e) => e.key === 'address') || { value: '' }
      )
    },
    placeSchedule() {
      return (
        this.placemarkDetail?.find((e) => e.key === 'schedule') || { value: '' }
      )
    },
    placePhones() {
      return this.placemarkDetail?.filter((e) => e.key === 'phone') || []
    },
    placeUrl() {
      return this.placemarkDetail?.find((e) => e.key === 'url') || { value: '' }
    },
    image() {
      return imageUrlOrNotFound()
    },
  },
  methods: {
    close() {
      this.$bvModal.hide('placemark-modal')
    },
  },
}
</script>

<style scoped>
.image {
  width: 100%;
  height: 239px;
}
.placemark-name {
  color: #02d9c1;
}
.placemark-link {
  color: #009393;
}
</style>
