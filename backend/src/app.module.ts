import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstimatesModule } from './estimates/estimates.module';

@Module({
  imports: [EstimatesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
