


<template>
    <div class="container mt-5">
      <h1>Contact Us</h1>
      <form @submit.prevent="submitContact">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" class="form-control" id="name" v-model="contact.name" required>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" id="email" v-model="contact.email" required>
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">Message</label>
          <textarea class="form-control" id="message" rows="3" v-model="contact.message" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Contact',
    data() {
      return {
        contact: {
          name: '',
          email: '',
          message: '',
        },
      };
    },
    methods: {
      submitContact() {
        alert(`Thank you, ${this.contact.name}! Your message has been sent.`);
        this.contact = { name: '', email: '', message: '' }; // Reset the form
      },
    },
  };
  </script>
  