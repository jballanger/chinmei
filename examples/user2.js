const Chinmei = require('chinmei');
var myChinmei = new Chinmei('baduname', 'badpassw');
/* Error: Failed to login on MyAnimeList (401) */

myChinmei.setUser('uname', 'passw');
myChinmei.getUser().then((user) => {
	console.log(`Hello ${user.username} ! (${user.id})`);
	/* Hello uname ! (19283746) */
}).catch((e) => {
	console.error(e);
});

myChinmei.on('error', (err) => {
	console.error(err);
});