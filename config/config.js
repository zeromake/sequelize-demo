
// const config = {
//   dialect: 'mysql',
//   dialectOptions: {
//       multipleStatements: true
//   },
//   host: '127.0.0.1',
//   port: 3309,
//   username: 'test',
//   password: 'test',
//   database: 'test',
//   query: {
//       charset: 'utf8mb4'
//   },
//   define: {
//       timestamps: false,
//       // underscored: true,
//       // freezeTableName: true,
//   },
//   timezone: '+08:00',
//   operatorsAliases: false,
//   logging: true,
// };

module.exports = {
  // development: config,
  // test: config,
  // production: config,
  "development": {
    "storage": "./dev.db",
    "dialect": "sqlite",
    define: {
      timestamps: false,
    }
  },
  "test": {
    "storage": "./test.db",
    "dialect": "sqlite",
    define: {
      timestamps: false,
    }
  },
  "production": {
    "storage": "./prod.db",
    "dialect": "sqlite",
    define: {
      timestamps: false,
    }
  }
};
