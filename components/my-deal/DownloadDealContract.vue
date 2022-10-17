<template>
  <div v-if="dealId">
    <a @click.prevent="downloadContract">
      <svg
        width="20"
        height="24"
        viewBox="0 0 20 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.4 0.000244141C1.76348 0.000244141 1.15303 0.253101 0.702944 0.703188C0.252856 1.15328 0 1.76372 0 2.40024V21.6002C0 22.2368 0.252856 22.8472 0.702944 23.2973C1.15303 23.7474 1.76348 24.0002 2.4 24.0002H17.6C18.2365 24.0002 18.847 23.7474 19.2971 23.2973C19.7471 22.8472 20 22.2368 20 21.6002V9.57824C20 8.84924 19.71 8.15024 19.195 7.63424L12.264 0.703244C11.8139 0.25315 11.2035 0.00027399 10.567 0.000244141H2.4ZM1.5 2.40024C1.5 2.16155 1.59482 1.93263 1.7636 1.76385C1.93239 1.59507 2.16131 1.50024 2.4 1.50024H10V8.00024C10 8.53068 10.2107 9.03938 10.5858 9.41446C10.9609 9.78953 11.4696 10.0002 12 10.0002H18.5V21.6002C18.5 21.8389 18.4052 22.0679 18.2364 22.2366C18.0676 22.4054 17.8387 22.5002 17.6 22.5002H2.4C2.16131 22.5002 1.93239 22.4054 1.7636 22.2366C1.59482 22.0679 1.5 21.8389 1.5 21.6002V2.40024ZM17.94 8.50024H12C11.8674 8.50024 11.7402 8.44757 11.6464 8.3538C11.5527 8.26003 11.5 8.13285 11.5 8.00024V2.06024L17.94 8.50024Z"
          fill="#01FFDB"
        />
      </svg>
      Скачать договор заказа №{{ dealId }}
    </a>
    <DefaultModal
      modal-class=""
      close-button-text="Понятно"
      modal-id="downloadContractErrorModal"
      :title="error"
    />
  </div>
</template>

<script>
export default {
  name: 'DownloadDealContract',
  props: {
    deal: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      error: null,
    }
  },
  computed: {
    dealId() {
      return this.deal?.id || null
    },
    linkToContract() {
      return this.deal?.contract?.contract_document?.url || ''
    },
  },
  methods: {
    async downloadContract() {
      try {
        const url = `/deals/${this.dealId}/contract`

        await this.$axios
          .get(url, {
            responseType: 'arraybuffer',
          })
          .then((response) => {
            const blob = new Blob([response.data], {
              type: response.headers['content-type'],
            })
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = `deal-contract-${this.dealId}.docx`
            link.click()
          })
      } catch (e) {
        const errorJson = JSON.parse(
          Buffer.from(e.response?.data).toString('utf8')
        )
        this.error = errorJson?.message || 'Ошибка сервера'
        this.$bvModal.show('downloadContractErrorModal')
      }
    },
  },
}
</script>

<style scoped></style>
