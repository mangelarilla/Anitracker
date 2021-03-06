<template>
  <div id="app">
    <dialog :open="!userId">
      <p>Get your list from <a :href="authUrl" rel="noopener">Anilist</a></p>
    </dialog>  
    <AnimeList v-if="userId && !title" :userId="userId" />
    <AnimeQuery v-else-if="userId && title" :userId="userId" :search="title" />
  </div>
</template>

<script>
import AnimeList from './components/AnimeList.vue';
import AnimeQuery from './components/AnimeQuery.vue';
import { onLogin, onLogout } from './vue-apollo.js';
import { getAccessTokenExpiresIn, getOAuthPayload, parseJwt } from './oauth.js';


export default {
  name: 'App',
  data() {
    return {
      list: null,
      userId: null
    };
  },
  computed: {
    authUrl() {
      return `https://anilist.co/api/v2/oauth/authorize?client_id=${process.env.VUE_APP_ANILIST}&response_type=token`;
    },
    title() {
      return this.getQueryValue("title");
    }
  },
  methods: {
    async initSession() {
      const oauthCallback = getOAuthPayload();
      if (oauthCallback) {
        const jwt = parseJwt(oauthCallback.access_token);

        localStorage.setItem('Anilist_access_token_expires_at', Date.now() + (oauthCallback.expires_in - 60));
        await onLogin(this.$apollo, oauthCallback.access_token);
        localStorage.setItem('Anilist_user_id', jwt.sub);

        window.location.href = "";
      }
    },
    async clearSession() {
      localStorage.removeItem('Anilist_access_token_expires_at');
      localStorage.removeItem('Anilist_user_id');
      await onLogout(this.$apollo);
    },
    getQueryValue(queryKey) {
      const urlParams = new URLSearchParams(window.location.search);

      return urlParams.get(queryKey);
    }
  },
  mounted() {
    // anilist oauth callback
    this.initSession();

    // Validate oauth token
    const expires_in = getAccessTokenExpiresIn();
    if(expires_in > 0) {
      setTimeout(this.clearSession, expires_in);
    } else {
      this.clearSession();
    }

    this.userId = localStorage.getItem('Anilist_user_id');
  },
  components: {
    AnimeList,
    AnimeQuery
  }
}
</script>

<style>
html, body, main {
  background-color: #f6f8fa;
  box-sizing: border-box;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-overflow-scrolling: touch;
}

button {
   user-select: none;
}
</style>
