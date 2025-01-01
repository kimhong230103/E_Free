<template>
    <div class="pt-3">
        <div class="card p-3 report-head">
            <div class="card-header">
              <div class="row">
                <div class="col-12 col-sm-12 col-md-5 col-lg-6 ps-0">
                  <h4>{{ $t('statistics_report') }}</h4>
                </div>
                <div class="col-12 col-sm-12 col-md-7 col-lg-6 ps-0">
                  <div class="d-flex justify-content-end gap-2 date-range">
                    <button
                      class="btn btn-outline-primary"
                      @click="getCategoryList"
                    >
                      <Icon name="uil:sync" />
                      {{ $t("refresh") }}
                    </button>
                    <div class="form-group date-picker-range" style="width: 340px;">
                      <IDatePicker
                        v-model="created_at"
                        :multi-calendars="true"
                        :range="true"
                        @dateChange="dateChange"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div 
              class="card-body w-100 overflow-auto"
              @mousedown="startScroll"
              @mouseup="stopScroll"
              @mouseleave="stopScroll"
              @mousemove="scroll"
              ref="scrollContainer"
            >
              <div class="row row-cols-2 row-cols-sm-4 row-cols-md-5 row-cols-lg-6 row-cols-xl-6 mt-1 flex-nowrap" ref="scrollRow">
                  <div class="col category-item" v-for="(item, index) in categories" :key="index">
                      <figure 
                        @click="getQuestionFilter(item,index)" 
                        class="rounded p-2 py-4 w-100 h-100 d-flex flex-wrap align-items-center justify-content-center"
                        :class="{'active': categoriesActive[index]}"
                      >
                          <div class="img w-100">
                              <h3 class="text-center rounded pb-0">
                                  <img class="rounded" height="70px" :src="getImagePath(item.image, 'category')" alt="not found" />
                              </h3>
                          </div>
                          <figcaption class="text-center mt-2 w-100">
                              <span class="px-1 rounded w-100">{{ item.name }}</span>
                          </figcaption>
                      </figure>
                  </div>
              </div>
            </div>
        </div>
        <div>
          <SurveyReport :questionList="questions" />
        </div>
    </div>
  </template>
  
  <script setup>
  import ActionModal from "~/components/question/modal.vue";
  import { moduleKey } from "~/constants/moduleKey";
  import { appConst } from "~/constants/app";
  import { permissionConst } from "~/constants/permission";
  import moment from "moment";
  import { useCategoryList } from "~/store/category_list";
  import { questionAPI } from "~/constants/api";
  import { useBranchStore } from "~/store/branch";
  import  SurveyReport  from "~/components/survey_report";
  
  definePageMeta({
    middleware: "alc",
    moduleKey: moduleKey.REPORT,
  });
  
  
  
  const categoryList = useCategoryList();
  const branchStore = useBranchStore();
  const categories = ref([]);
  const branch_id = ref(branchStore.branch_id);
  const questionList=ref([]);
  const categoriesActive = ref([]);
  const questions=ref([]);
  const created_at = ref(null);
  const indexCategory = ref(0);
  onMounted(() => {
    getCategoryList();
  });
  const getCategoryList = async () => {
    branch_id.value = branchStore.branch_id
    if(nullToVoid(branch_id.value)==""){
      categories.value = categoryList.lists
      categories.value.forEach((item)=>{
        categoriesActive.value.push(false);
      })
      getQuestionAndAnswer(categories.value[0]);
      return
    }
    let category = computed(() => {
      return categoryList.lists.filter((item) => {
        return item.branch_id == branch_id.value
      });
    })
    categories.value = category.value
    categories.value.forEach((item)=>{
      categoriesActive.value.push(false);
    });
    getQuestionAndAnswer(categories.value[0]);
  }
  const getQuestionAndAnswer = async (item)=>{
    categoriesActive.value.fill(false);
    categoriesActive.value[0]=true;
    questionList.value = await ifetch(questionAPI.get_all, {});
    questions.value = questionList.value.filter((el)=>{
      return el.category_id == item.id
    })
    
  }
  const getQuestionFilter=(item,index=0)=>{
    categoriesActive.value.fill(false);
    categoriesActive.value[index]=true;
    indexCategory.value=index;
    questions.value = questionList.value.filter((el)=>{
      return el.category_id == item.id 
    })

  }

  const getQuestioClearDate = async () => {
    questionList.value = await ifetch(questionAPI.get_all, {});
    getQuestionFilter(categories.value[indexCategory.value],indexCategory.value);
  }

  const dateChange = async (date) => {
  if (Array.isArray(date) && date.length > 0) {
    created_at.value = [
      moment(date[0]).format("YYYY-MM-DD"),
      moment(date[1]).format("YYYY-MM-DD")
    ];
    questionList.value = await ifetch(questionAPI.get_all, {transaction_date: created_at.value});
    getQuestionFilter(categories.value[indexCategory.value],indexCategory.value);
    
  }
  else if (moment(date).isValid()) {
    created_at.value = null;
  } else {
    getQuestioClearDate();
    console.error("Invalid date input");
    created_at.value = null;
  }
};

  watch(
  () => branchStore.branch_id,
  (val) => {
    getCategoryList();
  }
);

const isDragging = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);
const scrollContainer = ref(null);

const startScroll = (e) => {
  isDragging.value = true;
  startX.value = e.pageX - scrollContainer.value.offsetLeft;
  scrollLeft.value = scrollContainer.value.scrollLeft;
};

const stopScroll = () => {
  isDragging.value = false;
};

const scroll = (e) => {
  if (!isDragging.value) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.value.offsetLeft;
  const walk = (x - startX.value) * 1; // Adjust scroll speed
  scrollContainer.value.scrollLeft = scrollLeft.value - walk;
};
  </script>
  
  <style scoped>
    .category-item figure{
        cursor: pointer;
        transition: all 0.3s;
        background-color: #f5f5f5;
    }
    .category-item figure.active{
      background-color: #0E9BDC;
    }
    .category-item figure span{
        font-size: 15px;
        color: #000;
        display: block;
    }
    .category-item figure.active span{
      color: #fff;
    }
    .overflow-auto {
    cursor: grab;
    overflow-x: auto;
    white-space: nowrap; /* Prevent wrapping */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
  }
  .overflow-auto:active {
    cursor: grabbing; /* Change cursor while dragging */
  }
  .overflow-auto::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  @media screen and (max-width: 768px) {
    .date-range{
      margin-top: 10px !important;
      justify-content: start !important;
    }
    .date-picker-range{
      width: 280px !important;
    }
    .dp__input{
      font-size: 10px !important;
    }
  }
  </style>
<style>
  @media screen and (max-width: 768px) {
    .dp__input{
      font-size: 12px !important;
    }
  }
</style>