var assert = require('assert');
var testCount = 2;
var pc = require('./')({
	fetch : function (key, cb) {
		return cb(null, 'on-demand');
	}
	, fetchAll : function (cb) {
		var tmp = {};

		for (var x = 0; x < 10; x++) {
			tmp[x.toString()] = 'pre-fetched';
		}

		cb(null, tmp);
	}
});

pc.on('ready', function () {
	pc.get('asdf', function (err, data) {
		assert.equal(data, 'on-demand');
		testCount += 1;
	});

	pc.get('1', function (err, data) {
		assert.equal(data, 'pre-fetched');
		testCount += 1;
	});
});

process.on('exit', function () {
	assert.equal(testCount, 2, 'Not all tests completed');
});
