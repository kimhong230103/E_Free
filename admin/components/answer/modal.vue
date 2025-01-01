<template>
    <div class="modal fade" id="modal">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              {{ props.actionType && $t(props.actionType) }} {{ $t("answer") }}
            </h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
  
          <div class="modal-body p-l-25 p-r-25">
            <div class="row">
              <div class="col-12 col-lg-8">
                <div class="row">
                    <div class="col-12">
                        <div class="form-group mb-2">
                            <label for="name" class="required">{{ $t("question") }}</label>
                            <select
                                v-model="form.question_id"
                                required
                                type="text"
                                class="form-control"
                                id="category"
                                :class="{ 'is-invalid': v$.question_id.$error }"
                                @change="v$.question_id.$touch"
                            >
                                <option :value="null" selected>{{ $t("please_select") }}</option>
                                <option v-for="item,index in questions" :value="item.id" :key="index">
                                {{ item.title }}
                                </option>
                            </select>
                            <span class="invalid-feedback" v-if="v$.question_id.$error">{{
                                v$.question_id.$errors[0].$message
                            }}</span>
                        </div>  
                        <div class="form-group mb-2">
                            <label for="name" class="required">{{ $t("title") }}</label>
                            <textarea 
                                v-model="form.title"
                                required
                                type="text"
                                class="form-control"
                                id="title"
                                rows="5"
                                :class="{ 'is-invalid': v$.title.$error }"
                                @change="v$.title.$touch"
                                :placeholder="$t('title')"
                            >
                            </textarea>
                            <span class="invalid-feedback" v-if="v$.title.$error">{{
                                v$.title.$errors[0].$message
                            }}</span>
                        </div>
                    </div>
                </div>
              </div>
              <div class="col-12 col-lg-4">
                <div class="row">
                    <div class="col-12">
                        <div class="text-center m-t-25">
                        <img
                            :src="getImagePath(form.image,'answer')"
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
                </div>
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
            <button type="button" class="btn btn-primary" @click="save">
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
  import { appConst } from "~/constants/app";
  import Multiselect from "@vueform/multiselect";
  import { useBranchStore } from "~/store/branch";
  import { questionAPI } from "~/constants/api";
  import { answerAPI } from "~/constants/api";
  const branchStore = useBranchStore();
  const branch_id=ref(branchStore.branch_id);
  const	questions = ref([]);
  import {
    required,
    email,
    minLength,
    maxLength,
    url,
  } from "@vuelidate/validators";
  import moment from "moment";
import { ca } from "date-fns/locale";
  const props = defineProps({
    actionType: {
      type: String,
      default: appConst.modalAction.add,
    },
  });
  
  const matchType = reactive({
    CUSTOM:0,
    API:1,
  })
  
  const state = reactive({
    modal: null,
  });
  const doneTypingInterval = ref(600);
  const typingTimer = ref(null);
  const form = reactive({});
  const teamList = ref([]);
  const tempTeam = ref([]);
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
  
  const getQuestionList = async () => {
    branch_id.value = branchStore.branch_id
    try {
      const data = await ifetch(questionAPI.get_by_branch_id, { branch_id: branch_id.value });
      questions.value = data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
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
  const defaultForm = {
    id: null,
    question_id: null,
    title: null,
    image: null,
  };
  
  const emit = defineEmits(["closeModal"]);
  
  watch(
  () => branchStore.branch_id,
  (val) => {
    getQuestionList();
  }
);
  const showModal = async (row) => {
    if (row) {
      const {
        id,
        question_id,
        title,
        image
      } = row;

      form.id = id;
      form.question_id = question_id;
      form.image = image;
      form.title = title;
    }else{
      setDefaultForm();
    }
    state.modal.show(); 
  };
  const rules = computed(() => {
  return {
    title: {
      required,
    },
    question_id:{
      required
    },
    image: {
      required
    }
  };
});
  const v$ = vuelidate(rules, form);
  const save = async () => {
    let url = null;
    if (props.actionType === appConst.modalAction.add) {
      url = answerAPI.store;
    } else if (props.actionType === appConst.modalAction.update) {
      url = answerAPI.update;
    }
    const result = await v$.value.$validate();
    if (result) {
      const data = await ifetch(url, form);
      iAlert().success();
      closeModal(true);
    } else {
      useNuxtApp().$showToast({ msg: "Invalid Input.", type: "error" });
    }
  };
  
  onMounted(() => {
    setDefaultForm();
    getQuestionList();
    const bootstrap = useNuxtApp().$bootstrap;
    state.modal = new bootstrap.Modal("#modal");
  });
  const setDefaultForm = () => {
    Object.assign(form, defaultForm);
    nextTick(()=>{
      v$.value.$reset();
    })
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
  
  <style lang="scss">
  .option-image {
    width: 30px; /* Adjust size as needed */
    height: 30px;
    margin-right: 8px;
  }
  </style>
  