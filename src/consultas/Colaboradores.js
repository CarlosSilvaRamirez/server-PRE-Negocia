const bd_conexion = require("../conexion/bd_conexion");

async function colaboradores(req, res) {
  const { empresa, id_empresa } = req.body;
  const con = bd_conexion([id_empresa]);

  try {
    const data_colaboradores = await new Promise((resolve, reject) => {
      con.query(
        `
        SELECT id_cliente, nombre_cliente FROM colaboradores 
        WHERE status_cliente = 1 AND empresa = ? ORDER BY nombre_cliente ASC
        `,
        [empresa],
        function (err, data_colaboradores) {
          if (err) {
            reject(err);
          } else {
            resolve(data_colaboradores);
          }
        }
      );
    });

    res.status(200).json(data_colaboradores);
    con.close(); // cerrar conexion
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    res.status(500).json({
      error: "Hubo un error en la consulta a la base de datos",
    });
  }
}

module.exports = colaboradores;
