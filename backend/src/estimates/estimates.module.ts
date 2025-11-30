import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // <--- Importuj to
import { EstimatesService } from './estimates.service';
import { EstimatesController } from './estimates.controller';
import { Estimate, EstimateSchema } from './schemas/estimate.schema'; // <--- Importuj schemat

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
