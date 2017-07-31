'use strict';

const request = require('request');
const xml2js = require('xml2js');
const EventEmitter = require('eventemitter3');

class Chinmei extends EventEmitter{
	constructor(username, password) {
		super();
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

	verifyAuth() {
		return new Promise((resolve, reject) => {
			request({url: this.auth+'myanimelist.net/api/account/verify_credentials.xml'}, function(err, res, body) {
				if (err) reject(err);
				else if (res.statusCode !== 200) reject(res.statusCode);
				resolve();
			});
		});
	}

	search(type, name) {
		return new Promise((resolve, reject) => {
			request({url: encodeURI(`https://myanimelist.net/search/prefix.json?type=${type}&keyword=${name}`)}, function(err, res, body) {
				if (err) reject(err);
				let json = JSON.parse(body);
				resolve(json.categories[0].items[0].name);
			});
		});
	}

	searchAnime(name) {
		return new Promise((resolve, reject) => {
			this.search('anime', name).then((title) => {
				request({url: encodeURI(`${this.auth}myanimelist.net/api/anime/search.xml?q=${title}`)}, function(err, res, body) {
					if (err) reject(err);
					else if (res.statusCode !== 200) reject(res.statusCode);
					xml2js.parseString(body, function(error, result) {
						let results = JSON.parse(JSON.stringify(result)).anime.entry;
						let i = 0;
						while (results[i] && results[i].title[0] !== title) i++;
						if (!results[i]) i = 0;
						let anime = results[i];
						Object.keys(anime).map(k => anime[k] = anime[k][0]);
						resolve(anime);
					});
				});
			}).catch((e) => {
				this.emit('error', new Error(`Something wrong happened while using MAL prefix.json (${e})`));
			});
		});
	}
	
	searchManga(name) {
		return new Promise((resolve, reject) => {
			this.search('manga', name).then((title) => {
				request({url: encodeURI(`${this.auth}myanimelist.net/api/manga/search.xml?q=${title}`)}, function(err, res, body) {
					if (err) reject(err);
					else if (res.statusCode !== 200) reject(res.statusCode);
					xml2js.parseString(body, function(error, result) {
						let results = JSON.parse(JSON.stringify(result)).manga.entry;
						let i = 0;
						while (results[i] && results[i].title[0] !== title) i++;
						if (!results[i]) i = 0;
						let manga = results[i];
						Object.keys(manga).map(k => manga[k] = manga[k][0]);
						resolve(manga);
					});
				});
			}).catch((e) => {
				this.emit('error', new Error(`Something wrong happened while using MAL prefix.json (${e})`));
			});
		});
	}
}

module.exports = Chinmei;