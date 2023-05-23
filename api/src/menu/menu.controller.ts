
import { Controller, Get, Query } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  getMenuItems(@Query('section') section: string) {
    return this.menuService.getMenuItems(section);
  }
}
