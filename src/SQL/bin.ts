import Sequelize from "sequelize";

class ConnectionDB {
  constructor(private host: string, public database: string, private user: string, private pwd: string, port?: number) {
		// TODO
  }
  /**
   * rawQuery
   * @param query This requires an sql query
   */
  public async rawQuery(query: string) {
	const ask = this.createConn();
	let result = [];
	if (ask.authenticate()) {
		return result = await ask.query(query, { type: ask.QueryTypes.SELECT });
	}
	throw new Error("No existe coneccion con la base de datos");
  }
  /**
   * objConnection
   * return private function createConn
   */
  public objConnection() {
	return this.createConn;
  }
  /**
   * createConn
   * create the connect object of sequelize and return this object
   */
  private createConn() {
	let created: object;
	return created = new Sequelize( this.database, this.user, this.pwd, {
		host: this.host,
		// tslint:disable-next-line:object-literal-sort-keys
		dialect: "mssql",
	});
  }

}
export default ConnectionDB;
