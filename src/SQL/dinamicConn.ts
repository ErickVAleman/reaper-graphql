import { INewConnDb, IValuesofConfDb } from "../controllers/TSInterfaces";
import { Tsuc, Ttipo } from "../controllers/TSTypes";
import db from "./bin";
import conf from "./conf";

/**
 *
 * @param i
 * @param tipo
 * @param suc
 */
function readConnection(i: IValuesofConfDb[], tipo: Ttipo, suc: Tsuc, database?: string): INewConnDb {
  let objConn: IValuesofConfDb | undefined;
  i.map((c) => {
	if (c.name === suc.toLowerCase() || c.suc === suc.toUpperCase()) {
		objConn = c;
		return;
	}
  });
  if (objConn && database) {
	const newDbConn = new db(objConn[tipo], database, objConn.user, objConn.pwd, objConn.port );
	return {
		_Almacen: objConn.almacen,
		_Tienda: objConn.tienda,
		neW: newDbConn,
	};
  } else if (objConn && database === undefined ) {
	const newDbConn = new db(objConn[tipo], objConn.database , objConn.user, objConn.pwd, objConn.port );
	return {
		_Almacen: objConn.almacen,
		_Tienda: objConn.tienda,
		neW: newDbConn,
	};
  }
  throw new Error("Error al crear conexion");
}

/**
 *
 * @param tipo "local" | "remote"
 * @param suc "vc" | "zr" | "ou" | "jl" | "bo"
 * @param query "cadena SQL"
 * @param database si se define se esperara la base de datos del sistema | undefined
 */
async function newRawQuery(tipo: Ttipo, suc: Tsuc, database?: string): Promise<INewConnDb> {
  if ( database ) {
	const { _Almacen, _Tienda, neW } = readConnection(conf, tipo, suc, database);
	return {
		_Almacen,
		_Tienda,
		neW,
	};
  } else {
	const { _Almacen, _Tienda, neW } = readConnection(conf, tipo, suc);
	return {
		_Almacen,
		_Tienda,
		neW,
	};
  }
}
export default newRawQuery;
