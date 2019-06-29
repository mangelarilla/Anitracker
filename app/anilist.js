(function() {

	var access_token = getAccessToken();
	
	if (access_token) {
		saveToken(access_token);
	}

	window.location.href = "/";

	function getAccessToken() {
		const hash = window.location.hash
		if (hash) {
			return hash.substring("#access_token=".length);
		}

		return null;
	}

	function saveToken(access_token) {
		localStorage.setItem('Anilist', access_token);
	}

})();