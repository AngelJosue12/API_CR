import { Router } from "express";
import {
  getUser,
  createNewUser,
 getUserById,
 getComprobarCorreo,
  deleteUserById,
  getTotalUser,
  updateUserById,
  authenticateUser,
  updateCuentaEStado,
  EnviarCorreoRecuperacion,
  actualizarEstadoToken,
  compararTokenRecuperacion,
  enviarCorreoBloqueoCuenta,
  getComprobarPass,
} from "../controllers/user.controllers";

const router = Router();


router.get("/user", getUser);

router.post("/user", createNewUser);

router.post("/user/authenticate", authenticateUser);

router.get("/user/count", getTotalUser);

router.get("/user/:id",getUserById);

router.post("/user/:correo",getComprobarCorreo);

router.post("/user/:contraseña",getComprobarPass);


router.delete("/user/:id",deleteUserById);

router.put("/user/:id",updateUserById );

router.put("/userCuenta/:id",updateCuentaEStado );


// Enviar correo de recuperación de contraseña
router.post("/recuperacionCorreo/:correo", EnviarCorreoRecuperacion);

// Actualizar el estado del token
router.put("/actualizarToken", actualizarEstadoToken);

// Comparar el token de recuperación
router.post("/compararToken/:correo", compararTokenRecuperacion);

router.post("/notiCorreoCuentaBloqueada/:correo", enviarCorreoBloqueoCuenta);


export default router;
