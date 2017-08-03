const Chinmei = require('../index.js');
var myChinmei = new Chinmei(process.env.MAL_USER, process.env.MAL_PASS);

myChinmei.searchMangas('aku no hana').then((mangas) => {
	for (var i = 0; i < mangas.length; i++) {
		console.log(mangas[i].title);
	}
	/*
	Hokuto no Ken - Jagi Gaiden
	Yuuwaku no Hanazono
	Aku no Hana
	Ma no Kougyoku Rosemary: Jubaku no Hanayome
	Seishun Love Juice
	Manga Grimm Douwa: Cinderella - Higyaku no Hanayome
	Akuma Hakushaku no Hanayome: Shiroki Otome to Akai Kajitsu
	Yuurei Hakushaku no Hanayome
	Ibara Koushaku no Hanayome: Kake wo Shimashou, Danna-sama
	Seiyaku no Hanayome to Kirameki no Ou
	Kuro Koushaku no Hanayome Erabi: Migawari ni Natta Cinderella
	Unmei no Proposal: Sannin no Ouji to Shintaku no Hanayome
	Biaku no Hana
	*/
}).catch((e) => {
	console.error(e);
});

myChinmei.on('error', (err) => {
	console.error(err);
});