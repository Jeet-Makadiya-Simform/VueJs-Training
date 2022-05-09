<template>
  <div v-if="true">
    <b-modal
      id="modal-prevent-closing"
      ref="formModalRef"
      title="Add Car Details"
      @shown="shownModal"
      @hide="onHide"
      hide-footer
      no-fade
    >
      <CarForm
        modalId="modal-prevent-closing"
        :formData="$props"
        v-on="$listeners"
      />
    </b-modal>
  </div>
</template>

<script>
import CarForm from "./CarForm.vue";
export default {
  data() {
    return {
      name: "FormModal",
    };
  },
  props: ["formData"],
  components: { CarForm },
  methods: {
    onHide() {
      let selectedCarData = {
        carId: "",
        carName: "",
        carDetails: "",
        carPrice: "",
        carImgURL: "",
      };
      this.$store.commit("cars/setSelectedCarData", selectedCarData);
    },
    shownModal() {
      let modal = document.getElementById("modal-prevent-closing");
      modal.classList.remove("hidden");
      modal.classList.add("slideInDown");
      modal.classList.add("animated");
    },
  },
};
</script>
<style>
@import "animate.css";
.hidden {
  display: none !important;
}
</style>
