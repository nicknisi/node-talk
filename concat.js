var fs = require("fs"),
    resolve = require("path").resolve;

var fileData = [],
    interval = null,
    done = false,
    fileDir = resolve(__dirname, 'files');

fs.readdir(fileDir, function (err, files) {
    if (err) {
        console.log("error finding files: " + err);
    } else {
        files.forEach(function (file, index) {
            console.log("filename: " + file);
            fs.readFile(resolve(fileDir, file), "utf8", function (err, data) {
                if (err) {
                    console.log("error reading file: " + err);
                } else {
                    fileData.push(data);
                    if (index === files.length - 1) {
                        done = true;
                    }
                }
            });
        });

        interval = setInterval(function () {
            if (done) {
                fs.writeFile(resolve(__dirname, 'out.txt'), fileData.join("\n"), "utf8", function (err) {
                    if (err) {
                        console.log('Error writing file: ' + err);
                    } else {
                        console.log('done');
                    }
                    clearInterval(interval);
                });
            } else {
                console.log('not done yet');
            }
        }.bind(this), 10);
    }
});
