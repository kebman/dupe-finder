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
	var contents = fs.readFileAsync(filename).catch(function ignoreDirs() {});
	return Promise.join(stat, contents, function(stat, contents) {
		return {
			stat: stat,
			filename: filename,
			contents: contents
		}
	});
}).each(function(file) {
	if (!file.stat.isDirectory()) {
		var hash = crypto.createHash('md5'), 
		stream = fs.createReadStream(file.filename);
		stream.on('data', function (data) {
			hash.update(data, 'utf8');
		});
		stream.on('end', function () {
		// test output...
			console.log(hash.digest('hex') + "|" + file.filename);
			// console.log(file.stat.atime + " ; " + file.stat.mtime + " ; " + file.stat.ctime + " ; " + file.stat.birthtime);
		});
	}		
});
