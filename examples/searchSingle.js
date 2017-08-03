const Chinmei = require('../index.js');
var myChinmei = new Chinmei(process.env.MAL_USER, process.env.MAL_PASS);

myChinmei.searchSingleManga('aku no hana').then((manga) => {
	console.log(`${manga.title} has ${manga.volumes} volumes and ${manga.chapters} chapters !`);
	/* Aku no Hana has 11 volumes and 58 chapters ! */
}).catch((e) => {
	console.error(e);
});

myChinmei.on('error', (err) => {
	console.error(err);
});