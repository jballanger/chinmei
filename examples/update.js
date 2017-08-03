const Chinmei = require('chinmei');
var myChinmei = new Chinmei(process.env.MAL_USER, process.env.MAL_PASS);

var anime = {
	id: 777,
	episode: 4,
}

myChinmei.updateAnime(anime).then((res) => {
	console.log(res.body);
	/* Updated */
}).catch((e) => {
	console.error(e);
});

myChinmei.on('error', (err) => {
	console.error(err);
});