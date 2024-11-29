
<script setup>
import { ref, onMounted } from 'vue'

</script>

<template>
    <div class="container mt-5">
      <h2>Book Tickets</h2>
      <div v-if="movie">
        <h4>{{ movie.title }}</h4>
        <img :src="movie.image" alt="movie poster" class="img-fluid mb-3">
        <form @submit.prevent="confirmBooking">
          <div class="mb-3">
            <label for="name" class="form-label">Your Name</label>
            <input type="text" id="name" class="form-control" v-model="bookingDetails.name" required>
          </div>
          <div class="mb-3">
            <label for="seats" class="form-label">Number of Seats</label>
            <input type="number" id="seats" class="form-control" v-model="bookingDetails.seats" required>
          </div>
          <button type="submit" class="btn btn-success">Confirm Booking</button>
        </form>
      </div>
      <div v-else>
        <p>Loading movie details...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BookingPage',
    data() {
      return {
        movie: null,
        bookingDetails: {
          name: '',
          seats: 1,
        },
      };
    },
    mounted() {
      const movieId = this.$route.params.id;
      const movies = [
        { id: 1, title: 'Movie Title 1', image: 'https://via.placeholder.com/300x150' },
        { id: 2, title: 'Movie Title 2', image: 'https://via.placeholder.com/300x150' },
        { id: 3, title: 'Movie Title 3', image: 'https://via.placeholder.com/300x150' },
      ];
      this.movie = movies.find((m) => m.id == movieId);
    },
    methods: {
      confirmBooking() {
        alert(`Booking confirmed for ${this.bookingDetails.name}. ${this.bookingDetails.seats} seat(s) reserved.`);
        this.$router.push('/');
      },
    },
  };
  </script>
  