const Chinmei = require('../index.js');

const myChinmei = new Chinmei(process.env.MAL_USER, process.env.MAL_PASS);
const anime = {
  id: 777,
  status: 4,
  episode: 1,
  date_start: new Date(2007,4,25),
  comments: 'my super comments'
};

// Using async / await
try {
  const res = await myChinmei.addAnime(anime);
  console.log(res);
} catch (e) {
  console.error(e);
}

// Using Promises
myChinmei.addAnime(anime).then((res) => {
  console.log(res.body);
}).catch((e) => {
  console.error(e);
});

// res should be equal to 'Created'
