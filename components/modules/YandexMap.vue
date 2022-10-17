<!--suppress JSUnresolvedVariable -->
<template>
  <div
    v-if="wasLoaded"
    :id="id"
    class="map"
    :class="{ loading: !yMapReady }"
  ></div>
</template>

<script>
/* eslint-disable no-undef */
import { imageUrlOrNotFound, StringHelper } from '~/helpers'
import MapPointModel from '~/models/YMapPoint'

/**
 * @typedef YandexMap
 * @property {MapPointModel[]} placemarks
 */
export default {
  name: 'YandexMap',
  props: {
    center: {
      type: Array,
      required: true,
    },
    zoom: {
      type: Number,
      default: 17,
    },
    placemarks: {
      type: Array,
      default: () => [],
    },
    noSuggestPanel: {
      type: Boolean,
      default: false,
    },
    controls: {
      type: Array,
      default: () => ['largeMapDefaultSet', 'fullscreenControl'],
    },
    needBuildRoute: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      id: null,
      map: null,
      mapPlacemarks: [],
      wasLoaded: false,
      geolocation: null,
      yMapReady: false,
    }
  },
  computed: {
    token() {
      return this.$store.getters['setting/getSettingByKey']('yandex_map_key')
        .value
    },
  },
  created() {
    this.id = StringHelper.generate(10)
  },
  mounted() {
    const settings = {
      apikey: this.token,
      lang: 'ru_RU',
      version: '2.1',
    }

    const query = new URLSearchParams(settings)
    this.$loadScript(`https://api-maps.yandex.ru/2.1?${query}`).then(() => {
      this.wasLoaded = true
      ymaps.ready(() => {
        this.yMapReady = true
        this.mapInit()
      })
    })
  },
  methods: {
    mapInit() {
      this.map = new ymaps.Map(
        this.id,
        {
          center: this.center,
          zoom: this.zoom,
          noSuggestPanel: this.noSuggestPanel,
          controls: this.controls,
        },
        {
          searchControlProvider: 'yandex#search',
        }
      )

      this.addPlaceMarks()
    },
    addPlaceMarks() {
      /** @type {YMapPoint[]} */
      const placemarks = this.placemarks
      if (!placemarks.length) {
        const [latitude, longitude] = this.map.getCenter()
        placemarks.push(new MapPointModel({ latitude, longitude }))
      }

      placemarks.forEach((placemark) => {
        const placeAddress =
          placemark.options.items?.find((e) => e.key === 'address')?.value || ''
        const placeSchedule =
          placemark.options.items?.find((e) => e.key === 'schedule')?.value ||
          ''
        const placePhones =
          placemark.options.items
            ?.filter((e) => e.key === 'phone')
            ?.map((i) => i.value) || []
        const placeUrl =
          placemark.options.items?.find((e) => e.key === 'url')?.value || ''

        const pStyles =
          'color: #fff; font-family: Mulish; font-weight: 400; line-height: 130%;font-size: 16px'

        const myPlacemark = new ymaps.Placemark(
          placemark.coordinate,
          Object.keys(placemark.options).length
            ? {
                balloonContent:
                  `<div style="max-width: 320px!important;background: #424754!important;">` +
                  `<img style="object-fit: cover" src="${imageUrlOrNotFound(
                    placemark.options.image
                  )}" width="100%" height="150px">` +
                  `<div style="padding: 1rem">` +
                  `<h1 style="font-size: 18px;color: #02d9c1;">${placemark.options.hintContent}</h1><br/>` +
                  (placeAddress
                    ? `<p style="${pStyles}">${placeAddress}</p> <br/>`
                    : '') +
                  (placeSchedule
                    ? `<p style="${pStyles}">${placeSchedule}</p> <br/>`
                    : '') +
                  placePhones.map(
                    (phone) => `<p style="${pStyles}">${phone}</p> <br/>`
                  ) +
                  (placeUrl
                    ? `<a href="${placeUrl}" target="_blank" style="color: #009393;font-size: 16px">${placemark.options.hintContent}</a>`
                    : '') +
                  '</div>' +
                  '</div>',
                // Зададим содержимое нижней части балуна.
                hintContent: `${placemark.options.hintContent} ${placeAddress}`,
                placemarkId: placemark.options.placemarkId,
              }
            : {},
          {
            preset: 'islands#blackStretchyIcon',
            balloonShadow: false,
            // balloonLayout: MyBalloonLayout,
            balloonPanelMaxMapArea: 0,
            // balloonContentLayout: MyBalloonContentLayout,
            // balloonPanelMaxMapArea: 0,
          }
        )

        this.mapPlacemarks.push(myPlacemark)
        this.map.geoObjects.add(myPlacemark)
      })
    },
    buildRoute() {
      if (this.needBuildRoute) {
        this.map.geoObjects.removeAll()

        ymaps.geolocation
          .get({
            provider: 'browser', // определяют собственную позицию с помощью браузера
          })
          .then((result) => {
            const userAddress = result.geoObjects.get(0).properties.get('text') // получение названия адреса

            const multiRoute = new ymaps.multiRouter.MultiRoute(
              {
                // Построение маршрута.(По умолчанию строится автомобильный маршрут.)
                referencePoints: [
                  userAddress, // передаю названия адреса (собственой позиции)
                  this.center,
                ],
              },
              {
                boundsAutoApply: true, // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
              }
            )
            this.map.geoObjects.add(multiRoute) // Добавление маршрута на карту.
          })
          .catch((_) => {})
      }
    },
  },
}
</script>

<style>
.map {
  width: 100%;
  height: 100%;
}
*[class*='balloon__content'] {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
