(function() {

	const anilistApi = 'https://graphql.anilist.co';
	const watchingQuery = `
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
            extraLarge
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
	const provider = getCurrentProvider();

	if (!provider) {
		showProviderSelection()
	} else {
		syncWatchingList(provider)
	}

	function getCurrentProvider() {
		return getProvider('Anilist') || getProvider('Kitsu');
	}

	function getProvider(key) {
		const access_token = localStorage.getItem(key);

		if(!access_token) {
			return null;
		}

		return {
			name: key,
			access_token: access_token
		}
	}

	function showProviderSelection() {
		document.querySelector('dialog').setAttribute("open","true");
	}

	function syncWatchingList(provider) {
		const options = {
	        method: 'POST',
	        headers: {
	            'Content-Type': 'application/json',
	            'Accept': 'application/json',
	        },
	        body: JSON.stringify({
	            query: watchingQuery,
	            variables: { id: parseJwt(provider.access_token).sub }
	        })
	    };

	    fetch(anilistApi, options)
	    	.then(response => response.json())
            .then(data => renderWatchingList(data))
			.catch(error => console.error(error));
	}

	function renderWatchingList(data) {
		const main = document.querySelector('main');
		const entries = data.data.MediaListCollection.lists[0].entries;

		main.innerHTML = entries.map(entry =>  `
			<figure>
				<img src="${entry.media.coverImage.extraLarge}" alt="${entry.media.title.userPreferred}" />
				<figcaption>${entry.media.title.userPreferred}</figcaption>
				<span>Ep. ${entry.progress}/${entry.media.episodes || "??"}</span>
			</figure>`
		).join('\n');
	}

	function parseJwt (token) {
	    const base64Url = token.split('.')[1];
	    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
	        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	    }).join(''));

	    return JSON.parse(jsonPayload);
	};
})();