<script setup>
import { ref, onMounted } from 'vue'

</script>


<template>
 <main>
     
      <div class="container">
        <div class="jumbotron bg-light p-5 rounded-lg text-center">
          <h1>Welcome to MovieBox!</h1>
          <p class="lead">Discover and book tickets for your favorite movies at a cinema near you!</p>
          <button class="btn btn-primary btn-lg">Browse Movies</button>
        </div>

        <section class="mt-5">
          <h2 class="mb-3">Featured Movies</h2>
          <div class="row">
            <div class="col-md-4" v-for="movie in movies" :key="movie.id">
              <div class="card">
                <img :src="movie.image" class="card-img-top" :alt="movie.title">
                <div class="card-body">
                  <h5 class="card-title">{{ movie.title }}</h5>
                  <p class="card-text">{{ movie.description }}</p>
                  <button class="btn btn-primary">Book Now</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    
    </main>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      movies: [
        { id: 1, title: 'Movie Title 1', description: 'Description here', image: 'https://via.placeholder.com/300x150' },
        { id: 2, title: 'Movie Title 2', description: 'Description here', image: 'https://via.placeholder.com/300x150' },
        { id: 3, title: 'Movie Title 3', description: 'Description here', image: 'https://via.placeholder.com/300x150' },
      ]
    };
  }
}
</script>



