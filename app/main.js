(function() {

	var provider = getCurrentProvider();

	if (!provider) {
		// showProviderSelection()
	} else {
		syncWatchingList()
	}

	function getCurrentProvider() {
		return null;
	}

	function showProviderSelection() {
		document.querySelector('dialog').showModal();
	}

	function syncWatchingList() {
		
	}

})();