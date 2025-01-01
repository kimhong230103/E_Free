<template>
  <li class="onhover-dropdown">
    <div class="translate_wrapper">
      <div class="current_lang">
        <div class="lang" @click="display()">
          <i class="flag-icon" :class="langIcon"></i
          ><span class="lang-txt">{{ langLangauge }}</span>
        </div>
      </div>
    </div>
    <div
      class="onhover-show-div lang-dropdown active"
      :class="{ active: notification }"
    >
      <ul>
        <li class="lang" v-for="locale in availableLocales" :key="locale.code">
          <nuxt-link :to="switchLocalePath(locale.code)" style="width: 100%">
            <i class="flag-icon" :class="locale.icon"></i>
            <span class="lang-txt" @click="changeLocale(locale)"
              >{{ locale.name }}
            </span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </li>
  <!-- <div class="translate_wrapper onhover-dropdown" :class="{ active: isActive }">
    <div class="current_lang">
      <div class="lang" @click="display()">
        <i class="flag-icon" :class="langIcon"></i
        ><span class="lang-txt">{{ langLangauge }}</span>
      </div>
    </div>

    <div class="more_lang" :class="{ active: isActive }">
      <div class="lang" v-for="locale in availableLocales" :key="locale.code">
        <nuxt-link :to="switchLocalePath(locale.code)" style="width: 100%">
          <i class="flag-icon" :class="locale.icon"></i>
          <span class="lang-txt" @click="changeLocale(locale)"
            >{{ locale.name }}
          </span>
        </nuxt-link>
      </div>
    </div>
  </div> -->
</template>
<script>
  import { useLanguageStore } from "~~/store/language";
  export default {
    name: "languagePage",
    data() {
      return {
        isActive: false,
      };
    },
    methods: {
      display() {
        this.isActive = !this.isActive;
      },

      changeLocale(locale) {
        useLanguageStore().changeLang(locale);

        for (const obj of this.locales) {
          document.body.classList.remove("lang-" + obj.code);
        }
        document.body.classList.add("lang-" + locale.code);
        this.$i18n.locale = locale;
      },
      getCurrentLocale() {
        const { locale, locales } = useI18n();
        const currentLocale = locales.value.find(
          (l) => l.code === locale.value
        );
        return currentLocale;
      },
    },
    computed: {
      langIcon() {
        return this.getCurrentLocale().icon;
      },
      langLangauge() {
        return this.getCurrentLocale().code;
      },
    },
    mounted() {
      useLanguageStore().changeLang({
        code: localStorage.getItem("currentLanguage") || "EN",
        icon: localStorage.getItem("currentLanguageIcon") || "flag-icon-us",
      });
    },
    setup() {
      const { locale, locales } = useI18n();
      const switchLocalePath = useSwitchLocalePath();
      const availableLocales = computed(() => {
        return locales.value.filter((i) => i.code !== locale.value);
      });

      return {
        switchLocalePath,
        availableLocales,
        locales,
      };
    },
  };
</script>
