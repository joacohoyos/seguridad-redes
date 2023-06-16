import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateProductDto } from './dto/product.dto';
import { Pool } from 'pg';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllProducts() {
    return this.prisma.products.findMany();
  }

  async createProduct(createProductDto: CreateProductDto) {
    return this.prisma.products.create({ data: createProductDto });
  }

  async updateProductDescription(id: number, description: string) {
    const pool = new Pool({
      host: 'seguridad-redes-db',
      user: 'postgres',
      password: 'postgres',
      database: 'postgres',
      port: 5432,
    });
    const sqlQuery = `UPDATE products set description = '${description}' where id = '${id}'`;
    pool.query(sqlQuery, (error, results) => {
      if (error) {
        console.error('Error al ejecutar la consulta:', error);
        return;
      }

      // Maneja los resultados de la consulta aquí
      console.log('Resultados:', results);
    });
    pool.end();
  }
}
