<template>
  <div class="container mt-5">
    <h1>Available Movies</h1>
    <div class="row">
      <div class="col-md-4" v-for="movie in movies" :key="movie._id">
        <div class="card">
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
</template>

<script>
import axios from 'axios';

export default {
  name: 'MoviesPage',
  data() {
    return {
      movies: [],
    };
  },
  async created() {
    try {
      const response = await axios.get('/api/movies');
      this.movies = response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  },
  methods: {
    bookMovie(movieId) {
      this.$router.push({ name: 'BookingPage', params: { id: movieId } });
    },
  },
};
</script>

  