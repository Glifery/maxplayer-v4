'use strict';

/**
 * Use this command to launch the handler locally
 *
 * sls invoke local -f test
 */
module.exports = class Test {
    /**
     * This method will be called by AWS
     *
     * @param event
     * @param context
     * @param callback
     */
    handler (event, context, callback) {
        // context.callbackWaitsForEmptyEventLoop = false;

        let authData = {
            androidId: 'moviegraph-test',
            masterToken: 'aas_et/AKppINaK8qU6F4980uZY1HjI0ihFDrYuziUXFB9eZKkBci5QMq1SfKxZViWQeddaL8T-WjCjLIYwmLtoEsPVcmH8tGOSA1nPeVun71pHc1ns1Tkydot9u6OEzJOOv_p5agox_u33O0C02MH7wt2Z1jQ='
        };

        var PlayMusic = require('playmusic');
        var pm = new PlayMusic();

        console.log('!start!!!');

        // pm.login({email: "glifery@gmail.com", password: "wrqqe1qwww", androidId: "moviegraph-test"}, function(err, qq,ww,ee) {
        //     if(err) {
        //         console.log('login error!!!');
        //         console.error(err);
        //     };
        //     // place code here
        //     console.log('first!!!!!!', qq,ww,ee);
        // }, (qq,ww,ee) => {
        //     console.log('second!!!!!!', qq,ww,ee);
        //
        // });
        //
        // return;


        // pm.init({email: "glifery@gmail.com", password: "wrqqe1qwww"}, function(err, qq,ww,ee) {
        pm.init({androidId: authData.androidId, masterToken: authData.masterToken}, function(err, qq,ww,ee) {
            if(err) {
                console.log('error!!!');
                console.error(err)
            };

            console.log('success!!');

            let query = event.queryStringParameters.q;

            pm.search(query, 5, function(err, data) { // max 5 results
                let song;

                for (let index in data.entries) {
                    let entry = data.entries[index];

                    if (entry.hasOwnProperty('track')) {
                        song = entry;
                        console.log('track!!');
                        console.log(entry);

                        break;
                    }
                }

                pm.getStreamUrl(song.track.storeId, function(err, streamUrl) {
                    if (err) {
                        console.log('streamUrl-err!!!');
                        console.log(err);
                    }
                    console.log('streamUrl!!!');
                    console.log(streamUrl);

                    callback(null, {
                        statusCode: 301,
                        headers: {
                            'Location': streamUrl
                        }
                    });
                });
            });
        })
    }
};