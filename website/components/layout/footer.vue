<template>
  <div>
    <div class="footer-container">
      <div class="w-100 row d-flex justify-content-around">
        <div class="col-12 col-lg-10">
          <div class="row text-ccc py-3">
            <div class="col-12 col-md-6 col-xl-3">
              <img height="70px" class="mb-2" src="/e-free-logo.png" alt="">
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere libero, voluptas ipsum in dolorum qui itaque et iure dolor ex eaque illum debitis unde harum, sit nulla, excepturi doloremque eveniet?</p>
            </div>
            <div class="col-12 col-md-6 col-xl-3">
              <h5 class="mb-2">{{ $t("contact_us") }}</h5>
              <p>
                <Icon name="material-symbols:call" /> +855 123456789
              </p>
              <p>
                <Icon name="material-symbols:call" /> +855 987654321
              </p>
              <p>
                <Icon name="material-symbols:call" /> +855 168168168
              </p>
              <p>
                <Icon name="tabler:brand-telegram" /> @Him_Kimhong
              </p>
            </div>
            <div class="col-12 col-md-6 col-xl-3">
              <h5 class="mb-3">{{ $t("follow_us") }}</h5>
              <p>
                <a href="https://web.facebook.com/kimhong.him.31" class="text-inherit" target="_blank">
                  <Icon name="ic:outline-facebook" size="25" class="me-2" />
                </a>
                <a href="https://web.facebook.com/kimhong.him.31" class="text-inherit" target="_blank">
                  <Icon name="line-md:instagram" size="25" class="me-2" />
                </a>
                <a href="https://web.facebook.com/kimhong.him.31" class="text-inherit" target="_blank">
                  <Icon name="ic:outline-telegram" size="25" class="me-2" />
                </a>
                <a href="https://web.facebook.com/kimhong.him.31" class="text-inherit" target="_blank">
                  <Icon name="ant-design:tik-tok-outlined" size="25"  class="me-2" />
                </a>
              </p>

              <h5 class="mb-2 mt-2">{{ $t("about_us") }}</h5>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas iste suscipit vero architecto asperiores repellat delectus incidunt accusantium dignissimos odio. Omnis fugit quia, nobis ea necessitatibus quod exercitationem excepturi sed.</p>
            </div>
            <div class="col-12 col-md-6 col-xl-3">
              <h5 class="mb-2">{{ $t("shop_location") }}</h5>
              <p>
                <Icon name="material-symbols:home-pin" size="25" class="me-2" />
                Address: #153, Street 143, Sangkat Boeung Keng Kang 3, Khan Boeung Keng Kang, Phnom Penh 
                <a class="text-underline" href="https://maps.app.goo.gl/o1P7hWA81tuPkMyf7">https://maps.app.goo.gl/o1P7hWA81tuPkMyf7</a>
              </p>
            </div>
          </div>
          <div
          class="d-flex gap-2 flex-column py-4 justify-content-center align-items-center"
          >
            <p class="copy-right">
              Copyright© {{ new Date().getFullYear() }} រក្សាសិទ្ធគ្រប់យ៉ាងដោយ​ E-Free
            </p>
          </div>
        </div>
      </div>
        
    </div>
  </div>
</template>
<script setup>
</script>

<style scoped>
h5{
  color: #cccccc;
}
p{
  color: #cccccc;
}
p svg{
  color: var(--theme-default);
}
.footer-container {
  position: relative;
  z-index: 2;
  background: #0D394F;
  padding: 12px 0;
}
.footer-container ul {
  display: flex;
  color: white;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 14px;
}
.footer-container ul li{
  cursor: pointer;
}

@media (max-width: 685px) {
  .footer-container {
    background: #202938;
    height: auto;
  }
}

.copy-right {
  color: gray;
  font-size: 12px;
}
</style>

