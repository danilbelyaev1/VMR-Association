<template>
  <div class="col px-0 wrapPersAccountHelp">
    <div class="persAccountHelp">
      <h4 class="w-100 mb-4">Нужна помощь?</h4>
      <p>
        Возможно на ваш вопрос уже есть ответ в разделе Часто задаваемые
        вопросы. Если вы не нашли в данном разделе необходимую информацию —
        задайте вопрос нашему менеджеру, мы ответим вам в ближайшее время.
      </p>
      <div class="wrapTextarea mb-4 w-100">
        <ValidationObserver
          ref="observer"
          v-slot="{}"
          tag="form"
          class=""
          @submit.prevent=""
        >
          <ValidationProvider
            v-slot="{ failed, errors }"
            tag="div"
            name="Вопрос"
            rules="required"
            vid="commentary"
          >
            <textarea
              id="question"
              v-model="question"
              style="resize: none"
              :class="[
                {
                  'is-invalid error': failed,
                },
              ]"
              name="question"
              cols="30"
              rows="10"
            >
            </textarea>
            <div v-if="failed" class="b-error" v-text="errors.join(', ')" />
          </ValidationProvider>
        </ValidationObserver>
      </div>
      <my-button
        :disabled="loader"
        class="btn btn-primary send"
        :loader="loader"
        text="Отправить сообщение"
        @click="send"
      />
    </div>
    <h4 class="w-100 mb-3 pb-3" v-text="title" />
    <div v-if="!$fetchState.pending">
      <div
        v-if="waitingForAnswer.length"
        class="wrapPersAccountHelpAccordion w-100"
      >
        <h5>Ожидают ответа:</h5>
        <AccordionHelpQuestion
          v-for="question in waitingForAnswer"
          :key="question.id"
          :accordion-data="question"
          class="accordion-element"
        />
      </div>

      <div
        v-if="alredyAnswered.length"
        class="wrapPersAccountHelpAccordion w-100 mt-4"
      >
        <h5>Ответ получен:</h5>
        <AccordionHelpQuestion
          v-for="question in alredyAnswered"
          :key="question.id"
          :accordion-data="question"
          class="accordion-element"
        />
      </div>
    </div>
    <div v-else>
      <loader-spinner />
    </div>
    <div class="row">
      <Pagination :meta="meta" @paginate="$fetch" />
    </div>
    <client-only>
      <DefaultModal
        modal-class="get-prices-modal"
        close-button-text="Понятно"
        modal-id="helpQuestionSend"
        title="Ваш вопрос отправлен"
        text="Мы ответим вам в ближайшее время"
      />
    </client-only>
  </div>
</template>

<script>
import ErrorBaseMixin from '~/components/mixins/ErrorBaseMixin'

export default {
  name: 'PersonalHelp',
  mixins: [ErrorBaseMixin],
  fetchOnServer: false,
  data() {
    return {
      question: '',
      questionList: [],
      meta: {},
      loader: false,
    }
  },

  async fetch() {
    const page = this.$route.query?.page || 1

    const response = await this.$axios.$get('/questions', { params: { page } })
    this.questionList = response.data
    this.meta = response.meta
  },
  computed: {
    waitingForAnswer() {
      return this.questionList.filter((e) => !e.answer)
    },
    alredyAnswered() {
      return this.questionList.filter((e) => e.answer)
    },
    title() {
      if (this.questionList.length) {
        return 'Ваши вопросы'
      }
      return 'Вы пока еще не задавали вопросов'
    },
  },
  methods: {
    async send() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      this.loader = true
      const formData = new FormData(this.$refs.observer.$el)

      try {
        await this.$axios.$post('/questions', formData)
        this.question = ''
        this.$refs.observer.reset()
        this.$bvModal.show('helpQuestionSend')
      } catch (e) {
        this.takeErrorResponseWithObserver(e, this.$refs.observer)
      } finally {
        this.$fetch()
        this.loader = false
      }
    },
  },
}
</script>

<style scoped>
.b-error {
  font-size: 14px;
  line-height: 1.4;
  padding: 8px;
  color: #d05359;
  top: 75px;
  left: 0;
  border-radius: 10px;
  transition: 0.3s;
}
textarea.error {
  border: 1px solid #d05359 !important;
}
</style>
