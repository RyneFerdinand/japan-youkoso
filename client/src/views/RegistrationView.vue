<template>
  <div class="registration-page">
    <div class="image-container">
      <img src="https://wallpapercave.com/wp/wp4118244.jpg" alt="Registration Image" />
    </div>
    <div class="form-container">
      <div class="home-button">
        <RouterLink class="home-btn" :to="{ name: 'home' }">&lt; Home</RouterLink>
      </div>
      <form @submit.prevent="register">
        <h1 class="form-header">Register!</h1>
        <label for="name">Name</label>
        <input type="text" id="name" v-model="formData.name" required />

        <label for="email">Email</label>
        <input type="email" id="email" v-model="formData.email" required />

        <label for="dob">Date of Birth</label>
        <input type="date" id="dob" v-model="formData.dob" required />

        <label for="gender">Gender</label>
        <select id="gender" v-model="formData.gender" required>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label for="age">Age</label>
        <input type="number" id="age" v-model="formData.age" required />

        <label for="password">Password</label>
        <input type="password" id="password" v-model="formData.password" required />

        <label for="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" v-model="formData.confirmPassword" required />

        <button type="submit">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'RegistrationView',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        dob: '',
        gender: '',
        age: '',
        password: '',
        confirmPassword: ''
      }
    }
  }
  /*methods:{
      register() {
        // Send the registration data to the server
        axios.post('/api/register', this.formData)
          .then(response => {
            // Handle the response if needed
          })
          .catch(error => {
            // Handle the error if needed
          });
      },
    },*/
}
</script>

<style scoped>
.registration-page {
  display: flex;
  background: white;
  color: black;
  min-height: 100vh;
}

.image-container {
  flex: 2;
  height: 100vh;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-container {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-items: left;
  margin-top: 50px;
  padding-left: 15%;
  padding-right: 15%;
}

.home-button {
  margin-top: -40px;
  margin-left: 20px;
}

.home-btn {
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-weight: regular;
}

.form-header {
  text-align: left;
  font-weight: 900;
  margin-top: 10px;
  font-size: 36px;
  margin-bottom: 20px;
}

form {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  font-weight: bold;
  margin-top: 10px;
}

input,
select {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid black;
  border-radius: 5px;
  outline: none;
}

button[type='submit'] {
  background: red;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  align-self: flex-end;
}
</style>
