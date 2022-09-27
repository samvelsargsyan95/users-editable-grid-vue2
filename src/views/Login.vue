<template>
  <b-container>
    <b-row class="justify-content-center align-items-center vh-100">
      <b-col cols="4">
        <h3>Sign In</h3>
        <b-form @submit.stop.prevent="onSubmit">
          <b-form-group id="email" label-for="email">
            <b-form-input
              v-model="$v.formData.email.$model"
              :state="validateState('email')"
              id="email"
              placeholder="Email"
            ></b-form-input>
          </b-form-group>
          <br />
          <b-form-group id="password" label-for="password">
            <b-form-input
              v-model="$v.formData.password.$model"
              :state="validateState('password')"
              type="password"
              id="password"
              placeholder="Password"
            ></b-form-input>
          </b-form-group>
          <br />
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
        <br /><b-alert v-if="errorMessage" show variant="danger">{{
          errorMessage
        }}</b-alert>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      formData: {
        email: null,
        password: null,
      },
      errorMessage: null,
    };
  },
  validations: {
    formData: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
  computed: {
    ...mapGetters({
      loginToken: "authModule/loginToken",
    }),
  },
  methods: {
    ...mapActions({
      login: "authModule/login",
    }),

    validateState(name) {
      const { $dirty, $error } = this.$v.formData[name];
      return $dirty ? !$error : null;
    },

    async onSubmit() {
      this.$v.formData.$touch();

      if (!this.$v.formData.$error) {
        try {
          await this.login({
            email: this.formData.email,
            password: this.formData.password,
          });

          this.$router.push({ path: "/users" });
        } catch {
          this.errorMessage = "User Not Found.";
        }
      }
    },
  },
};
</script>
