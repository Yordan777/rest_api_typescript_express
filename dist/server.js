"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const db_1 = __importDefault(require("./config/db"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./config/swagger"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
//conexion a base de datos
async function connectDB() {
    await db_1.default.authenticate();
    db_1.default.sync();
    // console.log(colors.bgMagenta.bold("conexion exitosa"));
}
connectDB();
//intancia de express
const server = (0, express_1.default)();
//permitir conexion del frontend a backend con cors
const corsOptions = {
    origin(origin, callback) {
        if (origin === `${process.env.FRONTEND_URL}`) {
            callback(null, true);
        }
        else {
            callback(new Error('Error de CRORS'));
        }
    }
};
server.use((0, cors_1.default)(corsOptions));
// leer datos DE FORMULARIO
server.use(express_1.default.json());
server.use((0, morgan_1.default)('dev'));
server.use("/api/products", router_1.default);
// documentacion
server.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
exports.default = server;
//# sourceMappingURL=server.js.map