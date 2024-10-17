process.env.NODE_ENV = "test";
const server = require("../server");
const assert = require("chai").assert;
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

// Primero verificamos que el servidor ya esté corriendo
before(function (done) {
  server.on("appStarted", function () {
    done();
  });
});

// Haremos una prueba haciendo una peticion a la ruta
// y verificacion que el status sea 200
// note que ahora se utiliza el parametro done
describe("02 Prueba de peticiones usaremos chai-http", () => {
  // Primera prueba para verificar que raiz responde
  it("Probando el status de el get a la raiz", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });

  // Segunda prueba para insertar una tarea
  // Obtendremos el id de la tarea insertada para luego eliminarla
  let idTarea = "";
  it("Probando el insert de una tarea", (done) => {
    chai
      .request(server)
      .post("/tareas")
      .send({ nombre: "Insertando prueba mocha ABC", hecho: false })
      .end((err, res) => {
        assert.equal(res.status, 200);
        idTarea = res.body.id;
        done();
      });
  });

  // Verificamos que la tarea este agregada en la ruta /tareas
  it("Verificando que la tarea se inserto", (done) => {
    chai
      .request(server)
      .get("/tareas")
      .end((err, res) => {
        assert.equal(res.status, 200);
        let tareas = res.body;
        let tarea = tareas.find((t) => t._id === idTarea);
        assert.equal(tarea._id, idTarea);
        done();
      });
  });

  //Ahora Eliminamos la tarea insertada
  it("Eliminando la tarea insertada", (done) => {
    chai
      .request(server)
      .delete(`/tareas/delete/${idTarea}`)
      .end((err, res) => {
        assert.equal(res.status, 204);
        done();
      });
  });
});
