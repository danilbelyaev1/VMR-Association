<template>
  <main class="content">
    <BreadCrumbs />
    <section class="marketplace request">
      <div class="container">
        <ValidationObserver
          ref="observer"
          v-slot="{ errors, valid }"
          tag="form"
          class="row align-items-end"
          @submit.prevent="submit()"
        >
          <div class="row request">
            <div class="col-9">
              <div class="marketplace-wrapper request">
                <h2>Оформите заявку участника маркетплэйса</h2>
                <h4>Личные данные представителя</h4>
                <div class="row align-items-end">
                  <div class="col-4 pb-5">
                    <input-validate
                      ref="user_surname"
                      v-model="form.user_surname"
                      :disable-root-classes="true"
                      :disable-input-classes="true"
                      vid="user_surname"
                      label="Фамилия"
                      placeholder=""
                      rules="required|ru_only"
                      required-star
                      type="text"
                    />
                  </div>
                  <div class="col-4 pb-5">
                    <input-validate
                      ref="user_name"
                      v-model="form.user_name"
                      :disable-root-classes="true"
                      :disable-input-classes="true"
                      vid="user_name"
                      label="Имя"
                      placeholder=""
                      rules="required|ru_only"
                      required-star
                      type="text"
                    />
                  </div>
                  <div class="col-4 pb-5">
                    <input-validate
                      ref="user_patronymic"
                      v-model="form.user_patronymic"
                      :disable-root-classes="true"
                      :disable-input-classes="true"
                      vid="user_patronymic"
                      label="Отчество"
                      placeholder=""
                      rules="required|ru_only"
                      required-star
                      type="text"
                    />
                  </div>
                  <div class="col-4 pb-3">
                    <input-validate
                      ref="user_phone"
                      v-model="form.user_phone"
                      v-mask="phoneMask"
                      :disable-root-classes="true"
                      :disable-input-classes="true"
                      vid="user_phone"
                      label="Телефон"
                      placeholder="+7"
                      rules="required"
                      required-star
                      type="text"
                    >
                      <div class="btnNone ic btnPass hover">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="10"
                            cy="10"
                            r="9"
                            stroke="#6F727D"
                            stroke-width="2"
                          />
                          <path
                            d="M11.2441 4.948C11.2441 4.766 11.1461 4.668 10.9641 4.668H9.92815C9.74615 4.668 9.64815 4.766 9.64815 4.948L9.57815 11.486C9.57815 11.668 9.67615 11.766 9.85815 11.766H11.0341C11.2161 11.766 11.3141 11.668 11.3141 11.486L11.2441 4.948ZM11.3421 13.502C11.3421 13.32 11.2441 13.222 11.0621 13.222H9.69015C9.50815 13.222 9.41015 13.32 9.41015 13.502V14.72C9.41015 14.902 9.50815 15 9.69015 15H11.0621C11.2441 15 11.3421 14.902 11.3421 14.72V13.502Z"
                            fill="#6F727D"
                          />
                        </svg>
                        <div class="hover-balloon">
                          После прохождения регистрации необходимо будет
                          подтвердить номер телефона
                        </div>
                      </div>
                    </input-validate>
                  </div>
                  <div class="col-4 pb-3">
                    <input-validate
                      ref="user_email"
                      v-model="form.user_email"
                      :disable-root-classes="true"
                      :disable-input-classes="true"
                      vid="user_email"
                      label="Почта"
                      placeholder="Email"
                      rules="required|email"
                      required-star
                      type="text"
                    >
                      <div class="btnNone ic btnPass hover">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="10"
                            cy="10"
                            r="9"
                            stroke="#6F727D"
                            stroke-width="2"
                          />
                          <path
                            d="M11.2441 4.948C11.2441 4.766 11.1461 4.668 10.9641 4.668H9.92815C9.74615 4.668 9.64815 4.766 9.64815 4.948L9.57815 11.486C9.57815 11.668 9.67615 11.766 9.85815 11.766H11.0341C11.2161 11.766 11.3141 11.668 11.3141 11.486L11.2441 4.948ZM11.3421 13.502C11.3421 13.32 11.2441 13.222 11.0621 13.222H9.69015C9.50815 13.222 9.41015 13.32 9.41015 13.502V14.72C9.41015 14.902 9.50815 15 9.69015 15H11.0621C11.2441 15 11.3421 14.902 11.3421 14.72V13.502Z"
                            fill="#6F727D"
                          />
                        </svg>
                        <div class="hover-balloon">
                          Почта будет использоватья как логин и для
                          восстановления пароля
                        </div>
                      </div>
                    </input-validate>
                  </div>
                  <div class="col-4 pb-3">
                    <input-validate
                      ref="user_job_title"
                      v-model="form.user_job_title"
                      :disable-root-classes="true"
                      :disable-input-classes="true"
                      vid="user_job_title"
                      label="Должность"
                      placeholder=""
                      rules="required|ru_only"
                      required-star
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row request">
            <div class="col-9">
              <h4 style="margin-bottom: 8px">
                Информация для договора (данные подписанта)
              </h4>
              <h6 class="mb-4">Укажите все поля в родительном падеже</h6>
              <div class="row align-items-end">
                <div class="col-4 pb-5">
                  <input-validate
                    ref="signatory_surname"
                    v-model="form.signatory_surname"
                    :disable-root-classes="true"
                    :disable-input-classes="true"
                    vid="signatory_surname"
                    label="Фамилия"
                    placeholder="Иванова"
                    rules="required|ru_only"
                    required-star
                    type="text"
                  />
                </div>
                <div class="col-4 pb-5">
                  <input-validate
                    ref="signatory_name"
                    v-model="form.signatory_name"
                    :disable-root-classes="true"
                    :disable-input-classes="true"
                    vid="signatory_name"
                    label="Имя"
                    placeholder="Ивана"
                    rules="required|ru_only"
                    required-star
                    type="text"
                  />
                </div>
                <div class="col-4 pb-5">
                  <input-validate
                    ref="signatory_patronymic"
                    v-model="form.signatory_patronymic"
                    :disable-root-classes="true"
                    :disable-input-classes="true"
                    vid="signatory_patronymic"
                    label="Отчество"
                    placeholder="Ивановича"
                    rules="required|ru_only"
                    required-star
                    type="text"
                  />
                </div>
                <div class="col-4 pb-3">
                  <input-validate
                    ref="signatory_job_title"
                    v-model="form.signatory_job_title"
                    :disable-root-classes="true"
                    :disable-input-classes="true"
                    vid="signatory_job_title"
                    label="Должность"
                    placeholder="Директора"
                    rules="required"
                    required-star
                    type="text"
                  >
                  </input-validate>
                </div>
                <div class="col-8 pb-3">
                  <input-validate
                    ref="signatory_based"
                    v-model="form.signatory_based"
                    :disable-root-classes="true"
                    :disable-input-classes="true"
                    vid="signatory_based"
                    label="На основании чего"
                    placeholder="Устава"
                    rules="required"
                    required-star
                    type="text"
                  >
                  </input-validate>
                </div>
              </div>
            </div>
          </div>
          <div class="row request">
            <div class="col-9">
              <h4 style="margin-bottom: 8px">Основание (лицензия)</h4>
              <div class="wrapTextarea position-relative w-100">
                <label for="description2" class="label"
                  >Продавец осуществляет свою деятельность на основании лицензии
                  на осуществление деятельности по
                  <span class="required">*</span>
                </label>
                <ValidationProvider
                  v-slot="{ errors, failed }"
                  rules="required"
                  name="Деятельность лицензии"
                  vid="company_license_activity"
                >
                  <textarea
                    id="description2"
                    v-model="form.company_license_activity"
                    class=""
                    style="height: 90px"
                    :style="
                      failed ? 'border: 1px solid #D05359 !important;' : ''
                    "
                  />
                  <div class="b-error" v-text="errors.join(', ')" />
                </ValidationProvider>
              </div>
            </div>
            <div class="col-9 mb-3">
              <div class="date-picker">
                <p class="label-name">
                  от (число) <span class="required">*</span>
                </p>
                <ValidationProvider
                  v-slot="{ errors, failed }"
                  rules="required"
                  name="Дата лицензии"
                  vid="company_license_date"
                >
                  <date-picker
                    v-model="form.company_license_date"
                    :disabled-date="disabledDate"
                    type="date"
                    value-type="YYYY-MM-DD"
                    format="«D» MMMM YYYYг."
                    placeholder="Выберите дату"
                    :style="
                      failed
                        ? 'border: 1px solid #D05359 !important; border-radius: 10px;'
                        : ''
                    "
                  />
                  <div class="b-error" v-text="errors.join(', ')" />
                </ValidationProvider>
              </div>
            </div>
            <div class="col-9 mb-2">
              <input-validate
                ref="user_job_title"
                v-model="form.company_license_number"
                :disable-root-classes="true"
                :disable-input-classes="true"
                required-star
                error-class="b-error"
                vid="company_license_number"
                label="№ (номер)"
                name="Номер лицензии"
                placeholder=""
                rules="required"
                type="number"
                class=""
              />
            </div>
          </div>
          <div class="row request">
            <div class="col-9">
              <h4>Документы</h4>
              <div class="radio-wrapper">
                <input
                  id="radio-1"
                  v-model="form.company_type"
                  checked
                  type="radio"
                  name="company_type"
                  class="radio"
                  :value="2"
                />
                <label for="radio-1">Юридическое лицо</label>
                <input
                  id="radio-2"
                  v-model="form.company_type"
                  type="radio"
                  name="company_type"
                  class="radio"
                  :value="1"
                />
                <label for="radio-2">Индивидуальный предприниматель</label>
              </div>
              <div v-if="form.company_type === 2">
                <h5>1. Свидетельство о государственной регистрации (копия)</h5>
                <input-file
                  id="file_ogrn"
                  ref="file_ogrn"
                  :disable-root-classes="true"
                  :disable-input-classes="true"
                  vid="file_ogrn"
                  placeholder="file_ogrn"
                  rules="size:5000|ext_doc:jpg,jpeg,png,doc,docx,pdf"
                  type="file"
                  @change-file="changeFileHandler"
                  @remove-file="removeFileHandler"
                />
                <h5>2. Свидетельство о постановке на налоговый учет (копия)</h5>
                <input-file
                  id="file_opnu"
                  ref="file_opnu"
                  :disable-root-classes="true"
                  :disable-input-classes="true"
                  vid="file_opnu"
                  placeholder="file_opnu"
                  rules="size:5000|ext_doc:jpg,jpeg,png,doc,docx,pdf"
                  type="file"
                  @change-file="changeFileHandler"
                  @remove-file="removeFileHandler"
                />
                <h5>3. Устав с изменениями и дополнениями (копия)</h5>
                <input-file
                  id="file_aoa"
                  ref="file_aoa"
                  :disable-root-classes="true"
                  :disable-input-classes="true"
                  vid="file_aoa"
                  placeholder="file_aoa"
                  rules="size:5000|ext_doc:jpg,jpeg,png,doc,docx,pdf"
                  type="file"
                  @change-file="changeFileHandler"
                  @remove-file="removeFileHandler"
                />
                <h5>4. Выписка из ЕГРЮЛ (копия)</h5>
                <input-file
                  id="file_egrul"
                  ref="file_egrul"
                  :disable-root-classes="true"
                  :disable-input-classes="true"
                  vid="file_egrul"
                  placeholder="file_egrul"
                  rules="size:5000|ext_doc:jpg,jpeg,png,doc,docx,pdf"
                  type="file"
                  @change-file="changeFileHandler"
                  @remove-file="removeFileHandler"
                />
                <h5>5. Лицензия</h5>
                <input-file
                  id="file_licence"
                  ref="file_licence"
                  :disable-root-classes="true"
                  :disable-input-classes="true"
                  name="file_licence[]"
                  vid="file_licence"
                  placeholder="Файл лицензии"
                  rules="size:5000|ext_doc:jpg,jpeg,png,doc,docx,pdf"
                  type="file"
                  multiple
                  @change-file="changeFileHandler"
                  @remove-file="removeFileHandler"
                />
              </div>
              <div v-else>
                <h5>
                  1. Свидетельство о государственной регистрации индивидуального
                  предпринимателя (копия)
                </h5>
                <input-file
                  id="file_ogrnip"
                  ref="file_ogrnip"
                  :disable-root-classes="true"
                  :disable-input-classes="true"
                  vid="file_ogrnip"
                  placeholder="file_ogrnip"
                  rules="size:5000|ext_doc:jpg,jpeg,png,doc,docx,pdf"
                  type="file"
                  @change-file="changeFileHandler"
                  @remove-file="removeFileHandler"
                />
                <h5>
                  2. Копия паспорта с отметкой о месте регистрации (копия)
                </h5>
                <input-file
                  id="file_passport"
                  ref="file_passport"
                  :disable-root-classes="true"
                  :disable-input-classes="true"
                  vid="file_passport"
                  placeholder="file_passport"
                  rules="size:5000|ext_doc:jpg,jpeg,png,doc,docx,pdf"
                  type="file"
                  @change-file="changeFileHandler"
                  @remove-file="removeFileHandler"
                />
                <h5>3. Выписка из ЕГРИП (копия)</h5>
                <input-file
                  id="file_egrip"
                  ref="file_egrip"
                  :disable-root-classes="true"
                  :disable-input-classes="true"
                  vid="file_egrip"
                  placeholder="file_egrip"
                  rules="size:5000|ext_doc:jpg,jpeg,png,doc,docx,pdf"
                  type="file"
                  @change-file="changeFileHandler"
                  @remove-file="removeFileHandler"
                />
              </div>
            </div>
          </div>
          <div class="row request inputs">
            <div class="col-9">
              <h4>Карточка предприятия</h4>
              <div class="pb-3">
                <dadata-suggestions
                  v-model="form.company_name"
                  vid="company_name"
                  :fetch-pending="$fetchState.pending"
                  placeholder=""
                  label="Наименование предприятия"
                  rules="required"
                  required-star
                  type="adf"
                  @selectSuggestion="setSuggestion"
                >
                </dadata-suggestions>
              </div>
              <div class="pb-3">
                <input-validate
                  ref="company_short_name"
                  v-model="form.company_short_name"
                  :disable-root-classes="true"
                  :disable-input-classes="true"
                  vid="company_short_name"
                  label="Краткое наименовае"
                  placeholder=""
                  rules="required"
                  required-star
                  type="text"
                />
              </div>
              <div class="pb-3">
                <input-validate
                  ref="company_legal_address"
                  v-model="form.company_legal_address"
                  :disable-root-classes="true"
                  :disable-input-classes="true"
                  vid="company_legal_address"
                  label="Юридический адрес"
                  placeholder=""
                  rules="required"
                  required-star
                  type="text"
                />
              </div>
              <div class="pb-3">
                <input-validate
                  ref="company_postal_address"
                  v-model="form.company_postal_address"
                  :disable-root-classes="true"
                  :disable-input-classes="true"
                  vid="company_postal_address"
                  label="Почтовый адрес"
                  placeholder=""
                  rules="required"
                  required-star
                  type="text"
                />
              </div>
              <div class="row">
                <div class="col-6 pb-3">
                  <input-validate
                    ref="company_phone"
                    v-model="form.company_phone"
                    v-mask="phoneMask"
                    :disable-root-classes="true"
                    :disable-input-classes="true"
                    vid="company_phone"
                    label="Телефон (факс)"
                    if-exist
                    placeholder="+7"
                    rules=""
                    type="text"
                  />
                </div>
                <div class="col-6 pb-3">
                  <input-validate
                    ref="company_email"
                    v-model="form.company_email"
                    :disable-root-classes="true"
                    :disable-input-classes="true"
                    vid="company_email"
                    label="Электронная почта"
                    if-exist
                    placeholder=""
                    rules="email"
                    type="text"
                  />
                </div>
              </div>
              <div v-if="form.company_type === 2" class="pb-3">
                <div class="row">
                  <div class="col-6 pb-3">
                    <input-validate
                      ref="company_inn"
                      v-model="form.company_inn"
                      :disable-root-classes="true"
                      :disable-input-classes="true"
                      vid="company_inn"
                      label="ИНН"
                      placeholder=""
                      rules="required|numeric"
                      required-star
                      type="text"
                    />
                  </div>
                  <div class="col-6 pb-3">
                    <input-validate
                      ref="company_kpp"
                      v-model="form.company_kpp"
                      :disable-root-classes="true"
                      :disable-input-classes="true"
                      vid="company_kpp"
                      label="КПП"
                      placeholder=""
                      rules="required|numeric"
                      required-star
                      type="text"
                    />
                  </div>
                </div>
                <input-validate
                  ref="company_ogrn"
                  v-model="form.company_ogrn"
                  :disable-root-classes="true"
                  :disable-input-classes="true"
                  vid="company_ogrn"
                  label="ОГРН"
                  placeholder=""
                  rules="required|numeric"
                  required-star
                  type="text"
                />
              </div>
              <div v-else class="row">
                <div class="col-6 pb-3">
                  <input-validate
                    ref="company_inn"
                    v-model="form.company_inn"
                    :disable-root-classes="true"
                    :disable-input-classes="true"
                    vid="company_inn"
                    label="ИНН"
                    placeholder=""
                    rules="required|numeric"
                    required-star
                    type="text"
                  />
                </div>
                <div class="col-6 pb-3">
                  <input-validate
                    ref="company_ogrn"
                    v-model="form.company_ogrn"
                    :disable-root-classes="true"
                    :disable-input-classes="true"
                    vid="company_ogrn"
                    label="ОГРН"
                    placeholder=""
                    rules="required|numeric"
                    required-star
                    type="text"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-6 pb-3">
                  <input-validate
                    ref="company_bik"
                    v-model="form.company_bik"
                    :disable-root-classes="true"
                    :disable-input-classes="true"
                    vid="company_bik"
                    label="БИК"
                    placeholder=""
                    rules="required"
                    required-star
                    type="text"
                  />
                </div>
                <div class="col-6 pb-3">
                  <input-validate
                    ref="company_bank_name"
                    v-model="form.company_bank_name"
                    :disable-root-classes="true"
                    :disable-input-classes="true"
                    vid="company_bank_name"
                    label="Наименование банка"
                    placeholder=""
                    rules="required"
                    required-star
                    type="text"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-6 pb-3">
                  <input-validate
                    ref="company_account_number"
                    v-model="form.company_account_number"
                    :disable-root-classes="true"
                    :disable-input-classes="true"
                    vid="company_account_number"
                    label="Номер расчетного счета"
                    placeholder=""
                    rules="required"
                    required-star
                    type="text"
                  />
                </div>
                <div class="col-6 pb-3">
                  <input-validate
                    ref="company_corr_account_number"
                    v-model="form.company_corr_account_number"
                    :disable-root-classes="true"
                    :disable-input-classes="true"
                    vid="company_corr_account_number"
                    label="Корреспондентский счет банка"
                    placeholder=""
                    rules="required"
                    required-star
                    type="text"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-6 pb-3">
                  <input-validate
                    ref="company_okpo"
                    v-model="form.company_okpo"
                    :disable-root-classes="true"
                    :disable-input-classes="true"
                    vid="company_okpo"
                    label="ОКПО"
                    placeholder=""
                    rules="required|numeric"
                    required-star
                    type="text"
                  />
                </div>
                <div class="col-6 pb-3">
                  <input-validate
                    ref="company_okogu"
                    v-model="form.company_okogu"
                    :disable-root-classes="true"
                    :disable-input-classes="true"
                    vid="company_okogu"
                    label="ОКОГУ"
                    placeholder=""
                    rules="required|numeric"
                    required-star
                    type="text"
                  />
                </div>
                <div class="col-6 pb-3">
                  <input-validate
                    ref="company_okato"
                    v-model="form.company_okato"
                    :disable-root-classes="true"
                    :disable-input-classes="true"
                    vid="company_okato"
                    label="ОКАТО"
                    placeholder=""
                    rules="required|numeric"
                    required-star
                    type="text"
                  />
                </div>
                <div class="col-6 pb-3">
                  <input-validate
                    ref="company_oktmo"
                    v-model="form.company_oktmo"
                    :disable-root-classes="true"
                    :disable-input-classes="true"
                    vid="company_oktmo"
                    label="ОКТМО"
                    placeholder=""
                    rules="required|numeric"
                    required-star
                    type="text"
                  />
                </div>
                <div class="col-6 pb-3">
                  <input-validate
                    ref="company_okfs"
                    v-model="form.company_okfs"
                    :disable-root-classes="true"
                    :disable-input-classes="true"
                    vid="company_okfs"
                    label="ОКФС"
                    placeholder=""
                    rules="required|numeric"
                    required-star
                    type="text"
                  />
                </div>
                <div class="col-6 pb-3">
                  <input-validate
                    ref="company_okved"
                    v-model="form.company_okved"
                    :disable-root-classes="true"
                    :disable-input-classes="true"
                    vid="company_okved"
                    label="ОКВЭД"
                    placeholder=""
                    rules="required"
                    required-star
                    type="text"
                  />
                </div>
              </div>
              <div class="pb-3">
                <input-validate
                  ref="company_director"
                  v-model="form.company_director"
                  :disable-root-classes="true"
                  :disable-input-classes="true"
                  vid="company_director"
                  label="Генеральный директор"
                  placeholder=""
                  rules="required|ru_only"
                  required-star
                  type="text"
                />
              </div>
              <div class="pb-3">
                <input-validate
                  ref="company_director_power"
                  v-model="form.company_director_power"
                  :disable-root-classes="true"
                  :disable-input-classes="true"
                  vid="company_director_power"
                  label="Полномочия генерального директора"
                  placeholder=""
                  rules="required|ru_only"
                  required-star
                  type="text"
                />
              </div>
              <div class="pb-3">
                <input-validate
                  ref="company_accountant"
                  v-model="form.company_accountant"
                  :disable-root-classes="true"
                  :disable-input-classes="true"
                  vid="company_accountant"
                  label="Главный бухгалтер"
                  placeholder=""
                  rules="required|ru_only"
                  required-star
                  type="text"
                />
              </div>
              <input
                id="checkbox"
                v-model="form.agreement"
                type="checkbox"
                class="checkbox"
              />
              <label class="label-checkbox" for="checkbox"
                >Я согласен с
                <nuxt-link to="/terms">офертой</nuxt-link>
                и
                <nuxt-link to="/policy">политикой конфиденциальности</nuxt-link>
                данных</label
              >
              <div
                v-if="!(valid && form.agreement && isRequiredDocs)"
                class="text-2"
              >
                Заполните все обязательные поля и проверьте корректность
                введеных данных
              </div>
              <div
                v-for="(error, index) in errors"
                :key="index"
                class="err"
                v-text="error.join(', ')"
              />
              <my-button
                :disabled="!(form.agreement && valid)"
                class="btn btn-primary send"
                :loader="loader"
                text="Отправить заявку"
              />
            </div>
          </div>
        </ValidationObserver>
      </div>
    </section>
    <client-only>
      <RequestAccepted />
    </client-only>
  </main>
</template>

<script>
import readableFileSize from '~/components/mixins/readableFileSize'
import ErrorBaseMixin from '~/components/mixins/ErrorBaseMixin'
import { StringHelper } from '~/helpers'

export default {
  name: 'RegistrationPage',
  mixins: [readableFileSize, ErrorBaseMixin],
  fetchOnServer: false,

  data() {
    return {
      loader: false,
      errorsFromServer: [],
      phoneMask: '+7 (###) ###-##-##',
      suggestion: null,
      form: {
        user_surname: null,
        user_name: null,
        user_patronymic: null,
        user_phone: null,
        user_email: null,
        user_job_title: null,
        signatory_name: null,
        signatory_surname: null,
        signatory_patronymic: null,
        signatory_job_title: null,
        signatory_based: null,
        company_license_number: null,
        company_license_activity: null,
        company_license_date: null,
        company_type: 2,
        company_name: null,
        company_short_name: null,
        company_legal_address: null,
        company_postal_address: null,
        company_phone: null,
        company_email: null,
        company_inn: null,
        company_ogrn: null,
        company_bik: null,
        company_bank_name: null,
        company_account_number: null,
        company_corr_account_number: null,
        company_okpo: null,
        company_okogu: null,
        company_okato: null,
        company_oktmo: null,
        company_okfs: null,
        company_okved: null,
        company_director: null,
        company_director_power: null,
        company_accountant: null,
        company_kpp: null,
        file_ogrnip: null,
        file_passport: null,
        file_egrip: null,
        file_ogrn: null,
        file_opnu: null,
        file_aoa: null,
        file_egrul: null,
        agreement: false,
      },
    }
  },

  async fetch() {},
  computed: {
    isRequiredDocs() {
      switch (this.form.company_type) {
        case 2: {
          return (
            this.form.file_ogrn &&
            this.form.file_opnu &&
            this.form.file_aoa &&
            this.form.file_egrul
          )
        }
        case 1: {
          return (
            this.form.file_passport &&
            this.form.file_egrip &&
            this.form.file_ogrnip
          )
        }
        default: {
          return false
        }
      }
    },
  },
  watch: {
    suggestion() {
      this.form.company_name = this.suggestion?.data?.name?.full_with_opf
      this.form.company_short_name = this.suggestion?.data?.name?.short_with_opf
      this.form.company_legal_address =
        this.suggestion?.data?.address?.unrestricted_value
      // this.form.company_postal_address = this.suggestion?.data?.address?.unrestricted_value
      // this.form.company_phone = ''
      // this.form.company_email = ''
      this.form.company_inn = this.suggestion?.data?.inn
      this.form.company_kpp = this.suggestion?.data?.kpp
      this.form.company_ogrn = this.suggestion?.data?.ogrn
      // this.form.company_bank_details = ''
      this.form.company_okpo = this.suggestion?.data?.okpo
      this.form.company_okogu = this.suggestion?.data?.okogu
      this.form.company_okato = this.suggestion?.data?.okato
      this.form.company_oktmo = this.suggestion?.data?.oktmo
      this.form.company_okfs = this.suggestion?.data?.okfs
      this.form.company_okved = this.suggestion?.data?.okved
      // this.form.company_director = ''
      // this.form.company_director_power = ''
      // this.form.company_accountant = ''
    },
  },
  methods: {
    changeFile(event) {
      this.form[event.target.id] = this.$refs[event.target.id].files.item(0)
    },
    removeFile(ref) {
      this.form[ref] = null
      this.$refs[ref].value = null
    },
    changeFileHandler(file, ref) {
      this.form[ref] = file
    },
    removeFileHandler(ref) {
      this.form[ref] = null
    },
    setSuggestion(suggestion) {
      this.suggestion = suggestion
    },
    async submit() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      this.loader = true
      const formData = new FormData(this.$refs.observer.$el)

      if (this.form.company_phone) {
        const companyPhone =
          '+' + StringHelper.onlyNumbers(this.form.company_phone)
        formData.set('company_phone', companyPhone)
      }
      const userPhone = '+' + StringHelper.onlyNumbers(this.form.user_phone)
      formData.set('user_phone', userPhone)

      formData.set('company_name', this.form.company_name)
      formData.set('company_license_number', this.form.company_license_number)
      formData.set('company_license_date', this.form.company_license_date)
      formData.set(
        'company_license_activity',
        this.form.company_license_activity
      )
      formData.delete('date')
      formData.delete('Номер лицензии')
      try {
        await this.$axios
          .$post('/auth/register', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then(() => {
            this.$bvModal.show('request-accepted')
          })
      } catch (e) {
        // this.$refs.observer.setErrors(e?.response?.data.errors)
        this.takeErrorResponseWithObserver(e, this.$refs.observer)
      } finally {
        this.loader = false
      }
    },
    disabledDate(date) {
      const today = new Date().setHours(0, 0, 0, 0)
      return date > new Date(today)
    },
  },
}
</script>

<style scoped>
.err {
  color: #d05359;
  font-size: 14px;
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
</style>
