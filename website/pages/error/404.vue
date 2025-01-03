<template>
  <div class="page-wrapper compact-wrapper box-404-bg-image" id="pageWrapper">
    <!-- error-403 start-->
    <div class="error-wrapper">
      <div class="box"></div>
      <div class="container">
        <div class="error-heading">
          <div class="col-md-7 offset-md-2 rounded-4 p-4 box-text-error-404 position-relative">
             <h2 class="headline position-absolute">
              <span>4</span>
              <img src="/images/zero-img.png" alt="">
              <span>4</span>
            </h2>
            <p class="sub-content">{{ $t("text_detail_error_404") }}</p>
            <div><router-link class="btn btn-primary btn-lg btn-back_home" to="/">{{ $t("back_to_home_page") }}</router-link></div>
          </div>
        </div>
        
      </div>
    </div>
    <!-- error-403 end-->
  </div>
</template>
<script>
definePageMeta({
  layout: "custom",
});

</script>
<style lang="scss" scoped>
  .box-404-bg-image{
    background-image: url('/images/img-footer-404.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    opacity: 1;
    // backdrop-filter: sepia(-10%);
  }
  .box-text-error-404{
    background-color: rgba(239, 244, 255, 0.85);
    padding-top: 80px !important;
  }
  html.dark .box-text-error-404{
    background-color: rgba(30, 30, 30, 0.85);
  }
  .box-text-error-404 .headline{
    top: -47%;
    left: 50%;
    transform: translate(-50%, 0);
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin-top: 0;
    gap: 20px;
  
  }
  .box-text-error-404 .headline span{
    font-size: 200px;
    color: rgba(90, 96, 106, 1);
    font-weight: normal;
  }
  html.dark .box-text-error-404 .headline span{
    color: rgba(255, 255, 255, 1);
  }
  html.dark .box-text-error-404 p{
    color: rgba(255, 255, 255, 1);
  }
  .box-404-bg-image .error-heading{
    margin-top: 0;
  }
  .headline img{
    width: 150px;
  }
  @media (max-width: 992px) {
    .box-text-error-404{
      padding-top: 70px !important;
    }
    .box-text-error-404 .headline{
      top: -40%;
    }
    .headline span{
      font-size: 140px !important;
    }
    .headline img{
      width: 80px;
    }
    .box-text-error-404 p{
      font-size: 14.5px !important;
    }
    .btn-back_home{
      font-size: 13.5px !important;
    }
    .img-player{
      bottom: 10px;
      height: 35% !important;
    }
    .player-6{
      left: 10px;
    }
    .player-10{
      right: 10px;
    }
  }

  @media (max-width: 768px) {
    .box-text-error-404{
      padding-top: 60px !important;
    }
    .box-text-error-404 .headline{
      top: -40%;
    }
    .headline span{
      font-size: 120px !important;
    }
    .headline img{
      width: 80px;
    }
    .box-text-error-404 p{
      font-size: 15px !important;
    }
    .btn-back_home{
      font-size: 13.5px !important;
    }
    .img-player{
      bottom: 10px;
      height: 20% !important;
    }
    .player-6{
      left: 10px;
    }
    .player-10{
      right: 10px;
    }
  }

  @media (max-width: 575.98px) {
    .box-text-error-404{
      padding-top: 50px !important;
    }
    .box-text-error-404 .headline{
      top: -35%;
    }
    .headline span{
      font-size: 90px !important;
    }
    .headline img{
      width: 70px;
    }
    .box-text-error-404 p{
      font-size: 12px !important;
    }
    .btn-back_home{
      font-size: 13px !important;
    }
    .img-player{
      bottom: 10px;
      height: 20% !important;
    }
    .player-6{
      left: 10px;
    }
    .player-10{
      right: 10px;
    }
  }
  
  
</style>