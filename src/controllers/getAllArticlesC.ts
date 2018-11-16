import newQuery from "../SQL/dinamicConn";
export default async function getAllArticulos() {
	const _SQLQUERY: string = `
        SELECT Articulo
          ,Nombre
          ,Descripcion
          ,Relacion = '['+ CAST(CAST(FactorCompra AS INT) AS VARCHAR) + UnidadCompra + ' / '
            + CAST(CAST(FactorVenta AS INT) AS VARCHAR) + UnidadVenta +']'
        FROM Articulos
      `;
	try {
		const { neW } = await newQuery("remote", "bo");
		return await neW.rawQuery(_SQLQUERY);
	} catch (e) {
		throw new Error(`getAllArticulos:\n \t ${e}`);
	}
}
