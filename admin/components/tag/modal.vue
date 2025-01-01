<template>
  <div class="modal fade" tabindex="-1" id="tagModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ $t(props.actionType) }} {{ $t("tag") }}
          </h5>
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <div
                class="form-group mt-2"
                v-for="(item, index) in languageList"
                :key="index"
              >
                <label class="required" :for="`name-${item.code}`">{{
                  `${$t("name")} (${item.code.toUpperCase()})`
                }}</label>
                <input
                  v-model="form.temp_name[index].department"
                  type="text"
                  class="form-control"
                  :id="`name-${item.code}`"
                  :placeholder="`${$t('name')} (${item.code.toUpperCase()})`"
                  :class="{
                    'is-invalid': v$.temp_name[index].department.$error,
                  }"
                  @change="v$.temp_name[index].department.$touch"
                  required
                  autocomplete="off"
                />
                <span
                  class="invalid-feedback"
                  v-if="v$.temp_name[index].department.$error"
                >
                  {{
                    $t("name") +
                    " (" +
                    item.code.toUpperCase() +
                    ") " +
                    $t(v$.temp_name[index].department.$errors[0].$message)
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            {{ $t("cancel") }}
          </button>
          <button type="button" class="btn btn-primary" @click="save">
            {{ actionLabel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { appConst } from "~/constants/app";
import { useLanguageStore } from "~/store/language";
import { required, maxLength } from "@vuelidate/validators";
import { KDACTagAPI } from "~/constants/api";
import { useDepartmentStore } from "~/store/department";

const languageList = useLanguageStore().lists;
const props = defineProps({
  actionType: {
    type: String,
    default: appConst.formAction.add,
  },
});
const useDepartment = useDepartmentStore()
const isUpdate = ref(false);
const emit = defineEmits(["closeModal"]);
const form = reactive({
  id: null,
  temp_name: [],
});

const defaultForm = reactive({
  id: null,
  temp_name: [],
});
const setDefaultForm = () => {
  form.temp_name = defaultForm.temp_name.map((item) => ({ ...item }));
};

watch(
  () => languageList,
  (newList) => {
    defaultForm.temp_name = newList.map((lang) => ({
      language_id: lang.id,
      language_code: lang.code,
      department: null,
    }));
    setDefaultForm();
  },
  { immediate: true }
);

const rules = computed(() => {
  return {
    temp_name: languageList.map(() => ({
      department: {
        required,
        $autoDirty: true,
      },
    })),
  };
});
const v$ = vuelidate(rules, form);

const { $i18n } = useNuxtApp();
const actionLabel = computed(() => {
  if (props.actionType === appConst.formAction.add) {
    return $i18n.t("save");
  } else if (props.actionType === appConst.formAction.update) {
    return $i18n.t("edit");
  }
});

const state = reactive({
  modal: null,
});

onMounted(() => {
  const bootstrap = useNuxtApp().$bootstrap;
  state.modal = new bootstrap.Modal("#tagModal");
});

const save = async () => {
  const isValid = await v$.value.$validate();

  if (!isValid) {
    return iAlert().invalidInput();
  }

  const nameMap = form.temp_name.reduce((acc, item) => {
    acc[item.language_code] = item.department;
    return acc;
  }, {});
  const input = {
    name: JSON.stringify(nameMap),
    id: form.id,
  };
  let url =
    props.actionType == appConst.formAction.add
      ? KDACTagAPI.store
      : KDACTagAPI.update;

  await ifetch(url, input).then((res) => {
    iAlert().success();
    isUpdate.value = true;
    closeModal();
  });
};

const showModal = async (rowId = null) => {
  if (rowId) {
    const parsedName = JSON.parse(rowId.name);

    form.temp_name = defaultForm.temp_name.map((defaultItem) => ({
      ...defaultItem,
      department: parsedName[defaultItem.language_code] || null,
    }));
    form.id = rowId.id;
  }

  await state.modal.show();
};

const closeModal = () => {
  emit("closeModal", isUpdate.value);
  state.modal.hide();
};

defineExpose({
  showModal,
});
</script>

<style lang="scss" scoped></style>
