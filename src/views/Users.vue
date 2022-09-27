<template>
  <div>
    <b-button @click="logout" class="logout" variant="outline-secondary"
      >Logout</b-button
    >
    <div
      class="d-flex justify-content-center align-items-center flex-column mb-3"
    >
      <h4>Users List</h4>
      <b-button
        @click="openCreateUserModal"
        variant="outline-primary"
        class="d-flex align-items-center w-max-content"
      >
        <b-icon
          :scale="1"
          role="button"
          icon="plus-circle-fill"
          aria-hidden="true"
          class="me-2"
        ></b-icon>
        Create user
      </b-button>
    </div>

    <b-table
      :items="usersData.users"
      :per-page="usersData.perPage"
      :current-page="usersData.currentPage"
      :fields="fields"
      id="users-list"
      small
    >
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <template #cell(avatar)="data">
        <router-link :to="{ path: `user/${data.item.id}` }">
          <b-img
            :src="data.item.avatar"
            :title="data.item.first_name + ' ' + data.item.last_name"
            :alt="data.item.first_name + ' ' + data.item.last_name"
            :width="70"
            :height="70"
            style="object-fit: cover"
            rounded
          />
        </router-link>
      </template>

      <template #cell(fullName)="data">
        <router-link :to="{ path: `user/${data.item.id}` }">
          {{ `${data.item.first_name} ${data.item.last_name}` }}
        </router-link>
      </template>

      <template #cell(actions)="data">
        <div class="d-flex justify-content-center">
          <b-img
            @click="openApproveModal(data.index, data.item.id)"
            :width="20"
            :src="require('@/assets/images/delete.png')"
            title="Delete"
            alt="delete"
            role="button"
            class="me-2"
          />

          <b-img
            @click="
              editUser(
                data.item.id,
                data.item.first_name + ' ' + data.item.last_name
              )
            "
            :width="20"
            :src="require('@/assets/images/edit.svg')"
            title="Edit"
            alt="edit"
            role="button"
          />
        </div>
      </template>
    </b-table>

    <b-pagination
      v-model="currentPage"
      @input="getUsers"
      :total-rows="usersData.total"
      :per-page="usersData.per_page"
      aria-controls="users-list"
      class="justify-content-center"
    ></b-pagination>

    <add-edit-modal :editData="editData" />

    <approve-modal
      @approve="deleteFunc"
      title="Delete user?"
      buttonTitle="Delete"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

import AddEditModal from "@/components/modals/AddEditModal";
import ApproveModal from "@/components/modals/ApproveModal";

export default {
  name: "Dashboard",

  components: {
    AddEditModal,
    ApproveModal,
  },

  data() {
    return {
      fields: [
        "index",
        "avatar",
        { key: "fullName", label: "Full Name" },
        "email",
        "actions",
      ],
      deletedUsedId: null,
      deletedUserIndex: null,
      editData: null,
    };
  },

  computed: {
    ...mapGetters({
      usersData: "usersModule/data",
    }),

    currentPage: {
      set(page) {
        this.setData({ page });
      },

      get() {
        return this.usersData.page;
      },
    },
  },

  async created() {
    await this.getUsers();
  },

  methods: {
    ...mapActions({
      getUsers: "usersModule/getUsers",
      deleteUser: "usersModule/deleteUser",
    }),

    ...mapMutations({
      setData: "usersModule/setData",
    }),

    openCreateUserModal() {
      this.editData = null
      this.$bvModal.show('add-edit-modal')
    },

    openApproveModal(index, userId) {
      this.deletedUsedId = userId;
      this.deletedUserIndex = index;

      this.$bvModal.show("approve-modal");
    },

    async deleteFunc() {
      await this.deleteUser({
        index: this.deletedUserIndex,
        userId: this.deletedUsedId,
      });
    },

    editUser(userId, name) {
      this.editData = {};
      this.editData.userId = userId;
      this.editData.data = {
        name,
        job: "Custom job text, because in the user's data there is no information about job...",
      };

      this.$bvModal.show("add-edit-modal");
    },

    logout() {
      localStorage.removeItem("vuex");
      this.$router.go("/login");
    },
  },
};
</script>

<style>
thead,
tbody,
tfoot,
tr,
td,
th {
  text-align: center;
  width: 100px;
  vertical-align: middle;
}

.w-max-content {
  width: max-content;
}

.logout {
  position: absolute;
  top: 40px;
  right: 40px;
}
</style>
