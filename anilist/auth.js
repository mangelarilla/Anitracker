(function() {
	var oauthCallback = getOAuthPayload();
	
	if (oauthCallback) {
		saveToken(oauthCallback.access_token);
	}

	window.location.href = "/";

	function getOAuthPayload() {
		const hash = window.location.hash
		if (!hash) {
			return null;
		}

		let payload = hash.substring(1).split("&");

		return {
			access_token: getValueFromPayload("access_token", payload) || "",
			token_type: getValueFromPayload("token_type", payload) || "",
			expires_in: getValueFromPayload("expires_in") || ""
		};
	}

	function getValueFromPayload(key, payload) {
		for (let i = payload.length - 1; i >= 0; i--) {
			let entry = payload[i];
			if(entry.includes(key)) {
				return entry.substring((key + "=").length);
			}
		}

		return null;
	}

	function saveToken(access_token) {
		localStorage.setItem('Anilist', access_token);
	}
})();