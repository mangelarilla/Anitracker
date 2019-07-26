import { ApiUrl, buildUpdateQuery } from './anilist-queries.js';

export function updateEpisodes(listEntryId, watchedEpisodes) {
	const options = buildUpdateQuery(listEntryId, watchedEpisodes);

	fetch(ApiUrl, options)
		.then(response => response.json())
		// Figure out what info we're getting, then render
		.then(data => console.log(data))
		.catch(error => console.error(error));
}