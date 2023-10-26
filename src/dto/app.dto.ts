import { IsNotEmpty } from "class-validator";

export class AppDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  task: string;
  
  author: string;

  status: boolean;
}
