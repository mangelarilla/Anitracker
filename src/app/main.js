import { getWatchingList } from './anilist-queries.js';
import { getAccessTokenExpiresIn, getOAuthPayload, parseJwt } from './oauth.js';
import { anime } from './components/anime.js';

var app = new Vue({
  el: '#app',
  data: {
    authUrl: "https://anilist.co/api/v2/oauth/authorize?client_id=2235&response_type=token",
    list: null
  },
  computed: {
    userId() {
      return localStorage.getItem('Anilist_user_id');
    }
  },
  mounted() {
    // anilist oauth callback
    var oauthCallback = getOAuthPayload();
    if (oauthCallback) {
      const jwt = parseJwt(oauthCallback.access_token);

      localStorage.setItem('Anilist_access_token_expires_at', Date.now() + (oauthCallback.expires_in - 60));
      localStorage.setItem('Anilist_access_token', oauthCallback.access_token);
      localStorage.setItem('Anilist_user_id', jwt.sub);
    }

    // Validate oauth token
    const expires_in = getAccessTokenExpiresIn();
    if(expires_in > 0) {
      setTimeout(() => window.location.href = this.authUrl, expires_in);
    } else {
       window.location.href = this.authUrl;
    }

    getWatchingList(this.userId)
      .then(list => this.list = list)
      .catch(err => console.error(error));
  }
});