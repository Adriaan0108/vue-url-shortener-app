<template>
  <div class="page-container">
    <div class="dashboard">
      <!-- Wallet Balance -->
      <div class="card">
        <h2>Wallet Balance</h2>
        <p class="wallet-amount">R {{ walletBalance.toFixed(2) }}</p>
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
        <h2 @click="toggleMyUrls" style="cursor: pointer">
          Your Links
          <span>{{ showMyUrls ? "▲" : "▼" }}</span>
        </h2>

        <div v-if="showMyUrls">
          <div v-if="!myUrls || myUrls.length === 0">
            <p>You haven’t created any links yet.</p>
          </div>
          <ul v-else class="links-list">
            <li v-for="url in myUrls" :key="url.id">
              <div class="link-info">
                <a href="#" @click.prevent="handleUrlClick(url)">{{
                  url.shortUrl
                }}</a>
                <span class="clicks">{{ url.clickCount }} clicks</span>
              </div>
              <small>Original: {{ url.originalUrl }}</small>
            </li>
          </ul>
        </div>
      </div>

      <!-- Links by Other Users -->
      <div class="card">
        <h2 @click="toggleOtherUrls" style="cursor: pointer">
          Other Users' Links
          <span>{{ showOtherUrls ? "▲" : "▼" }}</span>
        </h2>

        <div v-if="showOtherUrls">
          <div v-if="!otherUrls || otherUrls.length === 0">
            <p>No links from other users.</p>
          </div>
          <ul v-else class="links-list">
            <li v-for="url in otherUrls" :key="url.id">
              <div class="link-info">
                <a href="#" @click.prevent="handleUrlClick(url)">{{
                  url.shortUrl
                }}</a>
                <span class="clicks">{{ url.clickCount }} clicks</span>
              </div>
              <small>Original: {{ url.originalUrl }}</small>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  usePostUrl,
  useGetUrls,
  usePostUrlClick,
} from "../composables/useMutations";
import { showErrorAlert, showSuccessAlert } from "../utils/alert";
import { useAuthStore } from "../store/modules/authStore";

const auth = useAuthStore();

const currentUserId = auth.user.id;

const { mutate: postUrlMutate } = usePostUrl();
const { data: urls, refetch } = useGetUrls();
const { mutate: postUrlClickMutate } = usePostUrlClick();

const newLink = ref("");

const showMyUrls = ref(true);
const showOtherUrls = ref(true);

const toggleMyUrls = () => {
  showMyUrls.value = !showMyUrls.value;
};
const toggleOtherUrls = () => {
  showOtherUrls.value = !showOtherUrls.value;
};

const myUrls = computed(() =>
  (urls.value ?? []).filter((url) => url.createdBy === currentUserId)
);
const otherUrls = computed(() =>
  (urls.value ?? []).filter((url) => url.createdBy !== currentUserId)
);

const walletBalance = computed(() => {
  return myUrls.value.reduce(
    (total, url) => total + (url.amountEarned || 0),
    0
  );
});

const handleUrlClick = (url) => {
  window.open(url.originalUrl, "_blank");

  if (url.createdBy != currentUserId) {
    postUrlClickMutate(
      { urlId: url.id },
      {
        onSuccess: () => {
          refetch(); // refresh list
        },
        onError: (err) => {
          const errorMessage =
            err?.response?.data?.detail ||
            err?.message ||
            "Failed to send URL click";
          showErrorAlert(errorMessage);
        },
      }
    );
  }
};

const createLink = () => {
  postUrlMutate(
    { originalUrl: newLink.value },
    {
      onSuccess: () => {
        showSuccessAlert("URL shortened successfully");
        refetch(); // refresh list
        newLink.value = "";
      },
      onError: (err) => {
        const errorMessage =
          err?.response?.data?.detail ||
          err?.message ||
          "Failed to shorten URL";
        showErrorAlert(errorMessage);
      },
    }
  );
};
</script>

<style scoped></style>
