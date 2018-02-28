const axios = require('axios');
const ConfigurationUtils = require('./ConfigurationUtils');
const { TOKEN, API_URL } = ConfigurationUtils.readConfiguration();

module.exports = {
  fetch (url) {
    const headers = {
      'Authorization': 'Basic ' + TOKEN
    };

    return axios
      .get(`${API_URL}/rest/api/latest${url}`, { headers })
      .then(response => response.data);
  },

  fetchIssuesUsingJQL (jql) {
    return module.exports.fetch(`/search?jql=${jql}`);
  }
};