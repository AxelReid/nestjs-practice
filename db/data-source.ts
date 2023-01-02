import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['dist/src/**/*.entity.js'],
  // migrations: ['dist/src/db/migrations/*.js'],
  synchronize: true,
  logging: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
