import { Module } from '@nestjs/common';
import { KnexModule } from "nestjs-knex";
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'mysql2',
        useNullAsDefault: true,
        connection: process.env.DB_URL,
      },
    }),
    MediaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
