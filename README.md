# chinmei [![npm version](https://badge.fury.io/js/chinmei.svg)](https://badge.fury.io/js/chinmei) [![Travis CI Build Status](https://travis-ci.org/jballanger/chinmei.svg?branch=master)](https://travis-ci.org/jballanger/chinmei)
Node.js wrapper for MyAnimeList API

<p align="center">
  <img src="https://vignette1.wikia.nocookie.net/samuraideeprkyo/images/6/67/Chinmei.jpg" alt="Chinmei"/>
</p>

## Description

Chinmei is a wrapper for MyAnimeList API.
The strong point of Chinmei is the providing of a more accurate search with `searchSingleAnime` and `searchSingleManga` than the search method from MAL API.

## Table of contents

- [Install](#install)
- [Usage](#usage)
- [Methods](#methods)
    - [User](#user)
    - [Search](#search)
    - [Anime and Manga](#anime-and-manga)
- [Models](#models)
    - [User](#user-model)
    - [Anime](#anime-model)
    - [Manga](#manga-model)

## Install

```
npm install chinmei
```

## Usage

```js
const Chinmei = require('chinmei');

var myChinmei = new Chinmei(username, password);
```

More examples are available in `examples/`.

## Methods


### User

#### `setUser()`
Change the current MyAnimeList user.

#### `getUser()`
Get the current user's id and username.

returns [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[User](#user-model)>

#### `verifyAuth()`
Check if the user is valid.

returns [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

#### `getMalUser()`
Get informations about a MyAnimeList user.

| Parameter | Type | Description | Notes |
| --------- | ---- | ----------- | ----- |
| name | string | Name of the user you are looking for | |
| type | int | The type of information you want | 1 = Anime, 2 = Manga (Default to anime) |
| status | string | Status of information you are looking for | ? (Default to 'all') |

returns [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[MalUser](https://myanimelist.net/malappinfo.php?u=_julien&type=manga&status=all)>

### Search

#### `searchAnimes(name)`
Search for animes that correspond more or less.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| name | string | Name of the animes you are looking for |

returns [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Animes](https://myanimelist.net/modules.php?go=api#animemangasearch)>

#### `searchMangas(name)`
Search for mangas that correspond more or less.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| name | string | Name of the mangas you are looking for |

returns [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Mangas](https://myanimelist.net/modules.php?go=api#animemangasearch)>

#### `searchSingleAnime(name)`
Search for a single anime (more accurate than `searchAnimes()`).

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| name | string | Name of the anime you are looking for |

returns [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Anime](https://myanimelist.net/modules.php?go=api#animemangasearch)>

#### `searchSingleManga(name)`
Search for a single manga (more accurate than `searchMangas()`).

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| name | string | Name of the manga you are looking for |

returns [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Manga](https://myanimelist.net/modules.php?go=api#animemangasearch)>


### Anime and Manga

#### `addAnime(anime)` & `addManga(manga)`
Add an anime/manga to the current user's anime/manga list.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| anime | object | [Anime model](#anime-model) |
| manga | object | [Manga model](#manga-model) |

returns [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) containing response body

#### `updateAnime(anime)` & `updateManga(manga)`
Update an anime/manga of the current user's anime/manga list.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| anime | object | [Anime model](#anime-model) |
| manga | object | [Manga model](#manga-model) |

returns [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) containing response body

#### `deleteAnime(id)` & `deleteManga(id)`
Delete an anime/manga of the current user's anime/manga list.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | int | Id of the anime / manga you want to delete |

returns [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) containing response body


## Models


#### Notes
Even you pass a variable with a wrong type (eg: `episode` as `'0'` instead of `0`) it will not cause any problem since Chinmei convert each value in the right type before sending them to MyAnimeList !


### User model

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | string | Current user's id |
| username | string | Current user's username |


### Anime model

| Parameter | Type | Description | Notes |
| --------- | ---- | ----------- | ----- |
| id | int | id of the anime | |
| episode | int | Number of episode viewed | |
| status | int    string | Status of the anime | 1/watching, 2/completed, 3/onhold, 4/dropped, 6/plantowatch |
| score | int | Score of the anime | Minimum is 1, maximum is 10 |
| storage_type | int | Type of storage you have for this anime | 1 = Hard Drive, 2 = DVD/CD, 3 = None, 4 = Retail DVD, 5 = VHS, 6 = External HD, 7 = NAS, 8 = Blu-ray |
| storage_value | float | Value of storage | If storage_type = 1, storage_value will correspond to **Total drive space (GB)**. If storage_type = 8, it will be **Total Blu-ray's** |
| times_rewatched | int | How many time you re-watched this anime | |
| rewatch_value | int | Rewatch rating to show how likely it is that you will watch it again | 1 = Very low, 2 = Low, 3 = Medium, 4 = High, 5 = Very high |
| date_start | date | When you started watching this anime | Date format doesn't matter, but should at least contain **Year**, **Month** and **Day** |
| date_finish | date | When you finished this anime | Date format doesn't matter, but should at least contain **Year**, **Month** and **Day** |
| priority | int | Your priority level to watch this anime | 0 = Low, 1 = Medium, 2 = High |
| enable_discussion | int | ? | 0 = No, 1 = Yes |
| enable_rewatching | int | If you are currently rewatching this anime | 0 = No, 1 = Yes |
| comments | string | Comments about this anime | |
| tags | string | Tags about this anime | You should separate your tags with commas |


### Manga model

| Parameter | Type | Description | Notes |
| --------- | ---- | ----------- | ----- |
| id | int | id of the manga | |
| chapter | int | Number of chapter read | |
| volume | int | Number of volume read | |
| status | int    string | Status of the manga | 1/reading, 2/completed, 3/onhold, 4/dropped, 6/plantoread |
| score | int | Score of the manga | Minimum is 1, maximum is 10 |
| times_reread | int | How many time you have reread this manga | |
| reread_value | int | Reread rating to show how likely it is that you will read it again | 1 = Very low, 2 = Low, 3 = Medium, 4 = High, 5 = Very high |
| date_start | date | When you started reading this manga | Date format doesn't matter, but should at least contain **Year**, **Month** and **Day** |
| date_finish | date | When you finished this manga | Date format doesn't matter, but should at least contain **Year**, **Month** and **Day** |
| priority | int | Your priority level to read this manga | 0 = Low, 1 = Medium, 2 = High |
| enable_discussion | int | ? | 0 = No, 1 = Yes |
| enable_rereading | int | If you are currently rereading this manga | 0 = No, 1 = Yes |
| comments | string | Comments about this manga | |
| scan_group | string | ? | |
| tags | string | Tags about this manga | You should separate your tags with commas |
| retail_volumes | int | How many retail volumes of this manga you have | |
