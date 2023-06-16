import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateProductDto,
  UpdateProductDescriptionDTO,
} from './dto/product.dto';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { EUserRole } from '../user/enum/role.enum';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @UseGuards(new RoleGuard([EUserRole.SELLER]))
  @Put(':id/description')
  updateProductDescription(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDescriptionDTO,
  ) {
    return this.productService.updateProductDescription(
      id,
      updateProductDto.description,
    );
  }
}
