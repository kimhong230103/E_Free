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
                <h5 v-if="isEmpty(route.query)" class="pb-0">{{ $t("add") }} {{ $t("service") }}</h5>
                <h5 v-else-if="!isEmpty(route.query.type) && route.query.type == 'add_sub_service'" class="pb-0">{{ $t("add") }}{{ $t("sub_service") }}</h5>
                <h5 v-else-if="!isEmpty(route.query.type) && route.query.type == 'update_sub_service'" class="pb-0">{{ $t("update") }}{{ $t("sub_service") }}</h5>
                <h5 v-else-if="!isEmpty(route.query.type) && route.query.type == 'update_service'" class="pb-0">{{ $t("update") }} {{ $t("service") }}</h5>
                <div class="d-flex gap-2">
                  <button
                    class="btn btn-warning"
                    @click="navigateTo({ path: '../../kdac/service' });"
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
                  <div class="col-12" v-for="item, index in language" :key="index">
                    <div class="form-group required">
                      <label for="title">{{ $t("title") }} ( {{ item.code.toUpperCase() }} )</label>
                      <input
                        v-model="form.service_translate[index].title"
                        type="text"
                        class="form-control mb-2"
                        id="title"
                        :class="{ 'is-invalid': v$.service_translate[index].title.$error }"
                        @change="v$.service_translate[index].title.$touch"
                        @keyup="copyTitleEnglish(item.code, index)"
                        :placeholder="$t('title') + ' ( ' + item.code.toUpperCase()+' )'"
                      />
                      <span class="invalid-feedback" v-if="v$.service_translate[index].title.$error">{{
                        $t('title')+' ( '+item.code.toUpperCase()+') '+$t(v$.service_translate[index].title.$errors[0].$message)
                      }}</span>
                    </div>
                  </div>
                  <div class="col-12" v-for="item, index in language" :key="index">
                    <div class="form-group required">
                      <label for="title">{{ $t("sub_title") }} ( {{ item.code.toUpperCase() }} )</label>
                      <input
                        v-model="form.service_translate[index].sub_title"
                        type="text"
                        class="form-control mb-2"
                        id="sub_title"
                        :class="{ 'is-invalid': v$.service_translate[index].sub_title.$error }"
                        @change="v$.service_translate[index].sub_title.$touch"
                        :placeholder="$t('sub_title') + ' ( ' + item.code.toUpperCase()+' )'"
                      />
                      <span class="invalid-feedback" v-if="v$.service_translate[index].sub_title.$error">{{
                        $t('sub_title')+' ( '+item.code.toUpperCase()+') '+$t(v$.service_translate[index].sub_title.$errors[0].$message)
                      }}</span>
                    </div>
                  </div>
                  <div class="col-12" v-if="isEmpty(route.query) || ( !isEmpty(route.query.type) && route.query.type == 'update_service')" v-for="item, index in language" :key="index">
                    <div class="form-group">
                      <label for="title">{{ $t("short_description") }} ( {{ item.code.toUpperCase() }} )</label>
                      <input
                        v-model="form.service_translate[index].short_description"
                        type="text"
                        class="form-control mb-2"
                        id="short_description"
                        :placeholder="$t('short_description') + ' ( ' + item.code.toUpperCase()+' )'"
                      />
                    </div>
                  </div>
                  <div class="col-12" v-if="isEmpty(route.query) || ( !isEmpty(route.query.type) && route.query.type == 'update_service')">
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
                      <label for="status">{{ $t("status") }}</label>
                      <select name="" id="status" class="form-control" v-model="form.status">
                        <option value="1">{{ $t("enable") }}</option>
                        <option value="0">{{ $t("disable") }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-12" v-if="isEmpty(route.query) || ( !isEmpty(route.query.type) && route.query.type == 'update_service')">
                    <div class="form-group">
                      <label for="price">{{ $t("price") }}</label>
                      <input
                        v-model="form.price"
                        type="text"
                        class="form-control mb-2"
                        id="price"
                        :placeholder="$t('price')"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label for="order" class="required">{{ $t("order") }}</label>
                      <input
                        v-model="form.order"
                        type="text"
                        class="form-control mb-2"
                        id="order"
                        :placeholder="$t('order')"
                        :class="{ 'is-invalid': v$.order.$error }"
                        @change="v$.order.$touch"
                      />
                      <span class="invalid-feedback" v-if="v$.order.$error">{{
                        $t('order')+' '+$t(v$.order.$errors[0].$message)
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-4">
                <div class="row">
                  <div class="col-12 mt-2">
                    <div>
                      <p for="image" class="text-center mb-2">
                        {{ $t("image") }}
                      </p>
                      <div class="text-center">
                        <img
                          :src="getImagePath(form.img,'service')"
                          width="180"
                          style="height: 180px; object-fit: cover"
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
                  <div class="col-12 mt-2" v-if="isEmpty(route.query) || ( !isEmpty(route.query.type) && route.query.type == 'update_service')">
                    <div>
                      <p for="image" class="text-center mb-2">
                        {{ $t("second_image") }}
                      </p>
                      <div class="text-center">
                        <img
                          :src="getImagePath(form.second_image,'service')"
                          width="180"
                          style="height: 180px; object-fit: cover"
                          class="rounded mx-auto d-block img-fluid"
                        />
                      </div>
                      <div class="file-content text-center m-t-20">
                        <div class="media-body">
                          <div
                            style="height: 0px; width: 0px; overflow: hidden"
                          >
                            <input
                              ref="fileInput_second_image"
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
                                @click="chooseImage('second_image')"
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
                  <div class="col-12 mt-2" v-if="isEmpty(route.query) || ( !isEmpty(route.query.type) && route.query.type == 'update_service')">
                    <div>
                      <p for="image" class="text-center mb-2">
                        {{ $t("banner") }}
                      </p>
                      <div class="text-center">
                        <img
                          :src="getImagePath(form.banner,'service')"
                          width="180"
                          style="height: 180px; object-fit: cover"
                          class="rounded mx-auto d-block img-fluid"
                        />
                      </div>
                      <div class="file-content text-center m-t-20">
                        <div class="media-body">
                          <div
                            style="height: 0px; width: 0px; overflow: hidden"
                          >
                            <input
                              ref="fileInput_banner"
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
        <div class="row" v-if="isEmpty(route.query) || ( !isEmpty(route.query.type) && route.query.type == 'update_service')">
          <div class="col-12" v-for="item, index in language" :key="index">
            <div class="form-group">
              <label for="title">{{ $t("description") }} ({{ item.code.toUpperCase() }})</label>
              <WangEditor ref="editor" :valueEditHtml="form.service_translate[index].description" v-model="form.service_translate[index].description" />
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
import { serviceAPI } from "~/constants/api";
import WangEditor from "~/components/WangEdiot.vue";
// import ModalCropperImage from "~/components/ModalCropperImage.vue";
import CropImage from "~/components/CropImage.vue";
import businessTypeEnum from "~/composables/enum/businessTypeEnum";
import { useLanguageStore } from "~/store/language";
import { useCategoryType } from "~/store/category_type";
import { useServiceStore } from "~/store/service";

  const serviceStore = useServiceStore();
const languageStore = useLanguageStore();
const language = ref(languageStore.lists);

const modalShowCropperImage = ref(null);
const hideShowCropperImage = ref(false);
let aspectRatio = ref(480/260);
let cropWidth = ref(null);
let cropHeight = ref(null);
const fileInput = ref(null);
const fileInput_banner = ref(null);
const fileInput_second_image = ref(null);
const cropImageModal = ref(null);
const typeImage = ref(null);
const defaultForm = {
  id: null,
  service_translate: language.value.map(lang => ({
      language_code: lang.code,
      language_id: lang.id,  // Add language_id from the language list
      title: null, // Initialize title as null
      sub_title: null,
      short_description: null,
      description: null
    })),
  img: null,
  banner: null,
  second_image: null,
  slug: null,
  status: 1,
  price: null,
  business_id: businessTypeEnum.kdac,
  order: serviceStore.array_length + 1,
  parent_id: null
};
const editor = ref(null);
const categoryList = useCategoryList();
const route = useRoute();
let targetFile = ref(null);
const voiceInput = ref(null);

let form = reactive({
  ...defaultForm,
});

const rules = computed(() => {
  return {
    service_translate: language.value.map(lang => ({
      title: { required, $autoDirty: true },
      sub_title: { required, $autoDirty: true },
    })),
    order: { required, $autoDirty: true },
  };
});
const v$ = vuelidate(rules, form);

onMounted( async () => {
  if (!isEmpty(route.query)) {
    if (!isEmpty(route.query.type) && route.query.type == "add_sub_service") {
      setDefaultForm();
       await ifetch(serviceAPI.getByParentID, { parent_id: route.query.id }).then(res => {
         form.order = res.length + 1
       });
      
    }else{
      getData(route.query);
    }
  } else {
    setDefaultForm();
  }
});
const copyTitleEnglish = (code, index) => {
  if (code == "en") {
    form.slug = convertString(form.service_translate[index].title);
  }
}
function convertString(input) {
    return input.toLowerCase().replace(/ /g, '-');
}

const chooseImage = (type) => {
  typeImage.value = type;
  if(typeImage.value == 'image'){
    fileInput.value.click();
  }else if(typeImage.value == 'banner'){
    fileInput_banner.value.click();
  }else if(typeImage.value == 'second_image'){
    fileInput_second_image.value.click();
  }
  
};
const onFileChange = ($event) => {
  const files = $event.target.files || $event.dataTransfer.files;
  if (files[0]) {
    if (files[0].size > 15000000) {
      fileInput.value = "";
      form.img = "";
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
  fileInput_banner.value.value = null;
  fileInput_second_image.value.value = null;
};
const imagecroped = (data) =>{
  if(typeImage.value == 'image'){
    form.img = data;
  }else if(typeImage.value == 'banner'){
    form.banner = data;
  }else if(typeImage.value == 'second_image'){
    form.second_image = data;
  }
}
// const closeModalCropperImage = () => {
//   hideShowCropperImage.value = false;
//   fileInput.value = "";
//   aspectRatio.value = null;
//   cropWidth.value = null;
//   cropHeight.value = null;
// };

const getInput = () => {
  return {
    id: form.id,
    img: form.img,
    banner: form.banner,
    second_image: form.second_image,
    slug: form.slug,
    price: form.price,
    sub_title: form.sub_title,
    business_id: businessTypeEnum.kdac,
    service_translate: form.service_translate,
    status: form.status,
    order: form.order,
    parent_id: form.parent_id
  };
};

const setInput = (res) => {
  form.id = res.data.id;
  form.img = res.data.image;
  form.banner = res.data.banner;
  form.second_image = res.data.second_image;
  form.slug = res.data.slug;
  form.price = res.data.price;
  form.service_translate = res.data.service_translate;
  form.business_id = businessTypeEnum.kdac;
  form.status = res.data.status,
  form.order = res.data.order,
  form.parent_id = res.data.parent_id
  
};

const getData = async (id) => {
  let data = await ifetch(serviceAPI.getListUpdate, { id: id.id });
  
  
  setInput(data);
};

const save = async (type) => {
  const result = await v$.value.$validate();
  if (result) {

    let url = serviceAPI.store;
    if (isEmpty(route.query) || ( !isEmpty(route.query.type) && route.query.type == 'add_sub_service' )) {
      if(!isEmpty(route.query.type) && route.query.type == 'add_sub_service'){
        form.parent_id = route.query.id
      }
      url = serviceAPI.store;
    }
    else {
      url = serviceAPI.update;
    }
    let input = getInput();
    
    await ifetch(url, input);
    if (type === "add") {
      setDefaultForm();
      iAlert().success();
    } else if (type === "close") {
      navigateTo({ path: "../../kdac/service/" });
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
