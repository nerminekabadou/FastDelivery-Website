import { IsNotEmpty, IsString, IsEmail, IsArray, ArrayUnique, ArrayNotEmpty, Matches  } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Le nom ne peut pas être vide' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  name: string;

  @IsNotEmpty({ message: 'Le nom ne peut pas être vide' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  //@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  password: string;

  @IsNotEmpty({ message: 'Email ne peut être vide' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'ne peut pas être vide' })
  @IsString({ message: 'doit être une chaîne de caractères' })
  adresse: string;

  confirmPassword: string;
}