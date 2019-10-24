
const config = {
  dialect: 'mysql',
  dialectOptions: {
      multipleStatements: true
  },
  host: '127.0.0.1',
  port: 3309,
  username: 'test',
  password: 'test',
  database: 'test',
  query: {
      charset: 'utf8mb4'
  },
  define: {
      timestamps: false,
      underscored: true,
      freezeTableName: true,
  },
  timezone: '+08:00',
  operatorsAliases: false,
  logging: true,
};
const isMysql = process.env.dialect === 'mysql';
const defaultConfig = !isMysql ? {
  "storage": "./test.db",
  "dialect": "sqlite",
  define: {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  }
} : config;

module.exports = {
  development: defaultConfig,
  test: defaultConfig,
  production: defaultConfig,
};
