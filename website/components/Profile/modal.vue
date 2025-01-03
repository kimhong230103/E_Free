<template>
    <div class="card p-3">
      
      <div class="card-body">
        <div class="row">
          <div class="col-12 col-sm-12 col-lg-2 d-flex justify-content-center align-items-center">
            <div>
              <input
                type="file"
                ref="fileInput"
                class="d-none"
                :multiple="false"
                @change="onFileChange"
              />
              <div
                class="position-relative on-hover-profile-image"
                style="width: 150px; height: 150px"
                @click="uploadFile"
              >
                <Icon
                  class="change_profile_image text-main"
                  name="material-symbols-light:photo-camera-outline-rounded"
                  size="35"
                  style="
                    position: absolute;
                    cursor: pointer;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                  "
                ></Icon>
                <img
                  v-if="form.profile_image==null"
                  height="150"
                  width="150"
                  class="rounded-circle"
                  src=""
                  style="cursor: pointer"
                  alt=""
                />
                <img
                  v-else
                  height="150"
                  width="150"
                  class="rounded-circle"
                  :src="getImagePath(form.profile_image, 'user_client')"
                  style="cursor: pointer"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-12 col-lg-10 form-input-profile">
            <h4>{{ $t("profile") }}</h4>
            <div class="row mt-3">
              <div class="col-12 col-sm-12 col-xl-12">
                <div class="form-group">
                  <label for="">{{ $t("lastname") }}</label>
                  <input
                    type="text"
                    class="form-control"
                    :placeholder="$t('lastname')"
                    v-model="form.lastname"
                  />
                </div>
              </div>
              <div class="col-12 col-sm-12 col-xl-12">
                <div class="form-group">
                  <label for="">{{ $t("first_name") }}</label>
                  <input
                    type="text"
                    class="form-control"
                    :placeholder="$t('first_name')"
                    v-model="form.firstname"
                  />
                </div>
              </div>
              
              <div class="col-12 col-sm-12 col-xl-12 mt-2">
                <div class="form-group">
                  <label for="">{{ $t("gender") }}</label>
                  <select v-model="form.gender" class="form-control">
                    <option :value="null" disabled>
                      {{ $t("please_select") }}
                    </option>
                    <option :value="genderEnum.male">{{ $t("male") }}</option>
                    <option :value="genderEnum.female">{{ $t("female") }}</option>
                  </select>
                </div>
              </div>
              <div class="col-12 col-sm-12 col-xl-12 mt-2">
                <div class="row">
                  <div class="col-12">
                    <div class="form-group">
                      <label for="">{{ $t("phone") }}</label>
                      <div class="row">
                        <div class="col-8 col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            :placeholder="$t('phone')"
                            disabled
                            v-model="form.phone"
                          />
                        </div>
                        <div class="col-4 col-sm-3 text-end">
                          <div class="form-group">
                            <!-- <label for="" class="invisible">phone</label> -->
                            <button
                              class="btn btn-primary text-white"
                              @click="changeNumber"
                            >
                              {{ $t("change_number") }}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
              <div class="col-12 col-sm-12 col-xl-12 mt-2">
                <div class="form-group">
                  <label for="">{{ $t("email") }}</label>
                  <input
                    type="text"
                    class="form-control"
                    :placeholder="$t('email')"
                    v-model="form.email"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-header">
        <div class="d-flex justify-content-center">
          <button v-if="props.action_type" class="btn btn-primary btn-md px-3" @click="update">
            {{ $t("save") }}
            <Icon
              size="18"
              name="material-symbols:save-outline"
            ></Icon>
          </button>
          <button v-else class="btn btn-primary btn-md px-3" @click="update">
            {{ $t("update") }}
            <Icon
              size="18"
              name="material-symbols-light:save-outline-sharp"
            ></Icon>
          </button>
        </div>
      </div>
  
      <!-- Start modal-cropper-image Component -->
      <div v-if="hideShowCropperImage">
        <ModalCropperImage
          ref="modalShowCropperImage"
          :target-file.sync="targetFile"
          :previewWidth="300"
          :previewHeight="300"
          :aspectRatio="1"
          :cropBoxResizable="false"
          :backdrop="true"
          @closeModal="closeModalCropperImage"
          @save="saveModalCropperImage"
        />
      </div>
      <!-- End modal-cropper-image Component -->
  
      <div v-if="showSignInModal">
        <SignIn
          ref="signInRef"
          :modalType="modalTypeSignIn"
          @closeModal="closeModalSignIn"
          @changeNumber="afterChangeNumber"
        />
      </div>
    </div>
  </template>
  <script setup>
  import { userClientAPI } from "~/constants/api";
  import { useUserStore } from "~/store/user";
  import ModalCropperImage from "~/components/ModalCropperImage.vue";
  import SignIn from "~/components/SignIn/modal.vue";
  
  const userStore = useUserStore();
  const fileInput = ref(null);
  let targetFile = ref(null);
  const modalShowCropperImage = ref(null);
  const hideShowCropperImage = ref(false);
  let form = reactive({});
  const showSignInModal = ref(false);
  const signInRef = ref(null);
  const modalTypeSignIn = ref(2); // 1: sign in, 2: change number

  const props = defineProps({
    action_type:{
        type:Boolean,
        default: false
    }
  })
  
  definePageMeta({
    middleware: "auth",
  });
  
  onMounted(() => {
  
  
  
    setData();
  });

  const emit = defineEmits(["closeProfilePopup"]);
  
  const setData = () => {
    Object.assign(form, userStore.user);
    form.old_profile_image = form.profile_image;
  };
  
  const uploadFile = () => {
    fileInput.value.click();
  };
  
  const onFileChange = ($event) => {
    const files = $event.target.files || $event.dataTransfer.files;
    if (files[0]) {
      if (files[0].size > 15000000) {
        fileInput.value = "";
        form.profile_image = "";
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
  };
  const saveModalCropperImage = (base64) => {
    form.profile_image = base64;
    closeModalCropperImage();
  };
  
  const update = async () => {
    form.full_name = form.firstname + " " + form.lastname;
    await ifetch(userClientAPI.update, form).then((res) => {
      userStore.setUser(res);
      emit("closeProfilePopup");
    });
  };
  
  const changeNumber = async () => {
    modalTypeSignIn.value = 2;
    showSignInModal.value = true;
    nextTick(() => {
      signInRef.value.showModal();
    });
  };
  
  const closeModalSignIn = (isRefresh) => {
    showSignInModal.value = false;
    if (isRefresh) {
    }
  };
  
  const afterChangeNumber = (number) => {
    form.phone = number;
  };
  
  // defineExpose([
  //   'closeProfilePopup'
  // ])
  </script>
  <style>
  .change_profile_image {
    display: none !important;
  }
  .on-hover-profile-image:hover img {
    filter: blur(1px);
    z-index: 1;
  }
  .on-hover-profile-image:hover .change_profile_image {
    display: block !important;
    z-index: 2;
    transition: all 0.3s !important;
  }
  html.dark .form-input-profile label{
    color: white !important;
  }
  .form-input-profile input{
    background-color: rgba(211, 219, 233, 1) !important;
    border: thin solid rgba(154, 160, 172, 1) !important;
  }
  .form-input-profile select{
    background-color: rgba(211, 219, 233, 1) !important;
    border: thin solid rgba(154, 160, 172, 1) !important;
  }
  html.dark .form-input-profile input{
    background-color: rgba(43, 46, 51, 1) !important;
    border: thin solid rgba(90, 96, 106, 1) !important;
    color: rgba(239, 244, 255, 1);
  }
  html.dark .form-input-profile input::placeholder{
    color: rgba(239, 244, 255, 1);
  }
  html.dark .form-input-profile select{
    background-color: rgba(43, 46, 51, 1) !important;
    border: thin solid rgba(90, 96, 106, 1) !important;
    color: rgba(239, 244, 255, 1);
  }
  </style>
  