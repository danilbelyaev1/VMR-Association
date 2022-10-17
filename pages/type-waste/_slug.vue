<template>
  <main class="content">
    <BreadCrumbs
      :list="[
        {
          to: slug,
          title: [
            'Виды отходов',
            wmrCategoryContent.title ? ` - ${wmrCategoryContent.title}` : null,
          ]
            .filter((i) => !!i)
            .join(''),
        },
      ]"
    />
    <section class="types-waste">
      <div class="container">
        <h3>Виды отходов</h3>
        <div class="radio-section">
          <span v-for="wmrcat in vmrCategory" :key="wmrcat.id">
            <nuxt-link
              :to="{
                path: `/type-waste/${wmrcat.slug}`,
                params: { slug: wmrcat.slug },
              }"
              @click.prevent
            >
              <input
                :id="'radio-' + wmrcat.id"
                v-model="checkedId"
                type="radio"
                name="radio-waste"
                class="radio"
                :value="wmrcat.id"
                @change="fetchCategoryContent(wmrcat.slug)"
              />
              <label :for="'radio-' + wmrcat.id">{{ wmrcat.title }}</label>
            </nuxt-link>
          </span>
        </div>
        <div class="row">
          <div class="col-8" v-html="wmrCategoryContent.content"></div>
          <div class="col-4">
            <img
              v-for="(img, idx) in wmrCategoryContent.images"
              :key="'img-' + idx"
              :src="img.url"
              :alt="wmrCategoryContent.title"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'CategoryPage',
  fetchOnServer: true,
  asyncData({ params }) {
    const slug = params.slug
    return { slug }
  },
  data() {
    return {
      wmrCategoryContent: {},
      slug: '',
    }
  },

  async fetch() {
    await this.$store.dispatch('vmrcategory/fetchVmrCategory')
    await this.fetchCategoryContent(this.$route.params.slug)
  },
  computed: {
    vmrCategory() {
      return this.$store.getters['vmrcategory/getVmrCategory']
    },
    checkedId() {
      return this.wmrCategoryContent.id
    },
  },
  methods: {
    async fetchCategoryContent(id) {
      try {
        const params = new URLSearchParams()
        const url = `/categories/${id}`
        const response = await this.$axios.$get(url, {
          params,
        })
        this.wmrCategoryContent = response.data
      } catch (e) {
        this.$bvModal.show('something-wrong')
      }
    },
  },
}
</script>

<style scoped></style>
