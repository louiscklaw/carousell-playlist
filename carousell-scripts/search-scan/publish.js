var ghpages = require('gh-pages');
var fs = require('fs');
var path = require('path');

report_name = path.basename(__dirname);

fs.renameSync('cypress/reports/html/index.html', `cypress/reports/html/${report_name}.html`);

ghpages.publish('cypress/reports/html', { add: true }, () => {
  console.log('publish done');
});
