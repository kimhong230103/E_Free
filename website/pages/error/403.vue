<template>
  <div class="page-wrapper compact-wrapper" id="pageWrapper">
    <!-- error-403 start-->
    <div class="error-wrapper">
      <div class="container"><img class="img-100" src="../../assets/logo.png" alt="">
        <div class="error-heading">
          <h2 class="headline font-success">403</h2>
        </div>
        <div class="col-md-8 offset-md-2">
          <p class="sub-content">{{ $t("text_detail_error_403") }}</p>
        </div>
        <div><router-link class="btn btn-success-gradien btn-lg" to="/">{{ $t("back_to_home_page") }}</router-link></div>
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