<template>
  <div></div>
</template>
<script>
import { debounce } from 'lodash'

export default {
  data() {
    return {
      debouncedSearch: null,
    }
  },
  computed: {
    searchInput: {
      get() {
        return this.$store.state.search.searchText
      },
      set(v) {
        this.$store.dispatch('search/setSearchText', v)
      },
    },
  },
  created() {
    this.debouncedSearch = debounce(this.search, 1000)
    const query = this.$route.query.q
    if (query) {
      this.searchInput = query
      this.search()
    }
  },
  mounted() {},
  methods: {
    search() {
      if (this.searchInput === '') {
        return
      }
      this.debouncedSearch.cancel()
      this.$router.push({ path: '/search', query: { q: this.searchInput } })
    },
  },
}
</script>
