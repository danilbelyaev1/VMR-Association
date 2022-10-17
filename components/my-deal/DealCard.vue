<template>
  <div>
    <div class="deal-card-top">
      <nuxt-link :to="linkToDeal">
        <div class="left">
          <h6 class="deal-number">Сделка № {{ dealId }} от {{ dealDate }}</h6>
          <div class="text-2 color-tur" v-text="dealStatusText"></div>
          <div class="arrow">
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.7071 8.70735C17.0976 8.31683 17.0976 7.68366 16.7071 7.29314L10.3431 0.929176C9.95262 0.538652 9.31946 0.538652 8.92893 0.929176C8.53841 1.3197 8.53841 1.95287 8.92893 2.34339L14.5858 8.00024L8.92893 13.6571C8.53841 14.0476 8.53841 14.6808 8.92893 15.0713C9.31946 15.4618 9.95262 15.4618 10.3431 15.0713L16.7071 8.70735ZM0 9.00024H16V7.00024H0L0 9.00024Z"
                fill="#01FFDB"
              />
            </svg>
          </div>
        </div>
      </nuxt-link>
      <div class="right">
        <div class="text-2">Количество</div>
        <div class="text-2">Цена за ед.</div>
        <div class="text-2">Стоимость</div>
      </div>
    </div>
    <DealOfferList :offers="deal_offers"> </DealOfferList>
    <div class="deal-card-center">
      <div class="text-2">
        Сумма сделки: <span>{{ totalPrice }} ₽ </span>
      </div>
      <div class="text-2">
        Компания-контрагент: <span>{{ contrAgentName }}</span>
      </div>
    </div>
    <div class="deal-card-bot">
      <div v-if="!isCanceled" class="top">
        <div class="left">
          <div class="signing-status mt-2">
            <div v-if="customerSigned" class="text-2 mt-4">
              {{ 'Покупатель подписал документ' + ' ' + customerSignedAtText }}
            </div>
            <div v-else class="text-2 mt-2">Ожидается подпись покупателя</div>
            <div v-if="sellerSigned" class="text-2 mt-2">
              {{ 'Продавец подписал документ' + ' ' + sellerSignedAtText }}
            </div>
            <div v-else class="text-2 mt-2">Ожидается подпись продавца</div>
          </div>
          <div v-if="!isUserSigned" class="text-2 mt-2">
            Не знаете как подписать документ электронной подписью?
            <a
              target="_blank"
              href="https://www.cryptopro.ru/products/cades/plugin"
              >Прочитайте инструкцию</a
            >
          </div>
          <div class="btn-wrapper">
            <ButtonSignDeal
              :deal="deal"
              :loader="loader.sign"
              @start-signing="startSigning"
            />
            <ButtonConfirmDeal
              :deal="deal"
              @on-confirm="onUpdate"
              @on-error="onError"
            />
          </div>
        </div>
        <div class="right">
          <DownloadDealContract :deal="deal" />
          <DownloadDealSellerLicence class="mt-3" :deal="deal" />
          <DownloadDealAct class="mt-3" :deal="deal" />
          <DownloadDealArchive class="mt-3" :deal="deal" />
        </div>
      </div>
      <div class="bot">
        <nuxt-link :to="linkToDeal" class="detail"
          >Подробнее о сделке
          <div class="arrow">
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.7071 8.70735C17.0976 8.31683 17.0976 7.68366 16.7071 7.29314L10.3431 0.929176C9.95262 0.538652 9.31946 0.538652 8.92893 0.929176C8.53841 1.3197 8.53841 1.95287 8.92893 2.34339L14.5858 8.00024L8.92893 13.6571C8.53841 14.0476 8.53841 14.6808 8.92893 15.0713C9.31946 15.4618 9.95262 15.4618 10.3431 15.0713L16.7071 8.70735ZM0 9.00024H16V7.00024H0L0 9.00024Z"
                fill="#01FFDB"
              />
            </svg>
          </div>
        </nuxt-link>
        <a v-if="deal.can_cancel" href="" @click.prevent="cancelDeal"
          >Отменить сделку
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.33824 1.21672C3.05534 0.943485 2.67644 0.792293 2.28314 0.795711C1.88985 0.799129 1.51363 0.956882 1.23552 1.23499C0.957405 1.51311 0.799651 1.88933 0.796233 2.28262C0.792816 2.67592 0.944007 3.05482 1.21724 3.33772L9.87975 12.0002L1.21574 20.6627C1.07248 20.8011 0.958206 20.9666 0.879592 21.1496C0.800979 21.3326 0.7596 21.5295 0.757869 21.7286C0.756138 21.9278 0.794091 22.1253 0.869512 22.3097C0.944933 22.494 1.05631 22.6615 1.19715 22.8023C1.33799 22.9432 1.50547 23.0545 1.68981 23.13C1.87416 23.2054 2.07168 23.2433 2.27085 23.2416C2.47002 23.2399 2.66685 23.1985 2.84985 23.1199C3.03286 23.0413 3.19837 22.927 3.33674 22.7837L12.0007 14.1212L20.6632 22.7837C20.9461 23.057 21.3251 23.2082 21.7183 23.2047C22.1116 23.2013 22.4879 23.0436 22.766 22.7655C23.0441 22.4873 23.2018 22.1111 23.2053 21.7178C23.2087 21.3245 23.0575 20.9456 22.7842 20.6627L14.1217 12.0002L22.7842 3.33772C23.0575 3.05482 23.2087 2.67592 23.2053 2.28262C23.2018 1.88933 23.0441 1.51311 22.766 1.23499C22.4879 0.956882 22.1116 0.799129 21.7183 0.795711C21.3251 0.792293 20.9461 0.943485 20.6632 1.21672L12.0007 9.87922L3.33824 1.21522V1.21672Z"
              fill="#D05359"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DealCard',
  props: {
    deal: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      count: 1,
      loader: {
        cancel: false,
        sign: false,
      },
    }
  },
  computed: {
    isAuth() {
      return Boolean(this.$auth.user)
    },
    dealId() {
      return this.deal?.id
    },
    dealDate() {
      return this.$moment(this.deal?.created_at).format('DD.MM.YY')
    },
    deal_offers() {
      return this.deal?.deal_offers || []
    },
    dealStatusText() {
      return this.deal?.status?.title || ''
    },
    dealStatusKey() {
      return this.deal?.status?.key
    },
    totalPrice() {
      if (this.deal_offers.length > 1) {
        return this.deal_offers.reduce((a, b) => a + b.price * b.quantity, 0)
      } else {
        return this.deal_offers[0].price * this.deal_offers[0].quantity
      }
    },
    user() {
      return this.$auth.user
    },
    authCompanyId() {
      return this.user?.company?.id || null
    },
    isSeller() {
      return this.authCompanyId === this.deal.seller?.id
    },
    isCustomer() {
      return this.authCompanyId === this.deal.customer?.id
    },
    contrAgentName() {
      if (this.isSeller) {
        return this.deal?.customer?.short_name || ''
      }
      if (this.isCustomer) {
        return this.deal?.seller?.short_name || ''
      }
      return ''
    },
    isCanceled() {
      return this.dealStatusKey === 'cancel'
    },
    isWaitingSigning() {
      return this.dealStatusKey === 'waiting_signing'
    },
    isWaitingPayment() {
      return this.dealStatusKey === 'waiting_payment'
    },
    linkToDeal() {
      return {
        name: 'deals-uuid',
        params: { uuid: this.dealId },
      }
    },
    customerSigned() {
      return Boolean(this.deal?.contract?.customer_signed_at)
    },
    sellerSigned() {
      return Boolean(this.deal?.contract?.seller_signed_at)
    },
    customerSignedAtText() {
      return this.$moment(this.deal?.contract?.customer_signed_at).format(
        'DD.MM.YY'
      )
    },
    sellerSignedAtText() {
      return this.$moment(this.deal?.contract?.seller_signed_at).format(
        'DD.MM.YY'
      )
    },
    isUserSigned() {
      return (
        (this.$auth.user?.company?.id === this.deal?.customer?.id &&
          this.customerSigned) ||
        (this.$auth.user?.company?.id === this.deal?.seller?.id &&
          this.sellerSigned)
      )
    },
    isUserSignedFirst() {
      return this.isUserSigned && this.isWaitingSigning
    },
    isUserSigningSecond() {
      return !this.isUserSigned && (this.customerSigned || this.sellerSigned)
    },
  },
  watch: {},
  methods: {
    startSigning() {
      this.$emit('sign-deal', this.deal, this.isUserSigningSecond)
    },
    cancelDeal() {
      this.$emit('cancel-deal', this.dealId, this.dealDate)
    },
    onUpdate(deal) {
      this.$emit('update-deal', deal)
    },
    onError(errMsg) {
      this.$emit('on-error', errMsg)
    },
  },
}
</script>

<style scoped>
.arrow {
  margin-left: 16px;
}
.left:hover .arrow,
.detail:hover .arrow {
  margin-left: 32px;
  transition: margin-left ease 0.5s;
}
</style>
