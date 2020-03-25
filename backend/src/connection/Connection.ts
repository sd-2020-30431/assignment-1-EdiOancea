import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'wasteless',
  'algotech',
  '',
  {
    host: 'localhost',
    dialect: 'postgres'
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
