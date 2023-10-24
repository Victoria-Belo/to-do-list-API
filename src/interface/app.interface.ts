import { AppEntity } from "src/models/app.entity";
import { AppDTO } from "../dto/app.dto";

export interface AppInterface {
  findAll(): Promise<AppEntity[]>;
  findById(id: number): Promise<AppEntity | null>;
  create(dto: AppDTO): Promise<AppEntity>;
  update(id: number, dto: AppDTO): Promise<AppEntity>;
  delete(id: number): Promise<void>;
}
