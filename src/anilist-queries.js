const WatchingQuerySingle = `
query ($search: String) {
	Media(type: ANIME, search: $search, onList: true) {
		id
  	}
}
`;