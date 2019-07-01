(function() {

	var provider = getCurrentProvider();

	if (!provider) {
		showProviderSelection()
	} else {
		syncWatchingList()
	}

	function getCurrentProvider() {
		return getProvider('Anilist') || getProvider('Kitsu');
	}

	function getProvider(key) {
		var access_token = localStorage.getItem(key);

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

	function syncWatchingList() {
		
	}

})();