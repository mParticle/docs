const path = require('path');

function updatePartners(output) {
    const http = require('https');
    const fs = require('fs');
    var url = `https://websiteapi.mparticle.com/partners`;
    const request = http.get(url, function(res) {
        if (res.statusCode != 200) {
            console.error('Error while updating partner integrations: ' + res.statusCode);
            process.exit(1);
            return;
        }

        var body = '';

        res.on('data', function(chunk){
            body += chunk;
        });

        res.on('end', function(){
            var jsonObject = JSON.parse(body);

            fs.writeFile(output, JSON.stringify(jsonObject, null, 4), function(err, result) {
                if(err) console.log('error', err);
            });
        });
    
    });
}
console.log("Updating partners.json");
var filePath = path.normalize('./src/services/partners.json')
updatePartners(filePath);


