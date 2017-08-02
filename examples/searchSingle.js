const Chinmei = require('chinmei');
var myChinmei = new Chinmei('uname', 'passw');

myChinmei.searchSingleManga('aku no hana').then((manga) => {
	console.log(`${manga.title} has ${manga.volumes} volumes and ${manga.chapters} chapters !`);
	/* Aku no Hana has 11 volumes and 58 chapters ! */
}).catch((e) => {
	console.error(e);
});

myChinmei.on('error', (err) => {
	console.error(err);
});