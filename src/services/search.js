export function performSearch(term, retry) {
    if (!term || term.length < 3) {
        return Promise.resolve({
            term: term,
            time: Date.now(),
            results: null
        });
    }
    let time = Date.now();
    var AWS = require('aws-sdk/dist/aws-sdk-react-native');
    var csd = new AWS.CloudSearchDomain({
        region: 'us-east-1',
        endpoint: 'https://v3tm0bfimc.execute-api.us-east-1.amazonaws.com/prod'
    });

    var params = {
      query: term,
      highlight: '{"content":{"format": "html"}}'
    };

    return csd.search(params).promise()
        .then(function (data) {
            if (data && data.hits && data.hits.found > 0) {
                return {
                    term: term,
                    time: time,
                    results: data.hits.hit
                };
            }
            if (window.mParticle) {
                    mParticle.logEvent(
                    'Search - Empty',
                    mParticle.EventType.Other,
                    {
                        search: term,
                    }
                );
            }
            return {
                    term: term,
                    time: time,
                    results: null
            };
        });
}
