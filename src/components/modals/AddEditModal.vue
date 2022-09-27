<template>
  <b-modal
    :title="editData ? 'Edit' : 'Create User'"
    :okTitle="editData ? 'Save' : 'Add'"
    @shown="onShowModal"
    @hidden="resetData"
    @ok.prevent="addEdit"
    id="add-edit-modal"
  >
    <b-form>
      <b-form-group label="Name:" label-for="Name">
        <b-form-input
          v-model="$v.form.name.$model"
          :state="validateState('name')"
          id="name"
          placeholder="Name"
          class="mb-3"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Job:" label-for="job">
        <b-form-textarea
          v-model="$v.form.job.$model"
          :state="validateState('job')"
          id="job"
          placeholder="Job"
          rows="3"
          max-rows="6"
          class="overflow-hidden"
        ></b-form-textarea>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "AddEditModal",
  props: {
    editData: {
      type: Object,
      default: () => null,
    },
  },
  validations: {
    form: {
      name: {
        required,
      },
      job: {
        required,
      },
    },
  },

  data() {
    return {
      form: {
        name: null,
        job: null,
      },
      userId: null,
    };
  },

  computed: {
    addEdit() {
      if (this.editData) {
        return this.save;
      } else {
        return this.add;
      }
    },
  },

  methods: {
    ...mapActions({
      addUser: "usersModule/addUser",
      updateUser: "usersModule/updateUser",
    }),

    onShowModal() {
      if (this.editData) {
        if (this.editData.userId !== undefined) {
          this.userId = this.editData.userId
        }
   
        if (this.editData.data !== undefined) {
          this.form = { ...this.editData.data }
        }        
      }
    },

    resetData() {
      this.$v.$reset();
      this.form.name = null;
      this.form.job = null;
    },

    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },

    async save() {
      this.$v.form.$touch();
      if (!this.$v.form.$error) {
        await this.updateUser({
          userId: this.editData.userId,
          data: { ...this.form },
        }).then(() => this.$bvModal.hide("add-edit-modal"));
      }
    },

    async add() {
      this.$v.form.$touch();
      if (!this.$v.form.$error) {
        await this.addUser({ ...this.form }).then(() =>
          this.$bvModal.hide("add-edit-modal")
        );
      }
    },
  },
};
</script>

<style></style>
