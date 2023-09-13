const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

let bookId;
suite("Functional Tests", () => {
  
  suite("Routing tests", () => {
  
    suite("POST /api/books with title => create book object/expect book object", () => {
       
      test("Test POST /api/books with title", (done) => {
          chai.request(server).post("/api/books")
            .set("content-type", "application/json")
            .send({ title: "book" })
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.equal(res.body.title, "book");
              bookId = res.body._id;
              done();
            });
        });

        test("Test POST /api/books with no title given", (done) => {
          chai.request(server).post("/api/books")
            .set("content-type", "application/json")
            .send({ title: "" })
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.equal(res.text, "missing required field title");
              done();
            });
        });
      }
    );

    suite("GET /api/books => array of books", () => {
      test("Test GET /api/books", (done) => {
        chai.request(server).get("/api/books")
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            done();
          });
      });
    });

    suite("GET /api/books/[id] => book object with [id]", () => {
      test("Test GET /api/books/[id] with id not in db", (done) => {
        chai.request(server).get("/api/books/123443654354")
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, "no book exists");
            done();
          });
      });

      test("Test GET /api/books/[id] with valid id in db", (done) => {
        chai.request(server).get("/api/books/" + bookId)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.title, "book");
            done();
          });
      });
    });

    suite("POST /api/books/[id] => add comment/expect book object with id", () => {
        test("Test POST /api/books/[id] with comment", (done) => {
          chai.request(server).post("/api/books/" + bookId)
            .send({ comment: "test-comment" })
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.equal(res.body.comments[0], "test-comment");
              done();
            });
        });

        test("Test POST /api/books/[id] without comment field", (done) => {
          chai.request(server).post("/api/books/" + bookId)
            .set("content-type", "application/json")
            .send({ comment: "" })
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.equal(res.text, "missing required field comment");
              done();
            });
        });

        test("Test POST /api/books/[id] with comment, id not in db", (done) => {
          chai.request(server).post("/api/books/123443654354")
            .send({ comment: "comment" })
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.equal(res.text, "no book exists");
              done();
            });
        });
      }
    );

    suite("DELETE /api/books/[id] => delete book object id", () => {
      test("Test DELETE /api/books/[id] with valid id in db", (done) => {
        chai.request(server).delete("/api/books/" + bookId)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, "delete successful");
            done();
          });
      });

      test("Test DELETE /api/books/[id] with id not in db", (done) => {
        chai.request(server).delete("/api/books/" + bookId)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, "no book exists");
            done();
          });
      });
    });
  });
});