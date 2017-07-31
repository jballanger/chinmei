'use strict';

global.Promise = require('bluebird');
const _chinmei = require('./lib/Chinmei');

function Chinmei(username, password) {
	return new _chinmei(username, password);
}

module.exports = Chinmei;