<template>
    <div class="modal fade" id="modal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              {{ props.actionType && $t(props.actionType) }} {{ $t("social_media") }}
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
              <div class="col-12">
                <div>
                  <p for="image" class="text-center mb-2">
                    {{ $t("image") }}
                  </p>
                  <div class="text-center">
                    <img
                      :src="getImagePath(form.logo,'social_media')"
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
              <div class="col-12">
                <div class="row">
                    <div class="col-12">
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
                          >
                          <span class="invalid-feedback" v-if="v$.name.$error">{{
                            v$.name.$errors[0].$message
                          }}</span>
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
  import { appConst } from "~/constants/app";
  import Multiselect from "@vueform/multiselect";
  import { useBranchStore } from "~/store/branch";
  import { socialMediaAPI } from "~/constants/api";
  import menuTypeEnum from "~/composables/enum/menuTypeEnum";
  import businessTypeEnum from "~/composables/enum/businessTypeEnum";
  import { useLanguageStore } from "~/store/language";
  const languageStore = useLanguageStore();
  const branchStore = useBranchStore();
  const branch_id=ref(branchStore.branch_id);
  const	questions = ref([]);
  const languageList = ref(languageStore.lists);
  const fileInput = ref(null);
  const cropImageModal = ref(null);

  import {
    required,
    email,
    minLength,
    maxLength,
    url,
  } from "@vuelidate/validators";
  import moment from "moment";
import { ca, is } from "date-fns/locale";
  const props = defineProps({
    actionType: {
      type: String,
      default: appConst.modalAction.add,
    },
    business_id: {
      type: Number,
      default: null,
    },
    lengthLists: {
      type: Number,
      default: 0,
    }
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
  let form = reactive({
    id: null,
    name: null,
    logo: null,
  });
  const teamList = ref([]);
  const tempTeam = ref([]);
let targetFile = ref(null);
let aspectRatio = ref(null);
let cropWidth = ref(null);
let cropHeight = ref(null);

const chooseImage = () => {
  fileInput.value.click();
};
const onFileChange = ($event) => {
  const files = $event.target.files || $event.dataTransfer.files;
  if (files[0]) {
    if (files[0].size > 15000000) {
      fileInput.value = "";
      form.logo = "";
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
  form.logo = data;
}
const defaultForm = {
  id: null,
  name: null,
  logo: null
};
  
  const emit = defineEmits(["closeModal"]);
  const showModal = async (row = null,orderNum = 1) => {
    if (row && row.id) {
      const {
        id,
        name,
        logo
      } = row;

      nextTick(() => {
        form.id = id;
        form.name=name;
        form.logo=logo;
      })
      
    }else{
      setDefaultForm();
      nextTick(() => {
        form.id = null;
        form.name=null;
        form.logo=null;
      })
    }
    
    state.modal.show(); 
  };
  const rules = computed(() => {
  return {
    name: {
      required
    }
  };
});
  const v$ = vuelidate(rules, form);
  const save = async () => {
    let url = null;
    if (props.actionType === appConst.modalAction.add) {
      
      url = socialMediaAPI.store;
    } else if (props.actionType === appConst.modalAction.update) {
      url = socialMediaAPI.update;
    }
    const result = await v$.value.$validate();
    if (nullToVoid(form.logo)=="") {
      const { $i18n } = useNuxtApp();
      swal({
        title: $i18n.t("Required"),
        text: $i18n.t("logo_is_required"),
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
    
    if (result) {
      const data = await ifetch(url, form);
      iAlert().success();
      closeModal(true);
    } else {
      useNuxtApp().$showToast({ msg: "Invalid Input.", type: "error" });
    }
  };
  
  onMounted(() => {
    
    const bootstrap = useNuxtApp().$bootstrap;
    state.modal = new bootstrap.Modal("#modal");
    setDefaultForm();
  });
  const setDefaultForm = () => {
    
    nextTick(()=>{
      Object.assign(form, defaultForm);
      v$.value.$reset();
    })
  };
  
  const closeModal = (isRefresh = false) => {
    setDefaultForm();
    form.id = null;
    form.name=null;
    form.logo=null;
    if (isRefresh) {
      emit("closeModal", isRefresh);
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
  