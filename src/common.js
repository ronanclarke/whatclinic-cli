require('../config/common.config');
shelljs = require('shelljs/global');
chalk = require("chalk");

module.exports = {

  reportError: function (error) {
    console.log(chalk.red("    " + error));
    process.exit(1);

  },

  reportSuccess: function (msg) {
    console.log(chalk.green("   " + msg));
    process.exit(0);

  },

  isSaneEnv: function () {

    if (!this.isGitInstalled()) {
      console.log("can't find git command so can't continue");
      return false;
    }

    return true;

  },

  getBasePath: function () {
    return "/" + global.defaultBasePath;
  },

  getGitUserName: function () {
    if (!this.isGitInstalled())
      return;

    var cmd = global.gitPath + ' config user.name';
    var res = exec(cmd,{silent:true});
    if (res.code != 0)
      return "";

    var name = res.output.trim();
    return name.split(' ')[0].toLowerCase();

  },

  isGitInstalled: function () {
    var res = exec('git --help', {silent: true});

    if (res.code == 0) {
      global.gitPath = "git";
      return true;
    }

    // maybe we're on windows but not in git bash
    var gitCommand = "\"" + path.join("c:", "Program Files", "Git", "bin", "git.exe" + "\"");
    var res = exec(gitCommand + " --version", {silent: true});
    if (res.code == 0) {
      global.gitPath = gitCommand;
      return true;
    }


    return false;

  }


};