import test from 'ava';
const Chinmei = require('../index.js');
var myChinmei = new Chinmei(process.env.MAL_USER, process.env.MAL_PASS);

test('deleteAnime', async (t) => {
	try {
		const anime = await myChinmei.deleteAnime(1337);
		t.is(anime, 'Deleted');
	} catch (e) {
		t.fail(e);
	}
});

test('deleteManga', async (t) => {
	try {
		const manga = await myChinmei.deleteManga(6969);
		t.is(manga, 'Deleted');
	} catch (e) {
		t.fail(e);
	}
});