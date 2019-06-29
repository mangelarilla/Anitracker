(function() {

	var provider = getCurrentProvider();

	if (!provider) {
		showProviderSelection()
	} else {
		syncWatchingList()
	}

	function getCurrentProvider() {
		return localStorage.getItem('Anilist') || localStorage.getItem('Kitsu');
	}

	function showProviderSelection() {
		document.querySelector('dialog').setAttribute("open","true");
	}

	function syncWatchingList() {
		
	}

})();