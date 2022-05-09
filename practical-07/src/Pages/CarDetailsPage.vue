<template>
  <section>
    <div class="m-auto mt-5 w-75">
      <AlertBox
        v-if="this.isLoading === false && this.errorMsg !== ''"
        showAlert="true"
        alertVariant="danger"
        :alertMessage="this.errorMsg"
      />
    </div>
    <div class="d-flex justify-content-center mt-5">
      <div v-if="this.isLoading === true">Loading...</div>
      <b-card
        v-if="this.errorMsg === ''"
        no-body
        class="overflow-hidden"
        style="max-width: 1040px"
      >
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img
              :src="this.carData.image"
              alt="Image"
              class="rounded-0"
            ></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body :title="this.carData.name">
              <b-card-text>
                {{ this.carData.details }}
              </b-card-text>
              <b-card-text>
                {{ this.carData.price }}
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>
    <div class="d-flex justify-content-center mt-5">
      <b-button
        href="#"
        variant="primary"
        class="me-3"
        @click.prevent="editCar"
      >
        Edit
      </b-button>
      <b-button
        href="#"
        variant="primary"
        class="me-3"
        @click.prevent="deleteCar()"
      >
        Delete
      </b-button>
      <router-link :to="{ name: 'home' }" class="btn btn-primary">
        Back To Home Page
      </router-link>
    </div>
    <FormModal :formData="this.selectedCarData" />
  </section>
</template>
<script>
import AlertBox from "../components/AlertBox.vue";
import FormModal from "../components/FormModal.vue";
export default {
  name: "CarDetailsPage",
  components: { AlertBox, FormModal },
  data() {
    return {};
  },
  computed: {
    carData() {
      return this.$store.getters["cars/getCarData"];
    },
    selectedCarData() {
      return this.$store.getters["cars/getSelectedCarData"];
    },
    isLoading() {
      return this.$store.getters["cars/getIsLoading"];
    },
    errorMsg() {
      return this.$store.getters["cars/getErrorMsg"];
    },
  },
  methods: {
    async editCar() {
      let selectedData = {
        carId: this.carData.id,
        carName: this.carData.name,
        carDetails: this.carData.details,
        carPrice: this.carData.price,
        carImgURL: this.carData.image,
      };
      await this.$store.commit("cars/setSelectedCarData", selectedData);
      this.$bvModal.show("modal-prevent-closing");
    },
    async deleteCar() {
      console.log(this.carData);
      let res = await this.$store.dispatch("cars/deleteCar", this.carData);
      if (res !== "error") {
        this.$router.push({ name: "home" });
        this.$store.dispatch("cars/getCarsData");
      }
    },
  },
  created() {
    const id = this.$route.params.carId;
    this.$store.dispatch("cars/getCarData", id);
  },
};
</script>
