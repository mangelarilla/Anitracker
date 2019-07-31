
function openAnilistDb() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open("Anilist", 1);

		request.onerror = (err) => reject(err);

		request.onupgradeneeded = (event) => {
		  const db = event.target.result;

		  db.createObjectStore("watching", { keyPath: "id" })
		  	.createIndex("id", "id", { unique: true });

		  resolve(db);
		};

		request.onsuccess = ev => resolve(event.target.result);
	});
}

export function upsertEntries(entries) {
	return new Promise((resolve, reject) => {
			openAnilistDb()
				.then()
	});
	usingAnilistDb(db => {
		const transaction = db.transaction(["watching"], "readwrite");
		transaction.onerror = (event) => console.error(event);

		const objectStore = transaction.objectStore("watching");

		for (const entry of entries) {
			const request = objectStore.get(entry.id);
			request.onerror = (ev) => console.error(ev);
			request.onsuccess = (ev) => {
				if(ev.target.result) {
					objectStore.put(entry);
				} else {
					objectStore.add(entry);
				}
			};
		}
	});
}

export function getEntries() {
	return new Promise((resolve, reject)) => {
		usingAnilistDb(db => {
			const transaction = db.transaction(["watching"]);
			transaction.onerror = (event) => reject(event);

			const objectStore = transaction.objectStore("watching");
			const request = objectStore.getAll();
			request.onerror = (ev) => reject(ev);
			request.onsuccess = (ev) => resolve(ev.target.result);
		});
	};	
}