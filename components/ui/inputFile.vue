<template>
  <ValidationProvider
    v-slot="{ errors, failed }"
    ref="provider"
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
    <input
      v-bind="$attrs"
      :id="vidOrName"
      :ref="vidOrName"
      :name="nameOrVidOrPrivateName"
      class="d-none"
      type="file"
      :accept="accept"
      :multiple="multiple"
      placeholder="Выберите файл"
      @change="changeFile"
    />
    <label
      v-if="!files.length"
      :for="vidOrName"
      class="btn btn-outline d-inline-block"
      :class="{ 'w-100': image }"
    >
      {{ uploadText }}
      <svg
        width="22"
        height="20"
        viewBox="0 0 22 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 13L15 9M11 13V1V13ZM11 13L7 9L11 13Z"
          stroke="#01FFDB"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M1 15L1.621 17.485C1.72915 17.9177 1.97882 18.3018 2.33033 18.5763C2.68184 18.8508 3.11501 18.9999 3.561 19H18.439C18.885 18.9999 19.3182 18.8508 19.6697 18.5763C20.0212 18.3018 20.2708 17.9177 20.379 17.485L21 15"
          stroke="#01FFDB"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </label>
    <template v-else>
      <div
        v-for="(file, index) in files"
        :key="index"
        class="loaded-doc"
        :class="{ 'mt-4': index > 0 }"
      >
        <svg
          width="20"
          height="24"
          viewBox="0 0 20 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.4 0C1.76348 0 1.15303 0.252856 0.702944 0.702944C0.252856 1.15303 0 1.76348 0 2.4V21.6C0 22.2365 0.252856 22.847 0.702944 23.2971C1.15303 23.7471 1.76348 24 2.4 24H17.6C18.2365 24 18.847 23.7471 19.2971 23.2971C19.7471 22.847 20 22.2365 20 21.6V9.578C20 8.849 19.71 8.15 19.195 7.634L12.264 0.703C11.8139 0.252906 11.2035 2.98497e-05 10.567 0H2.4ZM1.5 2.4C1.5 2.16131 1.59482 1.93239 1.7636 1.7636C1.93239 1.59482 2.16131 1.5 2.4 1.5H10V8C10 8.53043 10.2107 9.03914 10.5858 9.41421C10.9609 9.78929 11.4696 10 12 10H18.5V21.6C18.5 21.8387 18.4052 22.0676 18.2364 22.2364C18.0676 22.4052 17.8387 22.5 17.6 22.5H2.4C2.16131 22.5 1.93239 22.4052 1.7636 22.2364C1.59482 22.0676 1.5 21.8387 1.5 21.6V2.4ZM17.94 8.5H12C11.8674 8.5 11.7402 8.44732 11.6464 8.35355C11.5527 8.25979 11.5 8.13261 11.5 8V2.06L17.94 8.5Z"
            fill="#01FFDB"
          />
        </svg>
        <h6>{{ file.name + ' ' + readableFileSize(file.size) }}</h6>
        <a v-if="!multiple" class="text-2" @click="removeFile(index)"
          >Удалить</a
        >
      </div>
    </template>
    <div v-if="multiple && files.length > 0" class="mt-4 loaded-doc">
      <a class="text-2 ml-0" @click="removeFiles">Удалить все</a>
    </div>
    <slot name="after-nested-input"></slot>
    <div
      v-if="showErrorBlock && failed"
      class="errorText fileError"
      v-text="errors.join(', ')"
    />
    <slot name="after" />
  </ValidationProvider>
</template>

<script>
import mixin from '~/components/ui/ui.mixin'
import readableFileSize from '@/components/mixins/readableFileSize'

export default {
  name: 'InputFileValidate',
  mixins: [mixin, readableFileSize],
  props: {
    fetchPending: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    multiple: {
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
      default: null,
    },
    inputClass: {
      type: String,
      default: null,
    },
    name: {
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
    id: {
      type: String,
      required: true,
    },
    image: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      files: [],
    }
  },
  computed: {
    nameOrVidOrPrivateName() {
      return this.name || this.vidOrName
    },
    accept() {
      if (this.image) {
        return 'image/jpeg, image/png, image/png, image/webp'
      } else {
        return (
          'application/pdf, application/msword, ' +
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document,' +
          'image/jpeg, image/png'
        )
      }
    },
    uploadText() {
      if (this.image) {
        return 'Загрузить фото'
      } else {
        return 'Загрузить документ'
      }
    },
  },
  methods: {
    async validated() {
      for (const file of Array.from(this.files)) {
        if (!(await this.$refs.provider.validate(file))?.valid) {
          return false
        }
      }
      return true
    },
    async changeFile({ target: { files } }) {
      this.files = files
      const valid = await this.validated()
      this.$emit('change-file', files, this.vidOrName, valid)
    },
    async removeFile(index) {
      const files = Array.from(this.files).filter((item, i) => i !== index)
      const dt = new DataTransfer()
      files.forEach((file) => dt.items.add(file))

      this.files = dt.files
      const valid = await this.validated()

      if (this.files.length === 0) {
        this.$refs[this.vidOrName].value = null
        this.$emit('remove-file', this.vidOrName, valid)
      } else {
        this.$emit('change-file', this.files, this.vidOrName, valid)
      }
    },
    async removeFiles() {
      this.files = []
      this.$refs[this.vidOrName].value = null
      const valid = await this.validated()
      this.$emit('remove-file', this.vidOrName, valid)
    },
  },
}
</script>

<style scoped>
.wrapInput input:focus {
  background-color: transparent;
}

.wrapInput input {
  position: absolute;
  opacity: 0;
  z-index: -1;
}

.wrapInput label {
  display: inline-block;
}

.fileError {
  position: relative !important;
  background: none !important;
}
</style>
