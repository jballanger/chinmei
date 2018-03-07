const Chinmei = require('../index.js');

const myChinmei = new Chinmei(process.env.MAL_USER, process.env.MAL_PASS);
const anime = {
  id: 777,
  episode: 4,
};

//Using async / await
try {
  const res = await updateAnime(anime);
  console.log(res);
} catch (e) {
  console.error(e);
}

// Using Promises
myChinmei.updateAnime(anime).then((res) => {
  console.log(res);
}).catch((e) => {
  console.error(e);
});

// res should be equal to 'Updated'
