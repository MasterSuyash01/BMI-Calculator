<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h1 class="text-center mb-4">Login</h1>
            <form @submit.prevent="loginUser">
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  v-model="username"
                />
                <small id="emailHelp" class="form-text text-muted"
                  >We'll never share your email with anyone else.</small
                >
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  v-model="password"
                />
              </div>
              <button type="submit" class="btn btn-primary btn-block">
                Submit
              </button>
            </form>
            <!-- New User Registration Button -->
            <div class="text-center mt-4">
              <router-link class="btn btn-success" to="/register">
                Register New User
              </router-link>
            </div>
            <div class="text-center text-danger mt-3">{{ error }}</div>
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
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    loginUser() {
      const loginData = {
        username: this.username,
        password: this.password,
      };

      axios
        .post("http://127.0.0.1:5000/login", loginData)
        .then((response) => {
          if (response.status == 200) {
            // set token in local storage
            localStorage.setItem("access_token", response.data.access_token);
            if (response.data.is_admin) {
              this.$router.push("/admin/dashboard");
            } else {
              this.$router.push("/user/dashboard");
            }
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
  created() {
    // check if user is already logged in
    if (localStorage.getItem("access_token")) {
      // fetch check_login
      axios
        .get("http://127.0.0.1:5000/check_login", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.is_admin) {
              this.$router.push("/admin/dashboard");
            } else {
              this.$router.push("/user/dashboard");
            }
          }
        })
        .catch((error) => {
          localStorage.removeItem("access_token");
          console.error(error);
        });
    } else {
      localStorage.removeItem("access_token");
    }
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
