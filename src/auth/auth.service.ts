import { Inject, Injectable } from '@nestjs/common';
import { FirebaseAdminService } from './../firebase/firebase-admin.service';
import { FirebaseClientService } from './../firebase/firebase-client.service';
import { AuthUserDto } from '../users/dto/auth-user.dto';

@Injectable()
export class AuthService {
  private readonly ctx = { context: AuthService.name };
  constructor(
    @Inject(FirebaseAdminService)
    private readonly _firebaseAdminService: FirebaseAdminService,
    @Inject(FirebaseClientService)
    private readonly _firebaseClientService: FirebaseClientService,
  ) {}

  async createUser(dto: AuthUserDto) {
    const { emailAddress, password } = dto;
    try {
      const userCredential = await this._firebaseClientService.createUser(
        emailAddress,
        password,
      );
      const { user } = userCredential;
      const { uid } = user;

      // Create user in SQL database with the uid above as a primary / secondary unique identifier

      return;
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
