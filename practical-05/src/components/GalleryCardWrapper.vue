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
          v-for="data in cardData"
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
    <FormModal
      :formData="selectedCardData"
      @submittedFormData="handleSubmittedFormData"
    />
  </section>
</template>
<script>
import GalleryCard from "./GalleryCard.vue";
import AlertBox from "./AlertBox.vue";
import FormModal from "./FormModal.vue";
import Axios from "axios";

export default {
  name: "GalleryCardWrapper",
  components: {
    GalleryCard,
    FormModal,
    AlertBox,
  },
  data() {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
      cardData: [],
      selectedCardData: {
        carId: "",
        carName: "",
        carDetails: "",
        carPrice: "",
        carImgURL: "",
      },
      isLoading: false,
      successMsg: "",
      errorMsg: "",
    };
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
      this.selectedCardData = {
        carId: data.id,
        carName: data.title,
        carDetails: data.description,
        carPrice: data.price,
        carImgURL: data.image,
      };
      this.$bvModal.show("modal-prevent-closing");
    },
    // Func. to Delete Card
    async deleteCard(data) {
      await this.deleteCarData(data);
      alert("Deleted : " + data.title);
      // this.showAlert();
      await this.getCarData();
    },
    // Func. to handle submitted form data
    // Here If condition is for Edit Card and Else condition is for Add new card
    async handleSubmittedFormData(data) {
      if (data.carId !== "") {
        // if for Edit Card
        await this.updateCarData(data);
        await this.getCarData();
        this.selectedCardData = {
          carId: "",
          carName: "",
          carDetails: "",
          carPrice: "",
          carImgURL: "",
        };
      } else {
        // else for Add New Card
        await this.addCarData(data);
        await this.getCarData();
      }
    },
    // Func. to get card data from API.
    async getCarData() {
      this.isLoading = true;
      await Axios.get("https://testapi.io/api/dartya/resource/cardata")
        .then((res) => {
          this.isLoading = false;
          this.formatCarData(res.data.data);
        })
        .catch((err) => {
          this.isLoading = false;
          this.errorMsg = err;
        });
    },
    formatCarData(data) {
      this.cardData = data.map((item) => {
        return {
          id: item.id,
          title: item.name,
          image: item.image,
          description: item.details,
          price: item.price,
        };
      });
    },
    // Func. to ADD card data to API.
    async addCarData(data) {
      this.isLoading = true;
      await Axios.post("https://testapi.io/api/dartya/resource/cardata", {
        name: data.carName,
        details: data.carDetails,
        image: data.carImgURL,
        price: data.carPrice,
      })
        .then(() => {
          this.isLoading = false;
          this.successMsg = "Car data added successfully!";
        })
        .catch(() => {
          this.isLoading = false;
          this.errorMsg = "Car data not added!";
        });
    },
    // Func. to Update specific data in API
    async updateCarData(data) {
      this.isLoading = true;

      await Axios.put(
        `https://testapi.io/api/dartya/resource/cardata/${data.carId}`,
        {
          name: data.carName,
          details: data.carDetails,
          image: data.carImgURL,
          price: data.carPrice,
        }
      )
        .then(() => {
          this.isLoading = false;
          this.successMsg = "Car data updated successfully!";
        })
        .catch(() => {
          this.isLoading = false;
          this.errorMsg = "Car data not updated!";
        });
    },
    // Func. to delete specific data in API
    async deleteCarData(data) {
      this.isLoading = true;
      await Axios.delete(
        `https://testapi.io/api/dartya/resource/cardata/${data.id}`
      )
        .then(() => {
          this.isLoading = false;
          this.successMsg = "Successfully Deleted!";
        })
        .catch(() => {
          this.isLoading = false;
          this.errorMsg = "Car is not deleted!";
        });
    },
  },
  mounted() {
    this.getCarData();
  },
};
</script>
<style></style>
