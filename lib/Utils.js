'use strict';

const request = require('request');
const xml2js = require('xml2js');
const builder = new xml2js.Builder({rootName: 'entry', renderOpts: {'pretty': false}});

exports.search = (type, name) => {
	return new Promise((resolve, reject) => {
		request({url: encodeURI(`https://myanimelist.net/search/prefix.json?type=${type}&keyword=${name}`)}, function(err, res, body) {
			if (err) reject(err);
			let json = JSON.parse(body);
			resolve(json.categories[0].items[0].name);
		});
	});
}

exports.formatUser = (body) => {
	return new Promise((resolve, reject) => {
		xml2js.parseString(body, function(err, res) {
			if (err) reject(err);
			let user = JSON.parse(JSON.stringify(res)).user;
			Object.keys(user).map(k => user[k] = user[k][0]);
			resolve(user);
		});
	});
}

exports.formatSingle = (body, type, title) => {
	return new Promise((resolve, reject) => {
		xml2js.parseString(body, function(err, res) {
			if (err) reject(err);
			let results = JSON.parse(JSON.stringify(res))[type].entry;
			let i = 0;
			while (results[i] && results[i].title[0] !== title) i++;
			if (!results[i]) i = 0;
			let ret = results[i];
			Object.keys(ret).map(k => ret[k] = ret[k][0]);
			resolve(ret);
		});
	});
}

exports.formatMultiple = (body, type) => {
	return new Promise((resolve, reject) => {
		xml2js.parseString(body, function(err, res) {
			if (err) reject(err);
			let results = JSON.parse(JSON.stringify(res))[type].entry;
			Object.keys(results).map(function(k) {
				Object.keys(results[k]).map(i => results[k][i] = results[k][i][0]);
			});
			resolve(results);
		});
	});
}

exports.buildDate = (date) => {
	let y = date.getUTCFullYear();
	let m = date.getUTCMonth();
	let d = date.getUTCDate();
	if (m < 10) m = '0'+m;
	if (d < 10) d = '0'+d;
	return m+d+y;
}

exports.buildAnime = (anime) => {
	return new Promise((resolve, reject) => {
		let obj = {
			episode: anime.episode ? parseInt(anime.episode, 10) : null,
			status: anime.status || null,
			score: anime.score ? parseInt(anime.score, 10) : null,
			storage_type: anime.storage_type ? parseInt(anime.storage_type, 10) : null,
			storage_value: anime.storage_value ? parseFloat(anime.storage_value) : null,
			times_rewatched: anime.times_rewatched ? parseInt(anime.times_rewatched, 10) : null,
			rewatch_value: anime.rewatch_value ? parseInt(anime.rewatch_value, 10) : null,
			date_start: Date.parse(anime.date_start) ? this.buildDate(anime.date_start) : null,
			date_finish: Date.parse(anime.date_finish) ? this.buildDate(anime.date_finish) : null,
			priority: anime.priority ? parseInt(anime.priority, 10) : null,
			enable_discussion: anime.enable_discussion ? parseInt(anime.enable_discussion, 10) : null,
			enable_rewatching: anime.enable_rewatching ? parseInt(anime.enable_rewatching, 10) : null,
			comments: anime.comments ? String(anime.comments) : null,
			tags: anime.tags ? String(anime.tags) : null
		};
		Object.keys(obj).forEach(k => (obj[k] == null && delete obj[k]));
		let xml = builder.buildObject(obj);
		if (!xml) reject(new Error('Error while creating xml (buildAnime)'));
		resolve(xml);
	});
}

exports.buildManga = (manga) => {
	return new Promise((resolve, reject) => {
		let obj = {
			chapter: manga.chapter ? parseInt(manga.chapter, 10) : null,
			volume: manga.volume ? parseInt(manga.volume, 10) : null,
			status: manga.status || null,
			score: manga.score ? parseInt(manga.score, 10) : null,
			times_reread: manga.times_reread ? parseInt(manga.times_reread, 10) : null,
			reread_value: manga.reread_value ? parseInt(manga.reread_value, 10) : null,
			date_start: Date.parse(manga.date_start) ? this.buildDate(manga.date_start) : null,
			date_finish: Date.parse(manga.date_finish) ? this.buildDate(manga.date_finish) : null,
			priority: manga.priority ? parseInt(manga.priority, 10) : null,
			enable_discussion: manga.enable_discussion ? parseInt(manga.enable_discussion, 10) : null,
			enable_rereading: manga.enable_rereading ? parseInt(manga.enable_rereading, 10) : null,
			comments: manga.comments ? String(manga.comments) : null,
			scan_group: manga.scan_group ? String(manga.scan_group) : null,
			tags: manga.tags ? String(manga.tags) : null,
			retail_volumes: manga.retail_volumes ? parseInt(manga.retail_volumes, 10) : null
		};
		Object.keys(obj).forEach(k => (obj[k] == null && delete obj[k]));
		let xml = builder.buildObject(obj);
		if (!xml) reject(new Error('Error while creating xml (buildManga)'));
		resolve(xml);
	});
}