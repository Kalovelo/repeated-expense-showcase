import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedingService } from './transactions/services/seeding.service';
import { TransactionModule } from './transactions/transactions.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URL), TransactionModule],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly seedingService: SeedingService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seedingService.seed();
  }
}
