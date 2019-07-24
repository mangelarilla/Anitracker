import { ApiUrl, buildWatchingQuery } from './anilist-queries.js';
import { showProviderSelection, renderWatchingList } from './ui.js';

const userId = localStorage.getItem('Anilist_user_id');

if (!userId) {
	showProviderSelection()
} else {
	const options = buildWatchingQuery(userId);

	fetch(ApiUrl, options)
		.then(response => response.json())
		.then(data => renderWatchingList(data))
		.catch(error => console.error(error));
}