import { getWatchingList } from './anilist-queries.js';
import { getAccessTokenExpiresIn, renewToken } from './oauth.js';
import { anime } from './components/anime.js';

var app = new Vue({
  el: '#app',
  data: {
    authUrl: "https://anilist.co/api/v2/oauth/authorize?client_id=2235&response_type=token"
    list: null
  },
  computed: {
    userId() {
      return localStorage.getItem('Anilist_user_id');
    }
  },
  mounted() {
    if(this.userId) {
      getWatchingList(this.userId)
        .then(list => this.list = list)
        .catch(err => console.error(error));
    }

    // Renew token flow
    const expires_in = getAccessTokenExpiresIn();
    if(expires_in > 0) {
      setTimeout(renewToken, expires_in);
    } else if (!this.userId) {
       window.location.href = this.authUrl;
    }
  }
});