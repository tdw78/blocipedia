const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:5000/users/";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : users", () => {
  beforeEach(done => {
    sequelize
      .sync({ force: true })
      .then(() => {
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });

  describe("GET /users/sign_up", () => {
    it("should render a view with a sign up form", (done) => {
      request.get(`${base}sign_up`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Sign Up");
        done();
      });
    });
  });

  describe("POST /users", () => {
    it("should create a new user with valid values and redirect", (done) => {
      const options = {
        url: `${base}`,
        form: {
          name: "vanillaboi",
          email: "vanilla@gmail.com",
          password: "123456789"
        }
      };

      request.post(options, (err, res, body) => {

        User.findOne({ where: { name: "vanillaboi" } })
          .then(user => {
            expect(user).not.toBeNull();
            expect(user.email).toBe("vanilla@gmail.com");
            expect(user.id).toBe(1);
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });

    it("should create hashed password", (done) => {
      const options = {
        url: `${base}`,
        form: {
          name: "vanillaboi",
          email: "vanilla@gmail.com",
          password: "123456789"
        }
      };

      request.post(options, (err, res, body) => {
        User.findOne({ where: { name: "vanillaboi" } })
          .then((user) => {
            expect(user).not.toBeNull();
            expect(user.email).toBe("vanilla@gmail.com");
            expect(user.id).toBe(1);
            expect(user.password).not.toBe("123456789");
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
      });
    });

    it("should not create a new user with invalid attributes and redirect", (done) => {
      request.post(
        {
          url: `${base}`,
          form: {
            name: "vanillaboi",
            email: "no",
            password: "123456789"
          }
        },
        (err, res, body) => {
          User.findOne({ where: { email: "no" } })
            .then((user) => {
              expect(user).toBeNull();
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
        }
      );
    });
  });

    describe("GET /users/sign_in", () => {

      it('should render the sign in form', (done) => {
         request.get(`${base}sign_in`, (err, res, body) => {
          expect(err).toBe(null);
          expect(res.body).toContain("Sign In");
          done();
    });
  });
 });

 describe("POST /users/:id/upgrade", () => {
  it("should update a users role to Premium", (done) => {
    const options = {
      url: `${base}user.id/upgrade`,
      form: {
        name: "Mike Smith",
        email: "vanilla@gmail.com",
        password: "123456789",
        role: "standard"
      }
    };

    request.post(options, (err, res, body) => {

      User.findOne({ where: { name: "Mike Smith" } })
        .then((user) => {
          expect(user.role).toBe("Premium");
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });
});
describe("POST /users/:id/downgrade", () => {
  it("should update a users role to Standard", (done) => {
    const options = {
      url: `${base}user.id/downgrade`,
      form: {
        name: "Mike Smith",
        email: "vanilla@gmail.com",
        password: "123456789",
        role: "Premium"
      }
    };

    request.post(options, (err, res, body) => {

      User.findOne({ where: { name: "Mike Smith" } })
        .then((user) => {
          expect(user.role).toBe("Standard");
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });
});

});