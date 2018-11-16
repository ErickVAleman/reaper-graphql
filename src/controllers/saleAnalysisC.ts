
import { FILTER_ARRAY_OBJECTS } from "./src/func_filter";
import getDbNameforClosing from "./src/get_select_db_of_closing";
import { getVentaSubFamilia } from "./src/get_venta_subfamilia";
import { ILastDB } from "./TSInterfaces";
import { Tsuc } from "./TSTypes";

/**
 *
 * @param { object } obj
 * @param { suc: string } args
 * @param context
 * @param info
 */
async function getPreviousDetailVenta(obj: any, { suc, filter= "no" }: { suc: Tsuc, filter: string }) {
	if (suc) {
		if (filter !== "no") {
			try {
				const lastDB = await getDbNameforClosing("201808", "remote", suc);
				const nameLastDb: ILastDB = lastDB[0];
				const data: [] = await getVentaSubFamilia("remote", suc, nameLastDb.name, undefined, -1);
				return await FILTER_ARRAY_OBJECTS(filter, data, "Descripcion");

			} catch (e) {
				throw new Error(`analisisArticulos: \n ${e}`);
			}
		} else {
			try {
				const lastDB = await getDbNameforClosing("201808", "remote", suc);
				const nameLastDb: ILastDB = lastDB[0];
				return await getVentaSubFamilia("remote", suc, nameLastDb.name, undefined, -1);
			} catch (e) {
				throw new Error(`analisisArticulos: \n ${e}`);
			}
		}
	} else {
		throw new Error("Solo se aceptan valores como los sig: vc | zr | ou | jl ");
	}
}

/**
 *
 * @param obj
 * @param param1
 * @param context
 * @param info
 */
async function getLatestDetailVenta(obj: any, { suc, filter = "no" }: { suc: Tsuc, filter: string }) {
	if (suc) {
		try {
			if (filter !== "no") {
				const data: object[] = await getVentaSubFamilia("remote", suc);
				return await FILTER_ARRAY_OBJECTS(filter, data, "Descripcion");
			} else {
				return await getVentaSubFamilia("remote", suc);
			}
		} catch (e) {
			throw new Error(`latestDetailVenta: \n ${e}`);
		}
	} else {
		throw new Error(`latestDetailVenta: \n`);
	}
}

export {
	getPreviousDetailVenta,
	getLatestDetailVenta,
};
