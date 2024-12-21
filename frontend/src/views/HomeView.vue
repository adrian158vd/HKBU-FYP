
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const movies = ref([]);

const fetchMovies = async () => {
  try {
    const response = await axios.get('/api/movies');
    movies.value = response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

const goToMovies = () => {
  router.push('/movies');
};

const bookMovie = (movieId) => {
  router.push({ name: 'BookingPage', params: { id: movieId } });
};

onMounted(() => {
  fetchMovies();
});
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
          <div class="col-md-4" v-for="movie in movies" :key="movie._id">
            <div class="card h-100">
              <img :src="movie.image" class="card-img-top" :alt="movie.title">
              <div class="card-body">
                <h5 class="card-title">{{ movie.title }}</h5>
                <p class="card-text">{{ movie.description }}</p>
                <button class="btn btn-primary" @click="bookMovie(movie._id)">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Optional: Add custom styles for better visuals */
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
