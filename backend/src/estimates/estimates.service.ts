import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEstimateDto, EstimateItemDto } from './dto/create-estimate.dto';
import { UpdateEstimateDto } from './dto/update-estimate.dto';
import { Estimate } from './schemas/estimate.schema';

@Injectable()
export class EstimatesService {
  constructor(
    @InjectModel(Estimate.name) private estimateModel: Model<Estimate>,
  ) {}

  private calculateDetails(items: EstimateItemDto[]) {
    if (!items || items.length === 0) {
      return { items: [], totalAmount: 0 };
    }

    const calculatedItems = items.map((item) => {
      let value = item.value || 0;

      if (item.type === 'material') {
        const quantity = item.quantity || 0;
        const unitPrice = item.unitPrice || 0;
        value = quantity * unitPrice;
      }

      return {
        ...item,
        value,
      };
    });

    const totalAmount = calculatedItems.reduce(
      (sum, item) => sum + item.value,
      0,
    );

    return { items: calculatedItems, totalAmount };
  }

  async create(createEstimateDto: CreateEstimateDto): Promise<Estimate> {
    const { items, totalAmount } = this.calculateDetails(
      createEstimateDto.items || [],
    );

    const newEstimate = new this.estimateModel({
      ...createEstimateDto,
      items,
      totalAmount,
    });

    return newEstimate.save();
  }

  async findAll(): Promise<Estimate[]> {
    return this.estimateModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Estimate> {
    const estimate = await this.estimateModel.findById(id).exec();
    if (!estimate) {
      throw new NotFoundException(`Kosztorys o id #${id} nie istnieje`);
    }
    return estimate;
  }

  async update(
    id: string,
    updateEstimateDto: UpdateEstimateDto,
  ): Promise<Estimate> {
    const updateData: any = { ...updateEstimateDto };

    if (updateEstimateDto.items) {
      const { items, totalAmount } = this.calculateDetails(
        updateEstimateDto.items,
      );
      updateData.items = items;
      updateData.totalAmount = totalAmount;
    }

    const updatedEstimate = await this.estimateModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updatedEstimate) {
      throw new NotFoundException(`Kosztorys o id #${id} nie istnieje`);
    }

    return updatedEstimate;
  }

  async remove(id: string): Promise<Estimate> {
    const deletedEstimate = await this.estimateModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedEstimate) {
      throw new NotFoundException(`Kosztorys o id #${id} nie istnieje`);
    }
    return deletedEstimate;
  }
}
