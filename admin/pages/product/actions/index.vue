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
                  <h5 class="pb-0">{{ $t("product") }}</h5>
                  <div class="d-flex gap-2">
                    <button
                      class="btn btn-warning"
                      @click="navigateTo({ path: '/product' });"
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
                    <div class="col-12 mb-2">
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
                    </div>
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
                            :src="getImagePath(form.img,'post')"
                            width="300"
                            style="height: 300px; object-fit: cover"
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
  import { blogAPI } from "~/constants/api";
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
  const defaultForm = {
    id: null,
    post_translate: language.value.map(lang => ({
        language_code: lang.code,
        language_id: lang.id,  // Add language_id from the language list
        name: null, // Initialize title as null
        description: null
      })),
    img: null,
    slug: null,
    meta_title: null,
    publish_date: moment().format("YYYY-MM-DD HH:mm:ss"),
    business_id: businessTypeEnum.kdac,
    category_id: null,
    status: 1,
    name: null
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
      post_translate: language.value.map(lang => ({
        name: { required, $autoDirty: true },
      })),
      category_id: {
        required,
        $autoDirty: true,
      },
    };
  });
  const v$ = vuelidate(rules, form);
  
  onMounted(() => {
    if (!isEmpty(route.query)) {
      getData(route.query);
    } else {
      setDefaultForm();
    }
    if (checkCookieExpiration()) {
        console.log('Access token is still valid.');
    } else {
        console.error('Access token has expired or does not exist.');
        useUserStore().clearToken();
    }
  });
  const copyNameEnglish = (code, index) => {
    if (code == "en") {
      form.slug = convertString(form.post_translate[index].name);
      form.meta_title = form.post_translate[index].name;
      form.name=form.post_translate[index].name
    }
  }
  function convertString(input) {
      return input.toLowerCase().replace(/ /g, '-');
  }
  const chooseImage = () => {
    fileInput.value.click();
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
  };
  const imagecroped = (data) =>{
    form.img = data;
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
      category_id: form.category_id,
      slug: form.slug,
      meta_title: form.meta_title,
      publish_date: form.publish_date,
      post_translate: form.post_translate,
      business_id: businessTypeEnum.kdac,
      name: form.name,
      status: form.status
    };
  };
  
  const setInput = (res) => {
    form.id = res.data.id;
    form.img = res.data.image;
    form.category_id = res.data.category_id;
    form.slug = res.data.slug;
    form.meta_title = res.data.meta_title;
    form.publish_date = res.data.publish_date;
    form.post_translate = res.data.post_translate;
    form.business_id = businessTypeEnum.kdac;
    form.status = res.data.status
    
  };
  
  const getData = async (id) => {
    let data = await ifetch(blogAPI.getListUpdate, { id: id });
    setInput(data);
  };
  
  const save = async (type) => {
    let category = categoryList.lists.find((item) => item.type == useCategoryType().blog);
    form.category_id = category.id;
    const result = await v$.value.$validate();
    if (result) {
      let url = blogAPI.store;
      if (!isEmpty(route.query)) {
        url = blogAPI.update;
      }
      let input = getInput();
      
      await ifetch(url, input);
      if (type === "add") {
        setDefaultForm();
        iAlert().success();
      } else if (type === "close") {
        goTo({ path: "/product/" });
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
  