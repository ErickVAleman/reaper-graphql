import newQuery from "../../SQL/dinamicConn";
import { Tsuc, Ttipo } from "../TSTypes";

export async function getVentaSubFamilia(tipo: Ttipo, suc: Tsuc, database?: string, tienda?: number, year?: number) {
	const { _Tienda, neW } = await newQuery(tipo, suc, database);
	const _SQLQUERY: string = `
		SELECT
			xMA.Almacen
			,xMA.Tienda
			,xMA.DescripcionAlmacen
			,xMA.DescripcionTienda
			,zA.Subfamilia
			,ySF.Descripcion
			,SUM(xMA.VentaValorNeta) VentaValorNeta
			,COUNT(xMA.Articulo) NumVentas
		FROM QxDeMovAlmacen AS xMA
		LEFT JOIN Articulos AS zA ON zA.Articulo = xMA.Articulo
		LEFT JOIN Subfamilias AS ySF ON ySF.Subfamilia = zA.Subfamilia
		WHERE xMA.Tienda = ${tienda ? tienda : _Tienda} AND TipoDocumento = 'V' AND Estatus = 'E'
			AND CONVERT(DATE,xMA.Fecha) = CAST(DATEADD(YEAR, ${ year ? year : 0} ,GETDATE()) AS DATE)
		GROUP BY zA.Subfamilia, ySF.Descripcion, xMA.Almacen,
			xMA.Tienda, xMA.DescripcionAlmacen, xMA.DescripcionTienda
		ORDER BY VentaValorNeta DESC
  `;
	return await neW.rawQuery(_SQLQUERY);
}
