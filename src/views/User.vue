<template>
  <div class="d-flex">
    <div class="d-flex justify-content-start w-max-content">
      <router-link :to="{ name: 'users' }">
        <b-img :src="require('@/assets/images/back.png')" :width="40" />
      </router-link>
    </div>

    <b-container>
      <b-row class="justify-content-center">
        <user-card
          :title="userData.first_name + ' ' + userData.last_name"
          :avatar="userData.avatar"
        >
          <b-alert show variant="secondary">
            <b-container>
              <template v-for="(item, key, index) of userData">
                <b-row
                  v-if="key === 'id' || key === 'email'"
                  :key="index"
                  class="text-start"
                >
                  <b-col cols="3 p-0">{{ key }}:</b-col>
                  <b-col cols="9 p-0"
                    ><i>{{ item }}</i></b-col
                  >
                </b-row>
              </template>
            </b-container>
          </b-alert>
        </user-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import UserCard from "@/components/UserCard";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "User",
  components: {
    UserCard,
  },

  computed: {
    ...mapGetters({
      userData: "userModule/userData",
    }),
  },

  async created() {
    await this.getUser(this.$route.params.userId);
  },

  destroed() {
    this.setData({
      userData: {},
    });
  },

  methods: {
    ...mapActions({
      getUser: "userModule/getUser",
    }),

    ...mapMutations({
      setData: "userModule/setData",
    }),
  },
};
</script>

<style lang="scss">
.w-max-content {
  width: max-content;
}
</style>
