import { updateWatchingListEntry } from './anilist-queries.js';
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
  updateWatchingListEntry(listEntryId, watchedEpisodes)
    .then(media => renderEpisodeProgress(media.id, media.progress))
    .catch(error => console.error(error));
}