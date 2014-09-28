// imported libs


os = require("os");
path = require("path");

// global vars
global.defaultBasePath = path.join("/", "opt", "whatclinic", "src");
global.isWindows = ((os.platform() + "").indexOf("win") ==0);
global.defaultBasePath = path.join("opt", "whatclinic", "src");

// own libs
global.common = require('../src/common');
global.generate = require("../src/generate.js");

