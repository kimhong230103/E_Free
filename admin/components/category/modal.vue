<template>
  <div class="modal modal-lg fade" id="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ props.actionType && $t(props.actionType) }}
            {{ $t("category") }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <div class="col-12">
                <div class="text-center m-t-25">
                  <img
                    :src="getImagePath(form.image)"
                    width="200"
                    class="rounded mx-auto d-block"
                  />
                </div>
                <div class="file-content text-center m-t-20">
                  <div class="media-body">
                    <div style="height: 0px; width: 0px; overflow: hidden">
                      <input
                        ref="fileInput"
                        style="display: none"
                        type="file"
                        accept=".png, .jpg, .jpeg, .gif, .webp, .svg"
                        :multiple="false"
                        @change="onFileChange"
                      />
                    </div>
                    <div
                      class="btn btn-outline-primary ms-2"
                      @click="chooseImage"
                    >
                      <vue-feather type="upload" class="text-top"></vue-feather>
                      Upload
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group mb-2">
                <label for="name" class="required">{{ $t("name") }}</label>
                <input
                  v-model="form.name"
                  required
                  type="text"
                  class="form-control"
                  id="name"
                  :class="{ 'is-invalid': v$.name.$error }"
                  @change="v$.name.$touch"
                  :placeholder="$t('name')"
                />
                <span class="invalid-feedback" v-if="v$.name.$error">{{
                  v$.name.$errors[0].$message
                }}</span>
              </div>
              <!-- <div class="form-group mb-2">
                <label for="link" class="required">{{ $t("type") }}</label>
                <select
                  class="form-select"
                  v-model="form.type"
                  :class="{ 'is-invalid': v$.type.$error }"
                  @change="v$.type.$touch"
                >
                  <option :value="null" selected>
                    {{ $t("please_select") }}
                  </option>
                  <option
                    v-for="(obj, index) in categoryType.lists"
                    :key="index"
                    :value="obj.id"
                  >
                    {{ $t(obj.name) }}
                  </option>
                </select>
                <span class="invalid-feedback" v-if="v$.type.$error">{{
                  v$.type.$errors[0].$message
                }}</span>
              </div> -->
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="() => closeModal()"
          >
            {{ $t("close") }}
          </button>
          <button
            v-if="props.actionType && props.actionType !== 'update'"
            type="button"
            class="btn btn-primary"
            @click="() => save(false)"
          >
            {{ $t("save_new") }}
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="() => save(true)"
          >
            {{ $t("save") }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="hideShowCropperImage">
      <ModalCropperImage
        ref="modalShowCropperImage"
        :target-file.sync="targetFile"
        :aspectRatio="aspectRatio"
        :previewWidth="cropWidth"
        :previewHeight="cropHeight"
        :cropBoxResizable="false"
        @closeModal="closeModalCropperImage"
        @save="saveModalCropperImage"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import { useCategoryType } from "~/store/category_type.js";
import { categoryAPI } from "~/constants/api";
import { appConst } from "~/constants/app";
import { useCategoryList } from "~/store/category_list.js";
import ModalCropperImage from "~/components/ModalCropperImage.vue";
import { useBranchStore } from "~/store/branch";
const branchStore = useBranchStore();
const categoryType = useCategoryType();
const categoryList = useCategoryList();
const props = defineProps({
  actionType: String,
});
const state = reactive({
  modal: null,
});

const defaultForm = {
  id: null,
  name: null,
  type: categoryType.survey,
  image: null,
  slug: null,
};
let form = reactive({});



const rules = computed(() => {
  return {
    name: {
      required,
      maxLength: maxLength(100),
      $autoDirty: true,
    },
  };
});
const v$ = vuelidate(rules, form);
const emit = defineEmits(["closeModal"]);
let targetFile = ref(null);
let aspectRatio = ref(null);
let cropWidth = ref(null);
let cropHeight = ref(null);
const fileInput = ref(null);
const modalShowCropperImage = ref(null);
const hideShowCropperImage = ref(false);
const imagePath = ref(null);

const chooseImage = () => {
  fileInput.value.click();
};

const onFileChange = ($event) => {
  const files = $event.target.files || $event.dataTransfer.files;
  
  if (files[0]) {
    if (files[0].size > 15000000) {
      fileInput.value = "";
      form.image = "";
      useNuxtApp().$showToast({
        msg: "Image file must be less than 15 MB.",
        type: "warning",
      });
      return;
    }
    targetFile.value = $event;
    openModalCropperImage();
  }
};

const openModalCropperImage = () => {
  hideShowCropperImage.value = true;
  nextTick(() => {
    modalShowCropperImage.value.showModal(targetFile.value);
  });
};

const closeModalCropperImage = () => {
  hideShowCropperImage.value = false;
  fileInput.value = "";
  targetFile.value = null;
  aspectRatio.value = null;
  cropWidth.value = null;
  cropHeight.value = null;
};
const saveModalCropperImage = (base64) => {
  imagePath.value = "";
  form.image = base64;
  closeModalCropperImage();
};
onMounted(() => {
  setDefaultForm();
  const bootstrap = useNuxtApp().$bootstrap;
  state.modal = new bootstrap.Modal("#modal");
});

const showModal = (editId = null, row) => {
  state.modal.show();
  if (editId) {
    const { id, name, type, image,slug } = row;
    form.id = id;
    form.name = name;
    form.type = type;
    form.image = image;
    form.slug = slug;
  } else {
    setDefaultForm();
  }
};
const save = async (event) => {
  const result = await v$.value.$validate();
  if (result) {
    let url = categoryAPI.store;
    if (props.actionType == appConst.modalAction.update) {
      url = categoryAPI.update;
    }
    form.branch_id = branchStore.branch_id;
    form.slug = convertToSlug(form.name);
    const data = await ifetch(url, form);
    iAlert().success();
    categoryList.setData(data.data);
    if (event) {
      emit("closeModal", true);
      closeModal(true);
    } else {
      setDefaultForm();
    }
  } else {
    useNuxtApp().$showToast({ msg: "Invalid Input.", type: "error" });
  }
};

const setDefaultForm = () => {
  Object.assign(form, defaultForm);
  v$.value.$reset();
};

const closeModal = (isRefresh = false) => {
  setDefaultForm();
  if (isRefresh) {
    emit("closeModal", true);
  }
  state.modal.hide();
};

defineExpose({
  showModal,
});
</script>
