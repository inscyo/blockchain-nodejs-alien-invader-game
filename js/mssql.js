const mssql = require("mssql/msnodesqlv8");
require("dotenv").config();

const MssqlConnect = (callback) => {
  mssql.connect(
    {
      driver: process.env.MSSQL_DRIVER,
      server: process.env.MSSQL_SERVER,
      database: process.env.MSSQL_DATABASE,
      user: process.env.MSSQL_USER,
      password: process.env.MSSQL_PASSWORD,
      port: process.env.MSSQL_PORT,
      options: {
        trustedConnection: true,
        trustServerCertificate: true,
      },
    },
    callback
  );
};

const MssqlDBExec = async (sp, params, metamask_address) => {
  return await new Promise(async (resolve, reject) => {
    await MssqlConnect(async function (err) {
      console.log(
        err
          ? err
          : "connected to sql server. " +
              metamask_address +
              " " +
              new Date(Date.now())
      );
      var request = new mssql.Request();
      params.forEach((param) => {
        request.input(param.name, mssql[param.datatype], param.value);
      });
      resolve(await (await request.execute(sp)).recordsets[0]);
    });
  });
};

module.exports.MssqlConnect = MssqlConnect;
module.exports.MssqlDBExec = MssqlDBExec;
