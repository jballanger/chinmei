const Chinmei = require('../index.js');

const myChinmei = new Chinmei(process.env.MAL_USER, process.env.MAL_PASS);

// Using async / await
try {
  const mangas = await myChinmei.searchMangas('aku no hana');
  console.log(mangas);
} catch (e) {
  console.error(e);
}

// Using Promises
myChinmei.searchMangas('aku no hana').then((mangas) => {
  console.log(mangas);
}).catch((e) => {
  console.error(e);
});

/* mangas should be equal to somethings like this:

[
  {
    id: '12467',
    title: 'Hokuto no Ken - Jagi Gaiden',
    english: 'The Flower of Carnage: Fist of the North Star Jagi\'s Story',
    synonyms: 'Gokuaku no Hana - Hôkuto no Ken - Jagi Gaiden; Fist of the North Star Ryuken\'s Story: The Judgement Day; Ryuken Gaiden',
    chapters: '16',
    volumes: '2',
    score: '6.79',
    type: 'Manga',
    status: 'Finished',
    start_date: '2008-12-16',
    end_date: '2009-08-07',
    synopsis: 'A deeper look at the childhood and history of Jagi, one of the four Hokuto brothers, and an important villain in the original Hokuto no Ken manga.  <br />\n<br />\nIncludes the one-shot: Hokuto No Ken - Ryuken Gaiden<br />\nAn alternate version explaining the choosing of Ryuuken\'s successor and the nuclear apocalypse in the Hokuto No Ken universe. ',
    image: 'https://myanimelist.cdn-dena.com/images/manga/5/22239.jpg'
  }, {
    id: '21244',
    title: 'Yuuwaku no Hanazono',
    english: 'Flower Garden of Temptation',
    synonyms: 'Okaasan to Issho♥; Man-ken Moratorium; Hana ni Mizu wo♥Yarimashou; Yukata ni Kigaetara; Madobe no Kimi♥; H na Musume',
    chapters: '10',
    volumes: '1',
    score: '6.78',
    type: 'Manga',
    status: 'Finished',
    start_date: '2006-04-05',
    end_date: '2007-04-11',
    synopsis: '1. Hanazono<br />\r\n2-3. Man-ken<br />\r\n4. Okaasan to Issho&hearts;<br />\r\n5-6. Man-ken Moratorium<br />\r\n7. Hana ni Mizu wo&hearts;Yarimashou<br />\r\n8. Yukata ni Kigaetara<br />\r\n9. Madobe no Kimi&hearts;<br />\r\n10. H na Musume',
    image: 'https://myanimelist.cdn-dena.com/images/manga/3/173031.jpg'
  }, {
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
  },
  ...
]
*/
