<template>
  <ValidationProvider
    v-slot="{ errors, failed }"
    :class="{ 'wrapTextarea form-group': !disableRootClasses }"
    tag="div"
    :name="labelOrPlaceholder"
    :rules="rules"
    :vid="vidOrName"
    :mode="mode"
  >
    <label v-if="label" class="label">
      {{ label }}
    </label>
    <slot name="before" />
    <textarea
      v-bind="$attrs"
      ref="textarea"
      class="form-control"
      :class="[elClass, { 'is-invalid error': showErrorClass && failed }]"
      :name="privateName"
      :placeholder="placeholder"
      :value="value"
      :rows="rows"
      v-on="inputListeners"
    />
    <slot name="after" />
    <div
      v-if="showErrorBlock && failed"
      :class="errorClass"
      v-text="errors.join(', ')"
    />
  </ValidationProvider>
</template>

<script>
import mixin from '~/components/ui/ui.mixin'

export default {
  name: 'MyTextarea',
  mixins: [mixin],
  props: {
    errorClass: {
      type: String,
      default: 'errorText',
    },
    disableRootClasses: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: null,
    },
    elClass: {
      type: String,
      default: null,
    },
    rows: {
      type: [String, Number],
      default: 4,
      validate: (value) => Number.isInteger(parseInt(value)),
    },
    showErrorBlock: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    inputListeners() {
      return Object.assign({}, this.$listeners, {
        input: (event) => {
          this.$emit('input', event.target.value)
        },
      })
    },
  },
  methods: {
    focus() {
      this.$refs.textarea.focus()
    },
    blur() {
      this.$refs.textarea.blur()
    },
  },
}
</script>

<style scoped>
.label {
  color: #bcbcbc;
}
textarea {
  border: 1px solid #bcbcbc;
}
.errorText {
  position: initial;
}
</style>
