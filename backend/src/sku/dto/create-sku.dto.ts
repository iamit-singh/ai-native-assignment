import {
  IsString,
  MaxLength,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateSkuDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  code: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  stock?: number;

  @IsUUID()
  @IsNotEmpty()
  productId: string;
}
