const Chinmei = require('../index.js');

const myChinmei = new Chinmei(process.env.MAL_USER, process.env.MAL_PASS);

// Using async / await
try {
  const malUser = await myChinmei.getMalUser('_julien', 2);
  console.log(malUser);
} catch (e) {
  console.error(e);
}

// Using Promises
myChinmei.getMalUser('_julien', 2).then((malUser) => {
  console.log(malUser);
}).catch((e) => {
  console.error(e);
});

/* malUser should be equal to something like this:

{
  myinfo: { 
    user_id: '6338595',
    user_name: '_julien',
    user_reading: '1',
    user_completed: '2',
    user_onhold: '0',
    user_dropped: '0',
    user_plantoread: '0',
    user_days_spent_watching: '4.00'
  },
  manga: [
    { 
      series_mangadb_id: '33031',
      series_title: 'Imawa no Kuni no Alice',
      series_synonyms: '; Alice in Borderland',
      series_type: '1',
      series_chapters: '87',
      series_volumes: '18',
      series_status: '2',
      series_start: '2010-11-25',
      series_end: '2016-03-02',
      series_image: 'https://myanimelist.cdn-dena.com/images/manga/3/137237.jpg',
      my_id: '60930036',
      my_read_chapters: '87',
      my_read_volumes: '18',
      my_start_date: '0000-00-00',
      my_finish_date: '0000-00-00',
      my_score: '0',
      my_status: '2',
      my_rereadingg: '0',
      my_rereading_chap: '0',
      my_last_updated: '1502876132',
      my_tags: ''
    }, {
      series_mangadb_id: '24705',
      series_title: 'Aku no Hana',
      series_synonyms: 'Blossom of Evil; The Flowers of Evil',
      series_type: '1',
      series_chapters: '58',
      series_volumes: '11',
      series_status: '2',
      series_start: '2009-09-09',
      series_end: '2014-05-09',
      series_image: 'https://myanimelist.cdn-dena.com/images/manga/2/188918.jpg',
      my_id: '61367144',
      my_read_chapters: '58',
      my_read_volumes: '11',
      my_start_date: '0000-00-00',
      my_finish_date: '0000-00-00',
      my_score: '10',
      my_status: '2',
      my_rereadingg: '0',
      my_rereading_chap: '0',
      my_last_updated: '1502877583',
      my_tags: ''
    }
  ]
}
*/
