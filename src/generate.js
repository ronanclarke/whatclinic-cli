require('../config/common.config');
var
  moment = require('moment'),
  Handlebars = require('handlebars')
fs = require('fs');

module.exports = {

  exec: function (type, options) {

    if (!common.isSaneEnv())
      return;

    this.migration();
  },

  //
  // generate blank migrate file
  //
  migration: function (options) {

    // check if we haven't just added a new file

    var fileName = this.buildFileName("test for now");
    var folderPath = this.buildDbFolderPath();
    var outputFilePath = path.join(folderPath, fileName);

    this.writeMigrationFile(outputFilePath);
    var ret = this.addFileToGit(outputFilePath);

    if (ret) {
      common.reportSuccess("added " + fileName + "");
    }


  },

  addFileToGit: function (outputFilePath) {

    var originalDir = process.cwd();
    var fileDir = path.dirname(outputFilePath);
    var cmd = "cd " + fileDir + " && " + global.gitPath + ' add "' + outputFilePath + '" && cd ' + originalDir;

    var res = exec(cmd);
    if (res.code != 0) {
      common.reportError("failed to add " + outputFilePath + " to git");
      return false;
    }
    return true;

  },

  writeMigrationFile: function (outputFilePath) {

    var templatePath = path.join(process.cwd(), 'src/templates/migration.sql');
    var templateFile = fs.readFileSync(templatePath).toString();

    // build file contents
    var template = Handlebars.compile(templateFile);
    var data = {
      author: common.getGitUserName(),
      fileName: outputFilePath,
      date: moment().format("YYYY-MM-DD HH:mm:ss")
    };


    // write the file to the db directory
    fs.writeFileSync(outputFilePath, template(data));
  },

  buildDbFolderPath: function () {
    return path.join(common.getBasePath(), "iis", "db", "src", "main", "sql");
  },

  buildFileName: function (label, ext) {
    label = label || "your description here"

    ext = ext || "sql"
    var ret = [this.buildTimeStamp(), common.getGitUserName(), label].join(" - ") + "." + ext;
    ret = ret.toLowerCase();
    return ret;
  },

  buildTimeStamp: function () {
    return moment().format("YYYYMMDDHHmmss");
  }



};

