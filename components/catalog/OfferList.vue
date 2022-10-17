<template>
  <div class="marketplace-catalog-wrapper" :class="{ 'not-found': !hasOffers }">
    <div class="marketplace-catalog-titles">
      <template v-if="hasOffers">
        <slot name="head">
          <div class="text-2" />
        </slot>
        <div class="filters-view">
          <div
            class="filters-view-rows"
            :class="{ 'filters-view-active': isRowView }"
            @click="setRowView"
          >
            <ViewRowSvg />
          </div>
          <div
            class="filters-view-columns"
            :class="{ 'filters-view-active': isColumnView }"
            @click="setColumnView"
          >
            <ViewColumnSvg />
          </div>
        </div>
      </template>
      <slot v-else name="not-found-title"></slot>
    </div>
    <slot name="body"></slot>
    <template v-if="hasOffers">
      <div class="marketplace-catalog" :class="{ 'catalog-row': isRowView }">
        <div class="row">
          <div v-for="offer in offers" :key="offer.id" class="col-3">
            <OfferCard
              :offer="offer"
              :short="shortCard"
              @add-to-cart="showAddToCart"
              @remove-from-cart="showRemoveFromCart"
            />
          </div>
        </div>
        <client-only>
          <AddToCart />
          <DefaultModal
            modal-class="get-prices-modal"
            close-button-text="Понятно"
            modal-id="dModal"
            :title="dModal.title"
            :text="dModal.text"
            @close="dModalClose"
          />
        </client-only>
      </div>

      <Pagination :meta="meta" @paginate="paginate" />
    </template>
    <slot v-else name="not-found-wrap"></slot>
  </div>
</template>

<script>
import ViewRowSvg from '~/components/svg/ViewRowSvg'
import ViewColumnSvg from '~/components/svg/ViewColumnSvg'

export default {
  name: 'OfferList',

  components: { ViewColumnSvg, ViewRowSvg },

  props: {
    offers: {
      type: Array,
      required: true,
    },
    meta: {
      type: Object,
      default: () => {},
    },
    shortCard: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      dModal: {
        title: '',
        text: '',
      },
    }
  },

  computed: {
    hasOffers() {
      return Boolean(this.offers.length)
    },
    isRowView() {
      return this.$store.getters['catalog/isRowView']
    },
    isColumnView() {
      return this.$store.getters['catalog/isColumnView']
    },
  },

  methods: {
    setRowView() {
      this.$store.commit('catalog/changeViewToRow')
    },
    setColumnView() {
      this.$store.commit('catalog/changeViewToColumn')
    },
    paginate(page) {
      this.$emit('paginate', page)
    },
    showAddToCart() {
      this.dModal.title = 'Товар добавлен в корзину'
      this.$bvModal.show('dModal')
    },
    showRemoveFromCart() {
      this.dModal.title = 'Товар удален из корзины'
      this.$bvModal.show('dModal')
    },
    dModalClose() {
      this.dModal.title = ''
      this.dModal.text = ''
    },
  },
}
</script>

<style scoped></style>
