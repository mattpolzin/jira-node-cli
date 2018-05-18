module.exports = {
  description: 'Show issue status',
  props: ['issueName'],
  options: [],
  run (issueName) {
    const IssuesDAO = require('../dao/issues-dao');
    const IssuesPrinter = require('../printer/issues-printer');

    return IssuesDAO
      .findIssueByName(issueName)
      .then(IssuesPrinter.printIssueStatus);
  }
};
