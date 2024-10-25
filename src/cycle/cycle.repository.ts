import { BaseRepository } from 'src/utils/base.repository';
import { CycleDocument } from './schemas/cycle.schema';
import { Model } from 'mongoose';

export class CycleReopsitory extends BaseRepository<CycleDocument> {
  constructor(private readonly cycleModel: Model<CycleDocument>) {
    super(cycleModel);
  }
}
