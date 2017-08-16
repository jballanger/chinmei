const Chinmei = require('../index.js');
var myChinmei = new Chinmei(process.env.MAL_USER, process.env.MAL_PASS);

myChinmei.getMalUser('_julien', 2).then((user) => {
	console.log(`${user.myinfo.user_name} has completed ${user.myinfo.user_completed} mangas !`);
	/* _julien has completed 2 mangas ! */
	for (var i = 0; i < user.manga.length; i++) {
		if (user.manga[i].my_status === '2') console.log(user.manga[i].series_title);
	}
	/*
	Imawa no Kuni no Alice
	Aku no Hana
	*/
}).catch((e) => {
	console.error(e);
});

myChinmei.on('error', (err) => {
	console.error(err);
});