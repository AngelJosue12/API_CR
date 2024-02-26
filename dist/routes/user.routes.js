"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _user = require("../controllers/user.controllers");
var router = (0, _express.Router)();
router.get("/user", _user.getUser);
router.post("/user", _user.createNewUser);
router.post("/user/authenticate", _user.authenticateUser);
router.get("/user/count", _user.getTotalUser);
router.get("/user/:id", _user.getUserById);
router.post("/user/:correo", _user.getComprobarCorreo);
router.post("/user/:contraseña", _user.getComprobarPass);
router["delete"]("/user/:id", _user.deleteUserById);
router.put("/user/:id", _user.updateUserById);
router.put("/userCuenta/:id", _user.updateCuentaEStado);

// Enviar correo de recuperación de contraseña
router.post("/recuperacionCorreo/:correo", _user.EnviarCorreoRecuperacion);

// Actualizar el estado del token
router.put("/actualizarToken", _user.actualizarEstadoToken);

// Comparar el token de recuperación
router.post("/compararToken/:correo", _user.compararTokenRecuperacion);
router.post("/notiCorreoCuentaBloqueada/:correo", _user.enviarCorreoBloqueoCuenta);
var _default = exports["default"] = router;