<template>
  <main class="content">
    <BreadCrumbs />
    <section v-if="!$fetchState.pending" class="about">
      <div class="container">
        <h2 v-html="page_about_title.value"></h2>
        <div class="row">
          <div class="col-4">
            <h3 v-html="page_about_subtitle_1.value"></h3>
          </div>
          <div class="col-8">
            <h5 v-html="page_about_text_1.value"></h5>
          </div>
        </div>
        <img class="about-img-center" :src="page_about_image.value" alt="" />
        <div class="row">
          <div class="col-4">
            <h3 v-html="page_about_subtitle_2.value"></h3>
            <div class="img-wrapper">
              <img :src="page_about_left_image_1.value" alt="" />
              <img :src="page_about_left_image_2.value" alt="" />
            </div>
          </div>
          <div class="col-8">
            <div class="text-2" v-html="page_about_text_2.value"></div>
          </div>
        </div>
      </div>
    </section>
    <div v-else>Загрузка...</div>
  </main>
</template>

<script>
export default {
  name: 'AboutPage',
  fetchOnServer: true,

  data() {
    return {
      data: [],
    }
  },

  async fetch() {
    await this.$store.dispatch('setting/fetchSetting')
  },
  computed: {
    page_about_title() {
      return this.$store.getters['setting/getSettingByKey']('page_about_title')
    },
    page_about_subtitle_1() {
      return this.$store.getters['setting/getSettingByKey'](
        'page_about_subtitle_1'
      )
    },
    page_about_text_1() {
      return this.$store.getters['setting/getSettingByKey']('page_about_text_1')
    },
    page_about_image() {
      return this.$store.getters['setting/getSettingByKey']('page_about_image')
    },
    page_about_subtitle_2() {
      return this.$store.getters['setting/getSettingByKey'](
        'page_about_subtitle_2'
      )
    },
    page_about_text_2() {
      return this.$store.getters['setting/getSettingByKey']('page_about_text_2')
    },
    page_about_left_image_1() {
      return this.$store.getters['setting/getSettingByKey'](
        'page_about_left_image_1'
      )
    },
    page_about_left_image_2() {
      return this.$store.getters['setting/getSettingByKey'](
        'page_about_left_image_2'
      )
    },
  },
}
</script>

<style scoped></style>
