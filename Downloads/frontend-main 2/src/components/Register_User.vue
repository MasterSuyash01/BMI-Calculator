<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h1 class="text-center mb-4">User Registration</h1>
            <form @submit.prevent="registerUser">
              <div class="form-group">
                <label for="exampleInputName">Full Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputName"
                  placeholder="Enter your full name"
                  v-model="fullName"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail"
                  placeholder="Enter email"
                  v-model="email"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword"
                  placeholder="Password"
                  v-model="password"
                />
              </div>
              <button type="submit" class="btn btn-primary btn-block">
                Register
              </button>
            </form>
            <div class="text-center mt-3">
              <router-link class="btn btn-secondary" to="/login">
                Back to Login
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      fullName: "",
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    registerUser() {
      const userData = {
        fullName: this.fullName,
        email: this.email,
        password: this.password,
      };

      axios
        .post("http://127.0.0.1:5000/register", userData)
        .then((response) => {
          if (response.status == 201) {
            this.$router.push("/login");
          } else {
            this.error = "An error occurred. Please try again.";
          }
        })
        .catch((error) => {
          this.error =
            error.response.data.message ||
            "An error occurred. Please try again.";
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 20px;
}
</style>
