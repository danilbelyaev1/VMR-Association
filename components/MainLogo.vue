<template>
  <section class="main-association">
    <div class="container">
      <div
        style="background: url('/recycle.svg') center 50% no-repeat"
        class="main-association-wrapper"
      >
        <h1>АНО</h1>
        <h3>по переработке ВМР</h3>
        <nuxt-link
          v-if="!$auth.user"
          to="/register"
          class="btn btn-primary"
          tag="div"
          >Доступ к маркетплэйсу</nuxt-link
        >
        <nuxt-link v-if="!$auth.user" to="/members"
          >Узнать подробности
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MainLogo',
}
</script>

<style scoped></style>
