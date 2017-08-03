const Chinmei = require('../index.js');
var myChinmei = new Chinmei(process.env.MAL_USER, process.env.MAL_PASS);

myChinmei.getUser().then((user) => {
	console.log(`Hello ${user.username} ! (${user.id})`);
	/* Hello _julien ! (6338595) */
}).catch((e) => {
	console.error(e);
});

myChinmei.on('error', (err) => {
	console.error(err);
});