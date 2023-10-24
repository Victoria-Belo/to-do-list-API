import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { AppDTO } from 'src/interface/dto/app.dto';

@Controller('/api')
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
