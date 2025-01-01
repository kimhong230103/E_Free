<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12 mt-3">
        <div class="card">
          <div class="card-header b-t-primary border-3">
            <div class="row">
              <div
                class="col-12 d-flex justify-content-between align-items-center"
              >
                <h5 class="pb-0">{{ $t("portfolio") }}</h5>
                <div class="d-flex gap-2">
                  <button
                    class="btn btn-warning"
                    @click="navigateTo({ path: '../../portfolio/portfolio' });"
                  >
                    <Icon
                      name="material-symbols:arrow-back-ios-rounded"
                      size="20"
                    ></Icon>
                    {{ $t("back") }}
                  </button>

                  <!-- <button class="btn btn-primary" @click="save('add')">
                    <Icon name="mdi:content-save-plus-outline" size="20"></Icon>
                    {{ $t("save_new") }}
                  </button> -->
                  <button class="btn btn-primary" @click="save('close')">
                    <Icon name="mdi:content-save-outline" size="20"></Icon>
                    {{ $t("save") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12 col-lg-8">
                <div class="row">
                  <div class="col-12 col-lg-6">
                    <div class="form-group required">
                      <label for="category_id">{{ $t("category") }}</label>
                      <select 
                        name="" 
                        id="category_id" 
                        class="form-control" 
                        v-model="form.category_id"
                        :class="{ 'is-invalid': v$.category_id.$error }"
                        @change="v$.category_id.$touch"
                      >
                        <option :value="null">{{ $t("please_select") }}</option>
                        <option
                          v-for="(item, index) in categories"
                          :key="index"
                          :value="item.id"
                        >
                          {{ getNameByLang(item.name) }}
                        </option>
                      </select>
                      <span class="invalid-feedback" v-if="v$.doctor.$error">{{
                        $t(v$.doctor.$errors[0].$message)
                      }}</span>
                    </div>
                  </div>
                  <div class="col-12 col-lg-6">
                    <div class="form-group required">
                      <label for="doctor">{{ $t("doctor") }}</label>
                      <select 
                        name="" 
                        id="doctor" 
                        class="form-control" 
                        v-model="form.doctor"
                        :class="{ 'is-invalid': v$.doctor.$error }"
                        @change="v$.doctor.$touch"
                      >
                        <option :value="null">{{ $t("please_select") }}</option>
                        <option
                          v-for="(item, index) in doctorList"
                          :key="index"
                          :value="item.id"
                        >
                          {{ item.name }}
                        </option>
                      </select>
                      <span class="invalid-feedback" v-if="v$.doctor.$error">{{
                        $t(v$.doctor.$errors[0].$message)
                      }}</span>
                    </div>
                  </div>
                  <div class="col-12 col-lg-6">
                    <div class="form-group required">
                      <label for="service">{{ $t("service") }}</label>
                      <select 
                        name="" 
                        id="service" 
                        class="form-control" 
                        v-model="form.service"
                        :class="{ 'is-invalid': v$.service.$error }"
                        @change="v$.service.$touch"
                      >
                        <option :value="null">{{ $t("please_select") }}</option>
                        <option
                          v-for="(item, index) in serviceList"
                          :key="index"
                          :value="item.id"
                        >
                          {{ getNameByLang(item.service_translate, 'title') }}
                        </option>
                      </select>
                      <span class="invalid-feedback" v-if="v$.service.$error">{{
                        $t(v$.service.$errors[0].$message)
                      }}</span>
                    </div>
                  </div>
                  <div class="col-12 col-lg-6">
                    <div class="form-group required">
                      <label for="client_name">{{ $t("client_name") }}</label>
                      <input
                        v-model="form.client_name"
                        type="text"
                        class="form-control mb-2"
                        id="client_name"
                        :placeholder="$t('client_name')"
                        :class="{ 'is-invalid': v$.client_name.$error }"
                        @change="v$.client_name.$touch"
                      />
                      <span class="invalid-feedback" v-if="v$.client_name.$error">{{
                        $t(v$.client_name.$errors[0].$message)
                      }}</span>
                    </div>
                  </div>
                  <div class="col-12" v-for="item, index in language" :key="index">
                    <div class="form-group required">
                      <label for="name">{{ $t("name") }} ( {{ item.code.toUpperCase() }} )</label>
                      <input
                        v-model="form.post_translate[index].name"
                        type="text"
                        class="form-control mb-2"
                        id="name"
                        :class="{ 'is-invalid': v$.post_translate[index].name.$error }"
                        @change="v$.post_translate[index].name.$touch"
                        @keyup="copyNameEnglish(item.code, index)"
                        :placeholder="$t('name') + ' ( ' + item.code.toUpperCase()+' )'"
                      />
                      <span class="invalid-feedback" v-if="v$.post_translate[index].name.$error">{{
                        $t('name')+' ( '+item.code.toUpperCase()+') '+$t(v$.post_translate[index].name.$errors[0].$message)
                      }}</span>
                    </div>
                  </div>
                  <!-- <div class="col-12 mb-2">
                    <div class="form-group">
                      <label for="publish_date">{{ $t("publish_date") }}</label>
                      <IDatePicker
                        v-model="form.publish_date"
                        :multi-calendars="false"
                        :range="false"
                        :placeholder="$t('publish_date')"
                        @changeDate="changeDate"
                      />
                    </div>
                  </div> -->
                  <div class="col-12">
                    <div class="form-group">
                      <label for="slug">{{ $t("slug") }}</label>
                      <input
                        v-model="form.slug"
                        type="text"
                        class="form-control mb-2"
                        id="slug"
                        :placeholder="$t('slug')"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label for="meta_title">{{ $t("meta_title") }}</label>
                      <input
                        v-model="form.meta_title"
                        type="text"
                        class="form-control mb-2"
                        id="meta_title"
                        :placeholder="$t('meta_title')"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label for="status">{{ $t("status") }}</label>
                      <select name="" id="status" class="form-control" v-model="form.status">
                        <option value="1">{{ $t("enable") }}</option>
                        <option value="0">{{ $t("disable") }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-12">
                    <span class="btn btn-success my-2" @click="addSocialMedia">
                      <Icon name="material-symbols:video-camera-back-add-outline-sharp" size="20"></Icon>
                      {{ $t("add") }} {{ $t("social_media") }}
                    </span>
                    <table class="table table-bordered table-hover tbl-social-media" v-if="form.social_media.length > 0">
                      <tr>
                        <th>{{ $t("id") }}</th>
                        <th>{{ $t("name") }}</th>
                        <th>{{ $t("value") }}</th>
                        <th>{{ $t("action") }}</th>
                      </tr>
                      <tr v-for="item, index in form.social_media" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>
                          <select name="" id="social_media" class="form-control" v-model="item.social_id">
                            <option :value="null">{{ $t("please_select") }}</option>
                            <option
                              v-for="(el, ind) in socialMediaList"
                              :key="ind"
                              :value="el.id"
                            >
                              {{ el.name }}
                            </option>
                          </select>
                        </td>
                        <td>
                          <input
                            v-model="item.value"
                            type="text"
                            class="form-control"
                            :placeholder="$t('value')"
                          />
                        </td>
                        <td>
                          <span class="btn btn-danger text-light" @click="removeSocialMedia(item,index)">
                            <Icon name="material-symbols:delete-outline-rounded" size="20"></Icon>
                          </span>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="col-12">
                    <span class="btn btn-danger my-2" @click="addTag">
                      <Icon name="material-symbols:tab-new-right-outline" size="20"></Icon>
                      {{ $t("add") }} {{ $t("tag") }}
                    </span>
                    <table class="table table-bordered table-hover tbl-tag" v-if="form.tags.length > 0">
                      <tr>
                        <th>{{ $t("id") }}</th>
                        <th>{{ $t("name") }}</th>
                        <th>{{ $t("action") }}</th>
                      </tr>
                      <tr v-for="item, index in form.tags" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>
                          <select name="" id="tag" class="form-control" v-model="item.tag_id">
                            <option :value="null">{{ $t("please_select") }}</option>
                            <option v-for="(el, ind) in tagList" :key="ind" :value="el.id">
                              {{ getNameByLang(el.name) }}
                            </option>
                          </select>
                        </td>
                        <td>
                          <span class="btn btn-danger text-light" @click="removeTag(item,index)">
                            <Icon name="material-symbols:delete-outline-rounded" size="20"></Icon>
                          </span>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-4">
                <div class="row">
                  <div class="col-12 my-2">
                    <div>
                      <p for="image" class="text-center mb-2">
                        {{ $t("image") }}
                      </p>
                      <div class="text-center">
                        <img
                          :src="getImagePath(form.img,'portfolio')"	
                          width="200"
                          style="height: 200px; object-fit: cover"
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
                                @click="chooseImage('image')"
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
                  <div class="col-12 my-2">
                    <div>
                      <p for="banner" class="text-center mb-2">
                        {{ $t("banner") }}
                      </p>
                      <div class="text-center">
                        <img
                          :src="getImagePath(form.banner,'portfolio')"
                          width="200"
                          style="height: 200px; object-fit: cover"
                          class="rounded mx-auto d-block img-fluid"
                        />
                      </div>
                      <div class="file-content text-center m-t-20">
                        <div class="media-body">
                          <div
                            style="height: 0px; width: 0px; overflow: hidden"
                          >
                            <input
                              ref="fileInputBanner"
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
                                @click="chooseImage('banner')"
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
        <div class="row">
          <div class="col-12" v-for="item, index in language" :key="index">
            <div class="form-group">
              <label for="title">{{ $t("description") }} ({{ item.code.toUpperCase() }})</label>
              <WangEditor ref="editor" :valueEditHtml="form.post_translate[index].description" v-model="form.post_translate[index].description" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Start modal-cropper-image Component -->
      <!-- <ModalCropperImage
        ref="modalShowCropperImage"
        :target-file.sync="targetFile"
        :aspectRatio="aspectRatio"
        :cropBoxResizable="false"
        @closeModal="closeModalCropperImage"
        @save="saveModalCropperImage"
      /> -->
      <!-- cropImage -->
      <CropImage
        ref="cropImageModal"
        :auto-zoom="false"
        :freeSize="true"
        :resizable="true"
        :movable="true"
        @imageCroped="imagecroped"
      ></CropImage>
    <!-- End modal-cropper-image Component -->
  </div>
</template>

<script setup>
import moment from "moment";
import { useCategoryList } from "~/store/category_list";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import { KDACPortfolioAPI,KDACTagAPI,socialMediaAPI,serviceAPI } from "~/constants/api";
import WangEditor from "~/components/WangEdiot.vue";
import ModalCropperImage from "~/components/ModalCropperImage.vue";
import businessTypeEnum from "~/composables/enum/businessTypeEnum";
import { useLanguageStore } from "~/store/language";
import { useCategoryType } from "~/store/category_type";
import { ca } from "date-fns/locale";
import { get } from "@vueuse/core";
const languageStore = useLanguageStore();
const language = ref(languageStore.lists);

const modalShowCropperImage = ref(null);
const hideShowCropperImage = ref(false);
let aspectRatio = ref(480/260);
let cropWidth = ref(null);
let cropHeight = ref(null);
const defaultForm = {
  id: null,
  post_translate: language.value.map(lang => ({
      language_code: lang.code,
      language_id: lang.id,  // Add language_id from the language list
      name: null, // Initialize title as null
      description: null
    })),
  img: null,
  banner: null,
  slug: null,
  meta_title: null,
  doctor: null,
  service: null,
  client_name: null,
  social_media: [],
  tags: [],
  business_id: businessTypeEnum.kdac,
  category_id: null,
  status: 1,
  name: null
};
const editor = ref(null);
const usecategory = useCategoryList();
const route = useRoute();
const fileInput = ref(null);
const fileInputBanner = ref(null);
const cropImageModal = ref(null);
let targetFile = ref(null);
const voiceInput = ref(null);
const imageType = ref(null);

const serviceList = ref([]);
const doctorList = ref([]);
const socialMediaList = ref([]);
const tagList = ref([]);
const categoryList = ref([]);

const listDescription = ref([]);

categoryList.value = usecategory.lists;

const categories = ref([]);
categories.value = categoryList.value.filter((item) => {
  return item.type == useCategoryType().portfolio;
})


let form = reactive({
  ...defaultForm,
});
const changeDate = (date) => {
  form.publish_date = moment(date).format("YYYY-MM-DD");
}

const rules = computed(() => {
  return {
    post_translate: language.value.map(lang => ({
      name: { required, $autoDirty: true },
    })),
    category_id: {
      required,
      $autoDirty: true,
    },
    doctor: {
      required,
      $autoDirty: true,
    },
    service: {
      required,
      $autoDirty: true,
    },
    client_name: {
      required,
      $autoDirty: true,
    },
  };
});
const v$ = vuelidate(rules, form);

onMounted(() => {
  if (!isEmpty(route.query)) {
    getData(route.query.id);
  } else {
    setDefaultForm();
  }
  getAllDataRalatioship();
});

function convertString(input) {
    return input.toLowerCase().replace(/ /g, '-');
}
const getAllDataRalatioship = async () => {
  serviceList.value = await ifetch(serviceAPI.getAll);
  // doctorList.value = await ifetch(KDACPortfolioAPI.getAll);
  doctorList.value = [
    {
        "id": 1,
        "bane": "Heart Disease",
        "name": "Dr. John Smith"
    },
    {
        "id": 2,
        "bane": "Diabetes",
        "name": "Dr. Emily Johnson"
    },
    {
        "id": 3,
        "bane": "Asthma",
        "name": "Dr. Michael Brown"
    },
    {
        "id": 4,
        "bane": "Cancer",
        "name": "Dr. Sarah Davis"
    },
    {
        "id": 5,
        "bane": "Infectious Diseases",
        "name": "Dr. David Wilson"
    }
]

  socialMediaList.value = await ifetch(socialMediaAPI.getAll);
  tagList.value = await ifetch(KDACTagAPI.getAll);
}
const copyNameEnglish = (code, index) => {
  if (code == "en") {
    form.slug = convertString(form.post_translate[index].name);
    form.meta_title = form.post_translate[index].name;
    form.name=form.post_translate[index].name
  }
}

const addSocialMedia = () => {
  form.social_media.push({
    id: null,
    social_id: null,
    value: null,
  });
}

const removeSocialMedia = async (item,index) => {
  if (item.id) {
    const { $i18n } = useNuxtApp();
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
          await ifetch(KDACPortfolioAPI.deletePostSocial, { id: item.id });
          getData(route.query.id);
          iAlert().success();
          resolve();
        });
      },
      allowOutsideClick: () => !swal.isLoading(),
    });
  }else{
    form.social_media.splice(index, 1);
  }
  
}

const addTag = () => {
  form.tags.push({
    id: null,
    tag_id: null,
  });
}
const removeTag = (item,index) => {
  if (item.id) {
    const { $i18n } = useNuxtApp();
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
          ifetch(KDACPortfolioAPI.deletePostTag, { id: item.id });
          getData(route.query.id);
          iAlert().success();
          resolve();
        });
      },
      allowOutsideClick: () => !swal.isLoading(),
    });
  }else{
    form.tags.splice(index, 1);
  }
}
const chooseImage = (type) => {
  imageType.value = type;
  if (imageType.value == "image") {
    fileInput.value.click();
  }else{
    fileInputBanner.value.click();
  }
};
const onFileChange = ($event) => {
  const files = $event.target.files || $event.dataTransfer.files;
  if (files[0]) {
    if (files[0].size > 15000000) {
      fileInput.value = "";
      fileInputBanner.value = "";
      form.img = "";
      form.banner = "";
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
  fileInputBanner.value.value = null;
};
const imagecroped = (data) =>{
  if (imageType.value == "image") {
    form.img = data;
  }else{
    form.banner = data;
  }
}

const getInput = () => {
  language.value.forEach((lang,index) => {
    if (lang.code == "en") {
      form.name=form.post_translate[index].name
    }
  })
  return {
    id: form.id,
    img: form.img,
    banner: form.banner,
    category_id: form.category_id,
    slug: form.slug,
    meta_title: form.meta_title,
    employee_id: form.doctor,
    service_id: form.service,
    client_name: form.client_name,
    social_media: form.social_media,
    tags: form.tags,
    post_translate: form.post_translate,
    business_id: businessTypeEnum.kdac,
    name: form.name,
    status: form.status

  };
};

const setInput = (res) => {
  form.id = res.data.id;
  form.img = res.data.image;
  form.banner = res.data.banner;
  form.doctor = res.data.employee_id;
  form.service = res.data.service_id;
  form.client_name = res.data.customer_name;
  form.social_media = res.data.post_social;
  form.tags = res.data.post_tag;
  form.category_id = res.data.category_id;
  form.slug = res.data.slug;
  form.meta_title = res.data.meta_title;
  form.post_translate = res.data.post_translate;
  form.business_id = businessTypeEnum.kdac;
  form.status = res.data.status
  
};

const getData = async (id) => {
  let data = await ifetch(KDACPortfolioAPI.getListUpdate, { id: id });
  setInput(data);
};

const save = async (type) => {
  
  const result = await v$.value.$validate();
  if (result) {
    let url = KDACPortfolioAPI.store;
    if (!isEmpty(route.query)) {
      url = KDACPortfolioAPI.update;
    }
    var checkSocialMedia = false;
    var checkTag = false;
    form.social_media.forEach((item) => {
      if (item.social_id == null || item.value == null) {
        checkSocialMedia = true;
      }
    })
    form.tags.forEach((item) => {
      if (item.tag_id == null) {
        checkTag = true;
      }
    })
    if (checkSocialMedia) {
      useNuxtApp().$showToast({
        msg: "Please fill in all social media fields.",
        type: "warning",
      });
      return;
    }
    if (checkTag) {
      useNuxtApp().$showToast({
        msg: "Please fill in all tag fields.",
        type: "warning",
      });
      return;
    }
    let input = getInput();
    await ifetch(url, input);
    if (type === "add") {
      setDefaultForm();
      iAlert().success();
    } else if (type === "close") {
      navigateTo({ path: "../../portfolio/portfolio" });
      iAlert().success();
    }
  } else {
    useNuxtApp().$showToast({ msg: "Invalid Input.", type: "error" });
  }
};

const setDefaultForm = () => {
  Object.assign(form, defaultForm);
  v$.value.$reset();
};
</script>
<style>
.tbl-social-media tr td:last-child{
  text-align: right !important;
}
.tbl-tag tr td:last-child{
  text-align: right !important;
}
.tbl-social-media tr th:last-child{
  text-align: right !important;
}
.tbl-tag tr th:last-child{
  text-align: right !important;
}
.tbl-social-media td{
  padding-block: 3px !important;
}
.tbl-social-media input{
  border: 1px solid #ccc !important;
}
.tbl-social-media select{
  border: 1px solid #ccc !important;
}
.tbl-tag select{
  border: 1px solid #ccc !important;
}
.tbl-tag td{
  padding-block: 3px !important;
}
</style>
