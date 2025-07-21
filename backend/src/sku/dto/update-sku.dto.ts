import {
  IsString,
  MaxLength,
  IsOptional,
  IsNumber,
  IsUUID,
  Min,
} from 'class-validator';

export class UpdateSkuDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  code?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  @Min(0)
  price?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  stock?: number;

  @IsUUID()
  @IsOptional()
  productId?: string;
}
