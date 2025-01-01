<template>
    <div class="row">
        <div class="col-12 col-lg-8">
            <div class="row">
              <div class="col-12 col-lg-6" v-for="(key, index) in language" :key="index">
                    <div class="form-group">
                        <label>{{ $t("title") }} ({{ key.code.toUpperCase() }})</label>
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
                        <label>{{ $t("sub_title") }} ({{ key.code.toUpperCase() }})</label>
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
                        <label>{{ $t("meta_title") }} ({{ key.code.toUpperCase() }})</label>
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
                        <label>{{ $t("description") }} ({{ key.code.toUpperCase() }})</label>
                        <textarea  
                          cols="30" 
                          rows="8" 
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
                        <label>{{ $t("meta_description") }} ({{ key.code.toUpperCase() }})</label>
                        <textarea 
                            cols="30" 
                            rows="8" 
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
                        {{ $t("image") }}
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
        <div class="my-3" style="border-bottom: 1px solid #efefef;"></div>
        <div class="col-12 d-flex justify-content-end">
            <span class="btn btn-primary" @click="save()">
                <Icon name="mdi:content-save-outline" size="18"></Icon>
                {{ $t("save") }}
            </span>
        </div>
         <!-- cropImage -->
      <CropImage
        ref="cropImageModalC"
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
        }
    })),
  img: null,
  business_id: businessTypeEnum.kdac,
  category_id: null,
  status: 1,
  name: "charity",
};

const editor = ref(null);
const categoryList = useCategoryList();
const route = useRoute();
const fileInput = ref(null);
const cropImageModalC = ref(null);
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
  
  cropImageModalC.value.showModal($event);
  fileInput.value.value = null; 
};
const imagecroped = (data) =>{
  if (imgType.value == "img") {
    form.img = data;
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
};

const getData = async () => {
  let data = await ifetch(pageAPI.getSection, { name: "charity" });	
  setInput(data);
};

const save = async (type) => {
  let category = categoryList.lists.find((item) => item.type == useCategoryType().section);
  form.category_id = category.id;
  const result = await v$.value.$validate();
  if (result) {
    let url = pageAPI.storeOrUpdateCharitySection;
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