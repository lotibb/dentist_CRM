const express = require("express");
const router = express.Router();
const controller = require("../controllers/citasController");

router.get("/", controller.listar);
router.get("/:id", controller.obtener);
router.post("/", controller.crear);
router.put("/:id", controller.reprogramar);   // cambiar fecha
router.delete("/:id", controller.cancelar);   // cancelar cita

module.exports = router;
