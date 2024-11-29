<script setup>
import { ref, onMounted } from 'vue'

</script>


<template>
  <main>
    <!-- Hero Section -->
    <div class="container">
      <div class="bg-light p-5 rounded-lg text-center">
        <h1 class="display-4">Welcome to MovieBox!</h1>
        <p class="lead">Discover and book tickets for your favorite movies at a cinema near you!</p>
        <button class="btn btn-primary btn-lg" @click="goToMovies">Browse Movies</button>
      </div>
    </div>

    <!-- Featured Movies Section -->
    <section class="mt-5">
      <div class="container">
        <h2 class="mb-4">Featured Movies</h2>
        <div class="row">
          <!-- Movie Cards -->
          <div class="col-md-4" v-for="movie in movies" :key="movie.id">
            <div class="card h-100">
              <img :src="movie.image" class="card-img-top" :alt="movie.title">
              <div class="card-body">
                <h5 class="card-title">{{ movie.title }}</h5>
                <p class="card-text">{{ movie.description }}</p>
                <button class="btn btn-primary" @click="bookMovie(movie.id)">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      movies: [
        { id: 1, title: "Movie Title 1", description: "Description 1", image: "https://via.placeholder.com/300x150" },
        { id: 2, title: "Movie Title 2", description: "Description 2", image: "https://via.placeholder.com/300x150" },
        { id: 3, title: "Movie Title 3", description: "Description 3", image: "https://via.placeholder.com/300x150" },
      ],
    };
  },
  methods: {
    goToMovies() {
      this.$router.push("/movies");
    },
    bookMovie(movieId) {
      this.$router.push({ name: "BookingPage", params: { id: movieId } });
    },
  },
};
</script>

<style scoped>
/* Optional: Add custom styles for better visuals */
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>





