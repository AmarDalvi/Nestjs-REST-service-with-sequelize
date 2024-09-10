import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Amar@1729',
      database: 'demo',
      autoLoadModels: true,
      synchronize:true,
      models: [User],

    }),
    UsersModule,
  ],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
