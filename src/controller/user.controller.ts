import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from "@nestjs/common";
import { UsePipes } from "@nestjs/common/decorators/core/use-pipes.decorator";
import { UserDTO } from "src/dto/user.dto";
import { UserService } from "src/service/user.service";

@Controller('/api/user')
export class UserController{
    constructor( private userService : UserService){}

    @Post('login')
    login(@Body() credential:any  ){
        return this.userService.login(credential);
    }

    @Post('register')
    @UsePipes(new ValidationPipe({ transform: true }))  
    register(@Body() dto: UserDTO){
        return this.userService.register(dto);
    }

    @Get()
    findAll(){
        return this.userService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id:number ){
        return this.userService.findById(id);
    }   

    @Put(':id')
    update(@Param('id') id:number, @Body() dto: UserDTO){
        return this.userService.update(id, dto);
    }

    @Delete(':id')
    delete(@Param('id') id:number){
        return this.userService.delete(id);
    }

}