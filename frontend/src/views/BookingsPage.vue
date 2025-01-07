<template>
  <div class="container mt-5">
    <h2>Bookings</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Movie Name</th>
          <th>Seats</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="booking in bookings" :key="booking._id">
          <td>{{ booking.name }}</td>
          <td>{{ booking.movieName }}</td>
          <td>{{ booking.seats }}</td>
          <td>{{ new Date(booking.createdAt).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BookingsPage',
  data() {
    return {
      bookings: [],
    };
  },
  async created() {
    try {
      const response = await axios.get('/api/bookings');
      this.bookings = response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  },
};
</script>

  