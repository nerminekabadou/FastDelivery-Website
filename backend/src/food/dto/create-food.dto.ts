import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateFoodDto {
 
  @IsNotEmpty({ message: 'le nom ne peut pas être vide.' })
  @IsString()
  name: string;


  @IsNotEmpty({ message: 'le prix ne doit pas être vide' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'Le prix doit être un nombre et une précision décimale maximale 2'
    }
  )
  @IsPositive()
  price: number;


  @IsNotEmpty({ message: 'url ne peut pas être vide.' })
  @IsString()
  imageUrl: string;


  @IsNotEmpty({ message: 'description ne peut pas être vide.' })
  @IsString()
  description: string;
}
