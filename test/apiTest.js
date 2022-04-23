let chai = require("chai");
let chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
let server = require("../app");
const mongoConnect = require("../app/utils/mongoDatabase").mongoConnect;

describe("Perfomer", function () {
  before(function (done) {
    mongoConnect(() => {
      done();
    });
  });

  describe("/GET Top performer", () => {
    it("it should GET top performers in last 5 matches", (done) => {
      chai
        .request(server)
        .get("/getTopPerformers")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.data.should.be.a("array");
          done();
        });
    });
  });
});
