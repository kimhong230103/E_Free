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
                <h5 class="pb-0">{{ $t("post") }}</h5>
                <div class="d-flex gap-2">
                  <button
                    class="btn btn-warning"
                    @click="() => useRouter().back()"
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
              <div class="col-8">
                <div class="row">
                  <div class="col-6">
                    <div class="form-group required">
                      <label for="title">{{ $t("name") }}</label>
                      <input
                        v-model="form.name"
                        type="text"
                        class="form-control"
                        id="title"
                        :class="{ 'is-invalid': v$.name.$error }"
                        @change="v$.name.$touch"
                        :placeholder="$t('name')"
                      />
                      <span class="invalid-feedback" v-if="v$.name.$error">{{
                        v$.name.$errors[0].$message
                      }}</span>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group required">
                      <label for="title">{{ $t("category") }}</label>
                      <select
                        class="form-select"
                        v-model="form.category_id"
                        :class="{ 'is-invalid': v$.category_id.$error }"
                        @change="v$.category_id.$touch"
                      >
                        <option :value="null" selected>
                          {{ $t("please_select") }}
                        </option>
                        <option
                          v-for="(item, index) in categoryList.lists"
                          :key="index"
                          :value="item.id"
                          v-show="item.type == 1"
                        >
                          {{ item.name }}
                        </option>
                      </select>
                      <span
                        class="invalid-feedback"
                        v-if="v$.category_id.$error"
                        >{{ v$.category_id.$errors[0].$message }}</span
                      >
                    </div>
                  </div>

                  <div class="col-12 mt-2">
                    <div style="height: 0px; width: 0px; overflow: hidden">
                      <input
                        ref="voiceInput"
                        style="display: none"
                        type="file"
                        accept="audio/*"
                        :multiple="false"
                        @change="onVoiceChange"
                      />
                    </div>
                    <label for="title">{{ $t("voice") }}</label>
                    <div
                      class="form-group d-flex flex-grow-1 align-items-center"
                    >
                      <audio
                        controls
                        class="form-control border-0 flex-grow-1 mx-2 w-75"
                        id="audioPlayer"
                      ></audio>
                      <div class="d-flex">
                        <button
                          class="btn btn-primary ml-2"
                          @click="chooseVoice"
                        >
                          <Icon
                            name="ic:baseline-keyboard-voice"
                            size="20"
                          ></Icon>
                          {{ $t("upload") }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="row">
                  <div class="col-12 mt-2">
                    <div>
                      <p for="title" class="text-center mb-2">
                        {{ $t("image") }}
                      </p>
                      <div class="text-center">
                        <img
                          :src="getImagePath(form.img)"
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
          <div class="col-12">
            <div class="form-group">
              <label for="title">{{ $t("description") }}</label>
              <WangEditor ref="editor" :valueEditHtml="form.description" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Start modal-cropper-image Component -->
    <div v-if="hideShowCropperImage">
      <ModalCropperImage
        ref="modalShowCropperImage"
        :target-file.sync="targetFile"
        :aspectRatio="aspectRatio"
        :cropBoxResizable="false"
        @closeModal="closeModalCropperImage"
        @save="saveModalCropperImage"
      />
    </div>
    <!-- End modal-cropper-image Component -->
  </div>
</template>

<script setup>
import { useCategoryList } from "~/store/category_list";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import { postAPI } from "~/constants/api";
import WangEditor from "~/components/WangEdiot.vue";
import ModalCropperImage from "~/components/ModalCropperImage.vue";

const modalShowCropperImage = ref(null);
const hideShowCropperImage = ref(false);
let aspectRatio = ref(480/260);
let cropWidth = ref(null);
let cropHeight = ref(null);
const defaultForm = {
  id: null,
  name: null,
  voice: "",
  img: null,
  category_id: null,
  description: null,
  sound_length: null,
};
const editor = ref(null);
const categoryList = useCategoryList();
const route = useRoute();
const fileInput = ref(null);
let targetFile = ref(null);
const voiceInput = ref(null);

let form = reactive({});

const rules = computed(() => {
  return {
    name: {
      required,
      maxLength: maxLength(100),
      $autoDirty: true,
    },
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
});
const chooseImage = () => {
  fileInput.value.click();
};

const chooseVoice = () => {
  voiceInput.value.click();
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
  aspectRatio.value = null;
  cropWidth.value = null;
  cropHeight.value = null;
};
const saveModalCropperImage = (base64) => {
  form.img = base64;
  closeModalCropperImage();
};
const onVoiceChange = async (event) => {
  const files = event.target.files || event.dataTransfer.files;

  if (files[0]) {
    const audioPlayer = document.getElementById("audioPlayer");

    while (audioPlayer.firstChild) {
      audioPlayer.removeChild(audioPlayer.firstChild);
    }
    const reader = new FileReader();

    reader.onload = function (event) {
      const blob = new Blob([event.target.result], { type: "audio/m4a" });
      const url = URL.createObjectURL(blob);
      audioPlayer.src = url;

      // Listen for the loadedmetadata event to get the duration
      audioPlayer.addEventListener("loadedmetadata", () => {
        const duration = audioPlayer.duration;

        // Optionally, store the duration in a variable or use it as needed
        form.sound_length = duration; // assuming form is defined elsewhere
      });

      const readerBase64 = new FileReader();
      readerBase64.onload = function (event) {
        const base64String = event.target.result;
        form.voice = base64String;
      };
      readerBase64.readAsDataURL(blob);
    };

    reader.readAsArrayBuffer(files[0]);
  } else {
    const audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.src = "";
    form.value.voice = "";
  }
};

const getInput = () => {
  return {
    id: form.id,
    name: form.name,
    voice: form.voice,
    img: form.img,
    sound_length: form.sound_length,
    category_id: form.category_id,
    description: editor.value.getValue(),
  };
};

const setInput = (res) => {
  form.id = res.data.id;
  form.name = res.data.name;
  form.voice = setVoice(res.data.voice);
  form.img = res.data.image;
  form.category_id = res.data.category_id;
  form.description = res.data.description;
};

const setVoice = (voice) => {
  const audioPlayer = document.getElementById("audioPlayer");
  const source = document.createElement("source");
  source.src = getVoicePath(voice);
  audioPlayer.appendChild(source);
  return voice;
};

const getData = async (id) => {
  let data = await ifetch(postAPI.getListUpdate, { id: id });
  setInput(data);
};

const save = async (type) => {
  const result = await v$.value.$validate();
  if (result) {
    let url = postAPI.store;
    if (!isEmpty(route.query)) {
      url = postAPI.update;
    }
    let input = getInput();
    await ifetch(url, input);
    if (type === "add") {
      setDefaultForm();
      iAlert().success();
    } else if (type === "close") {
      navigateTo({ path: "../../media/post" });
      iAlert().success();
    }
  } else {
    useNuxtApp().$showToast({ msg: "Invalid Input.", type: "error" });
  }
};

const setDefaultForm = () => {
  Object.assign(form, defaultForm);
  const audioPlayer = document.getElementById("audioPlayer");
  while (audioPlayer.firstChild) {
    audioPlayer.removeChild(audioPlayer.firstChild);
  }
  audioPlayer.src = "";
  v$.value.$reset();
};
</script>
