import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
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
    const promisifiedQuery = (query) => {
      return new Promise((resolve, reject) => {
        pool.query(query, (error, results) => {
          if (error) {
            console.error('Error al ejecutar la consulta:', error);
            reject(new BadRequestException(error));
          } else {
            console.log('Resultados:', results);
            resolve(results);
          }
        });
      });
    };
    const sqlQuery = `UPDATE products set description = '${description}' where id = '${id}'`;
    try {
      const results = await promisifiedQuery(sqlQuery);
      console.log(results)
      return results;
      // Handle the query results here
    } catch (error) {
      console.error('Error al ejecutar la consulta:', error);
      throw new HttpException(error, 400);
      // Handle the error here
    } finally {
      pool.end();
    }
    }
}
