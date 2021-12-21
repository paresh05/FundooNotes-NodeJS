var chai = require("chai");
chaiHttp = require("chai-http");
const server = require("../server");
chai.use(chaiHttp);
const should = chai.should();

let token, noteId;

describe("Note API /notes", () => {
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
  it("it should make a get request for getting all the notes of the user", (done) => {
    chai
      .request(server)
      .get("/notes")
      .set({ Authorization: token })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("array");
        done();
      });
  });
  it("given valid title and content it should make a post request for adding the new note", (done) => {
    const noteData = {
      title: "Test Note",
      content: "a note posted using mocha testing",
    };
    chai
      .request(server)
      .post("/notes")
      .set({ Authorization: token })
      .send(noteData)
      .end((err, response) => {
        noteId = response.body._id;
        response.should.have.status(200);
        response.body.should.be.a("object");
        done();
      });
  });
  it("given invalid title and content it should not make a post request", (done) => {
    const note = {};
    chai
      .request(server)
      .post("/notes")
      .set({ Authorization: token })
      .send(note)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.be.a("object");
        done();
      });
  });
  it("given valid noteID,title and content it should make a put request for updating the note", (done) => {
    const noteData = {
      title: "Test",
      content: "a note posted using mocha testing",
    };
    chai
      .request(server)
      .put("/notes/" + noteId)
      .set({ Authorization: token })
      .send(noteData)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        done();
      });
  });
  it("given valid noteID it should make a get request for getting the note", (done) => {
    chai
      .request(server)
      .get("/notes/" + noteId)
      .set({ Authorization: token })
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
  it("given valid noteID it should make a delete request for deleting the note", (done) => {
    chai
      .request(server)
      .delete("/notes/" + noteId)
      .set({ Authorization: token })
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
});
