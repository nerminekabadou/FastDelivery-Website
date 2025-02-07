import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private configService: ConfigService
  ) {}

  /**
   * Crée un nouvel utilisateur enregistré dans la base de données.
   * @param createUserDto Les données de l'utilisateur à créer
   * @returns L'utilisateur créé avec un token d'authentification
   */
  async create(createUserDto: CreateUserDto) {
    const user = new UserEntity();
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(createUserDto.password, salt);
    user.adresse = createUserDto.adresse;

    const newUser = await this.usersRepository.save(user);
    return this.generateTokenResponse(newUser);
  }

  /**
   * Recherche un utilisateur par son ID.
   * @param id L'ID de l'utilisateur recherché
   * @returns L'utilisateur trouvé
   */
  findUserById(id: number) {
    return this.usersRepository.findOneOrFail({ where: { id: id } });
  }

  /**
   * Récupère la liste de tous les utilisateurs.
   * @returns La liste de tous les utilisateurs
   */
  findAll() {
    return this.usersRepository.find();
  }

  /**
   * Recherche un utilisateur par son adresse e-mail.
   * @param email L'adresse e-mail de l'utilisateur recherché
   * @returns L'utilisateur trouvé
   */
  findUserByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email: email } });
  }

  /**
   * Supprime un utilisateur par son ID.
   * @param id L'ID de l'utilisateur à supprimer
   * @returns L'utilisateur supprimé
   */
  remove(id: number) {
    return this.usersRepository.delete(id);
  }

  /**
   * Génère une réponse de token d'authentification pour un utilisateur.
   * @param user L'utilisateur pour lequel générer le token
   * @returns La réponse contenant le token et les informations de l'utilisateur
   */
  public generateTokenResponse(user: UserEntity) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      this.configService.get('JWT_KEY'),
      { expiresIn: '30d' }
    );
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      adresse: user.adresse,
      token: token,
    };
  }
}
