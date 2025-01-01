<template>
    <div class="row">
        <div class="col-12">
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
                        <label>{{ $t("meta_description") }} ({{ key.code.toUpperCase() }})</label>
                        <textarea 
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
        <div class="my-3" style="border-bottom: 1px solid #efefef;"></div>
        <div class="col-12 d-flex justify-content-end">
            <span class="btn btn-primary" @click="save()">
                <Icon name="mdi:content-save-outline" size="18"></Icon>
                {{ $t("save") }}
            </span>
        </div>
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
        }
    })),
  business_id: businessTypeEnum.kdac,
  category_id: null,
  status: 1,
  name: "portfolio",
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
  form.name = res.data.name
};

const getData = async () => {
  let data = await ifetch(pageAPI.getSection, { name: "portfolio" });	
  setInput(data);
};

const save = async (type) => {
  let category = categoryList.lists.find((item) => item.type == useCategoryType().section);
  form.category_id = category.id;
  const result = await v$.value.$validate();
  if (result) {
    let url = pageAPI.storeOrUpdateTheSameSection;
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