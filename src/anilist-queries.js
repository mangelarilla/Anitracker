import { getAccessToken } from './oauth.js';

export function getWatchingList(userId) {
	const options = buildWatchingQuery(userId);

	return fetch(ApiUrl, options)
		.then(response => processHeaders(response))
		.then(response => response.json())
		.then(data => data.data.MediaListCollection.lists[0].entries || []);
}

export function updateWatchingListEntry(listEntryId, watchedEpisodes) {
	const options = buildUpdateQuery(listEntryId, watchedEpisodes);

	return fetch(ApiUrl, options)
		.then(response => processHeaders(response))
	  	.then(response => response.json())
		.then(data => data.data.SaveMediaListEntry || {});
}

const WatchingQuery = `
query ($id: Int) {
	MediaListCollection(userId: $id, type: ANIME, status: CURRENT) {
		lists {
			entries {
				id
				progress
				media {
					title {
						userPreferred
					}
					episodes
					nextAiringEpisode {
						airingAt
					}
					coverImage {
						extraLarge
						medium
						color
					}
				}
			}
		}
	}
}
`;

const UpdateQuery = `
mutation ($id: Int, $progress: Int) {
  SaveMediaListEntry (id: $id, progress: $progress) {
    id
    progress
  }
}
`;

const ApiUrl = 'https://graphql.anilist.co';

function buildWatchingQuery(userId) {
	return {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
		body: JSON.stringify({
			query: WatchingQuery,
			variables: { id: userId }
		})
	}
};

function buildUpdateQuery(listEntryId, watchedEpisodes) {
	return {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${getAccessToken()}`,
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
		body: JSON.stringify({
			query: UpdateQuery,
			variables: { 
				id: listEntryId,
				progress: watchedEpisodes
			}
		})
	}
}

function processHeaders(response) {
	const remain = response.headers.get("X-RateLimit-Remaining");
	console.log("Remaining sync attempts: " + remain);
	
	return response;
}