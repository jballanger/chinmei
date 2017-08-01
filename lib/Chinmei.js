'use strict';

const Utils = require('./Utils');
const request = require('request');
const EventEmitter = require('eventemitter3');

class Chinmei extends EventEmitter{
	constructor(username, password) {
		super();
		this.utils = Utils;
		this.setUser(username, password);
	}

	setUser(username = '', password = '') {
		this.auth = 'https://'+username+':'+password+'@';
		this.verifyAuth()
		.then(() => {})
		.catch((e) => {
			this.emit('error', new Error(`Failed to login on MyAnimeList (${e})`));
		});
	}

	getUser() {
		return new Promise((resolve, reject) => {
			this.verifyAuth().then((body) => {
				this.utils.formatUser(body).then((user) => {
					resolve(user);
				}).catch((e) => {
					reject(e);
				});
			}).catch((e) => {
				reject(e);
			});
		});
	}

	verifyAuth() {
		return new Promise((resolve, reject) => {
			request({url: this.auth+'myanimelist.net/api/account/verify_credentials.xml'}, function(err, res, body) {
				if (err) reject(err);
				else if (res.statusCode !== 200) reject(res.statusCode);
				resolve(body);
			});
		});
	}

	searchSingleAnime(name) {
		let self = this;
		return new Promise((resolve, reject) => {
			this.utils.search('anime', name).then((title) => {
				request({url: encodeURI(`${this.auth}myanimelist.net/api/anime/search.xml?q=${title}`)}, function(err, res, body) {
					if (err) reject(err);
					else if (res.statusCode !== 200) reject(res.statusCode);
					self.utils.formatSingle(body, 'anime', title).then((anime) => {
						resolve(anime);
					}).catch((e) => {
						reject(e);
					})
				});
			}).catch((e) => {
				this.emit('error', new Error(`Something wrong happened while using MAL prefix.json (${e})`));
			});
		});
	}
	
	searchSingleManga(name) {
		let self = this;
		return new Promise((resolve, reject) => {
			this.utils.search('manga', name).then((title) => {
				request({url: encodeURI(`${this.auth}myanimelist.net/api/manga/search.xml?q=${title}`)}, function(err, res, body) {
					if (err) reject(err);
					else if (res.statusCode !== 200) reject(res.statusCode);
					self.utils.formatSingle(body, 'manga', title).then((manga) => {
						resolve(manga);
					}).catch((e) => {
						reject(e);
					});
				});
			}).catch((e) => {
				this.emit('error', new Error(`Something wrong happened while using MAL prefix.json (${e})`));
			});
		});
	}

	searchAnimes(name) {
		let self = this;
		return new Promise((resolve, reject) => {
			request({url: encodeURI(`${this.auth}myanimelist.net/api/anime/search.xml?q=${name}`)}, function(err, res, body) {
				if (err) reject(err);
				self.utils.formatMultiple(body, 'anime').then((animes) => {
					resolve(animes);
				}).catch((e) => {
					reject(e);
				});
			});
		});
	}

	addAnime(anime) {
		return new Promise((resolve, reject) => {
			if (!anime.id) reject(new Error('Invalid anime id'));
			this.utils.buildAnime(anime).then((xml) => {
				this.verifyAuth().then(() => {
					request.post({url: `${this.auth}myanimelist.net/api/animelist/add/${anime.id}.xml`, form: {data: xml}}, function(err, res, body) {
						if (err) reject(err);
						resolve(res);
					});
				}).catch((e) => {
					reject(e);
				});
			}).catch((e) => {
				reject(e);
			});
		});
	}
	
	updateAnime(anime) {
		return new Promise((resolve, reject) => {
			if (!anime.id) reject(new Error('Invalid anime id'));
			this.utils.buildAnime(anime).then((xml) => {
				this.verifyAuth().then(() => {
					request.post({url: `${this.auth}myanimelist.net/api/animelist/update/${anime.id}.xml`, form: {data: xml}}, function(err, res, body) {
						if (err) reject(err);
						resolve(res);
					});
				}).catch((e) => {
					reject(e);
				});
			}).catch((e) => {
				reject(e);
			});
		});
	}

	deleteAnime(animeId) {
		return new Promise((resolve, reject) => {
			if (!animeId) reject(new Error('Invalid anime id'));
			this.verifyAuth().then(() => {
				request({url: `${this.auth}myanimelist.net/api/animelist/delete/${animeId}.xml`}, function (err, res, body) {
					if (err) reject(err);
					resolve(res);
				});
			}).catch((e) => {
				reject(e);
			});
		});
	}

	addManga(manga) {
		return new Promise((resolve, reject) => {
			if (!manga.id) reject(new Error('Invalid manga id'));
			this.utils.buildManga(manga).then((xml) => {
				this.verifyAuth().then(() => {
					request.post({url: `${this.auth}myanimelist.net/api/mangalist/add/${manga.id}.xml`, form: {data: xml}}, function(err, res, body) {
						if (err) reject(err);
						resolve(res);
					});
				}).catch((e) => {
					reject(e);
				});
			}).catch((e) => {
				reject(e);
			});
		});
	}
	
	updateManga(manga) {
		return new Promise((resolve, reject) => {
			if (!manga.id) reject(new Error('Invalid manga id'));
			this.utils.buildManga(manga).then((xml) => {
				this.verifyAuth().then(() => {
					request.post({url: `${this.auth}myanimelist.net/api/mangalist/update/${manga.id}.xml`, form: {data: xml}}, function(err, res, body) {
						if (err) reject(err);
						resolve(res);
					});
				}).catch((e) => {
					reject(e);
				});
			}).catch((e) => {
				reject(e);
			});
		});
	}

	deleteManga(mangaId) {
		return new Promise((resolve, reject) => {
			if (!mangaId) reject(new Error('Invalid manga id'));
			this.verifyAuth().then(() => {
				request({url: `${this.auth}myanimelist.net/api/mangalist/delete/${mangaId}.xml`}, function (err, res, body) {
					if (err) reject(err);
					resolve(res);
				});
			}).catch((e) => {
				reject(e);
			});
		});
	}
}

module.exports = Chinmei;