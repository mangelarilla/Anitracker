<template>
  <ApolloQuery
    :query="gql => gql`query ($search: String) {
      Media(type: ANIME, search: $search, onList: true) {
        id
      }
    }`"
    :variables="{search}">
    <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading">Loading...</div>

        <!-- Error -->
        <div v-else-if="error">No matching anime for {{search}}</div>

        <!-- Result -->
        <div v-else-if="data">
          <AnimeList :animeId="data.Media.id" :userId="userId" />
        </div>

        <!-- No result -->
        <div v-else>No result :(</div>
      </template>
  </ApolloQuery>
</template>

<script>
  import AnimeList from './AnimeList.vue'

  export default {
    name: 'AnimeQuery',
    props: {
      userId: {
        required: true
      },
      search: {
        required: true
      }
    },
    components: {
      AnimeList
    }
  }
</script>