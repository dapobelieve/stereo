import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from "nestjs-knex";

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'mysql2',
        useNullAsDefault: true,
        connection: process.env.DB_URL,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
