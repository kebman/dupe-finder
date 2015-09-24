var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var crypto = require('crypto');

// namespaced properties and methods...
var df = {
	id: 0,
	filename: "",
	md5: "",
	size: 0,
	mtime: "",
	btime: "",
	age: 0,
	dashes: 	"................................",
	checksum: function(data, algorithm, encoding) {
		var hash = crypto.createHash('md5').update(data, 'utf8').digest('hex');
		return hash;
	}
};

// iterate asyncronously trough a directory of files and do some magic...
fs.readdirAsync('.').map(function(filename) {
	var stat = fs.statAsync(filename);
	return Promise.join(stat, function(stat) {
		return {
			stat: stat,
			name: filename
		}
	});
}).each(function(file) {
	if (!file.stat.isDirectory()) {
		var hash = crypto.createHash('md5'), 
		stream = fs.createReadStream(file.name);
		stream.on('data', function (data) {
			hash.update(data, 'utf8');
		});
		stream.on('end', function () {
			// test output...
			console.log(hash.digest('hex') + "|" + file.name);
			// console.log(file.stat.atime + " ; " + file.stat.mtime + " ; " + file.stat.ctime + " ; " + file.stat.birthtime);
		});
	}		
});
