'use strict';

const Utils = require('./Utils');
const fetch = require('node-fetch');
const whatmgUrl = require('url');

const { URL } = whatmgUrl;
const { URLSearchParams } = require('url');

class Chinmei {
  constructor(username, password) {
    this.utils = Utils;
    this.setUser(username, password);
  }

  setUser(username = '', password = '') {
    this.auth = 'https://'+username+':'+password+'@';
    this.verifyAuth()
      .catch((e) => {
        throw new Error(`Failed to login on MyAnimeList: ${e}`);
      });
  }

  verifyAuth() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(new URL(`${this.auth}myanimelist.net/api/account/verify_credentials.xml`));
        if (!res.ok) reject(`${res.status} - ${res.statusText}`);
        else {
          const body = await res.text();
          resolve(body);
        }
      } catch (e) {
        reject(`Couldn't fetch MyAnimeList API: ${e}`);
      }
    });
  }

  getUser() {
    return new Promise(async (resolve, reject) => {
      try {
        const auth = await this.verifyAuth();
        const user = await this.utils.formatUser(auth);
        resolve(user);
      } catch (e) {
        reject(`Error occured on getUser method: ${e}`);
      }
    });
  }

  getMalUser(user = '', type = 1, status = 'all') {
    return new Promise(async (resolve, reject) => {
      const t = (type == 1 ? 'anime' : 'manga');
      try {
        const res = await fetch(new URL(`https://myanimelist.net/malappinfo.php?u=${user}&type=${t}&status=${status}`));
        if (!res.ok) reject(`${res.status} - ${res.statusText}`);
        else {
          const body = await res.text();
          const malUser = await this.utils.formatMalUser(body, t);
          resolve(malUser);
        }
      } catch (e) {
        reject(`Error occured on getMalUser method: ${e}`);
      }
    });
  }

  searchSingleAnime(name = '') {
    return new Promise(async (resolve, reject) => {
      try {
        const search = await this.utils.search('anime', name);
        const res = await fetch(new URL(`${this.auth}myanimelist.net/api/anime/search.xml?q=${search}`));
        if (!res.ok) reject(`${res.status} - ${res.statusText}`);
        else {
          const body = await res.text();
          const anime = await this.utils.formatSingle(body, 'anime', search);
          resolve(anime);
        }
      } catch (e) {
        reject(e);
      }
    });
  }
  
  searchSingleManga(name = '') {
    return new Promise(async (resolve, reject) => {
      try {
        const search = await this.utils.search('manga', name);
        const res = await fetch(new URL(`${this.auth}myanimelist.net/api/manga/search.xml?q=${search}`));
        if (!res.ok) reject(`${res.status} - ${res.statusText}`);
        else {
          const body = await res.text();
          const manga = await this.utils.formatSingle(body, 'manga', search);
          resolve(manga);
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  searchAnimes(name = '') {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(new URL(`${this.auth}myanimelist.net/api/anime/search.xml?q=${name}`));
        if (!res.ok) reject(`${res.status} - ${res.statusText}`);
        else {
          const body = await res.text();
          const animes = await this.utils.formatMultiple(body, 'anime');
          resolve(animes);
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  searchMangas(name = '') {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(new URL(`${this.auth}myanimelist.net/api/manga/search.xml?q=${name}`));
        if (!res.ok) reject(`${res.status} - ${res.statusText}`);
        else {
          const body = await res.text();
          const mangas = await this.utils.formatMultiple(body, 'manga');
          resolve(mangas);
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  addAnime(anime = {}) {
    return new Promise(async (resolve, reject) => {
      if (!anime.id) reject('Invalid anime id');
      else {
        try {
          const build = await this.utils.buildAnime(anime);
          const params = new URLSearchParams();
          params.append('data', build);
          const opts = { method: 'POST', body: params };
          const res = await fetch(new URL(`${this.auth}myanimelist.net/api/animelist/add/${anime.id}.xml`), opts);
          if (!res.ok) reject(`${res.status} - ${res.statusText}`);
          else {
            const body = res.text();
            resolve(body);
          }
        } catch (e) {
          reject(e);
        }
      }
    });
  }
  
  updateAnime(anime = {}) {
    return new Promise(async (resolve, reject) => {
      if (!anime.id) reject('Invalid anime id');
      else {
        try {
          const build = await this.utils.buildAnime(anime);
          const params = new URLSearchParams();
          params.append('data', build);
          const opts = { method: 'POST', body: params };
          const res = await fetch(new URL(`${this.auth}myanimelist.net/api/animelist/update/${anime.id}.xml`), opts);
          if (!res.ok) reject(`${res.status} - ${res.statusText}`);
          else {
            const body = res.text();
            resolve(body);
          }
        } catch (e) {
          reject(e);
        }
      }
    });
  }

  deleteAnime(id) {
    return new Promise(async (resolve, reject) => {
      if (!id) reject(new Error('Invalid anime id'));
      try {
        const res = await fetch(new URL(`${this.auth}myanimelist.net/api/animelist/delete/${id}.xml`));
        if (!res.ok) reject(`${res.status} - ${res.statusText}`);
        else {
          const body = await res.text();
          resolve(body);
        }
      } catch (e) {
        reject(`Error occured on deleteAnime method: ${e}`);
      }
    });
  }

  addManga(manga = {}) {
    return new Promise(async (resolve, reject) => {
      if (!manga.id) reject('Invalid manga id');
      else {
        try {
          const build = await this.utils.buildManga(manga);
          const params = new URLSearchParams();
          params.append('data', build);
          const opts = { method: 'POST', body: params };
          const res = await fetch(new URL(`${this.auth}myanimelist.net/api/mangalist/add/${manga.id}.xml`), opts);
          if (!res.ok) reject(`${res.status} - ${res.statusText}`);
          else {
            const body = res.text();
            resolve(body);
          }
        } catch (e) {
          reject(e);
        }
      }
    });
  }
  
  updateManga(manga = {}) {
    return new Promise(async (resolve, reject) => {
      if (!manga.id) reject('Invalid manga id');
      else {
        try {
          const build = await this.utils.buildManga(manga);
          const params = new URLSearchParams();
          params.append('data', build);
          const opts = { method: 'POST', body: params };
          const res = await fetch(new URL(`${this.auth}myanimelist.net/api/mangalist/update/${manga.id}.xml`), opts);
          if (!res.ok) reject(`${res.status} - ${res.statusText}`);
          else {
            const body = res.text();
            resolve(body);
          }
        } catch (e) {
          reject(e);
        }
      }
    });
  }

  deleteManga(id) {
    return new Promise(async (resolve, reject) => {
      if (!id) reject(new Error('Invalid manga id'));
      try {
        const res = await fetch(new URL(`${this.auth}myanimelist.net/api/mangalist/delete/${id}.xml`));
        if (!res.ok) reject(`${res.status} - ${res.statusText}`);
        else {
          const body = await res.text();
          resolve(body);
        }
      } catch (e) {
        reject(`Error occured on deleteAnime method: ${e}`);
      }
    });
  }
}

module.exports = Chinmei;