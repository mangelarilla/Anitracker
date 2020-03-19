import { updateWatchingListEntry } from '../anilist-queries.js';

export const anime = Vue.component('anime', {
	template: `
		<figure :data-id="entry.id">
			<img v-if="!minimal" :src="entry.media.coverImage.extraLarge" :alt="entry.media.title.userPreferred" />
			<figcaption>
				<span class="episode-progress">{{entry.progress}}</span><span class="episode-separator">/</span><span class="episode-total">{{entry.media.episodes || "??"}}</span>
			</figcaption>
			<figcaption>
				<button @mouseclick="decreaseEpisodes()">-</button><button @mouseclick="increaseEpisodes()">+</button>
			</figcaption>
		</figure>
	`,
	props: {
		entry: {
			type: Object,
			required: true
		},
		minimal: {
			type: Boolean,
			required: false
		}
	},
	methods: {
		decreaseEpisodes() {
  			updateWatchingListEntry(this.entry.id, this.entry.progress - 1)
    			.then(media =>  this.entry.progress = media.progress)
    			.catch(error => console.error(error));
		},
		increaseEpisodes() {
  			updateWatchingListEntry(this.entry.id, this.entry.progress + 1)
    			.then(media =>  this.entry.progress = media.progress)
    			.catch(error => console.error(error));
		},
	}
});