module.exports = {
  description: 'Create new issue',
  props: [],
  options: [{ syntax: '-p, --projectId [projectId]', description: ""},
            { syntax: '-i, --issueTypeId [issueTypeId]', description: ""},
            { syntax: '-s --summary [summary]', description: ""}],
  run (params) {
    const IssuesDAO = require('../dao/issues-dao');
    const ProjectsInquirer = require('../inquirer/projects-inquirer');
    const IssuesInquirer = require('../inquirer/issues-inquirer');
    const PrintUtils = require('../utils/print-utils');

    if (params.projectId != null && params.issueTypeId != null && params.summary != null) {

      return IssuesDAO.createIssue({
        summary: params.summary,
        description: "",
        issueTypeId: params.issueTypeId,
        projectId: params.projectId
      }).then(({ key }) => PrintUtils.printLine(`Issue '${key}' successfully created`, 'green'));
    }

    return ProjectsInquirer
      .chooseProject()
      .then(IssuesInquirer.getIssueParameters)
      .then(IssuesDAO.createIssue)
      .then(({ key }) => PrintUtils.printLine(`Issue '${key}' successfully created`, 'green'));
  }
};
