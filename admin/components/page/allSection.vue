<template>
    <div class="col-sm-12">
        <ul class="nav nav-tabs border-tab nav-primary mb-0" id="top-tab" role="tablist">
            <li class="nav-item" @click="setHomeTab">
                <a class="nav-link active" id="top-home-tab" data-bs-toggle="tab" href="#top-home"
                    role="tab" aria-controls="top-home" aria-selected="false">{{ $t("home") }} 
                </a>
                <div class="material-border"></div>
            </li>
            <li class="nav-item" @click="setCharityTab">
                <a class="nav-link" id="profile-top-tab" data-bs-toggle="tab" href="#top-profile"
                    role="tab" aria-controls="top-profile" aria-selected="false">{{ $t("charity") }}
                </a>
                <div class="material-border"></div>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="profile-top-tab" data-bs-toggle="tab" href="#top-service"
                    role="tab" aria-controls="top-profile" aria-selected="false">{{ $t("service") }}
                </a>
                <div class="material-border"></div>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="profile-top-tab" data-bs-toggle="tab" href="#top-gallery"
                    role="tab" aria-controls="top-profile" aria-selected="false">{{ $t("gallery") }}
                </a>
                <div class="material-border"></div>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="profile-top-tab" data-bs-toggle="tab" href="#top-team"
                    role="tab" aria-controls="top-profile" aria-selected="false">{{ $t("team") }}
                </a>
                <div class="material-border"></div>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="profile-top-tab" data-bs-toggle="tab" href="#top-portfolio"
                    role="tab" aria-controls="top-profile" aria-selected="false">{{ $t("portfolio") }}
                </a>
                <div class="material-border"></div>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="profile-top-tab" data-bs-toggle="tab" href="#top-blog"
                    role="tab" aria-controls="top-profile" aria-selected="false">{{ $t("blog") }}
                </a>
                <div class="material-border"></div>
            </li>
            <li class="nav-item" @click="setProcessTab">
                <a class="nav-link" id="profile-top-tab" data-bs-toggle="tab" href="#top-process"
                    role="tab" aria-controls="top-profile" aria-selected="false">{{ $t("process") }}
                </a>
                <div class="material-border"></div>
            </li>
            <li class="nav-item" @click="setAboutUsTab">
                <a class="nav-link" id="profile-top-tab" data-bs-toggle="tab" href="#top-aboutUs"
                    role="tab" aria-controls="top-profile" aria-selected="false">{{ $t("about_us") }}
                </a>
                <div class="material-border"></div>
            </li>
        </ul>
        <div class="tab-content mt-3" id="top-tabContent">
            <div class="tab-pane fade active show"  id="top-home" role="tabpanel" aria-labelledby="top-home-tab">
                <div v-if="isHome">
                    <Home  />
                </div>
            </div>
            <div class="tab-pane fade" id="top-profile" role="tabpanel" aria-labelledby="profile-top-tab">
                <div v-if="isCharity">
                    <charity />
                </div>
            </div>
            <div class="tab-pane fade" id="top-service" role="tabpanel" aria-labelledby="profile-top-tab">
                <div>
                    <service />
                </div>
            </div>
            <div class="tab-pane fade" id="top-gallery" role="tabpanel" aria-labelledby="profile-top-tab">
                <div>
                    <gallery />
                </div>
            </div>
            <div class="tab-pane fade" id="top-team" role="tabpanel" aria-labelledby="profile-top-tab">
                <div>
                    <team />
                </div>
            </div>
            <div class="tab-pane fade" id="top-portfolio" role="tabpanel" aria-labelledby="profile-top-tab">
                <div>
                    <portfolio />
                </div>
            </div>
            <div class="tab-pane fade" id="top-blog" role="tabpanel" aria-labelledby="profile-top-tab">
                <div>
                    <blog />
                </div>
            </div>
            <div class="tab-pane fade" id="top-process" role="tabpanel" aria-labelledby="profile-top-tab">
                <div v-if="isProcess">
                    <process />
                </div>
            </div>
            <div class="tab-pane fade" id="top-aboutUs" role="tabpanel" aria-labelledby="profile-top-tab">
                <div v-if="isAboutUs">
                    <aboutUs />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import Home from '../section/home.vue';
    import charity from '../section/charity.vue';
    import service from '../section/service.vue';
    import gallery from '../section/gallery.vue';
    import team from '../section/team.vue';
    import portfolio from '../section/portfolio.vue';
    import blog from '../section/blog.vue';
    import process from '../section/process.vue';
    import aboutUs from '../section/aboutUs.vue';
    const isHome = ref(true);
    const isCharity = ref(false);
    const isProcess = ref(false);
    const isAboutUs = ref(false);
    const setHomeTab = () => {
        isHome.value = true;
        isCharity.value = false;
        isProcess.value = false;
        isAboutUs.value = false;
    }
    const setCharityTab = () => {
        isHome.value = false;
        isCharity.value = true;
        isProcess.value = false;
        isAboutUs.value = false;
    }
    const setProcessTab = () => {
        isHome.value = false;
        isCharity.value = false;
        isProcess.value = true;
        isAboutUs.value = false;
    }
    const setAboutUsTab = () => {
        isHome.value = false;
        isCharity.value = false;
        isProcess.value = false;
        isAboutUs.value = true;
    }

</script>