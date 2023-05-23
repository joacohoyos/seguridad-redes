import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async getMenuItems(section: string) {
    try {
    // Simulating the SQL Injection vulnerability
    const sectionQuery = `SELECT * FROM menu WHERE section = ${section}`;
    const menuItems = await this.prisma.$queryRawUnsafe(sectionQuery);
    return {
      items: menuItems,
    };
    }catch(e){ 
      console.log(e)
    }
  }
}
