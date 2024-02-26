"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserById = exports.updateCuentaEStado = exports.getUserById = exports.getUser = exports.getTotalUser = exports.getComprobarPass = exports.getComprobarCorreo = exports.expirarTokensGenerados = exports.enviarCorreoBloqueoCuenta = exports.deleteUserById = exports.createNewUser = exports.compararTokenRecuperacion = exports.authenticateUser = exports.actualizarEstadoToken = exports.activateBlockedAccounts = exports.EnviarCorreoRecuperacion = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _nodeCron = _interopRequireDefault(require("node-cron"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var getUser = exports.getUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context.sent;
          _context.next = 6;
          return pool.request().query(_database.querys.getUser);
        case 6:
          result = _context.sent;
          res.json(result.recordset);
          _context.next = 14;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          res.status(500);
          res.send(_context.t0.message);
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function getUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var createNewUser = exports.createNewUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, nombre, apellido_Paterno, apellido_Materno, correo, contraseña, telefono, hashedPassword, pool;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, nombre = _req$body.nombre, apellido_Paterno = _req$body.apellido_Paterno, apellido_Materno = _req$body.apellido_Materno, correo = _req$body.correo, contraseña = _req$body.contraseña, telefono = _req$body.telefono; // Verificar si todos los campos están presentes
          if (!(nombre == null || apellido_Paterno == null || apellido_Materno == null || correo == null || telefono == null || contraseña == null)) {
            _context2.next = 3;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            msg: "Por favor llene todos los campos"
          }));
        case 3:
          _context2.prev = 3;
          _context2.next = 6;
          return _bcryptjs["default"].hash(contraseña, 10);
        case 6:
          hashedPassword = _context2.sent;
          _context2.next = 9;
          return (0, _database.getConnection)();
        case 9:
          pool = _context2.sent;
          _context2.next = 12;
          return pool.request().input("nombre", _database.sql.VarChar, nombre).input("apellido_Paterno", _database.sql.VarChar, apellido_Paterno).input("apellido_Materno", _database.sql.VarChar, apellido_Materno).input("correo", _database.sql.VarChar, correo).input("contraseña", _database.sql.VarChar, hashedPassword).input("telefono", _database.sql.VarChar, telefono)
          // Usa la contraseña cifrada
          .query(_database.querys.createNewUser);
        case 12:
          // Enviar respuesta de éxito
          res.json({
            nombre: nombre,
            apellido_Paterno: apellido_Paterno,
            apellido_Materno: apellido_Materno,
            correo: correo,
            contraseña: contraseña,
            telefono: telefono
          });
          _context2.next = 18;
          break;
        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](3);
          // Enviar respuesta de error
          res.status(500).json({
            error: _context2.t0.message
          });
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 15]]);
  }));
  return function createNewUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var authenticateUser = exports.authenticateUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body2, correo, contraseña, pool, result, user, passwordMatch;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, correo = _req$body2.correo, contraseña = _req$body2.contraseña;
          _context3.prev = 1;
          _context3.next = 4;
          return (0, _database.getConnection)();
        case 4:
          pool = _context3.sent;
          _context3.next = 7;
          return pool.request().input("correo", correo).query(_database.querys.getUserLogin);
        case 7:
          result = _context3.sent;
          if (!(result.recordset.length === 0)) {
            _context3.next = 10;
            break;
          }
          return _context3.abrupt("return", res.status(401).json({
            mensaje: "Este correo no coincide con ningún correo registrado"
          }));
        case 10:
          user = result.recordset[0]; // Verificar si la cuenta está bloqueada
          if (!(user.estado_Cuenta === 'Bloqueada')) {
            _context3.next = 13;
            break;
          }
          return _context3.abrupt("return", res.status(401).json({
            mensaje: "Tu cuenta está bloqueada"
          }));
        case 13:
          _context3.next = 15;
          return _bcryptjs["default"].compare(contraseña, user.contraseña);
        case 15:
          passwordMatch = _context3.sent;
          if (!passwordMatch) {
            _context3.next = 22;
            break;
          }
          _context3.next = 19;
          return pool.request().input("correo", correo).query(_database.querys.actualizarFechaInicioSesion);
        case 19:
          return _context3.abrupt("return", res.json({
            mensaje: "Autenticación exitosa"
          }));
        case 22:
          return _context3.abrupt("return", res.status(401).json({
            mensaje: "Contraseña incorrecta"
          }));
        case 23:
          _context3.next = 29;
          break;
        case 25:
          _context3.prev = 25;
          _context3.t0 = _context3["catch"](1);
          console.error("Error de autenticación:", _context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            mensaje: "Error de autenticación"
          }));
        case 29:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 25]]);
  }));
  return function authenticateUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getUserById = exports.getUserById = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context4.sent;
          _context4.next = 6;
          return pool.request().input("correo", req.params.id).query(_database.querys.getUserById);
        case 6:
          result = _context4.sent;
          return _context4.abrupt("return", res.json(result.recordset[0]));
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          res.status(500);
          res.send(_context4.t0.message);
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 10]]);
  }));
  return function getUserById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getComprobarCorreo = exports.getComprobarCorreo = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context5.sent;
          _context5.next = 6;
          return pool.request().input("correo", req.params.correo).query(_database.querys.getUserById);
        case 6:
          result = _context5.sent;
          if (!(result.recordset.length > 0)) {
            _context5.next = 11;
            break;
          }
          return _context5.abrupt("return", res.json({
            mensaje: "Este correo ya está registrado"
          }));
        case 11:
          return _context5.abrupt("return", res.json({
            mensaje: "Este correo no está registrado"
          }));
        case 12:
          _context5.next = 18;
          break;
        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](0);
          res.status(500);
          res.send(_context5.t0.message);
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 14]]);
  }));
  return function getComprobarCorreo(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var getComprobarPass = exports.getComprobarPass = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context6.sent;
          _context6.next = 6;
          return pool.request().input("contraseña", req.params.contraseña).query(_database.querys.comprobarPass);
        case 6:
          result = _context6.sent;
          if (!(result.recordset.length > 0)) {
            _context6.next = 11;
            break;
          }
          return _context6.abrupt("return", res.json({
            mensaje: "rechazado"
          }));
        case 11:
          return _context6.abrupt("return", res.json({
            mensaje: "aprovado"
          }));
        case 12:
          _context6.next = 18;
          break;
        case 14:
          _context6.prev = 14;
          _context6.t0 = _context6["catch"](0);
          res.status(500);
          res.send(_context6.t0.message);
        case 18:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 14]]);
  }));
  return function getComprobarPass(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var deleteUserById = exports.deleteUserById = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context7.sent;
          _context7.next = 6;
          return pool.request().input("correo", req.params.id).query(_database.querys.deleteUser);
        case 6:
          result = _context7.sent;
          if (!(result.rowsAffected[0] === 0)) {
            _context7.next = 9;
            break;
          }
          return _context7.abrupt("return", res.json({
            mensaje: "No existe este Usuario"
          }));
        case 9:
          res.json({
            mensaje: " Usuario Eliminado Correctamente"
          });
          _context7.next = 16;
          break;
        case 12:
          _context7.prev = 12;
          _context7.t0 = _context7["catch"](0);
          res.status(500);
          res.send(_context7.t0.message);
        case 16:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 12]]);
  }));
  return function deleteUserById(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var getTotalUser = exports.getTotalUser = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context8.sent;
          _context8.next = 6;
          return pool.request().query(_database.querys.getTotalUser);
        case 6:
          result = _context8.sent;
          res.json(result.recordset[0][""]);
          _context8.next = 14;
          break;
        case 10:
          _context8.prev = 10;
          _context8.t0 = _context8["catch"](0);
          res.status(500);
          res.send(_context8.t0.message);
        case 14:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 10]]);
  }));
  return function getTotalUser(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var updateUserById = exports.updateUserById = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var _req$body3, nombre, apellido_Paterno, apellido_Materno, correo, telefono, contraseña, fecha_Nacimiento, pool;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _req$body3 = req.body, nombre = _req$body3.nombre, apellido_Paterno = _req$body3.apellido_Paterno, apellido_Materno = _req$body3.apellido_Materno, correo = _req$body3.correo, telefono = _req$body3.telefono, contraseña = _req$body3.contraseña, fecha_Nacimiento = _req$body3.fecha_Nacimiento; // validating
          if (!(nombre == null || apellido_Paterno == null || apellido_Materno == null || correo == null || telefono == null || contraseña == null || fecha_Nacimiento == null)) {
            _context9.next = 3;
            break;
          }
          return _context9.abrupt("return", res.status(400).json({
            msg: "Por favor llene todo los campos"
          }));
        case 3:
          _context9.prev = 3;
          _context9.next = 6;
          return (0, _database.getConnection)();
        case 6:
          pool = _context9.sent;
          _context9.next = 9;
          return pool.request().input("nombre", _database.sql.VarChar, nombre).input("apellido_Paterno", _database.sql.VarChar, apellido_Paterno).input("apellido_Materno", _database.sql.VarChar, apellido_Materno).input("correo", _database.sql.VarChar, correo).input("telefono", _database.sql.VarChar, telefono).input("contraseña", _database.sql.VarChar, contraseña).query(_database.querys.updateUserById);
        case 9:
          res.json({
            nombre: nombre,
            apellido_Paterno: apellido_Paterno,
            apellido_Materno: apellido_Materno,
            correo: correo,
            telefono: telefono,
            contraseña: contraseña
          });
          _context9.next = 16;
          break;
        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9["catch"](3);
          res.status(500);
          res.send(_context9.t0.message);
        case 16:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[3, 12]]);
  }));
  return function updateUserById(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var updateCuentaEStado = exports.updateCuentaEStado = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var correo, pool;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          correo = req.body.correo; // validating
          if (!(correo == null)) {
            _context10.next = 3;
            break;
          }
          return _context10.abrupt("return", res.status(400).json({
            msg: "Por favor llene todo los campos"
          }));
        case 3:
          _context10.prev = 3;
          _context10.next = 6;
          return (0, _database.getConnection)();
        case 6:
          pool = _context10.sent;
          _context10.next = 9;
          return pool.request().input("correo", _database.sql.VarChar, correo).query(_database.querys.updateUserByIdEstadoCuenta);
        case 9:
          res.json({
            correo: correo
          });
          _context10.next = 16;
          break;
        case 12:
          _context10.prev = 12;
          _context10.t0 = _context10["catch"](3);
          res.status(500);
          res.send(_context10.t0.message);
        case 16:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[3, 12]]);
  }));
  return function updateCuentaEStado(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

// Función para activar cuentas bloqueadas después de 2 días
var activateBlockedAccounts = exports.activateBlockedAccounts = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
    var pool, result, accountsToActivate, _iterator, _step, account;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context11.sent;
          _context11.next = 6;
          return pool.request().query(_database.querys.getAccountsToActivateMinute);
        case 6:
          result = _context11.sent;
          // Query para obtener cuentas bloqueadas hace más de 2 días
          accountsToActivate = result.recordset; // Itera sobre las cuentas a activar
          _iterator = _createForOfIteratorHelper(accountsToActivate);
          _context11.prev = 9;
          _iterator.s();
        case 11:
          if ((_step = _iterator.n()).done) {
            _context11.next = 17;
            break;
          }
          account = _step.value;
          _context11.next = 15;
          return pool.request().input("correo", _database.sql.VarChar, account.correo) // Utiliza "correo" en lugar de "accountId"
          .query(_database.querys.updateAccountStatusToActive);
        case 15:
          _context11.next = 11;
          break;
        case 17:
          _context11.next = 22;
          break;
        case 19:
          _context11.prev = 19;
          _context11.t0 = _context11["catch"](9);
          _iterator.e(_context11.t0);
        case 22:
          _context11.prev = 22;
          _iterator.f();
          return _context11.finish(22);
        case 25:
          console.log("".concat(accountsToActivate.length, " cuentas se activaron correctamente."));
          _context11.next = 31;
          break;
        case 28:
          _context11.prev = 28;
          _context11.t1 = _context11["catch"](0);
          console.error("Error al activar cuentas bloqueadas:", _context11.t1);
        case 31:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 28], [9, 19, 22, 25]]);
  }));
  return function activateBlockedAccounts() {
    return _ref11.apply(this, arguments);
  };
}();
var expirarTokensGenerados = exports.expirarTokensGenerados = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
    var pool, result, tokens, _iterator2, _step2, account;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context12.sent;
          _context12.next = 6;
          return pool.request().query(_database.querys.expirarToken);
        case 6:
          result = _context12.sent;
          tokens = result.recordset; // Itera sobre las cuentas a activar
          _iterator2 = _createForOfIteratorHelper(tokens);
          _context12.prev = 9;
          _iterator2.s();
        case 11:
          if ((_step2 = _iterator2.n()).done) {
            _context12.next = 17;
            break;
          }
          account = _step2.value;
          _context12.next = 15;
          return pool.request().input("correo", _database.sql.VarChar, account.correo) // Utiliza "correo" en lugar de "accountId"
          .query(_database.querys.actualizarEstadoTokenRecuperacion);
        case 15:
          _context12.next = 11;
          break;
        case 17:
          _context12.next = 22;
          break;
        case 19:
          _context12.prev = 19;
          _context12.t0 = _context12["catch"](9);
          _iterator2.e(_context12.t0);
        case 22:
          _context12.prev = 22;
          _iterator2.f();
          return _context12.finish(22);
        case 25:
          console.log("".concat(tokens.length, " cuentas se expiraron el token."));
          _context12.next = 31;
          break;
        case 28:
          _context12.prev = 28;
          _context12.t1 = _context12["catch"](0);
          console.error("Error al expirar tokens:", _context12.t1);
        case 31:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 28], [9, 19, 22, 25]]);
  }));
  return function expirarTokensGenerados() {
    return _ref12.apply(this, arguments);
  };
}();
// Programa la tarea para ejecutarse periódicamente
// Aquí debes usar la herramienta de programación de tareas de tu servidor o un servicio de terceros

// Ejemplo de cómo programar la tarea en un cron job en Node.js usando la librería node-cron

// Programa la tarea para ejecutarse todos los días a la medianoche
//cron.schedule('0 0 * * *', async () => {
//  console.log('Ejecutando tarea para activar cuentas bloqueadas...');
//await activateBlockedAccounts();
//});

// Programa la tarea para ejecutarse dentro de 5 minutos

// Tarea para activar cuentas bloqueadas
//cron.schedule('*/2 * * * *', async () => {
_nodeCron["default"].schedule('0 0 * * *', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
  return _regenerator["default"].wrap(function _callee13$(_context13) {
    while (1) switch (_context13.prev = _context13.next) {
      case 0:
        console.log('Ejecutando tarea para activar cuentas bloqueadas...');
        _context13.next = 3;
        return activateBlockedAccounts();
      case 3:
      case "end":
        return _context13.stop();
    }
  }, _callee13);
})));

// Tarea para expirar tokens generados
_nodeCron["default"].schedule('*/2 * * * *', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
  return _regenerator["default"].wrap(function _callee14$(_context14) {
    while (1) switch (_context14.prev = _context14.next) {
      case 0:
        console.log('Ejecutando tarea para expirar tokens generados...');
        _context14.next = 3;
        return expirarTokensGenerados();
      case 3:
      case "end":
        return _context14.stop();
    }
  }, _callee14);
})));

/////MANDAR EL CORREO

var generarNuevoToken = function generarNuevoToken() {
  var token = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  return token.toString();
};

// Función para enviar correo de recuperación y registrar el token en la base de datos
var EnviarCorreoRecuperacion = exports.EnviarCorreoRecuperacion = /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res) {
    var correo, origen, receptor, contraseña, token, pool, transporter, mailOptions;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          correo = req.body.correo;
          origen = "cruzrojasuport@gmail.com";
          receptor = correo;
          contraseña = "onopzodxqxheqwnz";
          token = generarNuevoToken();
          _context15.prev = 5;
          _context15.next = 8;
          return (0, _database.getConnection)();
        case 8:
          pool = _context15.sent;
          _context15.next = 11;
          return pool.request().input("correo", _database.sql.VarChar, correo).input("token", _database.sql.VarChar, token).query(_database.querys.registrarTokenRecuperacion);
        case 11:
          // Suponiendo que tienes una consulta SQL para registrar el token
          // Configurar transporte de correo
          transporter = _nodemailer["default"].createTransport({
            service: 'gmail',
            auth: {
              user: origen,
              pass: contraseña
            }
          }); // Configurar opciones del correo
          mailOptions = {
            from: origen,
            to: receptor,
            subject: 'Recuperación de contraseña',
            html: "\n      <p>Estimado usuario,</p>\n      <p>Recibi\xF3 este correo electr\xF3nico porque solicit\xF3 un restablecimiento de contrase\xF1a para su cuenta.</p>\n      <p>Por favor, copie y pegue el token en su navegador para completar el proceso:</p>\n      <p>".concat(token, "</p>\n      <p>Si no solicit\xF3 un restablecimiento de contrase\xF1a, puede ignorar este correo electr\xF3nico y su cuenta permanecer\xE1 segura.</p>\n      <p>Atentamente,</p>\n      <p>El equipo de soporte de Cruz Roja</p>")
          }; // Enviar correo electrónico
          _context15.next = 15;
          return transporter.sendMail(mailOptions);
        case 15:
          res.json({
            mensaje: 'Correo de recuperación enviado correctamente'
          });
          _context15.next = 22;
          break;
        case 18:
          _context15.prev = 18;
          _context15.t0 = _context15["catch"](5);
          // Manejo de errores
          console.error('Error al enviar el correo electrónico:', _context15.t0);
          res.status(500).json({
            mensaje: 'Error al enviar el correo electrónico',
            error: _context15.t0.message
          });
        case 22:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[5, 18]]);
  }));
  return function EnviarCorreoRecuperacion(_x21, _x22) {
    return _ref15.apply(this, arguments);
  };
}();

// Función para comparar el token proporcionado por el usuario con el almacenado en la base de datos
var compararTokenRecuperacion = exports.compararTokenRecuperacion = /*#__PURE__*/function () {
  var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res) {
    var _req$body4, correo, tokenUsuario, pool, result, tokenAlmacenado;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _req$body4 = req.body, correo = _req$body4.correo, tokenUsuario = _req$body4.tokenUsuario;
          _context16.prev = 1;
          if (!(tokenUsuario === undefined)) {
            _context16.next = 4;
            break;
          }
          return _context16.abrupt("return", res.status(400).json({
            mensaje: "El token proporcionado es inválido"
          }));
        case 4:
          _context16.next = 6;
          return (0, _database.getConnection)();
        case 6:
          pool = _context16.sent;
          _context16.next = 9;
          return pool.request().input("correo", _database.sql.VarChar, correo).query(_database.querys.obtenerTokenRecuperacion);
        case 9:
          result = _context16.sent;
          // Obtener el valor del token almacenado
          tokenAlmacenado = result.recordset.length > 0 ? result.recordset[0].token : null;
          console.log("Token almacenado:", tokenAlmacenado);
          console.log("Token proporcionado:", tokenUsuario);

          // Verificar si el token almacenado está expirado
          if (!(tokenAlmacenado === 'expirado')) {
            _context16.next = 15;
            break;
          }
          return _context16.abrupt("return", res.json({
            mensaje: "El token de recuperación ha expirado"
          }));
        case 15:
          // Comparar el token proporcionado por el usuario con el almacenado en la base de datos
          if (tokenUsuario === tokenAlmacenado) {
            res.json({
              mensaje: "El token de recuperación es válido"
            });
          } else {
            res.json({
              mensaje: "El token de recuperación es inválido"
            });
          }
          _context16.next = 22;
          break;
        case 18:
          _context16.prev = 18;
          _context16.t0 = _context16["catch"](1);
          console.error('Error al comparar el token de recuperación:', _context16.t0);
          res.status(500).json({
            mensaje: 'Error al comparar el token de recuperación'
          });
        case 22:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[1, 18]]);
  }));
  return function compararTokenRecuperacion(_x23, _x24) {
    return _ref16.apply(this, arguments);
  };
}();

// Función para actualizar automáticamente el estado del token después de 30 minutos
var actualizarEstadoToken = exports.actualizarEstadoToken = /*#__PURE__*/function () {
  var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(req, res) {
    var correo, pool;
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          correo = req.body.correo;
          _context17.prev = 1;
          _context17.next = 4;
          return (0, _database.getConnection)();
        case 4:
          pool = _context17.sent;
          _context17.next = 7;
          return pool.request().input("correo", _database.sql.VarChar, correo).query(_database.querys.actualizarEstadoTokenRecuperacion);
        case 7:
          // Suponiendo que tienes una consulta SQL para actualizar el estado del token

          res.json({
            mensaje: "Estado del token asociado a ".concat(correo, " actualizado correctamente.")
          });
          _context17.next = 14;
          break;
        case 10:
          _context17.prev = 10;
          _context17.t0 = _context17["catch"](1);
          console.error('Error al actualizar el estado del token de recuperación:', _context17.t0);
          res.status(500).json({
            mensaje: 'Error al actualizar el estado del token de recuperación'
          });
        case 14:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[1, 10]]);
  }));
  return function actualizarEstadoToken(_x25, _x26) {
    return _ref17.apply(this, arguments);
  };
}();
var enviarCorreoBloqueoCuenta = exports.enviarCorreoBloqueoCuenta = /*#__PURE__*/function () {
  var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(req, res) {
    var correo, origen, receptor, contraseña, transporter, mailOptions;
    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          correo = req.body.correo;
          origen = "cruzrojasuport@gmail.com";
          receptor = correo;
          contraseña = "onopzodxqxheqwnz";
          _context18.prev = 4;
          // Configurar transporte de correo
          transporter = _nodemailer["default"].createTransport({
            service: 'gmail',
            auth: {
              user: origen,
              pass: contraseña
            }
          }); // Configurar opciones del correo
          mailOptions = {
            from: origen,
            to: receptor,
            subject: 'Cuenta bloqueada por seguridad',
            html: "\n      <p>Estimado usuario,</p>\n      <p>Recientemente hemos detectado intentos de acceso no autorizados a su cuenta. Por razones de seguridad, hemos bloqueado temporalmente su cuenta.</p>\n      <p>Su cuenta ser\xE1 desbloqueada autom\xE1ticamente despu\xE9s de un d\xEDa. Si este bloqueo no fue realizado por usted, le recomendamos que cambie su contrase\xF1a inmediatamente y revise la seguridad de su cuenta.</p>\n      <p>Disculpe las molestias ocasionadas. Gracias por su comprensi\xF3n y cooperaci\xF3n.</p>\n      <p>Atentamente,</p>\n      <p>El equipo de soporte de Cruz Roja</p>"
          }; // Enviar correo electrónico
          _context18.next = 9;
          return transporter.sendMail(mailOptions);
        case 9:
          res.json({
            mensaje: 'Correo de bloqueo de cuenta enviado correctamente'
          });
          _context18.next = 16;
          break;
        case 12:
          _context18.prev = 12;
          _context18.t0 = _context18["catch"](4);
          // Manejo de errores
          console.error('Error al enviar el correo de bloqueo de cuenta:', _context18.t0);
          res.status(500).json({
            mensaje: 'Error al enviar el correo de bloqueo de cuenta',
            error: _context18.t0.message
          });
        case 16:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[4, 12]]);
  }));
  return function enviarCorreoBloqueoCuenta(_x27, _x28) {
    return _ref18.apply(this, arguments);
  };
}();