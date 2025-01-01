<template>
    <div class="row">
        <div class="col-12 col-lg-8">
            <div class="row">
              <div class="col-12 col-lg-6" v-for="(key, index) in language" :key="index">
                    <div class="form-group">
                        <label for="title">{{ $t("title") }} ({{ key.code.toUpperCase() }})</label>
                        <input
                        v-model="form.description[index].list.title"
                        type="text"
                        class="form-control mb-2"
                        :id="'title' + index"
                        :placeholder="$t('title')+ ' (' + key.code.toUpperCase() + ')' "
                        :class="{ 'is-invalid': v$.description[index].list.title.$error }"
                        @change="v$.description[index].list.title.$touch"
                        @keyup="copyName(key.code, index)"
                        />
                        <span class="invalid-feedback" v-if="v$.description[index].list.title.$error">{{
                          $t('title')+' ( '+key.code.toUpperCase()+') '+$t(v$.description[index].list.title.$errors[0].$message)
                        }}</span>
                    </div>
                </div>
                <div class="col-12 col-lg-6" v-for="(key, index) in language" :key="index">
                    <div class="form-group">
                        <label for="sub_title">{{ $t("sub_title") }} ({{ key.code.toUpperCase() }})</label>
                        <input
                          v-model="form.description[index].list.sub_title"
                          type="text"
                          class="form-control mb-2"
                          :id="'sub_title' + index"
                          :placeholder="$t('sub_title')+ ' (' + key.code.toUpperCase() + ')' "
                          :class="{ 'is-invalid': v$.description[index].list.sub_title.$error }"
                          @change="v$.description[index].list.sub_title.$touch"
                        />
                        <span class="invalid-feedback" v-if="v$.description[index].list.sub_title.$error">{{
                          $t('sub_title')+' ( '+key.code.toUpperCase()+') '+$t(v$.description[index].list.sub_title.$errors[0].$message)
                        }}</span>
                    </div>
                </div>
                <div class="col-12 col-lg-6" v-for="(key, index) in language" :key="index">
                    <div class="form-group">
                        <label for="meta_title">{{ $t("meta_title") }} ({{ key.code.toUpperCase() }})</label>
                        <input
                        v-model="form.description[index].list.meta_title"
                        type="text"
                        class="form-control mb-2"
                        :id="'meta_title' + index"
                        :placeholder="$t('meta_title')+ ' (' + key.code.toUpperCase() + ')' "
                        @change="v$.description[index].list.meta_title.$touch"
                        :class="{ 'is-invalid': v$.description[index].list.meta_title.$error }"
                        />
                        <span class="invalid-feedback" v-if="v$.description[index].list.meta_title.$error">{{
                          $t('meta_title')+' ( '+key.code.toUpperCase()+') '+$t(v$.description[index].list.meta_title.$errors[0].$message)
                        }}</span>
                    </div>
                </div>
                <div class="col-12" v-for="(key, index) in language" :key="index">
                    <div class="form-group">
                        <label for="description">{{ $t("description") }} ({{ key.code.toUpperCase() }})</label>
                        <textarea 
                          id="description" 
                          cols="30" 
                          rows="3" 
                          class="form-control mb-2"
                          v-model="form.description[index].list.description"
                          :placeholder="$t('description')+ ' (' + key.code.toUpperCase() + ')' "
                          @keyup="copyDescription(key.code, index)"
                          :class="{ 'is-invalid': v$.description[index].list.description.$error }"
                          @change="v$.description[index].list.description.$touch"
                        >
                        </textarea>
                        <span class="invalid-feedback" v-if="v$.description[index].list.description.$error">
                          {{
                            $t('description')+' ( '+key.code.toUpperCase()+') '+$t(v$.description[index].list.description.$errors[0].$message)
                          }}
                        </span>
                    </div>
                </div>
                <div class="col-12" v-for="(key, index) in language" :key="index">
                    <div class="form-group">
                        <label for="meta_description">{{ $t("meta_description") }} ({{ key.code.toUpperCase() }})</label>
                        <textarea 
                            id="meta_description" 
                            cols="30" 
                            rows="3" 
                            class="form-control mb-2"
                            v-model="form.description[index].list.meta_description"
                            :placeholder="$t('meta_description')+ ' (' + key.code.toUpperCase() + ')' "
                            :class="{ 'is-invalid': v$.description[index].list.meta_description.$error }"
                            @change="v$.description[index].list.meta_description.$touch"
                        >
                        </textarea>
                        <span class="invalid-feedback" v-if="v$.description[index].list.meta_description.$error">
                          {{
                            $t('meta_description')+' ( '+key.code.toUpperCase()+') '+$t(v$.description[index].list.meta_description.$errors[0].$message)
                          }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-lg-4">
            <div class="row">
                <div class="col-12 mt-2">
                    <div>
                        <p for="image" class="text-center mb-2">
                        {{ $t("background_image") }}
                        </p>
                        <div class="text-center">
                            <img
                                :src="getImagePath(form.img,'page')"
                                width="240"
                                style="height: 240px; object-fit: cover"
                                class="rounded mx-auto d-block img-fluid"
                            />
                        </div>
                        <div class="file-content text-center m-t-20">
                            <div class="media-body">
                                <div
                                style="height: 0px; width: 0px; overflow: hidden"
                                >
                                    <input
                                        ref="fileInput"
                                        style="display: none"
                                        type="file"
                                        accept=".jpg, .jpeg, .gif, .png, .webp, .svg"
                                        :multiple="false"
                                        @change="onFileChange"
                                    />
                                </div>
                                <div class="d-flex flex-column gap-1">
                                    <span
                                        class="text-danger text-center"
                                        style="font-size: 12px"
                                        >{{ $t("less_than_15_MB") }}</span
                                    >
                                    <div align="center">
                                        <div
                                        class="btn btn-outline-primary ms-2"
                                        @click="chooseImage('img')"
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
            </div>
        </div>
        <div class="col-12 mt-3">
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">{{ $t("emergency_case") }}</button>
              <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">{{ $t("doctor_timetable") }}</button>
              <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">{{ $t("open_time") }}</button>
            </div>
          </nav>
          <div class="tab-content mt-3" id="nav-tabContent">
            <!-- for emergency case -->
            <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
              <div class="row">
                <div class="col-12 col-lg-8">
                  <div class="row">
                    <div class="col-12">
                      <div class="form-group">
                        <label for="phone_number">{{ $t("phone_number") }}</label>
                        <input
                        v-model="emergency_case.phone"
                        type="text"
                        class="form-control mb-2"
                        id="phone_number"
                        :placeholder="$t('phone_number')"
                        />
                      </div>
                    </div>
                    <div class="col-12 col-lg-6" v-for="(key, index) in language" :key="index">
                      <div class="form-group">
                        <label for="title">{{ $t("title") }} ({{ key.code.toUpperCase() }})</label>
                        <input
                        v-model="emergency_case.description[index].title"
                        type="text"
                        class="form-control mb-2"
                        :id="'titleEC' + index"
                        :placeholder="$t('title')+ ' (' + key.code.toUpperCase() + ')' "
                        />
                      </div>
                    </div>
                    <div class="col-12" v-for="(key, index) in language" :key="index">
                    <div class="form-group">
                        <label for="description">{{ $t("description") }} ({{ key.code.toUpperCase() }})</label>
                        <textarea 
                            id="description" 
                            cols="30" 
                            rows="3" 
                            class="form-control mb-2"
                            v-model="emergency_case.description[index].description"
                            :placeholder="$t('description')+ ' (' + key.code.toUpperCase() + ')' "
                        >
                        </textarea>
                    </div>
                </div>
                  </div>
                </div>
                <div class="col-12 col-lg-4">
                    <div class="row">
                        <div class="col-12 mt-2">
                            <div>
                                <p for="logo" class="text-center mb-2">
                                {{ $t("logo") }}
                                </p>
                                <div class="text-center">
                                    <img
                                        :src="getImagePath(emergency_case.logo,'page')"
                                        width="240"
                                        style="height: 240px; object-fit: cover"
                                        class="rounded mx-auto d-block img-fluid"
                                    />
                                </div>
                                <div class="file-content text-center m-t-20">
                                    <div class="media-body">
                                        <div
                                        style="height: 0px; width: 0px; overflow: hidden"
                                        >
                                            <input
                                                ref="fileInputLogoEC"
                                                style="display: none"
                                                type="file"
                                                accept=".jpg, .jpeg, .gif, .png, .webp, .svg"
                                                :multiple="false"
                                                @change="onFileChange"
                                            />
                                        </div>
                                        <div class="d-flex flex-column gap-1">
                                            <span
                                                class="text-danger text-center"
                                                style="font-size: 12px"
                                                >{{ $t("less_than_15_MB") }}</span
                                            >
                                            <div align="center">
                                                <div
                                                class="btn btn-outline-primary ms-2"
                                                @click="chooseImage('logoEC')"
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
                    </div>
                </div>
              </div>
            </div>
            <!-- for doctor_timetable -->
            <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
               <div class="row">
                <div class="col-12 col-lg-8">
                  <div class="row">
                    <div class="col-12 col-lg-6" v-for="(key, index) in language" :key="index">
                      <div class="form-group">
                        <label for="title">{{ $t("title") }} ({{ key.code.toUpperCase() }})</label>
                        <input
                        v-model="doctor_timetable.description[index].title"
                        type="text"
                        class="form-control mb-2"
                        :id="'titleDT' + index"
                        :placeholder="$t('title')+ ' (' + key.code.toUpperCase() + ')' "
                        />
                      </div>
                    </div>
                    <div class="col-12" v-for="(key, index) in language" :key="index">
                    <div class="form-group">
                        <label for="description">{{ $t("description") }} ({{ key.code.toUpperCase() }})</label>
                        <textarea 
                            id="description" 
                            cols="30" 
                            rows="3" 
                            class="form-control mb-2"
                            v-model="doctor_timetable.description[index].description"
                            :placeholder="$t('description')+ ' (' + key.code.toUpperCase() + ')' "
                        >
                        </textarea>
                    </div>
                </div>
                  </div>
                </div>
                <div class="col-12 col-lg-4">
                    <div class="row">
                        <div class="col-12 mt-2">
                            <div>
                                <p for="logo" class="text-center mb-2">
                                {{ $t("logo") }}
                                </p>
                                <div class="text-center">
                                    <img
                                        :src="getImagePath(doctor_timetable.logo,'page')"
                                        width="240"
                                        style="height: 240px; object-fit: cover"
                                        class="rounded mx-auto d-block img-fluid"
                                    />
                                </div>
                                <div class="file-content text-center m-t-20">
                                    <div class="media-body">
                                        <div
                                        style="height: 0px; width: 0px; overflow: hidden"
                                        >
                                            <input
                                                ref="fileInputLogoDT"
                                                style="display: none"
                                                type="file"
                                                accept=".jpg, .jpeg, .gif, .png, .webp, .svg"
                                                :multiple="false"
                                                @change="onFileChange"
                                            />
                                        </div>
                                        <div class="d-flex flex-column gap-1">
                                            <span
                                                class="text-danger text-center"
                                                style="font-size: 12px"
                                                >{{ $t("less_than_15_MB") }}</span
                                            >
                                            <div align="center">
                                                <div
                                                class="btn btn-outline-primary ms-2"
                                                @click="chooseImage('logoDT')"
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
                    </div>
                </div>
              </div>
            </div>
            <!-- for open_time -->
            <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0">
              <div class="row">
                <div class="col-12 col-lg-8">
                  <div class="row">
                    <div class="col-12 col-lg-6" v-for="(key, index) in language" :key="index">
                      <div class="form-group">
                        <label for="title">{{ $t("title") }} ({{ key.code.toUpperCase() }})</label>
                        <input
                        v-model="open_time.title[index].title"
                        type="text"
                        class="form-control mb-2"
                        :id="'titleOT' + index"
                        :placeholder="$t('title')+ ' (' + key.code.toUpperCase() + ')' "
                        />
                      </div>
                    </div>
                    <div class="col-12 mb-3">
                      <span @click="addWorkingTime" class="text-primary my-2 add_working_time">
                        <Icon class="me-2" name="solar:add-circle-linear" size="20" />
                        {{ $t("add_working_time") }}
                      </span>
                    </div>
                    <div class="col-12" v-for="(working_time, index) in open_time.working_time" :key="index">
                      <div class="row">
                        <div class="col-4" v-for="(key, ind) in language" :key="index">
                          <div class="form-group">
                            <input
                            v-model="working_time.title[ind].title"
                            type="text"
                            class="form-control mb-2"
                            :id="'titleWT' + ind"
                            :placeholder="$t('title')+ ' (' + key.code.toUpperCase() + ')' "
                            />
                          </div>
                        </div>
                        <div class="col-3">
                          <div class="form-group">
                            <input
                            v-model="working_time.time"
                            type="text"
                            class="form-control mb-2"
                            :id="'timeOT' + index"
                            :placeholder="$t('time')"
                            />
                          </div>
                        </div>
                        <div class="col-1 d-flex justify-content-end align-items-center">
                          <span class="text-danger cursor-pointer" @click="removeWorkingTime(index)">
                            <Icon class="me-2" name="solar:trash-bin-trash-linear" size="25" />
                          </span>
                        </div>
                      </div> 
                    </div> 
                  </div>
                </div>
                <div class="col-12 col-lg-4">
                    <div class="row">
                        <div class="col-12 mt-2">
                            <div>
                                <p for="logo" class="text-center mb-2">
                                {{ $t("logo") }}
                                </p>
                                <div class="text-center">
                                    <img
                                        :src="getImagePath(open_time.logo,'page')"
                                        width="240"
                                        style="height: 240px; object-fit: cover"
                                        class="rounded mx-auto d-block img-fluid"
                                    />
                                </div>
                                <div class="file-content text-center m-t-20">
                                    <div class="media-body">
                                        <div
                                        style="height: 0px; width: 0px; overflow: hidden"
                                        >
                                            <input
                                                ref="fileInputLogoOT"
                                                style="display: none"
                                                type="file"
                                                accept=".jpg, .jpeg, .gif, .png, .webp, .svg"
                                                :multiple="false"
                                                @change="onFileChange"
                                            />
                                        </div>
                                        <div class="d-flex flex-column gap-1">
                                            <span
                                                class="text-danger text-center"
                                                style="font-size: 12px"
                                                >{{ $t("less_than_15_MB") }}</span
                                            >
                                            <div align="center">
                                                <div
                                                class="btn btn-outline-primary ms-2"
                                                @click="chooseImage('logoOT')"
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
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="my-3" style="border-bottom: 1px solid #efefef;"></div>
        <div class="col-12 d-flex justify-content-end">
            <span class="btn btn-primary" @click="save()">
                <Icon name="mdi:content-save-outline" size="18"></Icon>
                {{ $t("save") }}
            </span>
        </div>
         <!-- cropImage -->
      <CropImage
        ref="cropImageModal"
        :auto-zoom="false"
        :freeSize="true"
        :resizable="true"
        :movable="true"
        @imageCroped="imagecroped"
      ></CropImage>
    </div>
</template>
<script setup>
    import moment from "moment";
import { useCategoryList } from "~/store/category_list";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import { pageAPI } from "~/constants/api";
import WangEditor from "~/components/WangEdiot.vue";
import ModalCropperImage from "~/components/ModalCropperImage.vue";
import businessTypeEnum from "~/composables/enum/businessTypeEnum";
import { useLanguageStore } from "~/store/language";
import { useCategoryType } from "~/store/category_type";
const languageStore = useLanguageStore();
const language = ref(languageStore.lists);

const modalShowCropperImage = ref(null);
const hideShowCropperImage = ref(false);
let aspectRatio = ref(480/260);
let cropWidth = ref(null);
let cropHeight = ref(null);
const defaultEmergencyCase = {
  logo: null,
  phone: null,
  description:language.value.map(lang => ({
      language_code: lang.code,
      language_id: lang.id,
      description: null,
      title: null
  }))
}
const emergency_case = ref(defaultEmergencyCase);
const defaultDoctorTimetable = {
  logo: null,
  description:language.value.map(lang => ({
      language_code: lang.code,
      language_id: lang.id,
      description: null,
      title: null
  }))
}
const doctor_timetable = ref(defaultDoctorTimetable);
const defaultOpenTime = {
  logo: null,
  title:language.value.map(lang => ({
      language_code: lang.code,
      language_id: lang.id,
      title: null
  })),
  working_time:[]
}
const open_time = ref(defaultOpenTime);
const defaultForm = {
    id: null,
    description: language.value.map(lang => ({
        language_code: lang.code,
        language_id: lang.id,  // Add language_id from the language list
        list:{
            title: null, // Initialize title as null
            sub_title: null,
            meta_title: null,
            meta_description: null,
            description: null,
            emergency_case:{},
            doctor_timetable:{},
            open_time:{}
        }
    })),
  img: null,
  business_id: businessTypeEnum.kdac,
  category_id: null,
  status: 1,
  name: "home"
};

const editor = ref(null);
const categoryList = useCategoryList();
const route = useRoute();
const fileInput = ref(null);
const fileInputLogoEC = ref(null);
const fileInputLogoDT = ref(null);
const fileInputLogoOT = ref(null);
const cropImageModal = ref(null);
let targetFile = ref(null);
const voiceInput = ref(null);

let form = reactive({
  ...defaultForm,
});
const changeDate = (date) => {
  form.publish_date = moment(date).format("YYYY-MM-DD");
}

const rules = computed(() => {
  return {
    description: language.value.map(lang => ({
      list:{
        title: {
          required,
          $autoDirty: true,
        },
        sub_title: {
          required,
          $autoDirty: true,
        },
        meta_title: {
          required,
          $autoDirty: true,
        },
        meta_description: {
          required,
          $autoDirty: true,
        },
        description: {
          required,
          $autoDirty: true,
        },
      }
    })),
    category_id: {
      required,
      $autoDirty: true,
    },
  };
});
const v$ = vuelidate(rules, form);

onMounted(() => {
  getData();
});
const copyName = (code, index) => {
    form.description[index].list.meta_title = form.description[index].list.title;
}
const copyDescription = (code, index) => {
    form.description[index].list.meta_description = form.description[index].list.description;
}
const removeWorkingTime = (index) => {
  open_time.value.working_time.splice(index, 1);
}
function convertString(input) {
    return input.toLowerCase().replace(/ /g, '-');
}

const imgType = ref(null);
const chooseImage = (type) => {
  imgType.value = type;
  if (imgType.value == "img") {
    fileInput.value.click();
  }else if(imgType.value == "logoEC") {
    fileInputLogoEC.value.click();
  }else if(imgType.value == "logoDT") {
    fileInputLogoDT.value.click();
  }else if(imgType.value == "logoOT") {
    fileInputLogoOT.value.click();
  }
};
const onFileChange = ($event) => {
  const files = $event.target.files || $event.dataTransfer.files;
  if (files[0]) {
    if (files[0].size > 15000000) {
      fileInput.value = "";
      fileInputLogoEC.value = "";
      fileInputLogoDT.value = "";
      fileInputLogoOT.value = "";
      form.img = "";
      emergency_case.value.logo = "";
      doctor_timetable.value.logo = "";
      open_time.value.logo = "";
      useNuxtApp().$showToast({
        msg: "Image file must be less than 15 MB.",
        type: "warning",
      });
      return;
    }
    // Check if the file is an image and if it is of type jpg, jpeg, or gif
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];
    if (
      files[0].type.indexOf("image/") === -1 ||
      !allowedTypes.includes(files[0].type.toLowerCase())
    ) {
      swal({
        icon: "warning",
        title: "Image Validation",
        text: "Please select a JPG, JPEG, or GIF image file.",
      });
      return;
    }
  }
  
  cropImageModal.value.showModal($event);
  fileInput.value.value = null; 
  fileInputLogoEC.value.value = null;
  fileInputLogoDT.value.value = null;
  fileInputLogoOT.value.value = null;
};
const imagecroped = (data) =>{
  if (imgType.value == "img") {
    form.img = data;
  }else if (imgType.value == "logoEC") {  
    emergency_case.value.logo = data;
  }else if (imgType.value == "logoDT") {  
    doctor_timetable.value.logo = data;
  }else if (imgType.value == "logoOT") {  
    open_time.value.logo = data;
  }
}

const getInput = () => {
  return {
    id: form.id,
    img: form.img,
    category_id: form.category_id,
    business_id: businessTypeEnum.kdac,
    name: form.name,
    status: form.status,
    description: form.description
  };
};

const setInput = (res) => {
  if(!res.data) return
  form.id = res.data.id;
  form.img = res.data.image;
  form.category_id = res.data.category_id;
  form.business_id = businessTypeEnum.kdac;
  form.status = res.data.status
  const parsedName = JSON.parse(res.data.description);
  form.description = defaultForm.description.map((defaultItem) => ({
    ...defaultItem,
    list: parsedName[defaultItem.language_code] || null,
  }));
  form.name = res.data.name
  emergency_case.value = form.description[0].list.emergency_case;
  doctor_timetable.value = form.description[0].list.doctor_timetable;
  open_time.value = form.description[0].list.open_time;
};

const getData = async () => {
  let data = await ifetch(pageAPI.getSection, { name: "home" });	
  setInput(data);
};

//Add working time
const addWorkingTime = () => {
  let item = language.value.map(lang => ({
    language_code: lang.code,
    language_id: lang.id,
    title: null,
  }));
  let element = {
    title: item,
    time : null
  }
  open_time.value.working_time.push(element);
  
}

const save = async (type) => {
  let category = categoryList.lists.find((item) => item.type == useCategoryType().section);
  form.category_id = category.id;
  const result = await v$.value.$validate();
  if (result) {
    let url = pageAPI.storeOrUpdateHomeSection;
    form.description.forEach((item, index) => {
      item.list.emergency_case = emergency_case.value;
      item.list.doctor_timetable = doctor_timetable.value;
      item.list.open_time = open_time.value;
    })
    let input = getInput();
    const listMap = input.description.reduce((acc, item) => {
      acc[item.language_code] = item.list;
      return acc;
    }, {});
    // form.description = listMap
    input.description = JSON.stringify(listMap);
    
    await ifetch(url, input).then((res) => {
      iAlert().success();
      getData();
    });
    
  } else {
    useNuxtApp().$showToast({ msg: "Invalid Input.", type: "error" });
  }
};

const setDefaultForm = () => {
  Object.assign(form, defaultForm);
  Object.assign(emergency_case, defaultEmergencyCase);
  Object.assign(doctor_timetable, defaultDoctorTimetable);
  Object.assign(open_time, defaultOpenTime);
  v$.value.$reset();
};
</script>
<style>
  .nav-link{
    text-transform: capitalize !important;
  }
  .add_working_time{
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
  }
  .add_working_time:hover{
    text-decoration: underline;
  }
</style>