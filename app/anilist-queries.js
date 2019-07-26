import { getOrRenewAccessToken } from './oauth.js';

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
						large
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

export const ApiUrl = 'https://graphql.anilist.co';

export function buildWatchingQuery(userId) {
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

export function buildUpdateQuery(listEntryId, watchedEpisodes) {
	return {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${getAccessToken()}`,
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
		body: JSON.stringify({
			query: WatchingQuery,
			variables: { 
				id: listEntryId,
				progress: watchedEpisodes
			}
		})
	}
}