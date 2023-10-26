import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { AppDTO } from 'src/dto/app.dto';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';
import { AuthGuard } from 'src/jwtAuth/auth.guard';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() req : any) {
    // eu quero que o usuário veja apenas a lista de tarefas dele!
    return this.appService.findAll(parseInt(req.user.sub));
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.appService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true })) 
  create(@Body() dto: AppDTO, @Req() req : any) {
    return this.appService.create(dto, parseInt(req.user.sub));
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
