<template>
  <div class="">
    <div class="row">
      <div class="col-sm-12 mt-3">
        <div class="card">
          <div class="card-header b-t-primary border-3">
            <div class="row">
              <div
                class="col-12 d-flex justify-content-between align-items-center"
              >
                <h5 class="pb-0">{{ $t("charity") }}</h5>
                <div class="d-flex gap-2">
                  <button class="btn btn-primary" @click="save">
                    <Icon name="mdi:content-save-outline" size="20"></Icon>
                    {{ $t("save") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12 col-md-8 col-lg-8">
                <div class="form-group required mb-2">
                  <label>{{ $t("category") }}</label>
                  <input
                    :value="$t('charity')"
                    type="text"
                    class="form-control"
                    :placeholder="$t('category')"
                    disabled
                  />
                </div>
                <div
                  class="form-group required mb-2"
                  v-for="(item, index) in languageList"
                  :key="index"
                >
                  <label :for="item.code"
                    >{{ $t("title") }}
                    <span class="text-uppercase">({{ item.code }})</span></label
                  >
                  <input
                    v-model="form.content[index].name"
                    type="text"
                    class="form-control"
                    autocomplete="off"
                    :id="item.code"
                    :placeholder="
                      $t('title') + ' (' + item.code.toUpperCase() + ')'
                    "
                    :class="{
                      'is-invalid': v$.content[index].name.$error,
                    }"
                    @change="v$.content[index].name.$touch"
                  />
                  <span
                    class="invalid-feedback"
                    v-if="v$.content[index].name.$error"
                  >
                    {{
                      $t("title") +
                      " (" +
                      item.code.toUpperCase() +
                      ") " +
                      $t(v$.content[index].name.$errors[0].$message)
                    }}
                  </span>
                </div>
              </div>
              <div class="col-4">
                <div class="">
                  <img
                    :src="getImagePath(form.image)"
                    width="250"
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
                        accept=".jpg, .jpeg, .gif, .png, .webp, .svg"
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
            <div class="row mt-4">
              <div
                class="col-12 col-md-12 col-lg-12 col-xl-12"
                v-for="(item, index) in languageList"
              >
                <div class="form-group mb-2">
                  <label
                    >{{ $t("description") }}
                    <span class="text-uppercase">({{ item.code }})</span></label
                  >
                  <WangEditor
                    :key="index"
                    ref="editor"
                    v-model="form.content[index].description"
                    :valueEditHtml="form.content[index].description"
                    :height="380"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
import { moduleKey } from "~/constants/moduleKey";
import { useLanguageStore } from "~/store/language";
import WangEditor from "~/components/WangEdiot.vue";
import { useCategoryType } from "~/store/category_type";
import { required, maxLength } from "@vuelidate/validators";
import CropImage from "~/components/CropImage.vue";
import { charityAPI } from "~/constants/api";
definePageMeta({
  middleware: "alc",
  moduleKey: moduleKey.CHARITY,
});

const languageList = useLanguageStore().lists;
const fileInput = ref(null);
const editor = ref(null);
const cropImageModal = ref(null);
const defaultForm = reactive({
  id: null,
  category_id: useCategoryType().page,
  name: "charity",
  image: null,
  content: languageList.map((lang) => ({
    language_id: lang.id,
    language_code: lang.code,
    name: null,
    description: null,
    short_description: null,
  })),
});
const form = reactive({
  id: null,
  category_id: useCategoryType().page,
  name: "charity",
  image: null,
  content: languageList.map((lang) => ({
    language_id: lang.id,
    language_code: lang.code,
    name: null,
    description: null,
    short_description: null,
  })),
});
const rules = computed(() => {
  return {
    content: languageList.map(() => ({
      name: {
        required,
        $autoDirty: true,
      },
    })),
  };
});
const v$ = vuelidate(rules, form);

const save = async () => {
  const result = await v$.value.$validate();
  if (result) {
    await ifetch(charityAPI.store, form).then((res) => {
      const { id, category_id, image, name, post_translate } = res;
      if (nullToVoid(id) != "") {
        form.id = id;
        form.category_id = category_id;
        form.name = name;
        form.image = image;
        form.content = post_translate;
      }
      iAlert().success();
    });
  } else {
    iAlert().invalidInput();
  }
};

const getData = async () => {
  await ifetch(charityAPI.get).then((res) => {
    const { id, category_id, image, name, post_translate } = res;
    if (nullToVoid(id) != "") {
      form.id = id;
      form.category_id = category_id;
      form.name = name;
      form.image = image;
      form.content = post_translate;
    } else {
      setDefaultFrom();
    }
  });
};
onMounted(() => {
  getData();
});
const chooseImage = () => {
  fileInput.value.click();
};
const onFileChange = (event) => {
  cropImageModal.value.showModal(event);
  fileInput.value.value = null;
};
const imagecroped = (data) => {
  form.image = data;
};
const setDefaultFrom = () => {
  Object.assign(form, defaultForm);
};
</script>

<style lang="scss" scoped></style>
