<template>
  <b-modal
    :title="title"
    :okTitle="buttonTitle"
    @ok.prevent="$emit('approve')"
    id="approve-modal"
  >
    <p>
      You're about to delete this user. If you're not sure, you can cancel this
      operation.
    </p>

    <template #modal-footer="{ ok, cancel }">
      <b-button size="sm" @click.prevent="cancel()"> Cancel </b-button>

      <b-button size="sm" variant="danger" @click.prevent="ok()">
        {{ buttonTitle }}
      </b-button>
    </template></b-modal
  >
</template>

<script>
export default {
  name: "AproveModal",
  props: {
    title: {
      type: String,
    },
    buttonTitle: {
      type: String,
    },
  },
};
</script>
