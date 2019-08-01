
export async function upsertEntries(entries) {
	const objectStore = await fromWatchingStore("readwrite");

	for (const entry of entries) {
		const dbEntry = get(objectStore, entry.id);
		if(dbEntry) {
			await put(objectStore, entry);
		} else {
			await add(objectStore, entry);
		}
	}
}

export async function getEntries() {
	const objectStore = await fromWatchingStore();

	return await getAll(objectStore);
}

function openAnilistDb() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open("Anilist", 1);
		request.onerror = err => reject(err);
		request.onsuccess = ev => resolve(ev.target.result);
		request.onupgradeneeded = ev => {
		  const db = ev.target.result;

		  db.createObjectStore("watching", { keyPath: "id" })
		  	.createIndex("id", "id", { unique: true });

		  resolve(db);
		};		
	});
}

async function fromWatchingStore(mode) {
	const db = await openAnilistDb();
	const transaction = db.transaction(["watching"], mode || "readonly");
	transaction.onerror = err => throw err;

	return transaction.objectStore("watching");
}

function get(objectStore, entryId) {
	return opPromise(() => objectStore.get(entryId));
}

function getAll(objectStore) {
	return opPromise(() => objectStore.getAll());
}

function put(objectStore, entry) {
	return opPromise(() => objectStore.put(entry));
}

function add(objectStore, entry) {
	return opPromise(() => objectStore.add(entry));
}

function opPromise(op) {
	return new Promise((resolve, reject)) => {
		const request = op();
		request.onerror = err => reject(err);
		request.onsuccess = ev => resolve(ev.target.result);
	};
}