<template>
  <b-card
    :title="cardTitle"
    tag="article"
    style="max-width: 20rem"
    class="mb-2"
  >
    <b-card-img :src="cardImage" alt="Image" height="150" bottom></b-card-img>
    <b-card-text class="mb-5">
      {{ cardDescription }}
    </b-card-text>
    <template #footer>
      <b-row>
        <b-col cols="12">
          <b-button
            href="#"
            variant="primary"
            @click="$emit('showCarDetails', cardId)"
            class="mb-2 w-100"
            v-if="price !== null"
          >
            Info
          </b-button>

          <!-- available soon Button -->
          <b-button
            href="#"
            variant="primary"
            class="mb-2"
            style="width: 100%"
            disabled
            v-else
          >
            available soon...
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <!-- Edit Button -->
          <b-button
            href="#"
            variant="primary"
            class="w-100"
            v-b-modal="'modal-prevent-closing-' + cardId"
            @click="$emit('editCard')"
          >
            Edit
          </b-button></b-col
        >
        <b-col cols="6">
          <!-- Delete Button -->
          <b-button
            href="#"
            variant="primary"
            class="w-100"
            v-b-modal="'modal-prevent-closing-' + cardId"
            @click="$emit('deleteCard')"
          >
            Delete
          </b-button>
        </b-col>
      </b-row>
    </template>
  </b-card>
</template>

<script>
export default {
  name: "GalleryCard",
  components: {},
  props: ["cardId", "cardTitle", "cardImage", "cardDescription", "price"],
};
</script>
<style></style>
