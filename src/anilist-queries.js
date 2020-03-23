import { getAccessToken } from './oauth.js';

export function updateWatchingListEntry(listEntryId, watchedEpisodes) {
	const options = buildUpdateQuery(listEntryId, watchedEpisodes);

	return fetch(ApiUrl, options)
		.then(response => processHeaders(response))
	  	.then(response => response.json())
		.then(data => data.data.SaveMediaListEntry || {});
}

const WatchingQuerySingle = `
query ($search: String) {
	Media(type: ANIME, search: $search, onList: true) {
		id
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

function buildWatchingQuerySingle(title) {
	return {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
		body: JSON.stringify({
			query: WatchingQuerySingle,
			variables: { search: title }
		})
	}
}

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