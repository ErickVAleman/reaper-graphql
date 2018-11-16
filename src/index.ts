
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloServer } from "apollo-server";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";

const env = process.env.NODE_ENV || "development";
const STATUS_ENV = process.env.NODE_ENV === "production" ? false : true;

if (STATUS_ENV) {
	console.debug(`NODE_ENV: ${process.env.NODE_ENV}`);
}

const server = new ApolloServer({
	resolvers,
	typeDefs,
	// tslint:disable-next-line
	context: () => ({
		env,
		instrospection: STATUS_ENV,
		playground: STATUS_ENV,
	}),
	cacheControl: true,
});
server.listen(5000).then(({url}) => console.log(`🚀  Open: ${url}`));
