import { ApiUrl, buildUpdateQuery } from './anilist-queries.js';
import { getEpisodeProgress, renderEpisodeProgress } from './ui.js';

export function increaseEpisodes(listEntryId) {
	const currentProgress = getEpisodeProgress(listEntryId);
  updateEpisodes(listEntryId, currentProgress+1);
}

export function decreaseEpisodes(listEntryId) {
	const currentProgress = getEpisodeProgress(listEntryId);
	updateEpisodes(listEntryId, currentProgress-1);
}

function updateEpisodes(listEntryId, watchedEpisodes) {
  const options = buildUpdateQuery(listEntryId, watchedEpisodes);

  fetch(ApiUrl, options)
    .then(response => response.json())
    .then(data => {
    	const updatedMedia = data.data.SaveMediaListEntry; 
    	renderEpisodeProgress(updatedMedia.id, updatedMedia.progress);
    })
    .catch(error => console.error(error));
}