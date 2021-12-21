var chai = require("chai");
chaiHttp = require("chai-http");
const server = require("../server");
chai.use(chaiHttp);
const should = chai.should();

let token, labelId;

describe("Label API /notes", () => {
  it("given valid email and password it should make a post request for user login and generate token", (done) => {
    const userData = {
      email: "pareshpraveen05@gmail.com",
      password: "praveen123",
    };
    chai
      .request(server)
      .post("/users/login")
      .send(userData)
      .end((err, response) => {
        token = response.body.token;
        response.should.have.status(200);
        response.body.should.have.property("token");
        done();
      });
  });
  it("it should make a get request for getting all the labels of the user", (done) => {
    chai
      .request(server)
      .get("/label")
      .set({ Authorization: token })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("array");
        done();
      });
  });
  it("given valid name it should make a post request for adding the new label", (done) => {
    const labelData = {
      name: "Test Label",
    };
    chai
      .request(server)
      .post("/label")
      .set({ Authorization: token })
      .send(labelData)
      .end((err, response) => {
        labelId = response.body._id;
        response.should.have.status(200);
        response.body.should.be.a("object");
        done();
      });
  });
  it("given invalid title and content it should not make a post request", (done) => {
    const label = { name: "Test Label" };
    chai
      .request(server)
      .post("/label")
      .set({ Authorization: token })
      .send(label)
      .end((err, response) => {
        response.should.have.status(500);
        response.body.should.be.a("object");
        done();
      });
  });
  it("given valid labelID,name it should make a put request for updating the label", (done) => {
    const labelData = {
      name: "Label",
    };
    chai
      .request(server)
      .put("/label/" + labelId)
      .set({ Authorization: token })
      .send(labelData)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        done();
      });
  });
  it("given valid labelID it should make a get request for getting the label", (done) => {
    chai
      .request(server)
      .get("/label/" + labelId)
      .set({ Authorization: token })
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
  it("given valid labelID it should make a delete request for deleting the label", (done) => {
    chai
      .request(server)
      .delete("/label/" + labelId)
      .set({ Authorization: token })
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
});
