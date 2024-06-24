import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from './auth/guards/api-key.guard';

@ApiTags('General')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(ApiKeyGuard) // con esto le aplico el guardian
  @Get('nuevo')
  newEndpoint() {
    return 'yo soy nuevo';
  }

  @Get('/ruta/')
  hello() {
    return 'con /sas/';
  }

  // @Get('tasks')
  // tasks() {
  //   return this.appService.getTasks();
  // }
}
