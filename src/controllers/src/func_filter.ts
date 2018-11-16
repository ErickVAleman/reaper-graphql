
/**
 *
 * @param input String de entrada para el filtrado
 * @param data Array de objetos
 * @param nameIndex Indice de los objetos para realizar el filtrado
 */

export const FILTER_ARRAY_OBJECTS = async (input: string, data: object[], nameIndex: string) => {
	return await data.filter((el: any) => el[`${nameIndex}`].toLowerCase().indexOf(input.toLowerCase()) > -1);
};

export const FILTER_SIMPLE_ARRAY = async (input: string, data: []) => {
	return await data.filter(async (el: string | number) => {
		if (typeof el === "string") {
			return await el.toLowerCase().indexOf(input.toLowerCase()) > - 1;
		} else if (typeof el === "number") {
			return await el.toString().toLowerCase().indexOf(input.toString().toLowerCase()) > -1;
		} else {
			throw new Error("No se ha ingresado un tipo valido: Number or String");
		}
	});
};
