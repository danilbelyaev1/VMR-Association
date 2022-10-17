<template>
  <div class="col px-0 wrapPersAccountReporting">
    <div class="wrapPersAccountReporting-h d-inline-flex flex-wrap">
      <div
        :class="tabs === 1 ? 'active' : ''"
        class="persAccountReporting-h tab-header"
        @click="tabs = 1"
      >
        Заполнить отчёт
      </div>
      <div
        :class="tabs === 2 ? 'active' : ''"
        class="persAccountReporting-h tab-header"
        @click="tabs = 2"
      >
        Архив
      </div>
    </div>
    <div v-if="!$fetchState.pending">
      <div v-show="tabs === 1">
        <div class="row">
          <div class="date-picker col-4">
            <p class="label-name">За какой срок отправлять отчет?</p>
            <date-picker
              v-model="form.report_date"
              type="month"
              value-type="format"
              format="YYYY-MM"
              placeholder="Выберите месяц"
              @change="$fetch"
            />
          </div>
        </div>
        <div v-for="section in turnovers" :key="section.id">
          <h3 v-if="section.title" class="mt-5">{{ section.title }}</h3>
          <div v-if="section.fields" class="row">
            <input-validate
              v-for="field in section.fields"
              :key="field.key"
              :ref="field.key"
              v-model="fieldsRaw[field.key]"
              :disable-root-classes="true"
              :disable-input-classes="true"
              :show-error-block="false"
              :vid="field.key"
              :label="field.title"
              :value="rawFieldsKeyToVal[field.key]"
              placeholder=""
              type="number"
              min-val="0"
              class="col-4 mt-4"
            />
          </div>
          <div v-if="section.children" class="">
            <div
              v-for="children in section.children"
              :key="children.id"
              class=""
            >
              <h3 v-if="children.title" class="mt-5">{{ children.title }}</h3>
              <div v-if="children.fields" class="row">
                <input-validate
                  v-for="field in children.fields"
                  :key="field.key"
                  :ref="field.key"
                  v-model="fieldsRaw[field.key]"
                  :disable-root-classes="true"
                  :disable-input-classes="true"
                  :show-error-block="false"
                  :vid="field.key"
                  :label="field.title"
                  :value="rawFieldsKeyToVal[field.key] || 0"
                  placeholder=""
                  type="number"
                  min-val="0"
                  class="col-4 mt-4"
                />
              </div>
            </div>
          </div>
        </div>
        <my-button
          class="btn btn-primary mt-5"
          text="Отправить"
          :loader="loader"
          :disabled="loader"
          @click="sendReport"
        />
      </div>
      <div
        v-show="tabs === 2"
        :class="tabs === 2 ? 'active' : ''"
        class="persAccountReportingContent tab-content fadeTab"
      >
        <div v-if="!reports.length" class="wrapReportDocument">
          Здесь пока пусто
        </div>
        <div
          v-for="report in reports"
          :key="report.label"
          class="wrapReportDocument"
        >
          <a
            href="#"
            class="documentLink position-relative d-table"
            @click.prevent="download_file(report)"
          >
            {{ report.label }}
          </a>
          <b-spinner v-if="downloadingFileId === report.year" small></b-spinner>
        </div>
      </div>
    </div>
    <div v-else>
      <loader-spinner />
    </div>
    <client-only>
      <DefaultModal
        modal-class=""
        close-button-text="Понятно"
        modal-id="reportSend"
        title="Ваш отчёт отправлен"
        text="Отправленные отчёты вы можете просматривать в разделе «Архив»"
      />
      <DefaultModal
        modal-class=""
        close-button-text="Понятно"
        modal-id="errorModal"
        :title="error"
      />
    </client-only>
  </div>
</template>

<script>
import FileDownloadMixin from '~/components/mixins/FileDownloadMixin'

export default {
  name: 'PersonalReporting',
  fetchOnServer: true,
  mixins: [FileDownloadMixin],
  data() {
    return {
      turnovers: [],
      reports: [],
      fieldsRaw: {},
      form: {
        fields: [],
        report_date: this.$moment(Date.now()).format('YYYY-MM'),
      },
      upload: null,
      loader: false,
      tabs: 1,
      downloadingFileId: null,
      error: null,
    }
  },

  async fetch() {
    try {
      let url = '/turnovers'
      const params = { report_date: this.form.report_date }
      let response = await this.$axios.$get(url, {
        params,
      })
      this.turnovers = response.data

      url = '/turnovers/reports'
      response = await this.$axios.$get(url)
      this.reports = response.data
    } catch (e) {}
  },
  computed: {
    rawField() {
      const rField = this.turnovers
      return rField.reduce((fields, elem, idx) => {
        if (elem?.fields) {
          elem.fields.forEach((e) => {
            fields.push({
              key: e.key,
              value: e.value,
            })
          })
        }
        if (elem?.children) {
          elem.children.forEach((el) => {
            if (el?.fields) {
              el.fields.forEach((e) => {
                fields.push({
                  key: e.key,
                  value: e.value,
                })
              })
            }
          })
        }
        return fields
      }, [])
    },
    rawFieldsKeyToVal() {
      const obj = {}
      this.rawField.map((e) => {
        obj[e.key] = e.value
        return obj
      })
      return obj
    },
  },
  watch: {
    rawFieldsKeyToVal() {
      this.fieldsRaw = this.rawFieldsKeyToVal
    },
  },
  mounted() {},
  methods: {
    disabledBeforeTodayAndAfterAWeek(date) {
      const to = new Date('2022-05')

      return date < to || date > new Date(to.getTime() + 31 * 24 * 3600 * 1000)
    },
    fieldsFormat() {
      this.form.fields = Object.entries(this.fieldsRaw).map((entry) => ({
        key: entry[0],
        value: entry[1],
      }))
    },
    isEmptyFields() {
      return (
        Object.values(this.fieldsRaw).reduce(
          (sum, value) => sum + +value,
          0
        ) === 0
      )
    },
    async sendReport() {
      if (this.isEmptyFields()) {
        this.error = 'Поля отчета не заполнены'
        this.$bvModal.show('errorModal')
        return
      }

      this.loader = true
      await this.fieldsFormat()

      try {
        await this.$axios.$post('/turnovers', this.form).then(() => {
          this.$bvModal.show('reportSend')
        })
      } catch (e) {
        this.error = e.response?.data?.message || 'Ошибка сервера'
        this.$bvModal.show('errorModal')
      } finally {
        this.$fetch()
        this.loader = false
      }
    },
    async download_file({ year, label }) {
      const url = '/turnovers/report-file'
      this.downloadingFileId = year

      try {
        const response = await this.$axios.$get(url, {
          responseType: 'arraybuffer',
          params: {
            year,
          },
        })
        this.forceFileDownload(response, label + '.xlsx')
      } catch (e) {
        this.error = e.response?.data?.message || 'Ошибка сервера'
        this.$bvModal.show('errorModal')
      }

      this.downloadingFileId = null
    },
  },
}
</script>

<style scoped></style>
