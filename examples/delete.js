const Chinmei = require('../index.js');

const myChinmei = new Chinmei(process.env.MAL_USER, process.env.MAL_PASS);

// Using async / await
try {
  const res = await myChinmei.deleteAnime(777);
  console.log(res);
} catch (e) {
  console.error(e);
}

// Using Promises
myChinmei.deleteAnime(777).then((res) => {
  console.log(res);
}).catch((e) => {
  console.error(e);
});

// res should be equal to 'Deleted'
