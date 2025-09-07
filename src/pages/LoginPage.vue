<template>
  <div class="page-container">
    <div class="card">
      <h2>{{ isLogin ? "Login" : "Create Account" }}</h2>

      <!-- Login Form -->
      <form v-if="isLogin" @submit.prevent="handleLogin">
        <label>Username</label>
        <input v-model="loginForm.username" type="text" required />

        <label>Password</label>
        <input v-model="loginForm.password" type="password" required />

        <button type="submit" class="primary">Login</button>
      </form>

      <!-- Signup Form -->
      <form v-else @submit.prevent="handleSignup">
        <label>First Name</label>
        <input v-model="signupForm.firstname" type="text" required />

        <label>Last Name</label>
        <input v-model="signupForm.lastname" type="text" required />

        <label>Username</label>
        <input v-model="signupForm.username" type="text" required />

        <label>Password</label>
        <input v-model="signupForm.password" type="password" required />

        <button type="submit" class="success">Create Account</button>
      </form>

      <!-- Toggle -->
      <p class="text-center">
        {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
        <button class="text-link" @click="toggleForm">
          {{ isLogin ? "Create one" : "Login" }}
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useLogin, useRegister } from "../composables/useMutations";
import { showErrorAlert } from "../utils/alert";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/modules/authStore";

const { mutate: loginMutate } = useLogin();
const { mutate: registerMutate } = useRegister();

const router = useRouter();
const auth = useAuthStore();

const isLogin = ref(true);

const loginForm = ref({
  username: "",
  password: "",
});

const signupForm = ref({
  firstname: "",
  lastname: "",
  username: "",
  password: "",
});

const toggleForm = () => {
  isLogin.value = !isLogin.value;
};

const handleLogin = () => {
  loginMutate(
    {
      username: loginForm.value.username,
      password: loginForm.value.password,
    },
    {
      onSuccess: (response) => {
        auth.setUser(response);

        router.push("/dashboard");
      },
      onError: (err) => {
        const errorMessage =
          err?.response?.data?.detail || // API detail field
          err?.message || // Axios/network error
          "Failed to login"; // default fallback
        showErrorAlert(errorMessage);
      },
    }
  );
};

const handleSignup = () => {
  registerMutate(
    {
      username: signupForm.value.username,
      password: signupForm.value.password,
      firstName: signupForm.value.firstname,
      lastName: signupForm.value.lastname,
    },
    {
      onSuccess: (response) => {
        auth.setUser(response);

        router.push("/dashboard");
      },
      onError: (err) => {
        const errorMessage =
          err?.response?.data?.detail || err?.message || "Failed to register";
        showErrorAlert(errorMessage);
      },
    }
  );
};
</script>
