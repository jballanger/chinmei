const Chinmei = require('chinmei');
var myChinmei = new Chinmei(process.env.MAL_USER, process.env.MAL_PASS);

myChinmei.deleteAnime(777).then((res) => {
	console.log(res.body);
	/* Deleted */
}).catch((e) => {
	console.error(e);
});

myChinmei.on('error', (err) => {
	console.error(err);
});