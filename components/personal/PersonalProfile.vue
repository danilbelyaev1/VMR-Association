<template>
  <div v-if="!$fetchState.pending" class="col px-0 wrapPersAccountProfile">
    <div class="persAccountProfile w-100">
      <h4 class="mb-2">
        {{ fullName }}
      </h4>
      <p>
        {{ jobTitle }}
      </p>
      <a
        :href="'tel:' + personalPhone"
        class="phoneLink contactPage d-table position-relative mt-3"
        >{{ personalPhone }}</a
      >
      <a
        :href="'mailto:' + personalEmail"
        class="mailLink contactPage d-table position-relative mt-3"
        >{{ personalEmail }}</a
      >
    </div>
    <div class="persAccountProfile w-100">
      <h4 class="mb-2">
        {{ fullName }}
      </h4>
      <a
        :href="'tel:' + personalPhone"
        class="phoneLink contactPage d-table position-relative mt-3"
        >{{ personalPhone }}</a
      >
      <a
        :href="'mailto:' + personalEmail"
        class="mailLink contactPage d-table position-relative mt-3"
        >{{ personalEmail }}</a
      >
      <a
        v-if="profile.company"
        href="#"
        class="textLink d-table"
        @click.prevent="showModal"
        >Карточка предприятия</a
      >
    </div>
    <client-only>
      <CompanyCardModal :company="profile.company" />
    </client-only>
  </div>
  <div v-else>
    <loader-spinner />
  </div>
</template>

<script>
export default {
  name: 'PersonalProfile',
  fetchOnServer: true,
  data() {
    return {
      profile: {},
    }
  },
  async fetch() {
    const url = '/profile'
    const params = new URLSearchParams()
    params.append('include', 'company')
    const response = await this.$axios.$get(url, {
      params,
    })

    this.profile = response.data
  },
  computed: {
    fullName() {
      return (
        this.profile?.name +
        ' ' +
        this.profile?.patronymic +
        ' ' +
        this.profile?.surname
      )
    },
    jobTitle() {
      return this.profile?.job_title
    },
    personalPhone() {
      return this.profile?.phone
    },
    personalEmail() {
      return this.profile?.email
    },
  },
  methods: {
    showModal() {
      this.$bvModal.show('companyCard-modal')
    },
  },
}
</script>

<style scoped></style>
