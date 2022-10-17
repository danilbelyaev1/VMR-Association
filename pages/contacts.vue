<template>
  <main class="content contacts">
    <BreadCrumbs />
    <section class="contacts">
      <div class="container">
        <h2>Контакты</h2>
        <h4 class="title">{{ contact_company_title }}</h4>
        <div v-if="!!contact_inn || !!contact_kpp" class="inn-kpp">
          <b>{{
            [!!contact_inn ? 'ИНН' : '', !!contact_kpp ? 'КПП' : '']
              .filter((i) => !!i)
              .join(' / ')
          }}</b>
          <b>{{ [contact_inn, contact_kpp].filter((i) => !!i).join(' / ') }}</b>
        </div>
        <div class="row">
          <div class="col-3">
            <a href="">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.582 12.549C26.582 9.82594 25.5003 7.21439 23.5748 5.28889C21.6493 3.36338 19.0377 2.28164 16.3146 2.28164C13.5916 2.28164 10.98 3.36338 9.05451 5.28889C7.129 7.21439 6.04726 9.82594 6.04726 12.549C6.04726 16.7609 9.41725 22.2506 16.3146 28.8262C23.212 22.2506 26.582 16.7609 26.582 12.549ZM16.3146 31.943C7.94787 24.3383 3.76562 17.8721 3.76562 12.549C3.76562 9.22081 5.08775 6.02892 7.44115 3.67552C9.79454 1.32213 12.9864 0 16.3146 0C19.6428 0 22.8347 1.32213 25.1881 3.67552C27.5415 6.02892 28.8637 9.22081 28.8637 12.549C28.8637 17.8721 24.6814 24.3383 16.3146 31.943Z"
                  fill="#01FFDB"
                />
                <path
                  d="M16.3135 15.9715C17.2212 15.9715 18.0917 15.6109 18.7335 14.9691C19.3754 14.3272 19.7359 13.4567 19.7359 12.549C19.7359 11.6413 19.3754 10.7708 18.7335 10.129C18.0917 9.48713 17.2212 9.12655 16.3135 9.12655C15.4058 9.12655 14.5353 9.48713 13.8934 10.129C13.2516 10.7708 12.891 11.6413 12.891 12.549C12.891 13.4567 13.2516 14.3272 13.8934 14.9691C14.5353 15.6109 15.4058 15.9715 16.3135 15.9715ZM16.3135 18.2531C14.8007 18.2531 13.3498 17.6521 12.2801 16.5824C11.2103 15.5127 10.6094 14.0618 10.6094 12.549C10.6094 11.0362 11.2103 9.58533 12.2801 8.5156C13.3498 7.44588 14.8007 6.84491 16.3135 6.84491C17.8263 6.84491 19.2772 7.44588 20.3469 8.5156C21.4166 9.58533 22.0176 11.0362 22.0176 12.549C22.0176 14.0618 21.4166 15.5127 20.3469 16.5824C19.2772 17.6521 17.8263 18.2531 16.3135 18.2531Z"
                  fill="#01FFDB"
                />
              </svg>
              <h6>{{ contact_address }}</h6>
            </a>
          </div>
          <div class="col-3">
            <a href="">
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.2705 30.8148H27.0691C3.78018 29.4756 0.473511 9.82519 0.0112887 3.82815C-0.0259555 3.36187 0.0291715 2.89283 0.173511 2.44789C0.31785 2.00296 0.548565 1.59088 0.852435 1.23526C1.15631 0.879645 1.52736 0.587482 1.94434 0.375513C2.36132 0.163545 2.81602 0.035937 3.2824 1.11122e-06H9.81277C10.2875 -0.00045846 10.7514 0.141642 11.1445 0.407897C11.5375 0.674151 11.8416 1.05229 12.0172 1.49333L13.8187 5.92593C13.9921 6.3568 14.0352 6.82913 13.9425 7.28426C13.8498 7.73938 13.6254 8.15724 13.2972 8.48593L10.7728 11.0341C11.1671 13.275 12.2402 15.3406 13.847 16.9517C15.4538 18.5627 17.5166 19.6412 19.7565 20.0415L22.3283 17.4933C22.662 17.1688 23.0837 16.9496 23.5411 16.8632C23.9985 16.7768 24.4711 16.827 24.9002 17.0074L29.3683 18.797C29.8027 18.9782 30.1733 19.2846 30.433 19.6772C30.6926 20.0698 30.8294 20.5308 30.8261 21.0015V27.2593C30.8261 28.2023 30.4515 29.1066 29.7847 29.7734C29.1179 30.4402 28.2135 30.8148 27.2705 30.8148ZM3.56684 2.37037C3.25251 2.37037 2.95106 2.49524 2.72879 2.7175C2.50653 2.93977 2.38166 3.24123 2.38166 3.55556V3.65037C2.92684 10.6667 6.42314 27.2593 27.1994 28.4444C27.3551 28.4541 27.5112 28.4329 27.6587 28.382C27.8062 28.3312 27.9422 28.2518 28.0589 28.1483C28.1756 28.0448 28.2708 27.9192 28.3389 27.7789C28.407 27.6385 28.4467 27.4861 28.4557 27.3304V21.0015L23.9876 19.2119L20.5861 22.5896L20.0172 22.5185C9.7061 21.2267 8.30759 10.9156 8.30759 10.8089L8.23647 10.24L11.6024 6.83852L9.82462 2.37037H3.56684Z"
                  fill="#01FFDB"
                />
              </svg>
              <h6>{{ contact_phone }}</h6>
            </a>
          </div>
          <div class="col-3">
            <a href="">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.8133 16C20.8133 18.6533 18.6533 20.8133 16 20.8133C13.3467 20.8133 11.1867 18.6533 11.1867 16C11.1867 13.3467 13.3467 11.1867 16 11.1867C18.6533 11.1867 20.8133 13.3467 20.8133 16ZM16 0C7.17733 0 0 7.17733 0 16C0 24.8227 7.17733 32 16 32C19.232 32 22.348 31.0373 25.0133 29.2173L25.0587 29.1853L22.9027 26.68L22.8667 26.7027C20.8195 28.0216 18.4353 28.7221 16 28.72C8.98667 28.72 3.28 23.0133 3.28 16C3.28 8.98667 8.98667 3.28 16 3.28C23.0133 3.28 28.72 8.98667 28.72 16C28.7181 16.9192 28.6176 17.8356 28.42 18.7333C28.0187 20.3853 26.8613 20.8907 25.9933 20.824C25.1213 20.7533 24.1 20.1307 24.092 18.6093V16C24.0899 13.8544 23.2367 11.7973 21.7197 10.28C20.2026 8.76266 18.1456 7.90914 16 7.90667C13.8542 7.90878 11.7968 8.76215 10.2795 10.2795C8.76215 11.7968 7.90878 13.8542 7.90667 16C7.90878 18.1458 8.76215 20.2032 10.2795 21.7205C11.7968 23.2378 13.8542 24.0912 16 24.0933C17.0665 24.0959 18.1227 23.886 19.1071 23.4757C20.0916 23.0655 20.9843 22.4632 21.7333 21.704C22.2068 22.4474 22.8614 23.0583 23.6357 23.4793C24.41 23.9003 25.2787 24.1175 26.16 24.1107C27.3253 24.1107 28.48 23.7213 29.4093 23.016C30.368 22.2867 31.084 21.2347 31.48 19.9693C31.5427 19.764 31.66 19.2973 31.66 19.2933L31.6627 19.276C31.896 18.2627 32 17.2493 32 16C32 7.17733 24.8227 0 16 0"
                  fill="#01FFDB"
                />
              </svg>
              <h6>{{ contact_email }}</h6>
            </a>
          </div>
          <SocButtons class="col-3 social" :show-title="true"> </SocButtons>
        </div>
      </div>
      <!--      <iframe :src="`https://yandex.ru/maps/?ll=${contact_coordinate.value}&z=12&l=map`" width="100%" height="457px" style="border:0;" loading="lazy"></iframe>-->
      <div
        v-if="!$fetchState.pending"
        class="map"
        style="width: 100%; height: 457px"
      >
        <YandexMap :center="contact_coordinate" />
      </div>
      <div v-else class="d-flex align-content-center justify-content-center">
        <div class="loader-wrap">
          <span class="loader"></span>
          <div class="loader-circle"></div>
          <img src="/loader.svg" alt="" />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'ContactsPage',
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
    contact_phone() {
      return (
        this.$store.getters['setting/getSettingByKey']('contact_phone')
          ?.value || ''
      )
    },
    contact_inn() {
      return (
        this.$store.getters['setting/getSettingByKey']('contact_inn')?.value ||
        ''
      )
    },
    contact_kpp() {
      return (
        this.$store.getters['setting/getSettingByKey']('contact_kpp')?.value ||
        ''
      )
    },
    contact_email() {
      return (
        this.$store.getters['setting/getSettingByKey']('contact_email')
          ?.value || ''
      )
    },
    yandex_map_key() {
      return (
        this.$store.getters['setting/getSettingByKey']('yandex_map_key')
          ?.value || ''
      )
    },
    contact_coordinate() {
      return (
        this.$store.getters['setting/getSettingByKey'](
          'contact_coordinate'
        )?.value?.split(',') || [0, 0]
      )
    },
    contact_company_title() {
      return (
        this.$store.getters['setting/getSettingByKey']('contact_company_title')
          ?.value || ''
      )
    },
    contact_address() {
      return (
        this.$store.getters['setting/getSettingByKey']('contact_address')
          ?.value || ''
      )
    },
    social() {
      return this.$store.getters['setting/getSettingByKey']('social')
    },
  },
}
</script>

<style scoped lang="scss">
.title {
  margin-bottom: 10px;
}
.inn-kpp {
  font-size: 20px;
  b:first-child {
    margin-right: 2rem;
  }

  margin-bottom: 30px;
}
</style>
