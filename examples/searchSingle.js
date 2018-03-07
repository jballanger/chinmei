const Chinmei = require('../index.js');

const myChinmei = new Chinmei(process.env.MAL_USER, process.env.MAL_PASS);

// Using async / await
try {
  const manga = await myChinmei.searchSingleManga('aku no hana');
  console.log(manga);
} catch (e) {
  console.error(e);
}

// Using Promises
myChinmei.searchSingleManga('aku no hana').then((manga) => {
  console.log(manga);
}).catch((e) => {
  console.error(e);
});

/* manga should be equal to something like this:

{
  id: '24705',
  title: 'Aku no Hana',
  english: 'The Flowers of Evil',
  synonyms: 'Blossom of Evil',
  chapters: '58',
  volumes: '11',
  score: '8.20',
  type: 'Manga',
  status: 'Finished',
  start_date: '2009-09-09',
  end_date: '2014-05-09',
  synopsis: 'Kasuga Takao is a boy who loves reading books, particularly Baudelaire&#039;s [i]Les Fleurs du Mal[/i]. A girl at his school, Saeki Nanako, is his muse and his Venus, and he admires her from a distance. One day, he forgets his copy of [i]Les Fleurs du Mal[/i] in the classroom and runs back alone to pick it up. In the classroom, he finds not only his book, but Saeki&#039;s gym uniform. On a mad impulse, he steals it.<br />\r\n<br />\r\nNow everyone knows &quot;some pervert&quot; stole Saeki&#039;s uniform, and Kasuga is dying with shame and guilt. Furthermore, the weird, creepy, and friendless girl of the class, Nakamura, saw him take the uniform. Instead of revealing it was him, she recognizes his kindred deviant spirit and uses her knowledge to take control of his life. Will it be possible for Kasuga to get closer to Saeki, despite Nakamura&#039;s meddling and his dark secret? What exactly does Nakamura intend to do with him?<br />\r\n<br />\r\n(Source: MangaHelpers)',
  image: 'https://myanimelist.cdn-dena.com/images/manga/2/188918.jpg'
}
*/
