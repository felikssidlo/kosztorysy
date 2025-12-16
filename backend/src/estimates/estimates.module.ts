import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EstimatesService } from './estimates.service';
import { EstimatesController } from './estimates.controller';
import { Estimate, EstimateSchema } from './schemas/estimate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Estimate.name, schema: EstimateSchema },
    ]),
  ],
  controllers: [EstimatesController],
  providers: [EstimatesService],
})
export class EstimatesModule {}
