<template>
    <div class="modal fade" id="modal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              {{ props.actionType && $t(props.actionType) }} {{ $t("menu") }}
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
                <div class="row">
                    <div class="col-12">
                        <div class="form-group mb-2" v-for="(item, index) in languageList" :key="index">
                            <label for="name" class="required">{{ $t("title") }} {{ $t(item.name) }}</label>
                            <input 
                                v-model="form.menu_translate[index].title"
                                required
                                type="text"
                                class="form-control"
                                id="title"
                                :class="{ 'is-invalid': v$.menu_translate.$error }"
                                @change="v$.menu_translate.$touch"
                                :placeholder="$t('title')+' '+$t(item.name)"
                            >
                            <span class="invalid-feedback" v-if="v$.menu_translate.$error">{{
                                v$.menu_translate.$errors[0].$message
                            }}</span>
                        </div>
                        <div class="form-group mb-2">
                          <label for="order" class="required">{{ $t("order") }}</label>
                          <input 
                            v-model="form.order"
                            required
                            type="number"
                            class="form-control"
                            id="order"
                            :class="{ 'is-invalid': v$.order.$error }"
                            @change="v$.order.$touch"
                            :placeholder="$t('title')"
                          >
                          <span class="invalid-feedback" v-if="v$.order.$error">{{
                            v$.order.$errors[0].$message
                          }}</span>
                        </div>
                        <div class="form-group mb-2">
                            <label for="menu_type">{{ $t("menu_type") }}</label>
                            <select 
                              class="form-control"
                              name="" 
                              id="menu_type" 
                              v-model="form.menu_type"
                            >
                                <option :value="null" selected>{{ $t("please_select") }}</option>
                                <option v-for="item, index in menuTypeEnum.list" :key="index" :value="item.value">{{ $t(item.key) }}</option>
                            </select>
                        </div>
                        <div class="form-group mb-2">
                            <label for="url">{{ $t("url") }}</label>
                            <input 
                                v-model="form.url"
                                type="text"
                                class="form-control"
                                id="url"
                                :placeholder="$t('url')"
                            >
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
    </div>
  </template>
  
  <script setup>
  import { appConst } from "~/constants/app";
  import Multiselect from "@vueform/multiselect";
  import { useBranchStore } from "~/store/branch";
  import { KDACMenuAPI } from "~/constants/api";
  import menuTypeEnum from "~/composables/enum/menuTypeEnum";
  import businessTypeEnum from "~/composables/enum/businessTypeEnum";
  import { useLanguageStore } from "~/store/language";
  const languageStore = useLanguageStore();
  const branchStore = useBranchStore();
  const branch_id=ref(branchStore.branch_id);
  const	questions = ref([]);
  const languageList = ref(languageStore.lists);
  
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
    category_id: null,
    business_id: null,
    parent_id: null,
    url: null,
    order: 1,
    menu_translate: languageList.value.map(language => ({
      language_id: language.id,  // Add language_id from the language list
      title: null  // Initialize title as null
    })),
    menu_type: null
  });
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
  const defaultForm = {
    id: null,
    category_id: null,
    business_id: null,
    parent_id: null,
    url: null,
    order: 1,
    menu_translate: languageList.value.map(language => ({
      language_id: language.id,  // Add language_id from the language list
      title: null  // Initialize title as null
    })),
    menu_type: null
  };
  
  const emit = defineEmits(["closeModal"]);
  const showModal = async (row = null,orderNum = 1) => {
    if (row && row.id) {
      const {
        id,
        category_id,
        business_id,
        parent_id,
        menu_type,
        url,
        order,
        menu_translate
      } = row;

      nextTick(() => {
        form.id = id;
        form.category_id = category_id;
        form.business_id = business_id;
        form.parent_id = parent_id;
        form.menu_type = menu_type;
        form.url = url;
        form.order = order;
        form.menu_translate = menu_translate;
      })
      
    }else{
      setDefaultForm();
      nextTick(() => {
        form.id = null;
        form.category_id = null;
        form.business_id = null;
        form.parent_id = null;
        form.menu_type = null;
        form.url = null;
        form.order = orderNum;
        form.menu_translate = languageList.value.map(language => ({
          language_id: language.id,  // Add language_id from the language list
          title: null  // Initialize title as null
        }));
      })
    }
    
    state.modal.show(); 
  };
  const rules = computed(() => {
  return {
    menu_translate: {
      required,
    },
    order: {
      required
    }
  };
});
  const v$ = vuelidate(rules, form);
  const save = async () => {
    let url = null;
    if (props.actionType === appConst.modalAction.add) {
      
      url = KDACMenuAPI.store;
    } else if (props.actionType === appConst.modalAction.update) {
      url = KDACMenuAPI.update;
    }
    const result = await v$.value.$validate();
    
    let checkNullTitle = false;
    for (let i = 0; i < form.menu_translate.length; i++) {
      if (form.menu_translate[i].title == null) {
        checkNullTitle = true;
        break;
      }
    }
    if (checkNullTitle) {
      const { $i18n } = useNuxtApp();
      swal({
        title: $i18n.t("Required"),
        text: $i18n.t("all_of_title_is_required"),
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
      form.business_id = props.business_id;
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
    // form = {
    //   id: null,
    //   category_id: null,
    //   business_id: null,
    //   parent_id: null,
    //   url: null,
    //   order: 0,
    //   menu_translate: languageList.value.map(language => ({
    //     language_id: language.id,  // Add language_id from the language list
    //     title: null  // Initialize title as null
    //   })),
    //   menu_type: null
    // };
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
    form.category_id = null;
    form.business_id = null;
    form.parent_id = null;
    form.menu_type = null;
    form.url = null;
    form.order = 1;
    form.menu_translate = languageList.value.map(language => ({
      language_id: language.id,  // Add language_id from the language list
      title: null  // Initialize title as null
    }));
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
  