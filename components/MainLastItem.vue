<template>
  <div class="col">
    <nuxt-link :to="linkToOffer">
      <div
        :style="{ background: `url(${image}) center center / cover no-repeat` }"
        class="last-img"
      ></div>
      <div class="last-title text-2">{{ productName }}</div>
      <h6 class="last-price">{{ price }} ₽</h6>
      <div class="last-subtitle text-3">за {{ unitTitle }}</div>
    </nuxt-link>
  </div>
</template>

<script>
import { imageUrlOrNotFound } from '~/helpers'

export default {
  name: 'MainLastItem',

  props: {
    last: {
      type: Object,
      required: true,
    },
  },
  computed: {
    image() {
      return imageUrlOrNotFound(this.last?.image || this.product?.image)
    },
    user() {
      return this.$auth.user
    },
    meCreator() {
      return this.last?.me_creator || false
    },
    company() {
      return this.$store.getters['catalog/findCompanyById'](
        this.last.company_id
      )
    },
    companyTitle() {
      return this.company?.short_name
    },
    inStock() {
      return this.last.quantity > 0
    },
    product() {
      return this.$store.getters['catalog/findProductById'](
        this.last.product_id
      )
    },
    productName() {
      return this.product?.name
    },
    unit() {
      return this.$store.getters['catalog/findUnitById'](this.last.unit_id)
    },
    unitTitle() {
      return this.unit?.title
    },
    linkToOffer() {
      return {
        name: 'catalog-slug',
        params: { slug: this.last.slug },
      }
    },
    price() {
      return this.last.price
    },
  },
}
</script>

<style scoped></style>
