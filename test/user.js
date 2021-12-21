var chai = require("chai");
chaiHttp = require("chai-http");
const server = require("../server");
chai.use(chaiHttp);
const should = chai.should();

let userId;
describe("Users API /users", () => {
  it("it should make a get request for getting all the users", (done) => {
    chai
      .request(server)
      .get("/users")
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("array");
        done();
      });
  });
  it("given valid user data it should make a post request for user registration", (done) => {
    const userData = {
      firstName: "Paresh",
      lastName: "Praveen",
      email: "paresh99@gmail.com",
      password: "paresh123",
    };
    chai
      .request(server)
      .post("/users")
      .send(userData)
      .end((err, response) => {
        userId = response.body._id;
        response.should.have.status(200);
        response.body.should.be.a("object");
        done();
      });
  });
  it("given invalid user data it should not make a post request for user registration", (done) => {
    const user = {
      firstName: "Pa",
      lastName: "Praveen",
      email: "paresh99gmail.com",
      password: "paresh123",
    };
    chai
      .request(server)
      .post("/users")
      .send(user)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.be.a("object");
        done();
      });
  });
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
        response.should.have.status(200);
        response.body.should.have.property("token");
        done();
      });
  });
  it("given invalid password it should not make post request and send a status code 404", (done) => {
    const userData = {
      email: "pareshpraveen05@gmail.com",
      password: "praveen",
    };
    chai
      .request(server)
      .post("/users/login")
      .send(userData)
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });
  it("given valid userID it should make a get request for getting the user", (done) => {
    chai
      .request(server)
      .get("/users/" + userId)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
  it("given valid userID it should make a delete request for deleting the user", (done) => {
    chai
      .request(server)
      .delete("/users/" + userId)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
});
