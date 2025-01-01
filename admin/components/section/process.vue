<template>
    <div class="row">
        <div class="col-12">
            <div class="row">
              <div class="col-12 col-lg-6" v-for="(key, index) in language" :key="index">
                    <div class="form-group">
                        <label for="title">{{ $t("title") }} ({{ key.code.toUpperCase() }})</label>
                        <input
                        v-model="form.description[index].list.title"
                        type="text"
                        class="form-control mb-2"
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
        <div class="col-12">
          <div class="row" v-for="(key, index) in process" :key="index">
            <div class="my-3" style="border-bottom: 1px solid #efefef;"></div>
            <div class="col-12 col-lg-9 ">
              <div class="row">
                <div class="col-12 fw-bold text-center my-2" style="font-size: 18px;">
                  {{ $t("process") }} {{ index + 1 }}
                </div>
                <div class="col-12 col-lg-6" v-for="(item, ind) in language" :key="ind">
                  <div class="form-group">
                    <label>{{ $t("title") }} ({{ item.code.toUpperCase() }})</label>
                    <input
                      v-model="key.title[ind].title"
                      type="text"
                      class="form-control mb-2"
                      :placeholder="$t('title')+ ' (' + item.code.toUpperCase() + ')' "
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-3">
              <div class="row">
                <div class="col-12 mt-2">
                    <div>
                        <p for="logo" class="text-center mb-2">
                        {{ $t("logo") }}
                        </p>
                        <div class="text-center">
                            <img
                                :src="getImagePath(key.logo,'page')"
                                width="150"
                                style="height: 150px; object-fit: cover"
                                class="rounded mx-auto d-block img-fluid"
                                @click="chooseImage(index)"
                            />
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
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
const defaultProcess =[
              {
                logo: null,
                title: language.value.map(lang => ({
                  language_code: lang.code,
                  language_id: lang.id,
                  title: null
                }))
              },
              {
                logo: null,
                title: language.value.map(lang => ({
                  language_code: lang.code,
                  language_id: lang.id,
                  title: null
                }))
              },
              {
                logo: null,
                title: language.value.map(lang => ({
                  language_code: lang.code,
                  language_id: lang.id,
                  title: null
                }))
              },
              {
                logo: null,
                title: language.value.map(lang => ({
                  language_code: lang.code,
                  language_id: lang.id,
                  title: null
                }))
              }
            ];
const process = ref(defaultProcess);
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
            process:[],
        }
    })),
  business_id: businessTypeEnum.kdac,
  category_id: null,
  status: 1,
  name: "process"
};

const editor = ref(null);
const categoryList = useCategoryList();
const route = useRoute();
const fileInput = ref(null);
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
        }
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

const indexProcess = ref(null);
const chooseImage = (index) => {
  indexProcess.value = index;
  fileInput.value.click();
};
const onFileChange = ($event) => {
  const files = $event.target.files || $event.dataTransfer.files;
  if (files[0]) {
    if (files[0].size > 15000000) {
      fileInput.value = "";
      process.value[indexProcess.value].logo = "";
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
};
const imagecroped = (data) =>{
  process.value[indexProcess.value].logo = data;
}

const getInput = () => {
  return {
    id: form.id,
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
  form.category_id = res.data.category_id;
  form.business_id = businessTypeEnum.kdac;
  form.status = res.data.status
  const parsedName = JSON.parse(res.data.description);
  form.description = defaultForm.description.map((defaultItem) => ({
    ...defaultItem,
    list: parsedName[defaultItem.language_code] || null,
  }));
  process.value = form.description[0].list.process;
  form.name = res.data.name
};

const getData = async () => {
  let data = await ifetch(pageAPI.getSection, { name: "process" });	
  setInput(data);
};



const save = async (type) => {
  let category = categoryList.lists.find((item) => item.type == useCategoryType().section);
  form.category_id = category.id;
  const result = await v$.value.$validate();
  if (result) {
    let checkNullLogo = false
    let checkNullTitle = false;
    process.value.forEach((item, index) => {
      if(nullToVoid(item.logo) == "") checkNullLogo = true;
      item.title.forEach((el, ind) => {
        if(nullToVoid(el.title) == "") checkNullTitle = true;
      })
    })

    if(checkNullLogo) {
      const { $i18n } = useNuxtApp();
      swal({
        title: $i18n.t("Required"),
        text: $i18n.t("all_logo_are_required"),
        icon: "question",
        showCancelButton: false,
        confirmButtonText: $i18n.t("ok"),
        reverseButtons: true,
        showLoaderOnConfirm: true,
        preConfirm: () => {},
        allowOutsideClick: () => !swal.isLoading(),
      });
      return;
    }
    if(checkNullTitle) {
      const { $i18n } = useNuxtApp();
      swal({
        title: $i18n.t("Required"),
        text: $i18n.t("all_title_are_required"),
        icon: "question",
        showCancelButton: false,
        confirmButtonText: $i18n.t("ok"),
        reverseButtons: true,
        showLoaderOnConfirm: true,
        preConfirm: () => {},
        allowOutsideClick: () => !swal.isLoading(),
      });
      return;
    }
    let url = pageAPI.storeOrUpdateProcessSection;
    form.description.forEach((item, index) => {
      item.list.process = process.value;
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