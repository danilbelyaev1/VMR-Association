<template>
  <div class="col px-0 wrapPersAccountPay">
    <div v-if="pays">
      <div class="persAccountPay w-100">
        <div class="persAccountPayTop d-flex w-100 align-items-center">
          <h6 class="mr-4">Сделка № 6435</h6>
          <p>01.02.2022</p>
        </div>
        <div class="persAccountPayMiddle">
          <a href="#" class="documentLink position-relative d-table">
            Название документа
          </a>
          <a href="#" class="documentLink position-relative d-table">
            Название документа
          </a>
          <a href="#" class="documentLink position-relative d-table">
            Название документа
          </a>
        </div>
        <div
          class="persAccountPayBottom d-flex w-100 flex-wrap justify-content-between"
        >
          <div class="textPrice d-inline-flex align-items-center">
            Сумма сделки:
            <div class="text">45 000 ₽</div>
          </div>
          <div class="textInfo d-inline-flex align-items-center">
            Компания-контрагент:
            <div class="text">ООО «Компания №1»</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>В данный момент никаких платежей не проводилось</div>
  </div>
</template>

<script>
export default {
  name: 'PersonalPays',
  data() {
    return {
      pays: null,
    }
  },
}
</script>

<style scoped></style>
