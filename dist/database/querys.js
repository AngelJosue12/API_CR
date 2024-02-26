"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.querys = void 0;
var querys = exports.querys = {
  getUser: "SELECT * FROM tbl_Usuarios",
  createNewUser: 'INSERT INTO tbl_Usuarios (nombre, apellido_Paterno, apellido_Materno, correo, telefono, contraseña, fecha_Registro, fecha_Sesion, estado_Usuario, estado_Cuenta, fecha_Bloqueo, Id_Cargo, token, fecha_Token) VALUES  (@nombre, @apellido_Paterno, @apellido_Materno, @correo, @telefono, @contraseña, GETDATE(), NULL, \'Activo\', \'Activa\', NULL, \'UNL\', NULL, NULL )',
  getUserById: "SELECT * FROM tbl_Usuarios Where correo = @correo",
  comprobarPass: "SELECT * FROM tbl_Lista_Negra Where contraseña = @contraseña",
  deleteUser: "DELETE FROM tbl_Usuarios WHERE correo = @correo",
  getTotalUser: "SELECT COUNT(*) FROM tbl_Usuarios",
  updateUserById: "UPDATE tbl_Usuarios SET nombre = @nombre, apellido_Paterno = @apellido_Paterno, apellido_Materno = @apellido_Materno, correo = @correo, telefono = @telefono, contraseña = @contraseña WHERE correo = @correo",
  updateUserByIdContraseña: "UPDATE tbl_Usuarios SET contraseña = @contraseña WHERE correo = @correo",
  updateUserByIdEstadoCuenta: "UPDATE tbl_Usuarios SET estado_Cuenta = \'Bloqueada\',  fecha_Bloqueo = GETDATE() WHERE correo = @correo",
  getUserLogin: "SELECT correo, contraseña, estado_Cuenta FROM tbl_Usuarios  WHERE correo = @correo",
  getAccountsToActivate: "SELECT * FROM tbl_Usuarios WHERE estado_Cuenta = 'Bloqueada' AND fecha_Bloqueo <= DATEADD(DAY, -2, GETDATE());",
  getAccountsToActivateMinute: "SELECT * FROM tbl_Usuarios WHERE estado_Cuenta = 'Bloqueada' AND fecha_Bloqueo <= DATEADD(MINUTE, -3, GETDATE());",
  expirarToken: "SELECT * FROM tbl_Usuarios WHERE  fecha_Token <= DATEADD(MINUTE, -5, GETDATE());",
  updateAccountStatusToActive: "UPDATE tbl_Usuarios SET estado_Cuenta = 'Activa' WHERE correo = @correo",
  registrarTokenRecuperacion: "UPDATE tbl_Usuarios SET token = @token, fecha_token = GETDATE() WHERE correo = @correo;",
  obtenerTokenRecuperacion: "SELECT token FROM tbl_Usuarios WHERE correo = @correo;",
  actualizarEstadoTokenRecuperacion: "UPDATE tbl_Usuarios SET token = 'expirado' WHERE correo = @correo; ",
  actualizarFechaInicioSesion: "UPDATE tbl_Usuarios  SET fecha_Sesion = GETDATE()  WHERE correo = @correo; "
};