require('../config/test.config');

describe('common functions', function () {

  before(function (done) {
    mkdir('-p', 'tmp-test2');
    done();
  });

  it('should get username from git', function () {

    (common.getGitUserName().length).should.be.above(0);

  });
});
