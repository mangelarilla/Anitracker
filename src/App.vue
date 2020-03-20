<template>
  <div id="app">
    <dialog :open="!userId">
      <p>Get your list from <a :href="authUrl" rel="noopener">Anilist</a></p>
    </dialog>  
    <main v-if="userId">
      <Anime v-for="entry in list" :entry="entry" :key="entry.id" />
    </main>
  </div>
</template>

<script>
import Anime from './components/Anime.vue'
import { getWatchingList } from './anilist-queries.js';
import { getAccessTokenExpiresIn, getOAuthPayload, parseJwt } from './oauth.js';


export default {
  name: 'App',
  data() {
    return {
      list: null
    };
  },
  computed: {
    userId() {
      return localStorage.getItem('Anilist_user_id');
    },
    authUrl() {
      return `https://anilist.co/api/v2/oauth/authorize?client_id=${process.env.VUE_APP_ANILIST}&response_type=token`;
    }
  },
  methods: {
    initSession() {
      const oauthCallback = getOAuthPayload();
      if (oauthCallback) {
        const jwt = parseJwt(oauthCallback.access_token);

        localStorage.setItem('Anilist_access_token_expires_at', Date.now() + (oauthCallback.expires_in - 60));
        localStorage.setItem('Anilist_access_token', oauthCallback.access_token);
        localStorage.setItem('Anilist_user_id', jwt.sub);
        window.location.hash = "";
      }
    },
    clearSession() {
      localStorage.removeItem('Anilist_access_token_expires_at');
      localStorage.removeItem('Anilist_access_token');
      localStorage.removeItem('Anilist_user_id');
    }
  },
  mounted() {
    // anilist oauth callback
    this.initSession();    

    // Validate oauth token
    const expires_in = getAccessTokenExpiresIn();
    if(expires_in > 0) {
      setTimeout(this.clearSession, expires_in);
    }

    if (this.userId) {
      getWatchingList(this.userId)
        .then(list => this.list = list)
        .catch(err => console.error(err));      
    }
  },
  components: {
    Anime
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

main {
  display: grid;
  grid-template-columns: 100%;
  place-items: center;
  place-content: space-around;
}
</style>
