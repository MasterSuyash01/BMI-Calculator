<template>
    <div>
      <h1>Issue Book</h1>
      <label for="user">Select User:</label>
      <select v-model="selectedUser" id="user">
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      <br>
      <label for="ebook">Select Ebook:</label>
      <select v-model="selectedEbook" id="ebook">
        <option v-for="ebook in ebooks" :key="ebook.id" :value="ebook.id">{{ ebook.title }}</option>
      </select>
      <br>
      <button @click="issueBook">Issue Book</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedUser: null,
        selectedEbook: null,
        users: [], // Populate with user data from API or Vuex store
        ebooks: [] // Populate with e-book data from API or Vuex store
      };
    },
    methods: {
      issueBook() {
        if (this.selectedUser && this.selectedEbook) {
          // Implement functionality to issue the selected e-book to the selected user
          console.log(`Issuing book with ID ${this.selectedEbook} to user with ID ${this.selectedUser}`);
        } else {
          alert('Please select a user and an e-book to issue.');
        }
      }
    }
  };
  </script>
  