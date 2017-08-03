class Utils {
	constructor() {
		this.animeAdd = {
			id: 1337,
			episode: 21,
			status: 1,
			score: 6,
			storage_type: 1,
			storage_value: 4.2,
			times_rewatched: 7,
			rewatch_value: 4,
			date_start: new Date(1993,4,25),
			date_finish: new Date(1996,4,25),
			priority: 2,
			enable_discussion: 0,
			enable_rewatching: 0,
			comments: 'the best',
			tags: 'tag1, tag2, tag3'
		};
		this.animeUpdate = {
			id: 1337,
			episode: 42,
			date_start: new Date(1993,4,25),
			date_finish: new Date(1996,4,25)
		};
		this.mangaAdd = {
			id: 6969,
			chapter: 21,
			volume: 17,
			status: 1,
			score: 10,
			times_reread: 2,
			reread_value: 3,
			date_start: new Date(1997,4,25),
			date_finish: new Date(2007,4,25),
			priority: 3,
			enable_discussion: 1,
			enable_rereading: 1,
			comments: 'really nice one',
			scan_group: '???',
			tags: 'tag7, tag5, tag9',
			retail_volumes: 5
		};
		this.mangaUpdate = {
			id: 6969,
			chapter: 96,
			status: 2,
			comments: 'wow'
		};
	}
}

module.exports = Utils;