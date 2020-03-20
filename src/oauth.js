export function parseJwt (token) {
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));

	return JSON.parse(jsonPayload);
};

export function getOAuthPayload() {
	const hash = window.location.hash
	if (!hash) {
		return null;
	}

	let payload = hash.substring(1).split("&");

	return {
		access_token: getValueFromPayload("access_token", payload) || "",
		token_type: getValueFromPayload("token_type", payload) || "",
		expires_in: getValueFromPayload("expires_in", payload) || ""
	};
}

export function getAccessTokenExpiresIn() {
	const expires_at = localStorage.getItem('Anilist_access_token_expires_at');

	if(!expires_at) {
		return 0;
	}

	return expires_at - Date.now();
}

export function getAccessToken() {
	
	const stored_token = localStorage.getItem('Anilist_access_token');

	return stored_token;
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