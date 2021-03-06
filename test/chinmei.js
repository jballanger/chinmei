import test from 'ava';
const Chinmei = require('../index.js');
const Utils = require('./Utils');
var myChinmei = new Chinmei(process.env.MAL_USER, process.env.MAL_PASS);
var exampleVar = new Utils();

test('getUser', async (t) => {
	try {
		const user = await myChinmei.getUser();
		t.is(user.username, process.env.MAL_USER);
	} catch (e) {
		t.fail(e);
	}
});

test('getMalUser', async (t) => {
	try {
		const malUser = await myChinmei.getMalUser(process.env.MAL_USER);
		t.is(malUser.myinfo.user_name, process.env.MAL_USER);
	} catch (e) {
		t.fail(e);
	}
});

test('searchSingleAnime', async (t) => {
	try {
		const anime = await myChinmei.searchSingleAnime('kaiji u');
		t.is(anime.title, 'Gyakkyou Burai Kaiji: Ultimate Survivor');
	} catch (e) {
		t.fail(e);
	}
});

test('searchSingleManga', async (t) => {
	try {
		const manga = await myChinmei.searchSingleManga('blossom of evil');
		t.is(manga.title, 'Aku no Hana');
	} catch (e) {
		t.fail(e);
	}
});

test('searchAnimes', async (t) => {
	try {
		const animes = await myChinmei.searchAnimes('gintama');
		t.true(animes.length > 2);
	} catch (e) {
		t.fail(e);
	}
});

test('searchMangas', async (t) => {
	try {
		const mangas = await myChinmei.searchMangas('one piece');
		t.true(mangas.length > 2);
	} catch (e) {
		t.fail(e);
	}
});

test('addAnime', async (t) => {
	try {
		const anime = await myChinmei.addAnime(exampleVar.animeAdd);
		t.is(anime, 'Created');
	} catch (e) {
		t.fail(e);
	}
});

test('updateAnime', async (t) => {
	try {
		const anime = await myChinmei.updateAnime(exampleVar.animeUpdate);
		t.is(anime, 'Updated');
	} catch (e) {
		t.fail(e);
	}
});

test('addManga', async (t) => {
	try {
		const manga = await myChinmei.addManga(exampleVar.mangaAdd);
		t.is(manga, 'Created');
	} catch (e) {
		t.fail(e);
	}
});

test('updateManga', async (t) => {
	try {
		const manga = await myChinmei.updateManga(exampleVar.mangaUpdate);
		t.is(manga, 'Updated');
	} catch (e) {
		t.fail(e);
	}
});