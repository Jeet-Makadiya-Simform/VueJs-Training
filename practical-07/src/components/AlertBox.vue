<template>
  <b-alert
    :variant="this.alertVariant"
    dismissible
    fade
    :show="this.showAlert === 'true'"
    @dismissed="showDismissibleAlert = false"
    dismiss-label="close"
  >
    {{ this.alertMessage }}
  </b-alert>
</template>
<script>
export default {
  name: "AlertBox",
  props: ["alertVariant", "showAlert", "alertMessage"],
  data() {
    return {};
  },
  methods: {},
};
</script>
