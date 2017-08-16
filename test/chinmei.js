import test from 'ava';
const Chinmei = require('../index.js');
const Utils = require('./Utils');
var myChinmei = new Chinmei(process.env.MAL_USER, process.env.MAL_PASS);
var exampleVar = new Utils();

test('getUser', async t => {
	await myChinmei.getUser().then((user) => {
		t.is(user.username, '_julien');
	}).catch((e) => {
		t.fail(e);
	});
});

test('getMalUser', async t => {
	await myChinmei.getMalUser('_julien').then((user) => {
		t.is(user.myinfo.user_name, '_julien');
	}).catch((e) => {
		t.fail(e);
	});
});

test('searchSingleAnime', async t => {
	await myChinmei.searchSingleAnime('kaiji u').then((anime) => {
		t.is(anime.title, 'Gyakkyou Burai Kaiji: Ultimate Survivor');
	}).catch((e) => {
		t.fail(e);
	});
});

test('searchSingleManga', async t => {
	await myChinmei.searchSingleManga('blossom of evil').then((manga) => {
		t.is(manga.title, 'Aku no Hana');
	}).catch((e) => {
		t.fail(e);
	});
});

test('searchAnimes', async t => {
	await myChinmei.searchAnimes('gintama').then((animes) => {
		t.true(animes.length > 1);
	}).catch((e) => {
		t.fail(e);
	});
});

test('searchMangas', async t => {
	await myChinmei.searchMangas('one piece').then((mangas) => {
		t.true(mangas.length > 1);
	}).catch((e) => {
		t.fail(e);
	});
});

test('addAnime', async t => {
	await myChinmei.addAnime(exampleVar.animeAdd).then((res) => {
		t.is(res.body, 'Created');
	}).catch((e) => {
		t.fail(e);
	});
});

test('updateAnime', async t => {
	await myChinmei.updateAnime(exampleVar.animeUpdate).then((res) => {
		t.is(res.body, 'Updated');
	}).catch((e) => {
		t.fail(e);
	});
});

test('addManga', async t => {
	await myChinmei.addManga(exampleVar.mangaAdd).then((res) => {
		t.is(res.body, 'Created');
	}).catch((e) => {
		t.fail(e);
	});
});

test('updateManga', async t => {
	await myChinmei.updateManga(exampleVar.mangaUpdate).then((res) => {
		t.is(res.body, 'Updated');
	}).catch((e) => {
		t.fail(e);
	});
});