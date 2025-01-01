<template>
  <div class="modal fade" id="processModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- header -->
        <div class="modal-header">
          <h5 class="modal-title">
            {{ $t(props.actionType) }} {{ $t("process") }}
          </h5>
        </div>
        <!-- body -->
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <img
                :src="getImagePath(form.image)"
                width="140"
                style="height: auto; object-fit: cover"
                class="rounded-2 mx-auto d-block img-fluid"
              />
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
            <div class="col-12">
              <div
                class="form-group mt-2"
                v-for="(item, index) in languageList"
                :key="index"
              >
                <label :for="item.code" class="required">
                  {{ $t("name") }}
                  <span class="text-uppercase">({{ item.code }})</span>
                </label>
                <input
                  v-model="form.contents[index].process_name"
                  type="text"
                  class="form-control"
                  autocomplete="off"
                  :placeholder="`${$t('name')} (${item.code.toUpperCase()})`"
                  :class="{
                    'is-invalid': v$.contents[index].process_name.$error,
                  }"
                  @change="v$.contents[index].process_name.$touch"
                  required
                />
                <span
                  class="invalid-feedback"
                  v-if="v$.contents[index].process_name.$error"
                >
                  {{
                    $t("name") +
                    " (" +
                    item.code.toUpperCase() +
                    ") " +
                    $t(v$.contents[index].process_name.$errors[0].$message)
                  }}
                </span>
              </div>
            </div>
            <div class="col-12">
              <div class="form-group mt-2">
                <label for="order">
                  {{ $t("order") }}
                </label>
                <input
                  v-model="form.order"
                  type="number"
                  class="form-control"
                  id="order"
                  autocomplete="off"
                  min="0"
                  @keypress.e="(evt) => evt.preventDefault()"
                  :placeholder="$t('order')"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            {{ $t("cancel") }}
          </button>
          <button type="button" class="btn btn-primary" @click="save">
            {{ actionLabel }}
          </button>
        </div>
      </div>
    </div>
    <!-- cropImage -->
    <CropImage
      ref="cropImageModal"
      :auto-zoom="false"
      :freeSize="false"
      :width="100"
      :height="100"
      :resizable="true"
      :movable="true"
      @imageCroped="imagecroped"
    ></CropImage>
  </div>
</template>

<script setup>
import { appConst } from "~/constants/app";
import { useLanguageStore } from "~/store/language";
import { required, maxLength } from "@vuelidate/validators";
import CropImage from "../CropImage.vue";
import { processAPI } from "~/constants/api";

const { $i18n } = useNuxtApp();
const languageList = useLanguageStore().lists;
const props = defineProps({
  actionType: {
    type: String,
    default: appConst.formAction.add,
  },
});
const fileInput = ref(null);
const cropImageModal = ref(null);
const isUpdate = ref(false);
const state = reactive({
  modal: null,
});

const form = reactive({
  image: null,
  contents: [],
  order: null,
});

const defaultForm = reactive({
  image: null,
  contents: [],
  order: null,
});

const actionLabel = computed(() => {
  if (props.actionType === appConst.formAction.add) {
    return $i18n.t("save");
  } else if (props.actionType === appConst.formAction.update) {
    return $i18n.t("edit");
  }
});

const rules = computed(() => {
  return {
    contents: languageList.map(() => ({
      process_name: {
        required,
        $autoDirty: true,
      },
    })),
  };
});
const v$ = vuelidate(rules, form);
const emit = defineEmits(['closeModal'])
const setDefaultForm = () => {
  form.image = defaultForm.image;
  form.order = defaultForm.order;
  form.contents = defaultForm.contents.map((item) => ({ ...item }));
  v$.value.$reset();
};

watch(
  () => languageList,
  (newList) => {
    defaultForm.contents = newList.map((lang) => ({
      language_id: lang.id,
      language_code: lang.code,
      process_name: null,
    }));
    setDefaultForm();
  },
  { immediate: true }
);

onMounted(() => {
  const bootstrap = useNuxtApp().$bootstrap;
  state.modal = new bootstrap.Modal("#processModal");
  setDefaultForm();
});

const showModal = async (row = null) => {
  if (row) {
    const { id, image, order, post_translate } = row;
    form.id = id;
    form.image = image;
    form.order = order;
    form.contents = post_translate.map((item) => ({
      language_id: item.language_id,
      language_code: item.language_code,
      process_name: item.name,
      post_translate_id: item.post_translate_id,
    }));
  }
  await state.modal.show();
};
const save = async () => {
  const result = await v$.value.$validate();
  if (result) {
    let url =
      props.actionType == appConst.formAction.add
        ? processAPI.store
        : processAPI.update;

    await ifetch(url, form).then((res) => {
      iAlert().success();
      isUpdate.value = true
      closeModal();
    });
  } else {
    iAlert().invalidInput();
  }
};

const chooseImage = () => {
  fileInput.value.click();
};

const onFileChange = (file) => {
  cropImageModal.value.showModal(file);
  fileInput.value.value = null;
};
const imagecroped = (data) => {
  form.image = data;
};

const closeModal = () => {
  setDefaultForm()
  emit("closeModal",isUpdate.value)
  state.modal.hide();
};

defineExpose({
  showModal,
});
</script>

<style lang="scss" scoped></style>
