import { increaseEpisodes, decreaseEpisodes } from './ui.listeners.js';
import { init } from './init.js';

// Expose DOM listeners
window.increaseEpisodes = increaseEpisodes;
window.decreaseEpisodes = decreaseEpisodes;

init();

// Register service workers
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {

    navigator.serviceWorker.register('/sw-static.js').then(function(registration) {
      console.log('ServiceWorker sw-static.js registration successful with scope: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker sw-static.js registration failed: ', err);
    });

    // navigator.serviceWorker.register('/serviceworkers/app.js', { scope: '/app/' }).then(function(registration) {
    //   console.log('ServiceWorker registration successful with scope: ', registration.scope);
    // }, function(err) {
    //   console.log('ServiceWorker registration failed: ', err);
    // });
  });
}