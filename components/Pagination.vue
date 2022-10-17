<template>
  <section v-if="pages.length > 1" class="pagination">
    <div class="container">
      <div class="pagination-wrapper">
        <span class="prev pointer" @click="changePage(current_page - 1)">
          <svg
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 0.999999L0.999999 9L9 17"
              stroke="#F9F8FB"
              stroke-opacity="0.2"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <a
          v-for="page in pages"
          :key="page"
          class="page pointer"
          :class="{ active: page === current_page }"
          @click="changePage(page)"
          v-text="page"
        />
        <span class="next pointer" @click="changePage(current_page + 1)">
          <svg
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 17L9 9L1 1"
              stroke="#F9F8FB"
              stroke-opacity="0.2"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: {
    meta: {
      type: Object,
      required: true,
    },
    range: {
      type: Number,
      default: 2,
    },
  },
  computed: {
    current_page() {
      return this.meta?.current_page || 1
    },

    last_page() {
      return this.meta?.last_page || 1
    },

    /**
     * Найти первую страницу для цикла страниц
     * @returns {number}
     */
    firstPageForLoop() {
      let page = this.current_page - this.range

      const minPage = this.current_page - this.range * 2
      const minPageByLastPage = this.last_page - this.current_page + minPage
      if (page > minPageByLastPage) page = minPageByLastPage

      return page >= 1 ? page : 1
    },

    /**
     * Найти последнюю страницу для цикла страниц
     * @returns {number}
     */
    lastPageForLoop() {
      let page = this.firstPageForLoop + this.range * 2

      if (this.last_page < page) page = this.last_page

      return page
    },

    /**
     * Страницы на вывод пагинации
     * @returns {Number[]}
     */
    pages() {
      const pages = []

      for (
        let page = this.firstPageForLoop;
        page <= this.lastPageForLoop;
        page++
      ) {
        pages.push(page)
      }

      return pages
    },
  },

  methods: {
    changePage(page) {
      if (page === this.current_page || page < 1 || page > this.last_page) {
        return
      }

      const params = new URLSearchParams(location.search)

      params.set('page', page)
      const url = `${location.pathname}?${params.toString()}`

      this.$route.query.page = page
      window.history.replaceState({}, '', url)

      this.$emit('paginate', page)
    },
  },
}
</script>

<style scoped></style>
