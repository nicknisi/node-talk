var fs = require("fs"),
    comb = require("comb"),
    resolve = require("path").resolve;

var fileData = [],
    interval = null,
    done = false,
    fileDir = resolve(__dirname, 'files');

var fsp = {
    readdir: comb.wrap(fs.readdir, fs),
    readFile: comb.wrap(fs.readFile, fs),
    writeFile: comb.wrap(fs.writeFile, fs)
};

comb.async.forEach(fsp.readdir(fileDir), function (file, index) {
    var ret = new comb.Promise();
    fsp.readFile(resolve(fileDir, file)).then(function (data) {
        fileData.push(data);
        ret.callback();
    });
    return ret.promise();
}).then(function () {
    fsp.writeFile(resolve(__dirname, 'out.promise.txt'), fileData.join("\n"), "utf8").then(function () {
        console.log('done');
    });
}, function (err) {
    console.log("There was an error: " + err);
});

