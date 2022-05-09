<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <b-form @submit.prevent="handleSubmit(onSubmit)">
      <ValidationProvider
        rules="required|alpha_spaces"
        name="carName"
        v-slot="{ errors, valid }"
      >
        <b-form-group label="Car Name" class="mb-2">
          <b-form-input
            type="text"
            v-model="car.carName"
            :state="errors[0] ? false : valid ? true : null"
            placeholder="Enter car name"
          >
          </b-form-input>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <ValidationProvider
        rules="required|min:30|max:120"
        name="carDetails"
        v-slot="{ errors, valid }"
      >
        <b-form-group label="Car Details" class="mb-2">
          <b-form-textarea
            v-model="car.carDetails"
            placeholder="Enter Car Details"
            :state="errors[0] ? false : valid ? true : null"
          >
          </b-form-textarea>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <ValidationProvider
        rules="integer"
        name="carPrice"
        v-slot="{ errors, valid }"
      >
        <b-form-group label="Car Price" class="mb-2">
          <b-form-input
            type="text"
            v-model="car.carPrice"
            :state="errors[0] ? false : valid ? true : null"
            placeholder="Enter car price"
          >
          </b-form-input>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider
        :rules="{
          required: true,
          regex:
            /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
        }"
        name="carImgURL"
        v-slot="{ errors, valid }"
      >
        <b-form-group label="Car Image URL" class="mb-4">
          <b-form-input
            type="text"
            v-model="car.carImgURL"
            :state="errors[0] ? false : valid ? true : null"
            placeholder="Enter car image URL"
          >
          </b-form-input>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <b-button
        block
        type="submit"
        variant="primary"
        :class="{ shake: disabledSubmitBtn }"
      >
        Submit
      </b-button>
    </b-form>
  </ValidationObserver>
</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  name: "CarForm",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  props: ["modalId", "formData"],
  data() {
    return {
      car: {
        carId: this.$store.state.cars.selectedCarData.carId || "",
        carName: this.$store.state.cars.selectedCarData.carName || "",
        carDetails: this.$store.state.cars.selectedCarData.carDetails || "",
        carPrice: this.$store.state.cars.selectedCarData.carPrice || "",
        carImgURL: this.$store.state.cars.selectedCarData.carImgURL || "",
      },
      formModalId: this.modalId,
      disabledSubmitBtn: false,
    };
  },
  methods: {
    async onSubmit() {
      // this.$refs.observer.validate().then((success) => {
      //   console.log("outer");
      //   if (!success) {
      //     console.log("error");
      //     return;
      //   }
      // });
      if (this.car.carId !== "") {
        // if for Edit Card
        await this.$store.dispatch("cars/updateCarData", this.car);
        await this.$store.dispatch("cars/getCarsData");
        let selectedCarData = {
          carId: "",
          carName: "",
          carDetails: "",
          carPrice: "",
          carImgURL: "",
        };
        this.$store.commit("cars/setSelectedCarData", selectedCarData);
      } else {
        // else for Add New Card
        await this.$store.dispatch("cars/addNewCar", this.car);
        await this.$store.dispatch("cars/getCarsData");
      }
      this.$bvModal.hide(this.formModalId);
    },
    animateBtn() {
      this.disabledSubmitBtn = true;
      setTimeout(() => {
        this.disabledSubmitBtn = false;
      }, 1500);
    },
  },
};
</script>
<style>
form {
  max-width: 500px;
  margin: 0 auto;
  text-align: left;
}
.form-group > label {
  font-weight: 600;
}
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
