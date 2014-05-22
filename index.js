var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;

module.exports = function (options) {
	return new PrefetchCache(options);
};

function PrefetchCache (options) {
	var self = this;

	EventEmitter.call(self);

	self.options = options || {};
	self.store = {};

	if (!options.fetch) {
		throw new Error('You must specify options.fetch');
	}

	if (!options.fetchAll || options.prefetch === false) {
		return self.emit('ready');
	}

	options.fetchAll(function (err, store) {
		self.store = store;
	});
}

inherits(PrefetchCache, EventEmitter);

PrefetchCache.get = function (key, cb) {
	var self = this;

	if (self.store[key]) {
		return cb(null, self.store[key]);
	}
	//else

	self.options.fetch(key, function (err, data) {
		self.store[key] = data;
	});
};
