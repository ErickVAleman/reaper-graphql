
import { getAimDayofPreviousYear, getMetadelDia as getAimLatestSaleC } from "../controllers/getAimLatestSaleC";
import getAllArticlesC from "../controllers/getAllArticlesC";
import {
	getLatestDetailVenta as latestDetailVenta,
	getPreviousDetailVenta as previousDetailVenta,
} from "../controllers/saleAnalysisC";

const Resolvers = {
	Query: {
		articulos: async () => await getAllArticlesC(),
		ventaAnoActual: async (_: any, args: any) => await latestDetailVenta( _, args),
		ventaAnoAnterior: async (_: any, args: any) => await previousDetailVenta(_, args),
		ventaTotalDia:  async (_: any, args: any) =>  await getAimLatestSaleC(_, args),
		ventaTotalDiaAnoAnterior: async (_: any, args: any) => await getAimDayofPreviousYear(_, args),
	},
};

export default Resolvers;
