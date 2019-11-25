const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:5000/wikis/";
const sequelize = require("../../src/db/models/index").sequelize;
const Wiki = require("../../src/db/models").Wiki;
const User = require("../../src/db/models").User;

describe("routes : wikis", () => {

  beforeEach((done) => {
    this.user;
    this.wiki;
    
    sequelize.sync({ force: true }).then((res) => {
      User.create({
        name: "Harpo West",
        email: "harpowest@email.com",
        password: "123abc",
        role: "standard"
      })
        .then((user) => {
          this.user = user;

          // request.get({
          //   url: "http://localhost:5000/auth/fake",
          //   form: {
          //     id: user.id,
          //     name: user.name,
          //     email: user.email,
          //     password: user.password,
          //     role: user.role
          //   }
          // });
          Wiki.create({
            title: "Golf",
            body: "Fundamentals of Golf",
            userId: user.id
          })
            .then((wiki) => {
              this.wiki = wiki;
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
        })
        .catch((err) => {
          console.log(err);
          done();
        });
    });
  });

  describe("GET /wikis", () => {
    it("should render the view of all wikis", (done) => {
      request.get(base, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Wikis");
        expect(body).toContain("Golf");
        done();
      });
    });
  });

  describe("GET /wikis/new", () => {
    it("should render the new wiki form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Wiki");
        done();
      });
    });
  });

  describe("POST /wikis/create", () => {
    it("should create a new wiki and redirect", (done) => {
      const options = {
        url: `${base}create`,
        form: {
          title: "Baseball",
          body: "Baseball is America's Pastime.",
          userId: this.user.id
        }
      };
      request.post(options, (err, res, body) => {
        Wiki.findOne({ where: { title: "Baseball" } })
          .then((wiki) => {
            expect(wiki.title).toBe("Baseball");
            expect(wiki.body).toBe("Baseball is America's Pastime.");
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
      });
    });
  });

  describe("GET /wikis/:id", () => {
    it("should render a view with the selected wiki", (done) => {

      request.get(`${base}${this.wiki.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(this.wiki.title).toBe("Golf");
        done();
      });
    });
  });

  describe("POST /wikis/:id/destroy", () => {
    it("should delete the wiki with the associated ID", (done) => {
      Wiki.findAll()
      .then((wikis) => {
        const wikiCountBeforeDelete = wikis.length;

        expect(wikiCountBeforeDelete).toBe(1);

        request.post(`${base}${this.wiki.id}/destroy`, (err, res, body) => {
          Wiki.findAll()
          .then((wikis) => {
            expect(err).toBeNull();
            expect(wikis.length).toBe(wikiCountBeforeDelete - 1);
            done();
          })         
        });
      })
    });
  });

  describe("GET /wikis/:id/edit", () => {

    it("should render a view with an edit wiki form", (done) => {
      request.get(`${base}${this.wiki.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Wiki");
        expect(body).toContain("Golf");
        done();
      });
    });

  });

  describe("POST /wikis/:id/update", () => {

    it("should update the wiki with the given values", (done) => {
      request.post({
        url: `${base}${this.wiki.id}/update`,
        form: {
          title: "Golf",
          body: "What a great game."
        }
      }, (err, res, body) => {
        expect(err).toBeNull();
        Wiki.findOne({
          where: {id:1}
        })
        .then((wiki) => {
          expect(wiki.body).toContain("What a great game.");
          done();
        });
      });
    });
  });

});