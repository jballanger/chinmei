const Chinmei = require('../index.js');

const myChinmei = new Chinmei(process.env.MAL_USER, process.env.MAL_PASS);

// Using async / await
try {
  const user = await myChinmei.getUser();
  console.log(user);
} catch (e) {
  console.error(e);
}

myChinmei.getUser().then((user) => {
  console.log(user);
}).catch((e) => {
  console.error(e);
});

/* user should be equal to something like this:

{
  id: '6338595',
  username: '_julien'
}
*/
