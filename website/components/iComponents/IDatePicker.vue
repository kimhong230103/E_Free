<template>
  <DatePicker
    v-model="value"
    :range="range"
    :multi-calendars="multiCalendars"
    :placeholder="$t('date')"
    :preset-dates=" range ? presetDates : []"
    :format="formatDate"
  >
    <template #preset-date-range-button="{ label, value, presetDate }">
      <span
        role="button"
        :tabindex="0"
        @click="presetDate(value)"
        @keyup.enter.prevent="presetDate(value)"
        @keyup.space.prevent="presetDate(value)"
      >
        {{ label }}
      </span>
    </template>
    <template #input-icon>
      <Icon
        class="d-none date-icon"
        name="material-symbols:calendar-month"
        size="22"
      ></Icon>
      <Icon
        v-if="props.modelValue == 'Invalid date'"
        class="icon-date-add-when-clear max-576-none"
        name="material-symbols:calendar-month"
        size="22"
      ></Icon>
    </template>
  </DatePicker>
</template>
<script setup>
import moment from "moment";
const { $i18n } = useNuxtApp();
const props = defineProps({
  modelValue: {
    default: [],
  },
  range: {
    type: Boolean,
    default: true,
  },
  multiCalendars: {
    type: Boolean,
    default: true,
  },
  format: {
    type: String,
    default: "DD-MM-YYYY",
  },
  dateOnly: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue", "dateChange"]);
// const dateFilter = ref();
const presetDates = ref([
  {
    label: $i18n.t("today"),
    value: [moment().startOf("day").toDate(), moment().endOf("day").toDate()],
  },
  {
    label: $i18n.t("yesterday"),
    value: [
      moment().startOf("day").subtract(1, "day").toDate(),
      moment().endOf("day").subtract(1, "day").toDate(),
    ],
  },
  {
    label: $i18n.t("this_week"),
    value: [moment().startOf("week").toDate(), moment().endOf("week").toDate()],
  },
  {
    label: $i18n.t("last_week"),
    value: [
      moment().subtract(1, "week").startOf("week").toDate(),
      moment().subtract(1, "week").endOf("week").toDate(),
    ],
  },
  {
    label: $i18n.t("this_month"),
    value: [
      moment().startOf("month").toDate(),
      moment().endOf("month").toDate(),
    ],
  },
  {
    label: $i18n.t("last_month"),
    value: [
      moment().subtract(1, "month").startOf("month").toDate(),
      moment().subtract(1, "month").endOf("month").toDate(),
    ],
  },
  {
    label: $i18n.t("this_year"),
    value: [moment().startOf("year").toDate(), moment().endOf("year").toDate()],
  },
  {
    label: $i18n.t("last_year"),
    value: [
      moment().subtract(1, "year").startOf("year").toDate(),
      moment().subtract(1, "year").endOf("year").toDate(),
    ],
  },
]);
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    if (props.range && value) {
      emit("dateChange", [
        moment(value[0]).format("YYYY-MM-DD HH:mm:ss"),
        moment(value[1]).format("YYYY-MM-DD HH:mm:ss"),
      ]);
      emit("update:modelValue", [
        moment(value[0]).format("YYYY-MM-DD HH:mm:ss"),
        moment(value[1]).format("YYYY-MM-DD HH:mm:ss"),
      ]);
    } else {
      emit("dateChange", moment(value).format("YYYY-MM-DD HH:mm:ss"));
      emit("update:modelValue", moment(value).format("YYYY-MM-DD HH:mm:ss"));
    }
  },
});

const formatDate = (date) => {
  if (props.range && date) {
    return (
      moment(date[0]).startOf("day").format(props.format) +
      " ~ " +
      moment(date[1]).endOf("day").format(props.format)
    );
  } else {
    return moment(date).format(props.format);
  }
};
</script>
