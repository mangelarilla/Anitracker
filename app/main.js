import { increaseEpisodes, decreaseEpisodes, sync } from './ui.listeners.js';
import { getWatchingList } from './anilist-queries.js';
import { showProviderSelection, showSync, renderWatchingList, isProviderSelectionVisible } from './ui.js';
import { getAccessTokenExpiresIn, renewToken } from './oauth.js';

// Expose DOM listeners
window.increaseEpisodes = increaseEpisodes;
window.decreaseEpisodes = decreaseEpisodes;
window.sync = sync;

// Register service workers
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw-static.js')
      .then(reg => console.log('ServiceWorker registered with scope: ', reg.scope))
      .catch(err => console.error('ServiceWorker registration failed: ', err));
  });
}

// Init
const userId = localStorage.getItem('Anilist_user_id');

if (!userId) {
  showProviderSelection();
} else {
  showSync();
  getWatchingList(userId)
    .then(list => renderWatchingList(list))
    .catch(error => console.error(error));
}

// Renew token flow
const expires_in = getAccessTokenExpiresIn();
if(expires_in > 0) {
  setTimeout(renewToken, expires_in);
} else if (!isProviderSelectionVisible()) {
  renewToken();
}