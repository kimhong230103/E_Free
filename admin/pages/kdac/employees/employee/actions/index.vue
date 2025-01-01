<template>
  <div>
    <div class="row">
      <div class="col-sm-12 mt-3">
        <div class="card">
          <div class="card-header b-t-primary border-3">
            <div class="row">
              <div
                class="col-12 d-flex justify-content-between align-items-center"
              >
                <div class="d-flex align-items-center gap-2">
                  <Icon name="material-symbols:work" size="20"></Icon>
                  <h5 class="pb-0">
                    {{ `${$t(props.acttionType)} ${$t("employee")}` }}
                  </h5>
                </div>

                <div class="d-flex gap-2">
                  <button class="btn btn-warning" @click="back">
                    <Icon name="ri:arrow-go-back-line" size="20"></Icon>
                    {{ $t("back") }}
                  </button>
                  <button class="btn btn-primary" @click="save(1)">
                    <Icon name="mdi:content-save-outline" size="20"></Icon>
                    {{ $t(saveButtonName) }}
                  </button>
                  <button
                    class="btn btn-primary"
                    @click="save(2)"
                    v-if="props.acttionType == appConst.formAction.add"
                  >
                    <Icon name="mdi:content-save-outline" size="20"></Icon>
                    {{ $t("save_new") }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="card-body">
            <!-- section 1 -->
            <div class="row">
              <div class="col-8">
                <!-- name -->
                <div
                  class="form-group mb-2"
                  v-for="(item, index) in languageList.lists"
                  :key="index"
                >
                  <label class="required" :for="`name-${item.code}`">{{
                    `${$t("name")} (${item.code.toUpperCase()})`
                  }}</label>
                  <input
                    id="name-{{ item.code }}"
                    v-model="form.employee[index].name"
                    required
                    type="text"
                    class="form-control"
                    :class="{
                      'is-invalid': v$.employee[index].name.$error,
                    }"
                    @change="v$.employee[index].name.$touch"
                    :placeholder="`${$t('name')} (${item.code.toUpperCase()})`"
                  />
                  <span
                    class="invalid-feedback"
                    v-if="v$.employee[index].name.$error"
                  >
                    {{
                      `
                  ${$t("name")} (${item.code.toUpperCase()}) ${$t(
                        v$.employee[index].name.$errors[0].$message
                      )}
                  `
                    }}
                  </span>
                </div>

                <!-- job position -->
                <div class="form-group mb-2">
                  <label class="required" for="job_position">
                    {{ $t("job_position") }}
                  </label>
                  <select
                    id="job_position"
                    class="form-select"
                    v-model="form.job_position_id"
                    :class="{
                      'is-invalid': v$.job_position_id.$error,
                    }"
                    @change="v$.job_position_id.$touch"
                  >
                    <option :value="null">{{ $t("please_select") }}</option>
                    <option
                      v-for="(item, index) in jobPositionsList"
                      :value="item.id"
                      :key="index"
                    >
                      {{ getNameByLang(item.name) }}
                    </option>
                  </select>
                  <span
                    class="invalid-feedback"
                    v-if="v$.job_position_id.$error"
                  >
                    {{
                      `
                    ${$t("job_position")} ${$t(
                        v$.job_position_id.$errors[0].$message
                      )}
                    `
                    }}
                  </span>
                </div>

                <!-- specialty -->
                <div class="form-group">
                  <lablel class="required"> {{ $t("specialty") }} </lablel>
                  <Multiselect
                    v-model="specialtySeleted"
                    :options="specialtyList"
                    track-by="name"
                    :multiple="true"
                    :close-on-select="true"
                    :showLabels="false"
                    label="name"
                    :searchable="true"
                    :hideSelected="true"
                    @remove="toggleUnSelectMarket"
                    :class="{
                      'is-invalid': v$.specialty.$error,
                    }"
                    @change="v$.specialty.$touch"
                    :placeholder="$t('please_select')"
                  >
                  </Multiselect>
                  <span class="invalid-feedback" v-if="v$.specialty.$error">
                    {{
                      `
                    ${$t("specialty")} ${$t(v$.specialty.$errors[0].$message)}
                    `
                    }}
                  </span>
                </div>

                <!-- expertise -->
                <div class="form-group mt-2">
                  <lablel class="required"> {{ $t("expertise") }} </lablel>
                  <Multiselect
                    v-model="expertiseSeleted"
                    :options="expertiseList"
                    track-by="name"
                    :multiple="true"
                    :close-on-select="true"
                    :showLabels="false"
                    :hideSelected="true"
                    @remove="toggleUnSelectExpertise"
                    label="name"
                    :searchable="true"
                    :class="{
                      'is-invalid': v$.expertise.$error,
                    }"
                    @change="v$.expertise.$touch"
                    :placeholder="$t('please_select')"
                  >
                  </Multiselect>
                  <span class="invalid-feedback" v-if="v$.expertise.$error">
                    {{
                      `
                    ${$t("expertise")} ${$t(v$.expertise.$errors[0].$message)}
                    `
                    }}
                  </span>
                </div>
                <!-- hire  date -->
                <div class="form-group mt-2">
                  <label class=""> {{ $t("hire_date") }} </label>
                  <IDatePicker
                    v-model="form.hire_date"
                    :range="false"
                    :multiCalendars="false"
                    :dateOnly="true"
                    format="DD-MM-YYYY"
                  />
                </div>

                <!-- Email -->
                <div class="form-group mt-2">
                  <label class="" for="email">
                    {{ $t("email") }}
                  </label>
                  <input
                    v-model="form.email"
                    id="email"
                    type="email"
                    class="form-control"
                    :placeholder="$t('email')"
                  />
                </div>

                <!-- phone -->
                <div class="form-group mt-2">
                  <label class="" for="phone">
                    {{ $t("phone") }}
                  </label>
                  <input
                    v-model="form.phone"
                    id="phone"
                    type="tel"
                    class="form-control"
                    :placeholder="$t('phone')"
                    @keypress="validatePhoneInput"
                  />
                </div>

                <!-- about me -->
                <div
                  class="form-group mt-2"
                  v-for="(item, index) in languageList.lists"
                  :key="index"
                >
                  <label :for="`about_me-${item.code}`">{{
                    `${$t("about_me")} (${item.code.toUpperCase()})`
                  }}</label>
                  <textarea
                    v-model="form.employee[index].about_me"
                    rows="3"
                    class="form-control"
                    :placeholder="`${$t(
                      'about_me'
                    )} (${item.code.toUpperCase()})`"
                    :id="`about_me-${item.code}`"
                  ></textarea>
                </div>

                <!-- add social link -->
                <div class="form-group mt-2">
                  <div
                    v-if="limitSocail"
                    class="add-social"
                    @click="addSocialLink"
                  >
                    <Icon
                      name="ic:baseline-add-circle-outline"
                      size="20"
                    ></Icon>
                    <b>{{ $t("add_social_link") }}</b>
                  </div>
                  <div
                    class="d-flex gap-3 align-items-center mt-2"
                    v-for="(item, index) in form.social_media"
                    :key="index"
                  >
                    <input
                      v-model="item.url"
                      type="url"
                      name=""
                      id=""
                      placeholder="URL"
                      class="form-control w-75"
                    />
                    <select
                      class="form-select w-25"
                      v-model="item.social_media_id"
                    >
                      <option :value="null">{{ $t("please_select") }}</option>
                      <option
                        class="text-capitalize"
                        v-for="(item, index) in socialMediaList"
                        :value="item.id"
                        :key="index"
                        :class="{
                          'is-invalid': v$.expertise.$error,
                        }"
                        @change="v$.expertise.$touch"
                      >
                        {{ item.name }}
                      </option>
                    </select>
                    <Icon
                      name="uil:trash-alt"
                      size="20"
                      style="color: lightcoral; cursor: pointer"
                      @click="removeSocialLink(index, item)"
                    />
                  </div>
                </div>
              </div>
              <div class="col-4 d-flex justify-content-center flex-column">
                <div class="w-100 text-center">
                  <label> {{ $t("photo") }} </label>
                </div>
                <div class="">
                  <img
                    :src="getImagePath(form.image)"
                    style="height: auto; object-fit: cover"
                    class="rounded mx-auto d-block img-fluid"
                  />
                </div>
                <div class="file-content text-center m-t-20">
                  <div class="media-body">
                    <div style="height: 0px; width: 0px; overflow: hidden">
                      <input
                        ref="fileInput"
                        style="display: none"
                        type="file"
                        accept="image/jpeg, image/gif, image/png, image/webp, image/svg+xml"
                        :multiple="false"
                        @change="onFileChange"
                      />
                    </div>
                    <div class="d-flex flex-column gap-1">
                      <div align="center">
                        <div
                          class="btn btn-outline-primary ms-2"
                          @click="chooseImage"
                        >
                          <vue-feather
                            type="upload"
                            class="text-top"
                          ></vue-feather>
                          {{ $t("upload") }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- end section 1 -->
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header border-3 d-flex align-items-center gap-2">
                <Icon name="zondicons:education" size="20" />
                <h5 class="pb-0">{{ `${$t("education")}` }}</h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <div
                    class="col-12"
                    v-for="(entry, index) in form.education"
                    :key="index"
                  >
                    <div class="row">
                      <div
                        class="col-4 mt-2"
                        v-for="(value, langCode) in entry.degree"
                        :key="langCode"
                      >
                        <div class="form-group">
                          <label
                            class="required"
                            :for="`education-${langCode}-${index}`"
                            >{{
                              `${$t("degree")}(${langCode.toUpperCase()})`
                            }}</label
                          >
                          <input
                            v-model="entry.degree[langCode]"
                            type="text"
                            class="form-control"
                            :placeholder="`${$t(
                              'degree'
                            )} (${langCode.toUpperCase()})`"
                            :id="`education-${langCode}-${index}`"
                          />
                        </div>
                      </div>

                      <div class="col-4 mt-2">
                        <div class="form-group">
                          <label
                            class="required"
                            :for="`graduation-${index}`"
                            >{{ $t("graduation_year") }}</label
                          >
                          <div class="d-flex align-items-center gap-2">
                            <input
                              v-model="entry.graduation_year"
                              type="text"
                              class="form-control w-75"
                              :id="`graduation-${index}`"
                              :placeholder="$t('graduation_year')"
                              @input="validateGraduationYear(index)"
                              @keydown="handleSpaceKey(index, $event)"
                            />
                            <Icon
                              v-if="form.education.length > 1 ? true : false"
                              name="uil:trash-alt"
                              size="20"
                              style="color: lightcoral; cursor: pointer"
                              @click="removeEducation(index, entry)"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="add-social" @click="addEducation">
                      <Icon
                        name="ic:baseline-add-circle-outline"
                        size="20"
                      ></Icon>
                      <p>{{ $t("add_degree") }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="card">
              <div class="card-header border-3 d-flex align-items-center gap-2">
                <Icon name="fluent:person-star-48-filled" size="20" />
                <h5 class="pb-0">{{ `${$t("work_experience")}` }}</h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <div
                    class="col-12"
                    v-for="(entry, index) in form.experiences"
                    :key="index"
                  >
                    <div class="row">
                      <div
                        class="col-4 mt-2"
                        v-for="(value, langCode) in entry.title"
                        :key="langCode"
                      >
                        <div class="form-group">
                          <label
                            class="required"
                            :for="`experience-${langCode}-${index}`"
                            >{{
                              `${$t("title")}(${langCode.toUpperCase()})`
                            }}</label
                          >
                          <input
                            v-model="entry.title[langCode]"
                            type="text"
                            class="form-control"
                            :placeholder="`${$t(
                              'title'
                            )} (${langCode.toUpperCase()})`"
                            :id="`experience-${langCode}-${index}`"
                          />
                        </div>
                      </div>

                      <div class="col-4 mt-2">
                        <div class="form-group">
                          <label
                            class="required"
                            :for="`time_period-${index}`"
                            >{{ $t("time_period") }}</label
                          >
                          <div class="d-flex align-items-center gap-2">
                            <input
                              v-model="entry.time_period"
                              type="text"
                              class="form-control w-75"
                              :id="`time_period-${index}`"
                              :placeholder="$t('time_period')"
                              @input="validateTimePriod(index)"
                              @keydown="handleTimePriodSpaceKey(index, $event)"
                            />
                            <Icon
                              v-if="form.experiences.length > 1 ? true : false"
                              name="uil:trash-alt"
                              size="20"
                              style="color: lightcoral; cursor: pointer"
                              @click="removeWorkExperience(index, entry)"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="add-social" @click="addWorkExperience">
                      <Icon
                        name="ic:baseline-add-circle-outline"
                        size="20"
                      ></Icon>
                      <p>{{ $t("add_work_experience") }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- skillset -->
          <div class="col-12" v-if="form.specialty.length > 0">
            <div class="card">
              <div class="card-header border-3 d-flex align-items-center gap-2">
                <Icon name="lets-icons:lamp-fill" size="20" />
                <h5 class="pb-0">{{ `${$t("skillset")}` }}</h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <div
                    class="col-4"
                    v-for="(item, index) in form.specialty"
                    :key="index"
                  >
                    <div class="">
                      <label class="required" :for="`skillset-${index}`">{{
                        item.name
                      }}</label>
                      <div class="input-group">
                        <input
                          v-model="item.skillset"
                          :id="`skillset-${index}`"
                          type="number"
                          class="form-control no-spinners"
                          :placeholder="item.name"
                          min="0"
                          max="100"
                        />
                        <span
                          class="input-group-text px-3"
                          style="background-color: #c9c9c9"
                          >%</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- crop image -->
    <CropImage
      ref="cropImageModal"
      :auto-zoom="false"
      :freeSize="false"
      :width="500"
      :height="600"
      :resizable="true"
      :movable="true"
      @imageCroped="imagecroped"
    ></CropImage>
  </div>
</template>

<script setup>
import Multiselect from "vue-multiselect";
import { employeeAPI } from "~/constants/api";
import { useLanguageStore } from "~/store/language";
import CropImage from "~/components/CropImage.vue";
import { appConst } from "~/constants/app";
import { required, minLength, helpers, email } from "@vuelidate/validators";

const props = defineProps({
  acttionType: {
    type: String,
    default: appConst.formAction.add,
  },
});
const id = ref(useRoute().query.id);
const languageList = useLanguageStore();
const specialtyList = ref([]);
const socialMediaLimit = ref(5);
const expertiseList = ref([]);
const jobPositionsList = ref([]);
const specialtySeleted = ref([]);
const expertiseSeleted = ref([]);
const socialMediaList = ref([]);
const fileInput = ref(null);
const cropImageModal = ref(null);
const limitSocail = ref(true);
const { $i18n } = useNuxtApp();

// trash
const workExperienceRemoved = ref([]);
const educationRemoved = ref([]);
const socialMediaRemoved = ref([]);
const specialtyRemoved = ref([]);
const expertiseRemoved = ref([]);

const initializeDegreeStructure = () => {
  const degreeStructure = {};
  languageList.lists.forEach((lang) => {
    degreeStructure[lang.code] = "";
  });
  return degreeStructure;
};

const initializeExperienceStructure = () => {
  const experienceStructure = {};
  languageList.lists.forEach((lang) => {
    experienceStructure[lang.code] = "";
  });
  return experienceStructure;
};

const saveButtonName = computed(() => {
  if (props.acttionType === appConst.formAction.add) {
    return $i18n.t("save");
  } else if (props.acttionType === appConst.formAction.update) {
    return $i18n.t("update");
  }
});

const defaultForm = reactive({
  specialty: [],
  expertise: [],
  hire_date: null,
  email: null,
  phone: null,
  job_position_id: null,
  image: null,
  social_media: [],
  education: [
    {
      degree: initializeDegreeStructure(),
      graduation_year: null,
    },
  ],
  experiences: [
    {
      title: initializeExperienceStructure(),
      time_period: null,
    },
  ],
  employee: languageList.lists.map((lang) => ({
    language_id: lang.id,
    language_code: lang.code,
    name: null,
    about_me: null,
  })),
});

const form = ref({ ...defaultForm });

const getAllList = async () => {
  await ifetch(employeeAPI.getEmpItems).then((res) => {
    specialtyList.value = res.specialtyList.map((item) => ({
      specialty_id: item.id,
      name: getNameByLang(item.name),
      value: item.id,
    }));
    expertiseList.value = res.expertiseList.map((item) => ({
      expertis_id: item.id,
      name: getNameByLang(item.name),
      value: item.id,
    }));
    jobPositionsList.value = res.jobPositionsList;
    socialMediaList.value = res.socialMedia;
  });
};

const arrayRequired = helpers.withMessage(
  " field must have at least one item",
  (value) => Array.isArray(value) && value.length > 0
);

const apiUrl = {
  add: employeeAPI.store,
  edit: employeeAPI.update,
};

const toggleUnSelectMarket = ({ value, id }) => {
  specialtyRemoved.value.push(id);
};
const rules = computed(() => {
  return {
    job_position_id: {
      required,
      $autoDirty: true,
    },
    expertise: {
      arrayRequired,
      $autoDirty: true,
    },
    specialty: {
      arrayRequired,
      $autoDirty: true,
    },
    employee: languageList.lists.map(() => ({
      name: {
        required,
        $autoDirty: true,
      },
    })),
  };
});

const v$ = vuelidate(rules, form);

const setDefaultFrom = () => {
  form.value = JSON.parse(JSON.stringify(defaultForm));
  specialtySeleted.value = [];
  expertiseSeleted.value = [];
  v$.value.$reset();
};
watch(
  () => specialtySeleted.value,
  () => {
    form.value.specialty = specialtySeleted.value.map((item) => {
      const existing = form.value.specialty.find((s) => s.id === item.id);
      return {
        id: item.id,
        name: item.name,
        specialty_id: item.specialty_id,
        employee_id: existing ? existing.employee_id : null,
        skillset: existing ? existing.skillset : null,
      };
    });
  }
);

watch(
  () => expertiseSeleted.value,
  () => {
    form.value.expertise = expertiseSeleted.value.map((item) => {
      const existing = form.value.expertise.find((s) => s.id === item.id);
      return {
        id: item.id,
        expertis_id: item.expertis_id,
        employee_id: existing ? existing.employee_id : null,
      };
    });
  }
);

watch(
  () => languageList.lists,
  () => {
    if (!form.value.education.length) {
      form.value.education.push({
        degree: initializeDegreeStructure(),
        graduation_year: null,
      });
    }
  },
  { immediate: true }
);

watch(
  () => languageList.lists,
  () => {
    if (!form.value.experiences.length) {
      form.value.experiences.push({
        title: initializeExperienceStructure(),
        time_period: null,
      });
    }
  },
  { immediate: true }
);

watch(
  () => form.value.social_media,
  (val) => {
    if (val.length === socialMediaLimit.value) {
      limitSocail.value = false;
    }
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  if (props.acttionType === appConst.formAction.update) {
    getData();
  }
  setDefaultFrom();
  getAllList();
});

const addEducation = () => {
  form.value.education.push({
    degree: initializeDegreeStructure(),
    graduation_year: null,
  });
};

const removeEducation = (index, entry) => {
  swal({
    title: $i18n.t("are_you_sure"),
    text: $i18n.t("cannot_revert_this"),
    icon: "question",
    showCancelButton: true,
    confirmButtonText: $i18n.t("ok"),
    cancelButtonText: $i18n.t("cancel"),
    reverseButtons: true,
    showLoaderOnConfirm: true,
    preConfirm: () => {
      return new Promise(async (resolve) => {
        form.value.education.splice(index, 1);
        if (entry.id != null) {
          educationRemoved.value.push(entry);
        }
        resolve();
        console.log(educationRemoved.value);
      });
    },
    allowOutsideClick: () => !swal.isLoading(),
  });
};

const addWorkExperience = () => {
  form.value.experiences.push({
    title: initializeExperienceStructure(),
    time_period: null,
  });
};

const removeWorkExperience = (index, entry) => {
  swal({
    title: $i18n.t("are_you_sure"),
    text: $i18n.t("cannot_revert_this"),
    icon: "question",
    showCancelButton: true,
    confirmButtonText: $i18n.t("ok"),
    cancelButtonText: $i18n.t("cancel"),
    reverseButtons: true,
    showLoaderOnConfirm: true,
    preConfirm: () => {
      return new Promise(async (resolve) => {
        form.value.experiences.splice(index, 1);
        if (entry.id != null) {
          workExperienceRemoved.value.push(entry);
        }
        resolve();
      });
    },
    allowOutsideClick: () => !swal.isLoading(),
  });
};

const validatePhoneInput = (e) => {
  const char = e.key;

  if (char === "+") {
    if (e.target.value.includes("+") || e.target.selectionStart > 0) {
      e.preventDefault();
    }
  } else if (!/[\d]/.test(char)) {
    e.preventDefault();
  }
};

const addSocialLink = (e) => {
  form.value.social_media.push({
    url: "",
    social_media_id: null,
  });
};

const removeSocialLink = (index, entry) => {
  swal({
    title: $i18n.t("are_you_sure"),
    text: $i18n.t("cannot_revert_this"),
    icon: "question",
    showCancelButton: true,
    confirmButtonText: $i18n.t("ok"),
    cancelButtonText: $i18n.t("cancel"),
    reverseButtons: true,
    showLoaderOnConfirm: true,
    preConfirm: () => {
      return new Promise(async (resolve) => {
        form.value.social_media.splice(index, 1);
        limitSocail.value = true;
        if (entry.id != null) {
          socialMediaRemoved.value.push(entry);
        }
        resolve();
      });
    },
    allowOutsideClick: () => !swal.isLoading(),
  });
};

const toggleUnSelectExpertise = ({ value, id }) => {
  expertiseRemoved.value.push(id);
};

const chooseImage = () => {
  fileInput.value.click();
};

const onFileChange = (e) => {
  cropImageModal.value.showModal(e);
  fileInput.value.value = null;
};

const imagecroped = (data) => {
  form.value.image = data;
};

const back = async () => {
  await navigateTo({ path: "/kdac/employees/employee" });
};

const handleSpaceKey = (index, event) => {
  if (event.key === " ") {
    let yearInput = form.value.education[index].graduation_year || "";
    if (yearInput.length === 4 && /^\d{4}$/.test(yearInput)) {
      event.preventDefault();
      form.value.education[index].graduation_year = `${yearInput} - `;
    }
  }
};

const handleTimePriodSpaceKey = (index, event) => {
  if (event.key === " ") {
    let yearInput = form.value.experiences[index].time_period || "";
    if (yearInput.length === 4 && /^\d{4}$/.test(yearInput)) {
      event.preventDefault();
      form.value.experiences[index].time_period = `${yearInput} - `;
    }
  }
};

const validateTimePriod = (index) => {
  let yearInput = form.value.experiences[index].time_period || "";

  yearInput = yearInput.replace(/[^0-9\- ]/g, "");
  const parts = yearInput.split(" - ");
  if (parts.length > 2) {
    parts.splice(2);
  }
  if (parts[0] && parts[0].length > 4) {
    parts[0] = parts[0].slice(0, 4);
  }
  if (parts[1] && parts[1].length > 4) {
    parts[1] = parts[1].slice(0, 4);
  }
  form.value.experiences[index].time_period = parts.join(" - ");
};

const validateGraduationYear = (index) => {
  let yearInput = form.value.education[index].graduation_year || "";
  yearInput = yearInput.replace(/[^0-9\- ]/g, "");
  const parts = yearInput.split(" - ");
  if (parts.length > 2) {
    parts.splice(2);
  }
  if (parts[0] && parts[0].length > 4) {
    parts[0] = parts[0].slice(0, 4);
  }
  if (parts[1] && parts[1].length > 4) {
    parts[1] = parts[1].slice(0, 4);
  }
  form.value.education[index].graduation_year = parts.join(" - ");
};

const save = async (action) => {
  let result = await v$.value.$validate();
  if (form.value.social_media.length > 0) {
    form.value.social_media.forEach((item) => {
      for (let key in item) {
        if (item[key] === null || item[key] === undefined || item[key] === "") {
          swal({
            title: $i18n.t("Invalid inputs, Check & try again!"),
            text: `${key == 'social_media_id' ? 'social media':key} is not null`,
            icon: "warning",
            confirmButtonText: $i18n.t("ok"),
          });
          result = false;
          return;
        }
      }
    });
  }
  if (result) {
    const apiEndpoint =
      props.acttionType === appConst.formAction.add ? apiUrl.add : apiUrl.edit;
    form.value.trash = {
      educationRemoved: educationRemoved.value,
      workExperienceRemoved: workExperienceRemoved.value,
      socialMediaRemoved: socialMediaRemoved.value,
      specialtyRemoved: specialtyRemoved.value,
      expertiseRemoved: expertiseRemoved.value,
    };
    await ifetch(apiEndpoint, form.value).then((res) => {
      if (action == 1) {
        back();
      } else {
        setDefaultFrom();
      }
      iAlert().success();
    });
  } else {
    iAlert().invalidInput();
  }
};

const getData = async () => {
  const input = {
    id: id.value,
  };

  await ifetch(employeeAPI.getEmpById, input).then(({ data }) => {
    form.value.employee = data.emp_translate;
    form.value.id = data.id;
    form.value.business_id = data.business_id;
    form.value.job_position_id = data.job_position_id;
    form.value.specialty = data.emp_specialty.map((item) => ({
      id: item.id,
      employee_id: item.employee_id,
      specialty_id: item.specialty_id,
      name: getNameByLang(item.specialty_name),
      skillset: item.skillset,
    }));
    form.value.expertise = data.emp_expertise.map((item) => ({
      id: item.id,
      expertis_id: item.expertise_id,
      name: getNameByLang(item.expertise_name),
    }));
    form.value.email = data.email;
    form.value.image = data.image;
    form.value.phone = data.phone;
    form.value.hire_date = data.hire_date;
    form.value.social_media = data.emp_social.map((item) => ({
      url: item.url,
      social_media_id: item.social_id,
      id: item.emp_social_id,
      emp_id: item.employee_id,
    }));
    form.value.education = data.emp_educations.map((item) => ({
      id: item.id,
      employee_id: item.employee_id,
      degree: parseEducationDegree(item.title),
      graduation_year: item.year || null,
    }));
    form.value.experiences = data.emp_experiences.map((item) => ({
      id: item.id,
      employee_id: item.employee_id,
      title: parseWorkExperience(item.title),
      time_period: item.year || null,
    }));
    nextTick(() => {
      specialtySeleted.value = [...form.value.specialty];
      expertiseSeleted.value = [...form.value.expertise];
    });
  });
};

const parseEducationDegree = (degreeString) => {
  const degreeStructure = initializeDegreeStructure();
  if (!degreeString) return degreeStructure;

  try {
    const parsed = JSON.parse(degreeString);
    if (typeof parsed === "object") {
      for (const lang in parsed) {
        if (parsed.hasOwnProperty(lang)) {
          degreeStructure[lang] = parsed[lang];
        }
      }
    }
  } catch (error) {
    console.warn("Failed to parse degree JSON:", degreeString);
  }

  return degreeStructure;
};

const parseWorkExperience = (workExperienceString) => {
  const workExperienceStructure = initializeExperienceStructure();
  if (!workExperienceString) return workExperienceStructure;

  try {
    const parsed = JSON.parse(workExperienceString);
    if (typeof parsed === "object") {
      for (const lang in parsed) {
        if (parsed.hasOwnProperty(lang)) {
          workExperienceStructure[lang] = parsed[lang];
        }
      }
    }
  } catch (error) {
    console.warn("Failed to parse degree JSON:", workExperienceString);
  }
  return workExperienceStructure;
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.no-spinners::-webkit-inner-spin-button,
.no-spinners::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
.no-spinners {
  -moz-appearance: textfield !important; /* Legacy support */
  appearance: textfield !important; /* Modern browsers, including Firefox */
}
.add-social {
  display: flex;
  gap: 4px;
  margin-top: 10px;
  cursor: pointer;
  transition: all 0.2s;
  align-items: center;
  user-select: none;
}
.add-social:hover {
  color: #01a6ff !important;
}
.multiselect__select {
  display: none;
}

.multiselect {
  margin-top: 5px;
  border-radius: 0.375rem !important;
  font-size: 0.9rem !important;
  border: 1px solid #dee2e6 !important;
  min-height: 0px !important;
}
.multiselect__option--selected {
  background-color: #01a6ff !important;
  color: #ffff !important;
}
/*
.multiselect__option--highlight{
  background-color: #01a6ff !important;
  color: #ffff !important;
}

.multiselect-wrapper{
  border-radius:0.375rem !important;
  font-size: 0.9rem !important;
  border: 1px solid #dee2e6 !important;
  padding: 0.135rem 0.2rem !important;
}
.multiselect-wrapper:focus{
  border-color:rgb(134, 182.5, 254) !important;
  outline: 0 !important;
  box-shadow: none !important;
}
.is-active{
 box-shadow: none !important;
}

.multiselect__tags{
 padding: 3px 40px 0px 8px !important;
}*/
</style>
