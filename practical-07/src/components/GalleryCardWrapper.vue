<template>
  <section>
    <b-container>
      <div class="mt-5">
        <AlertBox
          v-if="this.isLoading === false && this.errorMsg !== ''"
          showAlert="true"
          alertVariant="danger"
          :alertMessage="this.errorMsg"
        />
        <AlertBox
          v-else-if="this.isLoading === false && this.successMsg !== ''"
          showAlert="true"
          alertVariant="success"
          :alertMessage="this.successMsg"
        />
      </div>
      <b-row class="pt-3 justify-content-md-center">
        <b-col cols="3" v-if="this.isLoading === true">Loading...</b-col>
        <b-col
          cols="3"
          class="d-flex align-items-stretch ms-2 me-2"
          v-for="data in this.carsData"
          :key="data.id"
          v-else
        >
          <GalleryCard
            :cardId="data.id"
            :cardTitle="data.title"
            :cardImage="data.image"
            :cardDescription="data.description"
            :price="data.price"
            @showCarDetails="showCarDetails"
            @editCard="editCard(data)"
            @deleteCard="deleteCard(data)"
          />
        </b-col>
      </b-row>
    </b-container>
    <FormModal :formData="this.selectedCarData" />
  </section>
</template>
<script>
import GalleryCard from "./GalleryCard.vue";
import AlertBox from "./AlertBox.vue";
import FormModal from "./FormModal.vue";

export default {
  name: "GalleryCardWrapper",
  components: {
    GalleryCard,
    FormModal,
    AlertBox,
  },
  data() {
    return {};
  },
  computed: {
    carsData() {
      return this.$store.getters["cars/getCarsData"];
    },
    selectedCarData() {
      return this.$store.getters["cars/getSelectedCarData"];
    },
    isLoading() {
      return this.$store.getters["cars/getIsLoading"];
    },
    successMsg() {
      return this.$store.getters["cars/getSuccessMsg"];
    },
    errorMsg() {
      return this.$store.getters["cars/getErrorMsg"];
    },
  },
  methods: {
    // func. to show car price in alert box
    showCarDetails(id) {
      this.$router.push({
        name: "carDetails",
        params: { carId: id },
      });
    },
    // func. to Edit Card
    editCard(data) {
      let selectedCarData = {
        carId: data.id,
        carName: data.title,
        carDetails: data.description,
        carPrice: data.price,
        carImgURL: data.image,
      };
      this.$store.commit("cars/setSelectedCarData", selectedCarData);
      this.$bvModal.show("modal-prevent-closing");
    },
    // Func. to Delete Card
    async deleteCard(data) {
      await this.$store.dispatch("cars/deleteCar", data);
      alert("Deleted : " + data.title);
      await this.$store.dispatch("cars/getCarsData");
    },
  },
  mounted() {
    this.$store.dispatch("cars/getCarsData");
  },
};
</script>
<style></style>
