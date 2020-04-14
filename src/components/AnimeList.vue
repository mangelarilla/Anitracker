<template>
  <main>
    <ApolloQuery
      :query="gql => gql`query ($userId: Int) {
        MediaListCollection(userId: $userId, type: ANIME, status_in: [CURRENT,REPEATING]) {
          lists {
            entries {
              id
              progress
              media {
                id
                title {
                  userPreferred
                }
                episodes
                coverImage {
                  extraLarge
                }
              }
            }
          }
        }
      }
      `"
      :variables="{ userId }">
      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading">Loading...</div>

        <!-- Error -->
        <div v-else-if="error">An error occurred</div>

        <!-- Result -->
        <div v-else-if="data && animeId">
          <Anime v-for="entry in mapList(data).filter(e => e.media.id == animeId)" :entry="entry" :key="entry.id" :minimal="!!animeId" />
        </div>
        <div v-else-if="data">
          <Anime v-for="entry in mapList(data)" :entry="entry" :key="entry.id" />
        </div>

        <!-- No result -->
        <div v-else>No result :(</div>
      </template>
    </ApolloQuery>
  </main>  
</template>

<script>
  import Anime from './Anime.vue'

  export default {
    name: 'AnimeList',
    props: {
      userId: {
        required: true
      },
      animeId: {
        required: false
      }
    },
    methods: {
      mapList(data) {
        return data.MediaListCollection.lists
          .reduce((acc, cur) => acc.concat(cur.entries), []);
      }
    },
    components: {
      Anime
    }
  }
</script>

<style scoped>
main {
  display: grid;
  grid-template-columns: 100%;
  place-items: center;
  place-content: space-around;
}
</style>