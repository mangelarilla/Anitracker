import { ApiUrl, buildWatchingQuery } from './anilist-queries.js';
import { showProviderSelection, renderWatchingList, isProviderSelectionVisible } from './ui.js';
import { getAccessTokenExpiresIn, renewToken } from './oauth.js';

export function init() {
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

	const expires_in = getAccessTokenExpiresIn();
	if(expires_in > 0) {
	  setTimeout(renewToken, expires_in);
	} else if (!isProviderSelectionVisible()) {
	  renewToken();
	}
}