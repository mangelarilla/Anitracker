export function showProviderSelection() {
	document.getElementsByTagName('DIALOG').setAttribute("open","true");
}

export function isProviderSelectionVisible() {
	return document.getElementsByTagName('DIALOG').getAttribute("open") === "true";
}

export function getAuthUrl() {
	return document.getElementsByTagName('A').getAttribute("href");
}

export function renderWatchingList(data) {
	const main = document.getElementsByTagName('MAIN');
	const entries = data.data.MediaListCollection.lists[0].entries;

	main.innerHTML = entries.map(entry =>  `
		<figure>
			<img src="${entry.media.coverImage.large}" alt="${entry.media.title.userPreferred}" />
			<figcaption>${entry.media.title.userPreferred}</figcaption>
			<figcaption>Ep. ${entry.progress}/${entry.media.episodes || "??"}</figcaption>
			<figcaption>
				<button onclick="updateEpisodes(${entry.id}, ${entry.progress-1})">-</button>
				<button onclick="updateEpisodes(${entry.id}, ${entry.progress+1})">+</button>
			</figcaption>
		</figure>`
	).join('\n');
}