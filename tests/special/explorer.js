
const globals = require('../globals');
const should = require('chai').should();

module.exports = get => {
  describe('explorer', function() {
    describe('= true, without limit or sort', function() {
      let res;
      before(function(done) {
        get('?explorer=true', function(output) {
          res = output;
          done();
        });
      });

      it('returns explorer data', function() {
        res.should.have.property('4');

        res['4'].should.have.property('x');
        res['4'].should.have.property('y');
        res['4'].should.have.property('z');

        res['4'].x.should.equal(38.9467564745);
        res['4'].y.should.equal(32.2720708924);
        res['4'].z.should.equal(-0.000660867213142);
      });

      it('defaults to all galaxies', function() {
        Object.keys(res).should.have.length(globals.TOTAL_GALAXIES);
      });
    });

    describe('= true, with limit', function() {
      let res;
      before(function(done) {
        get('?explorer=true&limit=10', function(output) {
          res = output;
          done();
        });
      });

      it('returns explorer data', function() {
        res.should.have.property('4');

        res['4'].should.have.property('x');
        res['4'].should.have.property('y');
        res['4'].should.have.property('z');

        res['4'].x.should.equal(38.9467564745);
        res['4'].y.should.equal(32.2720708924);
        res['4'].z.should.equal(-0.000660867213142);
      });

      it('queries proper number', function() {
        Object.keys(res).should.have.length(10);
      });
    });

    describe('= false', function() {
      let res;
      before(function(done) {
        get('?explorer=false', function(output) {
          res = output;
          done();
        });
      });

      it('returns error', function() {
        res.should.have.property('error');
        res.error.should.equal('Expected explorer=true.')
      });
    })
  });
}
