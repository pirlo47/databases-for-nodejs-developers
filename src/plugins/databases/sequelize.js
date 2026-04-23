import fp from "fastify-plugin";
import { Sequelize } from "sequelize";

async function sequelizePlugin(fastify, config) {
  let mysqlStatus = "disconnected";

  // TODO: Connect to MySQL via Sequelize and update the status
  try {
    const sequelize = new Sequelize(config.uri, config.options);
    await sequelize.authenticate(); //Connects to the database
    fastify.log.info("Connected to MySQL");
    mysqlStatus = "connected";
    fastify.decorate("sequelize", sequelize); //available as fastify.sequelize  
  } catch (err) {
    fastify.log.error("Failed to connect to mysql");

  }
  fastify.decorate("mysqlStatus", () => mysqlStatus);

  // Graceful shutdown
  fastify.addHook("onClose", async (fastifyInstance, done) => {
    mysqlStatus = "disconnected";
    // TODO: Close Sequelize connection
    await sequelize.close(); 
    done();
  });
}

export default fp(sequelizePlugin, { name: "sequelize-plugin" });
