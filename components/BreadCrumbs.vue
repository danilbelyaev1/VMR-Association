<template>
  <section class="bread-crumbs">
    <div class="container">
      <ul class="bread-crumbs-wrapper">
        <li class="item">
          <nuxt-link :to="'/'" class="title">Главная</nuxt-link>
        </li>
        <li v-for="(item, i) in crumbs" :key="i" class="item">
          <span>—</span>
          <nuxt-link
            v-if="i + 1 !== crumbs.length"
            :to="item.to"
            class="title"
            active-class="active"
          >
            {{ item.title }}
          </nuxt-link>
          <span v-else>
            {{ item.title }}
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { PAGE_TITLES } from '~/helpers/breadcrumbs'

export default {
  name: 'BreadCrumbs',
  props: {
    slug: {
      type: Object,
      default() {
        return {}
      },
    },
    list: {
      type: Array,
      default() {
        return []
      },
    },
  },
  computed: {
    crumbs() {
      if (this.list.length) {
        return this.list
      }

      const pathArray = this.$route.path.split('/')
      pathArray.shift()
      return pathArray.reduce((breadcrumbArray, path, idx) => {
        console.log(path)
        breadcrumbArray.push({
          to: breadcrumbArray[idx - 1]
            ? breadcrumbArray[idx - 1].to + '/' + path
            : '/' + path,
          title:
            this.slug && this.slug.name === path
              ? this.slug.title
              : PAGE_TITLES[path] || path,
        })
        return breadcrumbArray
      }, [])
    },
  },
  mounted() {
    console.log(this.crumbs)
    console.log(this.slug)
  },
}
</script>
