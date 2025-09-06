<template>
  <div class="page-container">
    <div class="dashboard">
      <!-- Wallet Balance -->
      <div class="card">
        <h2>Wallet Balance</h2>
        <p class="wallet-amount">$ {{ walletBalance.toFixed(2) }}</p>
      </div>

      <!-- Create Link -->
      <div class="card">
        <h2>Create New Link</h2>
        <form @submit.prevent="createLink">
          <label>Original URL</label>
          <input
            v-model="newLink"
            type="url"
            placeholder="Enter URL"
            required
          />
          <button type="submit" class="primary">Shorten</button>
        </form>
      </div>

      <!-- User Links -->
      <div class="card">
        <h2>Your Links</h2>
        <div v-if="!urls || urls.length === 0">
          <p>No links yet. Create one above!</p>
        </div>
        <ul v-else class="links-list">
          <li v-for="(url, index) in urls" :key="url.id">
            <div class="link-info">
              <a :href="url.shortUrl" target="_blank">{{ url.shortUrl }}</a>
              <span class="clicks">{{ url.clickCount }} clicks</span>
            </div>
            <small>Original: {{ url.originalUrl }}</small>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { usePostUrl, useGetUrls } from "../composables/useMutations";
import { showErrorAlert, showSuccessAlert } from "../utils/alert";

const { mutate: postUrlMutate } = usePostUrl();
const { data: urls, isLoading, isError, error, refetch } = useGetUrls();

const walletBalance = ref(120.5);

const newLink = ref("");
const links = ref([
  {
    original: "https://example.com/some-long-page",
    short: "https://sho.rt/abc123",
    clicks: 42,
  },
]);

const createLink = () => {
  postUrlMutate(
    {
      originalUrl: newLink.value,
    },
    {
      onSuccess: (response) => {
        showSuccessAlert("URL shortened successfully");
      },
      onError: (err) => {
        const errorMessage =
          err?.response?.data?.detail || // API detail field
          err?.message || // Axios/network error
          "Failed to shorten URL"; // default fallback
        showErrorAlert(errorMessage);
      },
    }
  );
};
</script>

<style scoped></style>
