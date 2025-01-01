<template>
  <div>
    <div class="row">
      <div class="col-12" style="padding-right: 14px">
        <div class="row">
          <div class="col-xl-12">
            <slideshow></slideshow>
          </div>
          <div class="col-12">
            <div class="w-100 card p-3">
              <div class="row border-round px-2 px-md-4 py-3 mx-0">
                <div class="col-6 col-lg-3 mb-2 mb-lg-0 d-flex align-items-center box-promote border-right">
                  <Icon name="material-symbols:location-on" size="43" style="color: var(--theme-default);" />
                  <div class="ms-2">
                    <span class="text-top d-block">{{ $t('free_delivery') }}</span>
                    <span class="text-bottom d-block">{{ $t('for_all_orders_over') }} $50</span>
                  </div>
                </div>
                <div class="col-6 col-lg-3  mb-2 mb-lg-0 d-flex align-items-center box-promote border-right no-border">
                  <Icon name="material-symbols:swap-horizontal-circle-outline-rounded" size="43" style="color: var(--theme-default);" />
                  <div class="ms-2">
                    <span class="text-top d-block">30 {{ $t('day_return') }}</span>
                    <span class="text-bottom d-block">{{ $t('if_goods_have_problems') }}</span>
                  </div>
                </div>
                <div class="col-6 col-lg-3 d-flex align-items-center box-promote border-right">
                  <Icon name="material-symbols:lock-sharp" size="43" style="color: var(--theme-default);" />
                  <div class="ms-2">
                    <span class="text-top d-block">{{ $t('security_payment') }}</span>
                    <span class="text-bottom d-block">100% {{ $t('security_payment') }}</span>
                  </div>
                </div>
                <div class="col-6 col-lg-3 d-flex align-items-center box-promote">
                  <Icon name="material-symbols:support" size="43" style="color: var(--theme-default);" />
                  <div class="ms-2">
                    <span class="text-top d-block">24/7 {{ $t('support') }}</span>
                    <span class="text-bottom d-block">{{ $t('support') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="w-100 card p-3">
              <div class="head-product-today w-100 d-flex justify-content-between">
                <h5 class="fw-bold max-576-none">{{ $t('product_today') }}</h5>
                <h6 class="fw-bold min-576-none">{{ $t('product_today') }}</h6>
                <span>{{ $t('see_all') }}</span>
              </div>
              <div class="row mt-3">
                <div class="col-6 col-md-4 col-lg-3 col-xl-2 box-product-today box-product" v-for="(item, index) in 6" :key="index">
                  <figure>
                    <div class="img w-100 p-3">
                      <img width="80%" src="https://off.com.ph/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fscjohnsonana080-dart-production-40df%2Fmedia%2Fproject%2Fdart%2Foff%2Fphilippines%2Fhomepage%2Fcategory-images%2Foff_ph_4x3_720x540_category_card-overtime.png%3Fh%3D540%26iar%3D0%26w%3D720&w=3840&q=75" alt="">
                    </div>
                    <div class="txt mt-2 p-2">
                      <p class="d-block product-name">
                        Milk
                      </p>
                      <span class="d-flex align-items-center price">
                        <b class="fw-bold me-2">$30</b>
                        <del class="text-success me-2">$50</del>
                        <span style="color: var(--theme-default);"> 10%</span>
                      </span>
                      <span class="list-star d-flex">
                        <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                        <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                        <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                        <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                        <Icon name="material-symbols:star" size="20" />
                      </span>
                      <span class="d-flex justify-content-start mt-1">
                        <span class="btn text-light" style="background-color: dodgerblue;">{{ $t('buy_now') }}</span>
                      </span>
                    </div>
                  </figure>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="w-100 card p-3">
              <div class="head-product-today w-100 d-flex justify-content-between">
                <h5 class="fw-bold max-576-none">{{ $t('top_product') }}</h5>
                <h6 class="fw-bold min-576-none">{{ $t('top_product') }}</h6>
              </div>
              <div class="row mt-3">
                <div class="col-6 col-md-4 col-lg-3 col-xl-2 box-product-today box-product" v-for="(item, index) in 6" :key="index">
                  <figure>
                    <div class="img w-100 p-3">
                      <img width="80%" src="https://off.com.ph/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fscjohnsonana080-dart-production-40df%2Fmedia%2Fproject%2Fdart%2Foff%2Fphilippines%2Fhomepage%2Fcategory-images%2Foff_ph_4x3_720x540_category_card-overtime.png%3Fh%3D540%26iar%3D0%26w%3D720&w=3840&q=75" alt="">
                    </div>
                    <div class="txt mt-2 p-2">
                      <p class="d-block product-name">
                        Milk
                      </p>
                      <span class="d-flex align-items-center price">
                        <b class="fw-bold me-2">$30</b>
                        <del class="text-success me-2">$50</del>
                        <span style="color: var(--theme-default);"> 10%</span>
                      </span>
                      <span class="list-star d-flex">
                        <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                        <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                        <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                        <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                        <Icon name="material-symbols:star" size="20" />
                      </span>
                      <span class="d-flex justify-content-start mt-1">
                        <span class="btn text-light" style="background-color: dodgerblue;">{{ $t('buy_now') }}</span>
                      </span>
                    </div>
                  </figure>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="w-100 card p-3">
              <div class="head-product-today w-100 d-flex justify-content-between">
                <h5 class="fw-bold max-576-none">{{ $t('promotion') }}</h5>
                <h6 class="fw-bold min-576-none">{{ $t('promotion') }}</h6>
                <span>{{ $t('see_all') }}</span>
              </div>
              <div class="row mt-3">
                <div class="col-6 col-md-4 col-lg-3 col-xl-2 box-product-today box-product" v-for="(item, index) in 6" :key="index">
                  <figure>
                    <div class="img w-100 p-3">
                      <img width="80%" src="https://off.com.ph/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fscjohnsonana080-dart-production-40df%2Fmedia%2Fproject%2Fdart%2Foff%2Fphilippines%2Fhomepage%2Fcategory-images%2Foff_ph_4x3_720x540_category_card-overtime.png%3Fh%3D540%26iar%3D0%26w%3D720&w=3840&q=75" alt="">
                    </div>
                    <div class="txt mt-2 p-2">
                      <p class="d-block product-name">
                        Milk
                      </p>
                      <span class="d-flex align-items-center price">
                        <b class="fw-bold me-2">$30</b>
                        <del class="text-success me-2">$50</del>
                        <span style="color: var(--theme-default);"> 10%</span>
                      </span>
                      <span class="list-star d-flex">
                        <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                        <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                        <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                        <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                        <Icon name="material-symbols:star" size="20" />
                      </span>
                      <span class="d-flex justify-content-start mt-1">
                        <span class="btn text-light" style="background-color: dodgerblue;">{{ $t('buy_now') }}</span>
                      </span>
                    </div>
                  </figure>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 mt-1 mb-3">
            <h5 class="fw-bold max-576-none">{{ $t('all_category') }}</h5>
            <h6 class="fw-bold min-576-none">{{ $t('all_category') }}</h6>
          </div>
          <div class="col-12">
            <div class="row">
              <div class="col-12 col-lg-6" v-for="(item, index) in 4" :key="index">
                <div class="w-100 card p-3">
                  <div class="head-product-today w-100 d-flex justify-content-between">
                    <h5 class="fw-bold max-576-none">Watch</h5>
                    <h6 class="fw-bold min-576-none">Watch</h6>
                    <span>{{ $t('see_all') }}</span>
                  </div>
                  <div class="row mt-3">
                    <div class="col-6 col-lg-4 col-xl-3 box-product-today box-product" v-for="(item, index) in 4" :key="index">
                      <figure>
                        <div class="img w-100 p-3">
                          <img width="80%" src="https://off.com.ph/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fscjohnsonana080-dart-production-40df%2Fmedia%2Fproject%2Fdart%2Foff%2Fphilippines%2Fhomepage%2Fcategory-images%2Foff_ph_4x3_720x540_category_card-overtime.png%3Fh%3D540%26iar%3D0%26w%3D720&w=3840&q=75" alt="">
                        </div>
                        <div class="txt mt-2 p-2">
                          <p class="d-block product-name">
                            Milk
                          </p>
                          <span class="d-flex align-items-center price">
                            <b class="fw-bold me-2">$30</b>
                            <del class="text-success me-2">$50</del>
                            <span style="color: var(--theme-default);"> 10%</span>
                          </span>
                          <span class="list-star d-flex">
                            <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                            <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                            <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                            <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                            <Icon name="material-symbols:star" size="20" />
                          </span>
                          <span class="d-flex justify-content-start mt-1">
                            <span class="btn text-light" style="background-color: dodgerblue;">{{ $t('buy_now') }}</span>
                          </span>
                        </div>
                      </figure>
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
</template>
<script setup>
import slideshow from "~/components/home/slideshow";


// @fundtion block
onMounted(async () => {
  
});

useSeoMeta({
  title: "E-Free",
  ogTitle: "E-Free",
  ogImage: "/e-free-logo.png",
  twitterCard: "/e-free-logo.png",
  description: "ផលិតផលល្អ លឿន រហ័ស ទាន់ចិត្ត",
  ogDescription: "ផលិតផលល្អ លឿន រហ័ស ទាន់ចិត្ត",
});
</script>

<style>
figure{
  cursor: pointer;
  border-radius: 7px;
  overflow: hidden;
  border: solid 2px rgba(0, 0, 0, 0);
  transition: all 0.3s;
}
figure:hover{
  border: solid 2px var(--theme-default);
}
html.dark span{
  color: white ;
}
.row {
  margin: auto -9px;
}
.border-right{
  border-right: 2px solid var(--color-blue);
}
html.dark .border-right{
  border-right: 2px solid var(--theme-default);
}
.border-round{
  border: 2px solid var(--color-blue);
}
html.dark .border-round{
  border: 2px solid var(--theme-default);
}
.price b{
  color: var(--color-blue);
  font-size: 17px;
}
html.dark .price b{
  color: dodgerblue;
  font-size: 17px;
}
.border-round .text-top{
  font-weight: bold;
  font-size: 17px;
}
.border-round .text-bottom{
  font-size: 13.5px;
  color: rgb(41, 41, 41);
}
html.dark .border-round .text-bottom{
  color: white;
}
.head-product-today{
  border-bottom: 2px solid var(--color-blue);
  padding-bottom: 7px;
}
html.dark .head-product-today{
  border-bottom: 2px solid var(--theme-default);
}
.head-product-today span{
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s ease;
  color: rgb(41, 41, 41);
}
.head-product-today span:hover{
  color: var(--theme-default);
  text-decoration: underline;
}
html .dark .head-product-today span:hover{
  color: var(--theme-default);
  text-decoration: underline;
}
.box-product .img{
  background-color: #fb5d1f10;
  text-align: center;
}
html.dark .box-product .img{
  background-color: #2B2E33;
  text-align: center;
}
@media (max-width: 992px) {
  .no-border{
    border: none !important;
    border-right: none !important;
  }
}
@media (max-width: 991.98px) { 
  .border-round .text-top{
    font-weight: bold;
    font-size: 15px;
  }
  .border-round .text-bottom{
    font-size: 12.5px;
  }
  .border-round svg{
    width: 40px !important;
    height: 40px !important;
  }
}
@media (max-width: 767.98px) { 
  .border-round .text-top{
    font-weight: bold;
    font-size: 14px;
  }
  .border-round .text-bottom{
    font-size: 12px;
  }
  .border-round svg{
    width: 35px !important;
    height: 35px !important;
  }
}
@media (max-width: 575.98px) {
  .border-round .text-top{
    font-weight: bold;
    font-size: 13px;
  }
  .border-round .text-bottom{
    font-size: 10.5px;
  }
  .border-round svg{
    width: 30px !important;
    height: 30px !important;
  }
}






</style>
