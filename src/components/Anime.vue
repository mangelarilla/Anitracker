<template>
	<figure :data-id="entry.id">
		<img v-if="!minimal" :src="entry.media.coverImage.extraLarge" :alt="entry.media.title.userPreferred" />
		<figcaption>
			<span class="episode-progress">{{entry.progress}}</span><span class="episode-separator">/</span><span class="episode-total">{{entry.media.episodes || "??"}}</span>
		</figcaption>
		<figcaption>
      <ApolloMutation
        :mutation="gql => gql`
          mutation ($id: Int, $progress: Int) {
            SaveMediaListEntry (id: $id, progress: $progress) {
              id
              progress
            }
          }
        `"
      >
        <template v-slot="{ mutate, loading, error }">
          <button :disabled="loading" @click="mutate({variables: { id: entry.id, progress: entry.progress - 1}})">-</button>
          <button :disabled="loading" @click="mutate({variables: { id: entry.id, progress: entry.progress + 1}})">+</button>
          <p v-if="error">An error occurred: {{ error }}</p>
        </template>
      </ApolloMutation>
		</figcaption>
	</figure>
</template>

<script>
  import { updateWatchingListEntry } from '../anilist-queries.js';

  export default {
    name: 'Anime',
    props: {
      entry: {
        type: Object,
        required: true
      },
      minimal: {
        type: Boolean,
        required: false
      }
    }
  }
</script>

<style scoped>
figure {
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
  border-style: solid;
  border-width: 0.1rem;
  max-width: 14rem;
  -webkit-box-shadow: 10px 10px 35px -15px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 10px 35px -15px rgba(0,0,0,0.75);
  box-shadow: 10px 10px 35px -15px rgba(0,0,0,0.75);
}

figure>img {
  max-height: 20rem;
  max-width: inherit;
  width: 14rem;
}

figure button {
  margin: 0;
  width: 50%;
  border: solid thin;
  background-color: white;
  font-size: 2rem;
  height: 3rem;
}

figure button:first-child {
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}

figure button:last-child {
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

figure button:hover {
  background-color: black;
  color: white;
}

figcaption>span {
  display: inline-block;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 0.5rem;
}

figcaption>span.episode-progress, figcaption>span.episode-total {
  width: 45%;
}

figcaption>span.episode-separator {
  width: 10%;
}
</style>