<template>
  <ValidationProvider
    v-slot="{ failed, errors }"
    :class="{ 'form-group': !disableRootClasses }"
    :tag="providerTag"
    :name="labelOrPlaceholder"
    :custom-messages="customMessages"
    :rules="rules"
    :vid="vidOrName"
    :mode="mode"
    :autocomplete="autocomplete"
  >
    <slot name="before" />
    <div class="wrapInput position-relative w-100">
      <label v-if="label" class="label">
        {{ label }}
        <span v-if="ifExist" class="if-exist">(при наличии)</span>
        <span v-if="required" class="required">*</span>
      </label>
      <slot></slot>
      <input
        v-bind="$attrs"
        ref="input"
        :class="[
          inputClass,
          {
            'is-invalid error': showErrorClass && failed,
            loading: loading,
            'form-control': !disableInputClasses,
          },
        ]"
        :disabled="disabled"
        :type="type"
        :minlength="minLength || false"
        :maxlength="maxLength || false"
        :max="maxVal || false"
        :min="minVal || false"
        :name="privateName"
        :placeholder="`${fetchPending ? 'Загрузка...' : placeholder}`"
        :autocomplete="autocomplete"
        :value="value"
        :step="step"
        :pattern="pattern"
        @keydown.enter.prevent="onKeydownEnter"
        v-on="inputListeners"
      />

      <slot name="after-nested-input"></slot>
      <div
        v-if="showErrorBlock && (failed || errorMessage)"
        :class="errorClass"
        v-text="errors.length ? errors.join(', ') : errorMessage"
      />
    </div>
    <slot name="after" />
  </ValidationProvider>
</template>

<script>
import mixin from '~/components/ui/ui.mixin'

export default {
  name: 'InputValidate',
  mixins: [mixin],
  props: {
    fetchPending: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    disableRootClasses: {
      type: Boolean,
      default: false,
    },
    disableInputClasses: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
    errorMessage: {
      type: String,
      default: null,
    },
    pattern: {
      type: String,
      default: null,
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
    inputClass: {
      type: String,
      default: null,
    },
    minLength: {
      type: [String, Number],
      default: null,
    },
    maxLength: {
      type: [String, Number],
      default: null,
    },
    maxVal: {
      type: [String, Number],
      default: null,
    },
    minVal: {
      type: [String, Number],
      default: null,
    },
    showErrorBlock: {
      type: Boolean,
      default: true,
    },
    step: {
      type: String,
      default: null,
    },
    providerTag: {
      type: String,
      default: 'div',
    },
    ifExist: {
      type: Boolean,
      default: false,
    },
    errorClass: {
      type: String,
      default: 'errorText',
    },
  },

  methods: {
    focus() {
      this.$refs.input.focus()
    },
    blur() {
      this.$refs.input.blur()
    },
    onKeydownEnter() {
      return null
    },
  },
}
</script>

<style scoped>
/*.wrapInput input {*/
/*  background-color: transparent!important;*/
/*}*/
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: all 5000s ease-in-out 0s;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
input[type='date']::-webkit-calendar-picker-indicator {
  background: transparent;
  bottom: 0;
  color: transparent;
  cursor: pointer;
  height: auto;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: auto;
}
.if-exist {
  color: #6f727d;
}
.label {
  color: #bcbcbc;
}
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
.inmodal {
  background-color: #ffffff;
  color: #343947;
  border: solid 1px #bcbcbc;
}
.required {
  color: #d05359;
}
</style>
