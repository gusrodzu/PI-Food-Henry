//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
require("dotenv").config();

const { PORT } = process.env;

async function startServer() {
  try {
    // Sincroniza todos los modelos de la base de datos.
    await conn.sync({ force: true });  // Permite hacer un rest de la BD cada vez que se levanta el sercv

    // Inicia el servidor para que escuche en el puerto especificado.
    const app = server.listen(PORT, () => {
      console.log(`Servidor corriendo correctamente en el puerto ${PORT}`);
    });

    return app;
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
}

startServer();