const sequelize = require("../../src/db/models/index").sequelize;
const Wiki = require("../../src/db/models").Wiki;
const User = require("../../src/db/models").User;


describe("Wiki", () => {
  beforeEach((done) => {
    this.wiki;
    this.user;

    sequelize.sync({ force: true }).then((res) => {
      User.create({
        name: "Jose Canseco",
        email: "jose@email.com",
        password: "bashbro"
      }).then((user) => {
        this.user = user;

        Wiki.create({
          title: "Homeruns",
          body: "History of Homeruns",
          userId: user.id

        }).then((wiki) => {
          this.wiki = wiki;
          done();
        });
      });
    });
  });

  describe("#create()", () => {
    it("should create a wiki object with title and body", (done) => {
      Wiki.create({
        title: "Hawaii",
        body: "Hawaiian Islands"
      })
        .then((wiki) => {
          expect(wiki.title).toBe("Hawaii");
          expect(wiki.body).toBe("Hawaiian Islands");
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
    });

    it("should not create a wiki with invalid attributes", (done) => {
      Wiki.create({
        title: "Lions"
      })
        .then((wiki)=> {
          // the code in this block will not be evaluated since the validation error
          // will skip it. Instead, we'll catch the error in the catch block below
          // and set the expectations there
          done();
        })
        .catch(err => {
          expect(err.message).toContain("Wiki.body cannot be null");
          done();
        });
    });
  });
});