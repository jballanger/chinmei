'use strict';

const fetch = require('node-fetch');
const xml2js = require('xml2js');
const builder = new xml2js.Builder({rootName: 'entry', renderOpts: {'pretty': false}});

exports.search = (type, name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`https://myanimelist.net/search/prefix.json?type=${type}&keyword=${name}`);
      if (!res.ok) reject(`${res.status} - ${res.statusText}`);
      else {
        const json = await res.json();
        resolve(json.categories[0].items[0].name);
      }
    } catch (e) {
      reject(e);
    }
  });
}

exports.formatUser = (body) => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(body, (err, res) => {
      if (err) reject(err);
      else {
        const user = Object.assign({}, res.user);
        Object.keys(user).map(k => user[k] = user[k][0]);
        resolve(user);
      }
    });
  });
}

exports.formatMalUser = (body, type) => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(body, function(err, res) {
      if (err) reject(err);
      else if (res.myanimelist.length < 1) reject('User not found');
      else {
        const user = Object.assign({}, res.myanimelist);
        user.myinfo = user.myinfo[0];
        Object.keys(user.myinfo).map(k => user.myinfo[k] = user.myinfo[k][0]);
        if (user[type]) {
          Object.keys(user[type]).map((k) => {
            Object.keys(user[type][k]).map((l) => {
              user[type][k][l] = user[type][k][l][0];
            });
          });
        } else user[type] = [];
        resolve(user);
      }
    });
  });
}

exports.formatSingle = (body, type, title) => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(body, function(err, res) {
      if (err) reject(err);
      else {
        const results = res[type].entry;
        const index = results.findIndex(r => r.title[0] === title);
        const ret = (index === -1) ? results[0] : results[index];
        Object.keys(ret).map(k => ret[k] = ret[k][0]);
        resolve(ret);
      }
    });
  });
}

exports.formatMultiple = (body, type) => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(body, function(err, res) {
      if (err) reject(err);
      else {
        const results = res[type].entry;
        Object.keys(results).map((k) => {
          Object.keys(results[k]).map((l) => {
            results[k][l] = results[k][l][0];
          });
        });
        resolve(results);
      }
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