<template>
    <div class="container">
      <h1 class="text-center bg-primary text-white" style="border-radius: 10px">Admin Dashboard</h1>
      <p>Welcome to the Admin Dashboard</p>
      <hr />
      <br />
  
      <!-- Alert -->
      <b-alert variant="success" v-if="showMessage" show>{{ message }}</b-alert>
  
      <div>
        <!-- Add Book Button -->
        <button type="button" class="btn btn-success" @click="addBook">Add Book</button>
      </div>
  
      <div>
        <!-- List of e-books -->
        <h3>Available e-books in the Library</h3>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>eBook ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Language</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ebook in filteredEbooks" :key="ebook.ebookId">
              <td>{{ ebook.ebookId }}</td>
              <td>{{ ebook.title }}</td>
              <td>{{ ebook.author }}</td>
              <td>{{ ebook.language }}</td>
              <td>
                <button type="button" class="btn btn-primary btn-sm" @click="issueBook(ebook.ebookId)">Issue</button>
                <button type="button" class="btn btn-danger btn-sm" @click="revokeAccess(ebook.ebookId)">Revoke</button>
                <button type="button" class="btn btn-warning btn-sm" @click="editEbook(ebook.ebookId)">Edit</button>
                <button type="button" class="btn btn-danger btn-sm" @click="deleteEbook(ebook.ebookId)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <br /><br />
      <button @click="logout" class="btn btn-danger">Logout</button>
  
      <!-- Search Form -->
      <b-form @submit.prevent="searchEbook" inline>
        <b-form-input v-model="search" placeholder="Enter search term" class="mr-2"></b-form-input>
        <b-button type="submit" variant="primary">Search</b-button>
      </b-form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdminDashboard',
    data() {
      return {
        ebooks: [], // Data fetched from API
        search: '',
        showMessage: false,
        message: ''
      };
    },
    computed: {
      filteredEbooks() {
        return this.ebooks.filter(ebook =>
          ebook.title.toLowerCase().includes(this.search.toLowerCase())
        );
      }
    },
    methods: {
      issueBook(ebookId) {
    // Implement issue book functionality
    // Example: Call an API to issue the book with the given ID
    axios
      .post(`http://127.0.0.1:5000/ebooks/${ebookId}/issue`, {})
      .then((response) => {
        if (response.status === 200) {
          // Handle successful issue
          this.showMessage = true;
          this.message = "Book issued successfully!";
        } else {
          // Handle error
          this.showError = true;
          this.error = "An error occurred while issuing the book.";
        }
      })
      .catch((error) => {
        // Handle error
        this.showError = true;
        this.error = "An error occurred while issuing the book.";
        console.error(error);
      });
  },
  revokeAccess(ebookId) {
    // Implement revoke access functionality
    // Example: Call an API to revoke access to the book with the given ID
    axios
      .post(`http://127.0.0.1:5000/ebooks/${ebookId}/revoke`, {})
      .then((response) => {
        if (response.status === 200) {
          // Handle successful revoke
          this.showMessage = true;
          this.message = "Access to book revoked successfully!";
        } else {
          // Handle error
          this.showError = true;
          this.error = "An error occurred while revoking access to the book.";
        }
      })
      .catch((error) => {
        // Handle error
        this.showError = true;
        this.error = "An error occurred while revoking access to the book.";
        console.error(error);
      });
  },
  editEbook(ebookId) {
    // Route to edit book page with ID
    this.$router.push(`/admin/ebooks/${ebookId}/edit`);
  },
  deleteEbook(ebookId) {
    // Implement delete book functionality
    // Example: Call an API to delete the book with the given ID
    axios
      .delete(`http://127.0.0.1:5000/ebooks/${ebookId}`)
      .then((response) => {
        if (response.status === 200) {
          // Handle successful delete
          this.ebooks = this.ebooks.filter((ebook) => ebook.ebookId !== ebookId);
          this.showMessage = true;
          this.message = "Book deleted successfully!";
        } else {
          // Handle error
          this.showError = true;
          this.error = "An error occurred while deleting the book.";
        }
      })
      .catch((error) => {
        // Handle error
        this.showError = true;
        this.error = "An error occurred while deleting the book.";
        console.error(error);
      });
  },
      searchEbook() {
        // Handled by computed property filteredEbooks
      },
      logout() {
        // Clear session and navigate to login page
        localStorage.removeItem("access_token");
        this.$router.push("/login");
      },
    },
    created() {
      // Fetch eBooks from API
      axios
        .get("http://127.0.0.1:5000/ebooks")
        .then((response) => {
          if (response.status === 200) {
            this.ebooks = response.data;
          }
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    },
  };
  </script>
  
  <style scoped>
  /* Component styles */
  </style>