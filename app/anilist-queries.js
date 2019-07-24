const WatchingQuery = `
query ($id: Int) {
	MediaListCollection(userId: $id, type: ANIME, status: CURRENT) {
		lists {
			entries {
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