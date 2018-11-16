
import AimLatestSale from "./src/get_aim_latest_sale";
import { Tsuc } from "./TSTypes";

async function getMetadelDia( obj: any, { suc }: { suc: Tsuc }, context?: any, info?: any ): Promise<number> {
	return await AimLatestSale(suc);
}

async function getAimDayofPreviousYear(obj: any, { suc }: {suc: Tsuc }, context?: any, info?: any): Promise<number> {
	return await AimLatestSale(suc, -1);
}

export {
	getMetadelDia,
	getAimDayofPreviousYear,
};
