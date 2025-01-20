import { Inject, Injectable } from '@nestjs/common';
import { FirebaseClientService } from './../firebase/firebase-client.service';
import { AuthUserDto } from '../users/dto/auth-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUser } from './../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  private readonly ctx = { context: AuthService.name };
  constructor(
    @Inject(FirebaseClientService)
    private readonly _firebaseClientService: FirebaseClientService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUser): Promise<User> {
    const { emailAddress, password, username } = dto;
    try {
      const userCredential = await this._firebaseClientService.createUser(
        emailAddress,
        password,
      );
      const { user } = userCredential;
      const { uid } = user;

      // Create user in SQL database with the uid above as a primary / secondary unique identifier
      const userEntity = this.userRepository.create({
        uid,
        username,
        emailAddress,
      });

      return await this.userRepository.save(userEntity);
    } catch (error) {
      throw error;
    }
  }

  async authenticateUser(dto: AuthUserDto) {
    const { emailAddress, password } = dto;

    try {
      const authToken = await this._firebaseClientService.login(
        emailAddress,
        password,
      );
      return authToken;
    } catch (error) {
      throw error;
    }
  }

  async unauthenticateUser() {
    try {
      return await this._firebaseClientService.logout();
    } catch (error) {
      throw error;
    }
  }
}
