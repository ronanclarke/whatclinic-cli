require('../config/test.config');

describe('generate', function () {

  it('generate a SQL migrate file name', function (done) {

    var res = generate.buildFileName();
    new RegExp(/\d{14} - \w+ - .*\.sql$/).exec(res).index.should.equal(0);

    done();
  });

  it('should generate a new sql file in the db directory with a valid file name',function(done){

    

    done();
  });
});
