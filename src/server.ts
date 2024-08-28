import express from "express";
import router from "./router";
import db from "./config/db";
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger'
import colors from "colors";
import cors , { CorsOptions } from "cors";
import morgan from "morgan"
//conexion a base de datos
async function connectDB() {
  await db.authenticate();
  db.sync();
  // console.log(colors.bgMagenta.bold("conexion exitosa"));
}

connectDB();

//intancia de express
const server = express();

//permitir conexion del frontend a backend con cors
const corsOptions : CorsOptions = {

  origin(origin,callback){
    if (origin === `${process.env.FRONTEND_URL}`) {
      callback(null, true)
    }else{
      callback(new Error('Error de CRORS'))
    }
  }
}
server.use(cors(corsOptions))

// leer datos DE FORMULARIO
server.use(express.json());

server.use(morgan('dev'))

server.use("/api/products", router);

// documentacion
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec) )

export default server;
