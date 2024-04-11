<template>
  <div>
    <!-- Hero section -->
    <div class="hero bg-dark text-light py-5">
      <div class="container text-center">
        <h1>Welcome to Shakti Bhai Library</h1>
        <p class="lead">Explore our collection of books and enjoy reading!</p>
        <router-link to="/books" class="btn btn-primary mt-3"
          >Browse Books</router-link
        >
      </div>
    </div>

    <!-- Featured Books section -->
    <div class="container mt-5">
      <h2 class="text-center mb-4">Featured Books</h2>
      <div class="row">
        <!-- Book cards -->
        <div v-for="book in featuredBooks" :key="book.id" class="col-md-4 mb-4">
          <div class="card">
            <img :src="book.imageUrl" class="card-img-top" alt="Book Cover" />
            <div class="card-body">
              <h5 class="card-title">{{ book.title }}</h5>
              <p class="card-text">{{ book.author }}</p>
              <router-link :to="'/books/' + book.id" class="btn btn-primary"
                >View Details</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      featuredBooks: [
        {
          id: 1,
          title: "Introduction to Algorithms",
          author:
            "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
          imageUrl: "https://upload.wikimedia.org/wikipedia/en/f/ff/Clrs4.jpeg",
        },
        {
          id: 2,
          title: "Cracking the Coding Interview",
          author: "Gayle Laakmann McDowell",
          imageUrl:
            "https://m.media-amazon.com/images/I/61mIq2iJUXL._AC_UF1000,1000_QL80_.jpg",
        },
      ],
    };
  },
};
</script>

<style scoped>
.hero {
  /* background-image: url("https://via.placeholder.com/1500x500"); */
  background-size: cover;
  background-position: center;
}
</style>
