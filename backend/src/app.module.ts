import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionModule } from './transactions/transactions.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DATABASE_URL,
      database: process.env.DATABASE,
      synchronize: process.env.NODE_ENV === 'development',
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
      ],        
      cli: {
        migrationsDir: 'src/migrations',
      },
      ssl: process.env.NODE_ENV === 'production',
      useUnifiedTopology: true,
      useNewUrlParser: true
    }),

    TransactionModule,
  ],
})
export class AppModule {}
