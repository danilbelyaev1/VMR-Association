<template>
  <main>
    <BreadCrumbs />
    <section class="container">
      <h2 class="w-100 pb-lg-4 pb-3 mb-3 colorWhite pt-lg-5 mb-1">
        Личный кабинет
      </h2>
      <div class="persAccount d-flex flex-wrap w-100">
        <nav class="persAccountPageNav">
          <ul>
            <li :class="active === 'profile' ? 'active' : ''">
              <a @click.prevent="active = 'profile'">
                <i class="ic profileIc"></i>
                ПРОФИЛЬ
              </a>
            </li>
            <li :class="active === 'pays' ? 'active' : ''">
              <a @click.prevent="active = 'pays'">
                <i class="ic payIc"></i>
                ПЛАТЕЖИ
              </a>
            </li>
            <li :class="active === 'documents' ? 'active' : ''">
              <a @click.prevent="active = 'documents'">
                <i class="ic documentIc"></i>
                ДОКУМЕНТЫ
              </a>
            </li>
            <li
              v-if="hasReports"
              :class="active === 'reporting' ? 'active' : ''"
            >
              <a @click.prevent="active = 'reporting'">
                <i class="ic reportingIc"></i>
                ОТЧЕТНОСТЬ
              </a>
            </li>
            <li :class="active === 'help' ? 'active' : ''">
              <a @click.prevent="active = 'help'">
                <i class="ic helpIc"></i>
                ПОМОЩЬ
              </a>
            </li>
            <li :class="active === 'setting' ? 'active' : ''">
              <a @click.prevent="active = 'setting'">
                <i class="ic settingsIc"></i>
                НАСТРОЙКИ АККАУНТА
              </a>
            </li>
          </ul>
        </nav>
        <personal-profile v-if="active === 'profile'" />
        <personal-pays v-if="active === 'pays'" />
        <personal-documents v-if="active === 'documents'" />
        <personal-reporting v-if="active === 'reporting'" />
        <personal-help v-if="active === 'help'" />
        <personal-setting v-if="active === 'setting'" />
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'PersonalPage',
  middleware: 'auth',
  data() {
    return {
      active: 'profile',
    }
  },
  computed: {
    hasReports() {
      return this.$auth.user.company.fill_reports
    },
  },
}
</script>

<style scoped></style>
