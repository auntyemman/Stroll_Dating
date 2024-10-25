import { Model, Document, QueryOptions } from 'mongoose';

export class BaseRepository<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    const document = new this.model(data);
      return await document.save();
  }
  async update(id: string, data: Partial<T>): Promise<T> {
    return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }
  async findOne(query: QueryOptions): Promise<T | null> {
    return this.model.findOne(query).exec();
  }

  async find(query: QueryOptions): Promise<T[]> {
    return await this.model.find(query).exec();
  }
}
