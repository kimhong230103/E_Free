<template>
    <div class="modal fade" id="modal">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              {{ props.actionType && $t(props.actionType) }} {{ $t("question") }}
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
              <div class="col-12" v-if="props.actionType != 'view_answer_in'">
                <div class="form-group mb-2">
                  <label for="name" class="required">{{ $t("category") }}</label>
                  <select
                    v-model="form.category_id"
                    type="text"
                    class="form-control"
                    id="category"
                    :class="{ 'is-invalid': v$.category_id.$error }"
                    @change="getLengthQuestionByCategory(form.category_id)"
                  >
                    <option :value="null" selected>{{ $t("please_select") }}</option>
                    <option v-for="item in categories" :value="item.id">
                      {{ item.name }}
                    </option>
                  </select>
                  <span class="invalid-feedback" v-if="v$.category_id.$error">{{
                    v$.category_id.$errors[0].$message
                  }}</span>
                </div>  
                <div class="form-group mb-2">
                  <label for="title" class="required">{{ $t("title") }}</label>
                  <input 
                    v-model="form.title"
                    required
                    type="text"
                    class="form-control"
                    id="title"
                    :class="{ 'is-invalid': v$.title.$error }"
                    @change="v$.title.$touch"
                    :placeholder="$t('title')"
                  >
                  <span class="invalid-feedback" v-if="v$.title.$error">{{
                    v$.title.$errors[0].$message
                  }}</span>
                </div>
                <div class="form-group mb-2">
                  <label for="order" class="required">{{ $t("order") }}</label>
                  <input 
                    v-model="form.order"
                    required
                    :readonly="props.actionType == 'clone'"
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
              </div>
              <div class="col-12" v-if="props.actionType == 'add' || props.actionType == 'update'">
                <span @click="addAnswer" style="cursor: pointer;">
                  <Icon
                    class="text-primary me-1"
                    name="solar:add-circle-linear"
                    size="21"
                  />
                  {{ $t("add_answer") }}
                </span>
              </div>
              <div class="col-12" v-if="props.actionType == 'view_answer_in'">
                <h5 class="d-none d-md-block">{{  form.title }}</h5>
                <h6 class="d-block d-md-none">{{  form.title }}</h6>
              </div>
              <div class="col-12 mt-3" v-if="form.answers.length>0">
                <table class="table table-bordered table-hover tbl-answer">
                  <tr>
                    <th>{{ $t("id") }}</th>
                    <th>{{ $t("image") }}</th>
                    <th>{{ $t("title") }}</th>
                    <th>{{ $t("count") }}</th>
                    <th>{{ $t("order") }}</th>
                    <th>{{ $t("status") }}</th>
                    <th v-if="props.actionType == 'add' || props.actionType == 'update'">{{ $t("action") }}</th>
                  </tr>
                  <tr v-for="(item, index) in form.answers" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>
                      <img
                        :src="getImagePath(item.image, 'answer')"
                        alt=""
                        width="60px"
                        height="60px"
                        style="object-fit: cover;"
                        @click="triggerFileInput(index)"
                         v-if="props.actionType == 'add' || props.actionType == 'update'"
                      />
                      <img
                        :src="getImagePath(item.image, 'answer')"
                        alt=""
                        width="50px"
                        height="50px"
                        style="object-fit: cover;"
                        v-else
                      />
                      <!-- Hidden file input field -->
                      <input
                        type="file"
                        class="form-control"
                        @change="handleFileUpload($event, item)"
                        accept=".png, .jpg, .jpeg, .gif, .webp, .svg"
                        :ref="`fileInput-`+index" 
                        :id="`fileInput-`+index" 
                        style="display: none;"
                      />
                    </td>
                    <td>
                      <input
                        v-model="item.title"
                        type="text"
                        class="form-control"
                        :placeholder="$t('title')"
                         v-if="props.actionType == 'add' || props.actionType == 'update'"
                      />
                      <span v-else>{{ item.title }}</span>
                    </td>
                    <td>
                      {{ item.count }}
                    </td>
                    <td>
                      <input
                        v-model="item.order"
                        type="number"
                        class="form-control"
                        :placeholder="$t('order')"
                         v-if="props.actionType == 'add' || props.actionType == 'update'"
                      >
                      <span v-else>{{ item.order }}</span>
                    </td>
                    <td>
                      <StatusToggle
                        :status="item.status"
                        @on-status-change="handleStatusChange(item)"
                      />
                    </td>
                    <td v-if="props.actionType == 'add' || props.actionType == 'update'">
                      <Icon
                        class="text-danger me-1"
                        name="solar:trash-bin-trash-outline"
                        size="40"
                        @click="removeAnswer(item,index)"
                      />
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
  
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="() => closeModal(true)"
            >
              {{ $t("close") }}
            </button>
            <button type="button" class="btn btn-primary" @click="save"  v-if="props.actionType == 'add' || props.actionType == 'update'">
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
  import { useCategoryList } from "~/store/category_list";
  import { useBranchStore } from "~/store/branch";
  import { questionAPI, answerAPI } from "~/constants/api";
  const branchStore = useBranchStore();
  const categoryList = useCategoryList();
  const branch_id=ref(branchStore.branch_id);
  const categories = ref([]);
  const isClone=ref(false);
  const typeClone=ref(null);
  import {
    required,
    email,
    minLength,
    maxLength,
    url,
    or,
  } from "@vuelidate/validators";
import { get } from "@vueuse/core";
  const props = defineProps({
    actionType: {
      type: String,
      default: appConst.modalAction.add,
    },
    questions: {
      type: Object,
      default: null,
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
  const checkDeleteAnswer = ref(true);
  const form = reactive({
    id: null,
    category_id: null,
    title: null,
    order: 0,
    answers:[]
  });
  const APIActiion=ref(false);
  
  const getCategoryList = async () => {
    branch_id.value = branchStore.branch_id
    let category = computed(() => {
      return categoryList.lists.filter((item) => {
        return item.branch_id == branch_id.value
      });
    })
    categories.value = category.value
  }
  
  const defaultForm = {
    id: null,
    category_id: null,
    title: null,
    order: 1,
    answers:[]
  };
  
  const emit = defineEmits(["closeModal"]);
  
  watch(
  () => branchStore.branch_id,
  (val) => {
    getCategoryList();
  }
);
  const showModal = async (row=null,type=null) => {
    
    checkDeleteAnswer.value = true
    if (row) {
      checkDeleteAnswer.value = false
      const {
        id,
        category_id,
        title,
        order,
        answers
      } = row;

      form.id = id;
      form.category_id = category_id;
      form.title = title;
      form.order = order;
      form.answers = answers
      if(type == 'clone'){
        form.title = title+"Copy";
        form.answers.forEach((item,index) => {
          item.order = index+1;
        })
      }
    }else{
      setDefaultForm();
    }
    state.modal.show(); 
    if(type == 'clone'){
      typeClone.value = type;
      save();
    }
  };
  const rules = computed(() => {
  return {
    title: {
      required,
    },
    category_id:{
      required
    },
    order: {
      required
    }
  };
});
  const v$ = vuelidate(rules, form);
  
const save = async () => {
  
    let url = null;
    if(typeClone.value){
      url = questionAPI.store;
      isClone.value = true
      typeClone.value = null
    }
    else if (props.actionType === appConst.modalAction.add) {
      url = questionAPI.store;
    } else if (props.actionType === appConst.modalAction.update) {
      url = questionAPI.update;
    }
    const result = await v$.value.$validate();
    if (result) {
      const checkImageAnswer=ref(true);
      const checkTitleAnswer=ref(true);
      form.answers.forEach((item) => {
        if (item.image == null) {
          checkImageAnswer.value = false
        }
        if (item.title == null) {
          checkTitleAnswer.value = false
        }
      })
      if(!checkImageAnswer.value && !checkTitleAnswer.value){
        useNuxtApp().$showToast({ msg: "Please upload image and enter title of answer	.", type: "error" });
        return;
      }
      if (!checkImageAnswer.value) {
        useNuxtApp().$showToast({ msg: "Please upload image of answer.", type: "error" });
        return;
      }
      if (!checkTitleAnswer.value) {
        useNuxtApp().$showToast({ msg: "Please enter title of answer.", type: "error" });
        return;
      }
      branch_id.value = branchStore.branch_id
      form.branch_id = branch_id.value
      const data = await ifetch(url, form);
      
      APIActiion.value=true;
      if (isClone.value) {
        form.id = data.data[data.data.length-1].id
        var infoAnswer = await ifetch(answerAPI.get_by_question_id,{question_id:form.id})
        form.answers = infoAnswer.data
        APIActiion.value= true;
        closeModal();
        return;
      }
      iAlert().success();
      APIActiion.value= true;
      closeModal();
    } else {
      useNuxtApp().$showToast({ msg: "Invalid Input.", type: "error" });
    }
  };
  const handleStatusChange = async (item) => {
    if (item.id) {
      await ifetch(answerAPI.updateStatus, {
        id: item.id,
        status: value ? 1 : 0,
      });
      getData();
    }
  };
  // Function to trigger the file input click event when image is clicked
  const triggerFileInput = (index) => {
  const fileInput = document.querySelector(`#fileInput-${index}`); // Access the input element via dynamic ref
  if (fileInput) {
    fileInput.click(); // Programmatically click the file input
  }
};
// Function to handle the file upload
const handleFileUpload = (event,item) => {
  const file = event.target.files[0];  // Get the selected file
  if (file) {
    // Convert the file to base64 or process it as needed
    convertToBase64(file)
      .then((base64String) => {
        item.image = base64String;
      })
      .catch((error) => {
        console.error('Error converting file to base64:', error);
      });

    // Clear the input value after selection
    event.target.value = ''; 
  }
};

// Function to convert the image file to base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);  // Resolve the base64 string when done
    reader.onerror = reject;  // Reject on error
    reader.readAsDataURL(file);  // Start reading the file as base64
  });
};

// You can also have a method to get the image path dynamically (based on your data)
  onMounted(() => {
    setDefaultForm();
    getCategoryList();
    const bootstrap = useNuxtApp().$bootstrap;
    state.modal = new bootstrap.Modal("#modal");
  });
  const addAnswer = () => {
    var order = form.answers.length+1
    form.answers.push({
      id: null,
      question_id: form.id,
      title: null,
      order: order,
      image: null,
      count: 0,
      status: 1
    });
    APIActiion.value= true;
  }
  const removeAnswer = (item,index) => {
    if(checkDeleteAnswer.value || item.id==null) 
    {
      form.answers.splice(index, 1);
    }
    else{
      const { $i18n } = useNuxtApp();
      swal({
        title: $i18n.t("are_you_sure"),
        text: $i18n.t("cannot_revert_this"),
        icon: "question",
        showCancelButton: true,
        confirmButtonText: $i18n.t("ok"),
        cancelButtonText: $i18n.t("cancel"),
        reverseButtons: true,
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return new Promise(async (resolve) => {
            let input = { id: item.id,question_id:item.question_id};
            const data = await ifetch(answerAPI.delete, input);
            form.answers=data.data;
            APIActiion.value= true;
            iAlert().success();
            resolve();
          });
        },
        allowOutsideClick: () => !swal.isLoading(),
      });
    }
    
  }

  const getLengthQuestionByCategory = (categoryID) => {
    if (categoryID) {
      const questionByCategory = props.questions.filter((item) => item.category_id == categoryID);
      form.order = questionByCategory.length + 1;
    }else{
      form.order = 1;
    }
    
  }
  const setDefaultForm = () => {
    Object.assign(form, defaultForm);
    form.answers = [];
    nextTick(()=>{
      v$.value.$reset();
    })
  };
  
  const closeModal = (isRefresh = false) => {
    // if (isRefresh) {
    //   APIActiion.value = isRefresh;
    // }
    // alert(APIActiion.value);
    emit("closeModal", APIActiion.value);
    APIActiion.value = false;
    if(isClone.value){
      isClone.value = false
      return;
    }
    setDefaultForm();
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
  .tbl-answer input {
    width: 100%;
    border: 1px solid #ccc;
  }
  .tbl-answer td{
    padding-block: 5px !important;
  }
  .tbl-answer td img{
    padding: 0 !important;
  }
  </style>
  