<template>
  <div class="container mt-5">
    <h2>Book Tickets</h2>
    <div v-if="movie">
      <h4>{{ movie.title }}</h4>
      <img :src="movie.image" alt="movie poster" class="img-fluid mb-3">
      <form @submit.prevent="confirmBooking">
        <div class="mb-3">
          <label for="name" class="form-label">Your Name</label>
          <input type="text" id="name" class="form-control" v-model="booking.name" required />
        </div>
        <div class="mb-3">
          <label for="seats" class="form-label">Number of Seats</label>
          <input type="number" id="seats" class="form-control" v-model="booking.seats" required />
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
import axios from 'axios';

export default {
  name: 'BookingPage',
  data() {
    return {
      movie: null,
      booking: {
        name: '',
        seats: 1,
      },
    };
  },
  async created() {
    const movieId = this.$route.params.id; // Fetch movieId from the route
    try {
      const response = await axios.get(`/api/movies/${movieId}`);
      this.movie = response.data; // Store the fetched movie details
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  },
  methods: {
    async confirmBooking() {
      try {
        await axios.post('/api/bookings', {
          name: this.booking.name,
          movieId: this.movie._id,
          seats: this.booking.seats,
        });
        alert('Booking confirmed!');
        this.$router.push('/');
      } catch (error) {
        console.error('Error confirming booking:', error);
      }
    },
  },
};
</script>


