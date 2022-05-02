import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('ng/g/:type')
  generate(
    @Param('type') type: string,
    @Body('name') name: string,
  ) {
    return this.appService.genAtomicComponent(type, name);
  }

  @Post('ng/deploy')
  deploy() {
    return this.appService.deploy();
  }

}
