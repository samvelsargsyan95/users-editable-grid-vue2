<template>
  <b-card
    :img-src="avatar !== undefined ? avatar : ''"
    :title="title"
    :img-alt="title"
    img-top
    tag="article"
    style="max-width: 28rem"
    class="mb-2 p-3"
  >
    <slot />
  </b-card>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    avatar: {
      type: String,
      default: () => null,
    },

    title: {
      type: String,
      default: () => "",
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .card-body {
    padding: 1rem 0 0 0;
  }
}
</style>
