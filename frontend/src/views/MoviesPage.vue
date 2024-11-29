<script setup>
import { ref, onMounted } from 'vue'

</script>


<template>
    <div class="container mt-5">
      <h1>Available Movies</h1>
      <div class="row">
        <div class="col-md-4" v-for="movie in movies" :key="movie.id">
          <div class="card">
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
  </template>
  
  <script>
  export default {
    name: 'MoviesPage',
    data() {
      return {
        movies: [
          { id: 1, title: 'Movie 1', description: 'Description 1', image: 'https://via.placeholder.com/300x150' },
          { id: 2, title: 'Movie 2', description: 'Description 2', image: 'https://via.placeholder.com/300x150' },
          { id: 3, title: 'Movie 3', description: 'Description 3', image: 'https://via.placeholder.com/300x150' },
        ],
      };
    },
    methods: {
      bookMovie(movieId) {
        this.$router.push({ name: 'BookingPage', params: { id: movieId } });
      },
    },
  };
  </script>
  