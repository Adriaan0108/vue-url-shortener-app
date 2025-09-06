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
        <div v-if="links.length === 0">
          <p>No links yet. Create one above!</p>
        </div>
        <ul v-else class="links-list">
          <li v-for="(link, index) in links" :key="index">
            <div class="link-info">
              <a :href="link.short" target="_blank">{{ link.short }}</a>
              <span class="clicks">{{ link.clicks }} clicks</span>
            </div>
            <small>Original: {{ link.original }}</small>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

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
  // Mock short link creation
  const shortCode = Math.random().toString(36).substring(2, 7);
  const shortUrl = `https://sho.rt/${shortCode}`;
  links.value.push({
    original: newLink.value,
    short: shortUrl,
    clicks: 0,
  });
  newLink.value = "";
};
</script>

<style scoped></style>
