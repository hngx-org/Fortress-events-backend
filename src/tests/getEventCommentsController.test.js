const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../app");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Getting Comments By Event ID Test", () => {

  it("should return a valid response", (done) => {
    chai
      .request(app)
      .get("/events/games/comments")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it("should return an error for invalid eventId", (done) => {
    chai
      .request(app)
      .get("/events/kabva/comments")
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

