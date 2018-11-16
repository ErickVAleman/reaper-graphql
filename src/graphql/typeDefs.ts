
import { gql } from "apollo-server";

const typeDefs = gql`
	# Comments in GraphQL are defined with the hash (#) symbol.
	# This "Articulos" type can be used in other type declarations.
	type Articulos  @cacheControl(maxAge: 240) {
		Articulo: ID
		Nombre: String
		Descripcion: String
		Relacion: String
	}

	# The "Query" type is the root of all GraphQL queries.
	# (A "Mutation" type will be covered later on.)
	type Query {
		articulos: [Articulos!]!,
		ventaAnoAnterior(suc:String, filter: String): [AnalisiSuc!]!,
		ventaAnoActual(suc: String, filter: String): [AnalisiSuc!]!,
		ventaTotalDia(suc: String): Float!,
		ventaTotalDiaAnoAnterior(suc: String): Float!,
	}

	# Consulta para analisis de venta
	type AnalisiSuc @cacheControl(maxAge: 240) {
		Almacen: Int,
		Tienda: Int,
		DescripcionAlmacen: String,
		DescripcionTienda: String,
		Subfamilia: Int,
		Descripcion: String,
		VentaValorNeta: Float,
		NumVentas: Int
	}
`;

export default typeDefs;
