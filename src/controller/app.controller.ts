import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { AppDTO } from 'src/dto/app.dto';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get()
  findAll() {
    return this.appService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.appService.findById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true })) 
  create(@Body() dto: AppDTO) {
    console.log(dto)
    return this.appService.create(dto);
  }

  @Put(':id')  
  update(@Param('id') id: number, @Body() dto: AppDTO) {
    return this.appService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.appService.delete(id);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


}
