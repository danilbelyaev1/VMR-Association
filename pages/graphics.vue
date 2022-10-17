<template>
  <main class="content graph">
    <BreadCrumbs />
    <section class="graph">
      <div class="container">
        <h2>Графики</h2>
        <div v-if="!$fetchState.pending" class="row">
          <div class="col-3">
            <v-select-multiple
              v-if="products.length"
              v-model="chartProducts"
              class="mb-2"
              :options="products"
              label="name"
              placeholder="Выберите виды ВМР"
            />
            <!--            <date-picker-->
            <!--              v-model="date"-->
            <!--              range-->
            <!--              type="day"-->
            <!--              value-type="format"-->
            <!--              format="YYYY-MM-DD"-->
            <!--              placeholder="Выбрать период"-->
            <!--              @change="$fetch"-->
            <!--            />-->
          </div>
          <div class="col-9">
            <TotalStockBarChart />
            <ProductCharts
              v-for="productData in Object.values(productsData)"
              :key="productData.product_id"
              :product-data="productData"
            />
          </div>
        </div>
        <div v-else>
          <loader-spinner />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'GraphicsPage',

  fetchOnServer: false,

  data() {
    return {
      date: null,
      chartProducts: [],
      period: null,
    }
  },

  async fetch() {
    await this.$store.dispatch('filter/fetchProducts')
    await this.$store.dispatch('graphics/loadInitialProductIds')
    this.chartProductIds = this.$store.state.graphics.productIds
  },

  computed: {
    products() {
      return this.$store.getters['filter/getProducts']
    },

    chartProductIds: {
      get() {
        return this.chartProducts.map((product) => product.id)
      },
      set(v) {
        this.chartProducts = this.products.filter((product) => {
          return v.includes(product.id)
        })
      },
    },

    productsData() {
      return this.$store.state.graphics.products
    },
  },
  watch: {
    chartProducts(newVal, oldVal) {
      if (newVal.length === oldVal.length) {
        return
      }

      localStorage.setItem(
        'graphics_products',
        JSON.stringify(this.chartProductIds)
      )
      this.fetchGraphics()
    },
  },
  created() {
    this.$store.dispatch('filter/fetchProducts')
  },
  methods: {
    fetchGraphics() {
      if (!this.chartProductIds) {
        return
      }
      this.$store.dispatch('graphics/fetchTotalStocks', this.chartProductIds)
      this.$store.dispatch('graphics/fetchProducts', {
        productIds: this.chartProductIds,
        period: this.period,
      })
    },
  },
}
</script>
<style lang="scss">
.select-default {
  margin-bottom: 10px;
}
</style>
