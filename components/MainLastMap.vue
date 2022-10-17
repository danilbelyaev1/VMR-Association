<template>
  <section class="main-last-map">
    <div class="container">
      <div class="main-last-map-wrapper">
        <div class="row">
          <div class="col-md-8">
            <div class="main-last-map-map">
              <h3>
                Карта объектов инфраструктуры отрасли обращения с отходами
                Московской области
              </h3>
              <div
                v-if="!$fetchState.pending"
                class="map"
                style="width: 100%; height: 457px"
              >
                <YandexMap
                  :center="[55.7522, 37.6156]"
                  :placemarks="placemarks"
                  :zoom="7"
                />
              </div>
              <div
                v-else
                class="d-flex align-content-center justify-content-center"
              >
                <div class="loader-wrap">
                  <span class="loader"></span>
                  <div class="loader-circle"></div>
                  <img src="/loader.svg" alt="" />
                </div>
              </div>
              <PlacemarkModal
                ref="placemarkModal"
                :placemark-detail="placemarkDetail"
                :placemark-name="placemarkName"
              />
            </div>
          </div>
          <div class="col-md-4">
            <ul>
              <li v-for="vmrcat in vmrCategory" :key="vmrcat.id">
                <div
                  v-if="vmrcat.icon"
                  class="left"
                  :style="{
                    background: `url(${vmrcat.icon.url}) center center no-repeat`,
                  }"
                ></div>
                <nuxt-link
                  :to="{
                    path: `/type-waste/${vmrcat.slug}`,
                    params: { id: vmrcat.id },
                  }"
                  class="right"
                >
                  {{ vmrcat.title }}
                  <svg
                    width="22"
                    height="17"
                    viewBox="0 0 17 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.5303 6.53033C16.8232 6.23744 16.8232 5.76256 16.5303 5.46967L11.7574 0.696698C11.4645 0.403805 10.9896 0.403805 10.6967 0.696698C10.4038 0.989592 10.4038 1.46447 10.6967 1.75736L14.9393 6L10.6967 10.2426C10.4038 10.5355 10.4038 11.0104 10.6967 11.3033C10.9896 11.5962 11.4645 11.5962 11.7574 11.3033L16.5303 6.53033ZM6.55671e-08 6.75L16 6.75L16 5.25L-6.55671e-08 5.25L6.55671e-08 6.75Z"
                      fill="white"
                    />
                  </svg>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import YMapPoint from '~/models/YMapPoint'

export default {
  name: 'MainLastMap',
  fetchOnServer: true,
  data() {
    return {
      receptionPoints: [],
      placemarkDetail: [],
      placemarkName: '',
    }
  },

  async fetch() {
    await this.$store.dispatch('vmrcategory/fetchVmrCategory')
    const responce = await this.$axios.get('/reception-points')
    console.log(responce)
    this.receptionPoints = responce.data.data
    // this.placemarks = await this.getPlacemarks(this.receptionPoints)
  },
  computed: {
    vmrCategory() {
      return this.$store.getters['vmrcategory/getVmrCategory']
    },
    linkToVmrCategory() {
      return {
        name: 'waste-type-id',
        params: { id: this.offer.id },
      }
    },
    placemarks() {
      return this.receptionPoints.map((place) => {
        return new YMapPoint({
          latitude: place.latitude,
          longitude: place.longitude,
          options: {
            placemarkId: place?.id,
            hintContent: place?.name,
            items: place?.detail || [],
            image: place?.image,
          },
          style: {
            preset: 'islands#blackStretchyIcon',
          },
          clickCallback: (e) => {
            const target = e.get('target')
            if (target?.properties?._data?.hintContent) {
              this.placemarkDetail = target?.properties?._data?.detail
              this.placemarkName = target?.properties?._data?.hintContent
              this.$bvModal.show('placemark-modal')
            }
          },
        })
      })
    },
  },
}
</script>

<style scoped></style>
