export function showProviderSelection() {
	document.getElementsByTagName('DIALOG')[0].setAttribute("open","true");
}

export function isProviderSelectionVisible() {
	return document.getElementsByTagName('DIALOG')[0].getAttribute("open") === "true";
}

export function getAuthUrl() {
	return document.getElementsByTagName('A')[0].getAttribute("href");
}

export function renderWatchingList(entries) {
	const main = document.getElementsByTagName('MAIN')[0];

	main.innerHTML = entries.map(entry =>  `
		<figure data-id="${entry.id}">
			<figcaption>${entry.media.title.userPreferred}</figcaption>
			<figcaption>Ep. <span class="episode-progress">${entry.progress}</span>/${entry.media.episodes || "??"}</figcaption>
			<figcaption>
				<button onclick="decreaseEpisodes(${entry.id})">-</button>
				<button onclick="increaseEpisodes(${entry.id})">+</button>
			</figcaption>
		</figure>`
	).join('\n');
}

export function getEpisodeProgress(entryId) {
	const episodeProgress = document.querySelector(`figure[data-id="${entryId}"] .episode-progress`);

	return parseInt(episodeProgress.innerText);
}

export function renderEpisodeProgress(entryId, progress) {
	document.querySelector(`figure[data-id="${entryId}"] .episode-progress`).innerText = progress;
}

export function showSync() {
	document.getElementById('sync').style.display = "block";
}

export function updateSyncAttempts(remainingAttempts) {
	document.getElementById('sync-attempts').innerText = remainingAttempts;
}

			// <img src="${entry.media.coverImage.large}" alt="${entry.media.title.userPreferred}" />