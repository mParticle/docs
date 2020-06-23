const axios = require('axios');

const args = process.argv.slice(2);
const issueId = args[0];
const message = args[1];
const token = args[2];

if (!message) {
  throw new Error('Message is required');
}

if (!issueId) {
  throw new Error('IssueID is required');
}

if (!token) {
  throw new Error('Github Token is required');
}

const githubCommentsUrl = `https://git.corp.mparticle.com/api/v3/repos/mParticle/docsite/issues/${issueId}/comments`;
const config = {
  headers: {
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/json',
  },
};

console.log('url', githubCommentsUrl);
axios
  .get(githubCommentsUrl)
  .then(({ data }) => {
    const comment = data.filter((d) => d.body === message)[0];

    if (comment) {
      console.log('update url', comment.url);
      axios
        .patch(comment.url, { body: message }, config)
        .then(({ data }) => {
          console.log('updated comment', message);
        })
        .catch((error) => {
          console.error(error.response.statusText);
        });
    } else {
      console.log('create url', githubCommentsUrl);
      axios
        .post(githubCommentsUrl, { body: message }, config)
        .then(({ data }) => {
          console.log('created comment', message);
        })
        .catch((error) => {
          console.error(error.response.statusText);
        });
    }
  })
  .catch((error) => {
    console.error(error.response.statusText);
  });
