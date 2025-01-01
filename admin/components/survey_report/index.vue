<template>
    <div>
        <div class="row">
            <div class="col-12" v-for="item,index in questionList" :key="index">
                <div class="card">
                    <div class="card-header w-100">
                        <div class="row">
                            <div class="col-12 col-sm-12 col-md-12 col-lg-11 col-xl-10">
                                <span style="font-size: 17px;">{{ item.title }}</span>
                            </div>
                            <div class="col-12 col-sm-12 col-md-12 col-lg-1 col-xl-2 d-none d-sm-none d-lg-flex flex-wrap align-items-center justify-content-center">
                                <span>{{ $t("count") }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 col-sm-12 col-md-12 col-lg-11 col-xl-10">
                                <div class="row px-4">
                                    <div class="col-2 col-sm-2 col-md-2 col-lg-1 px-1" v-for="(el,i) in item.answers" :key="i">
                                        <figure class="w-100 h-100 d-flex flex-wrap align-items-center justify-content-center">
                                            <div class="w-100 text-center">
                                                <img class="img-answer" style="width: 57%;" :src="getImagePath(el.image, 'answer')" alt="not founded">
                                            </div>
                                            <figcaption class="w-100 my-1 text-center" style="height: 60px;">
                                                <span class="fw-bold present-answer" style="font-size: 15px;" v-if="item.total_count > 0">{{ ((el.total_count_detail*100)/item.total_count).toFixed(2) }}%</span>
                                                <span class="fw-bold present-answer" style="font-size: 15px;" v-else>0%</span>
                                                <span class="text-ccc count-answer" style="font-size: 11.5px;">{{ el.title }} : {{ el.total_count_detail }}</span>
                                            </figcaption>
                                        </figure>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-12 col-md-12 col-lg-1 col-xl-2 d-flex flex-wrap align-items-center justify-content-center">
                                <span class="d-lg-none me-2">{{ $t("count") }} : </span>
                                <span class="count-answer-all" style="font-size: 29px;font-weight: 500;"> {{ item.total_count }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    const props = defineProps({
    questionList: {
      type: Array,
      default: [],
    },
  });
</script>
<style scoped>
    figure{
        transition: all 0.3s;
        border-radius: 10px;
    }
    figure span{
        display: block;
    }
    .text-ccc{
      color: #bababa;
    }
    .col-1{
        width: 10% !important;
    }
    @media (max-width: 1200px) {
        .count-answer{
            font-size: 10.5px !important;
        }
    }
    @media (max-width: 1200px) {
        .img-answer{
            width: 75% !important;
        }
        .present-answer{
            font-size: 12.5px !important;
        }
        .count-answer{
            font-size: 10.5px !important;
        }
        .count-answer-all{
            font-size: 21px !important;
        }
    }
    @media (max-width: 992px) {
        .img-answer{
            width: 65% !important;
        }
        .present-answer{
            font-size: 13px !important;
        }
        .count-answer{
            font-size: 11px !important;
        }
        .count-answer-all{
            font-size: 21px !important;
        }
    }
    @media (max-width: 767.98px) {
        .img-answer{
            width: 80% !important;
        }
        .present-answer{
            font-size: 12.5px !important;
        }
        .count-answer{
            font-size: 10.5px !important;
        }
        .count-answer-all{
            font-size: 20px !important;
        }
    }
    @media (max-width: 575.98px) {
        .img-answer{
            width: 100% !important;
        }
        .present-answer{
            font-size: 11px !important;
        }
        .count-answer{
            font-size: 9px !important;
        }
        .count-answer-all{
            font-size: 20px !important;
        }
    }

    
</style>