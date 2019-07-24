export function showProviderSelection() {
	document.querySelector('dialog').setAttribute("open","true");
}

export function renderWatchingList(data) {
	const main = document.querySelector('main');
	const entries = data.data.MediaListCollection.lists[0].entries;

	main.innerHTML = entries.map(entry =>  `
		<figure>
			<img src="${entry.media.coverImage.large}" alt="${entry.media.title.userPreferred}" />
			<figcaption>${entry.media.title.userPreferred}</figcaption>
			<figcaption>Ep. ${entry.progress}/${entry.media.episodes || "??"}</figcaption>
			<figcaption><button>-</button><button>+</button></figcaption>
		</figure>`
	).join('\n');
}