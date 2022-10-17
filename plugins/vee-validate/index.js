/* eslint-disable camelcase */
import {
  extend,
  localize,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate'
import ru from 'vee-validate/dist/locale/ru.json'
import {
  email,
  required,
  required_if,
  min,
  max,
  regex,
  confirmed,
  length,
  numeric,
  digits,
  between,
  size,
  ext,
} from 'vee-validate/dist/rules'
import Vue from 'vue'

localize('ru', ru)

const ru_only = {
  validate(value) {
    return Boolean(!value.search(/[^a-z]/gim))
  },
  message: '{_field_} должно быть на русском языке',
}

extend('required', required)
extend('required_if', required_if)
extend('email', email)
extend('min', min)
extend('max', max)
extend('length', length)
extend('digits', digits)
extend('numeric', numeric)
extend('regex', regex)
extend('confirmed', confirmed)
extend('ru_only', ru_only)
extend('between', between)
extend('size', size)
extend('ext_pic', ext)
extend('ext_doc', ext)

localize({
  ru: {
    messages: {
      ext_pic: () =>
        `Файл должен быть одного из следующий расширений: .jpg /.png /.jpeg /.webp`,
      ext_doc: () =>
        `Файл должен быть одного из следующий расширений: .jpg /.png /.doc /.docx /.pdf`,
    },
  },
})

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
}
