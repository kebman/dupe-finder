// generate and compare a list of files with stat and hash… without using sqlite3
// …while using file streaming with promises
// milestone 1 reached: read dir A and output fname, stat and hashes using promises
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var crypto = require('crypto');

// terminal or console argument handling
/*
if (process.argv.length < 3) {
	console.log("Usage: node nondb.js pathB");
	process.exit(1);
}

var pathB = "";

if (process.argv.length = 4) {
	console.log(process.argv[2]);
	pathB = process.argv.[2];
}
*/
// for now, though, we'll just set pathB to test/
// var pathB = "/home/kebman/Desktop/node_local_projects/dupeFinder/test";

var readdirPromise = fs.readdirAsync(".").map(function(fileName) {
	var statPromise = fs.statAsync(fileName);
	
	return Promise.join(statPromise, fileName, function(statPromise, fileName) {
		
		if(statPromise.isFile()) {

			function makeStream(file, callback) {
				var result = fs.createReadStream(file);
				return callback(result);
			}

			function process(stream) {
				var hash = crypto.createHash('md5'); 
				var dig = "";
				return new Promise(function(resolve, reject) {
					stream.on('data', function updateProcess(chunk) {
						hash.update(chunk, 'utf8');
					});
					stream.on('end', resolve);
				}).then(function publish() {
					var digest = hash.digest('hex');
					dig = digest;
					console.log(digest + ": "+ fileName+ " - "+statPromise.size+ " bytes");
					// return digest;
				});
			}

			makeStream(fileName, process);

		} // endif

	});
	
});
