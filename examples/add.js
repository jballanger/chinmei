const Chinmei = require('chinmei');
var myChinmei = new Chinmei(process.env.MAL_USER, process.env.MAL_PASS);

var anime = {
	id: 777,
	status: 4,
	episode: 1,
	date_start: new Date(2007,4,25),
	comments: 'my super comments'
}

myChinmei.addAnime(anime).then((res) => {
	console.log(res.body);
	/* Created */
	/* or */
	/* The anime (id: 777) is already in the list. */
}).catch((e) => {
	console.error(e);
});

myChinmei.on('error', (err) => {
	console.error(err);
});