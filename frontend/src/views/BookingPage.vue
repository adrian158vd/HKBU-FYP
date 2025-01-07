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
    const movieId = this.$route.params.id;
    try {
      const response = await axios.get(`/api/movies/${movieId}`);
      this.movie = response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  },
  methods: {
    async confirmBooking() {
        try {
            const payload = {
                name: this.booking.name,
                movieId: this.movie._id,
                seats: this.booking.seats,
            };

            const response = await axios.post('/api/bookings', payload);
            console.log('Booking API Response:', response.data);

            if (response.status === 201) {
                alert(`Booking confirmed! Your booking ID is ${response.data.bookingId}`);
                this.$router.push('/');
            } else {
                alert('Failed to confirm booking. Please try again.');
            }
        } catch (error) {
            console.error('Error during booking:', error);
            alert('An error occurred while confirming the booking.');
        }
    },
},

};
</script>
