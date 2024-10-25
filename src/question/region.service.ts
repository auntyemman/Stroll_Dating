import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegionDocument, Region } from './schemas/region.schema';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region.name) private regionModel: Model<RegionDocument>,
  ) {}

  /**
   * Get all regions from the database.
   */
  async getAllRegions(): Promise<RegionDocument[]> {
    return this.regionModel.find().exec();
  }
}
