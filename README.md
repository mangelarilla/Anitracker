[![Netlify Status](https://api.netlify.com/api/v1/badges/5844e904-e1aa-468b-aefb-44563a505095/deploy-status)](https://app.netlify.com/sites/frosty-curie-b638b1/deploys)

# Anitracker

Cross platform anime tracker for Anilist

## Local setup and development

It's a static site, so any simple web server will do. The easiest way to get everything working is using the already preconfigured nginx docker setup via docker compose.

`docker-compose up --build`

This comes with an extra as this nginx setup uses an Anilist dev specific integration whose auth callback points to your right localhost and port used from the docker config. Sweet, isn't it?
