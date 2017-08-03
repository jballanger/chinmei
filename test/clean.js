import test from 'ava';
const Chinmei = require('../index.js');
var myChinmei = new Chinmei(process.env.MAL_USER, process.env.MAL_PASS);

test('deleteAnime', async t => {
	await myChinmei.deleteAnime(1337).then((res) => {
		t.is(res.body, 'Deleted');
	}).catch((e) => {
		t.fail(e);
	});
});

test('deleteManga', async t => {
	await myChinmei.deleteManga(6969).then((res) => {
		t.is(res.body, 'Deleted');
	}).catch((e) => {
		t.fail(e);
	});
});