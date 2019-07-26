import * from './ui.listeners.js';
import { init } from './init.js';

init();

// Register service workers
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {

    navigator.serviceWorker.register('/serviceworkers/static.js', { scope: '/' }).then(function(registration) {
      console.log('ServiceWorker static.js registration successful with scope: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker static.js registration failed: ', err);
    });

    // navigator.serviceWorker.register('/serviceworkers/app.js', { scope: '/app/' }).then(function(registration) {
    //   console.log('ServiceWorker registration successful with scope: ', registration.scope);
    // }, function(err) {
    //   console.log('ServiceWorker registration failed: ', err);
    // });
  });
}