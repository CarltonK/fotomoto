import { Inject, Injectable } from '@nestjs/common';
import { FirebaseAdminService } from './../firebase/firebase-admin.service';
import { FirebaseClientService } from './../firebase/firebase-client.service';

@Injectable()
export class AuthService {
  private readonly ctx = { context: AuthService.name };
  constructor(
    @Inject(FirebaseAdminService)
    private readonly _firebaseAdminService: FirebaseAdminService,
    @Inject(FirebaseClientService)
    private readonly _firebaseClientService: FirebaseClientService,
  ) {}

  async createUser() {
    try {
      const userCredential = await this._firebaseClientService.createUser(
        '',
        '',
      );
      const { user } = userCredential;
      const { uid } = user;

      // Create user in SQL database with the uid above as a primary / secondary unique identifier

      return;
    } catch (error) {
      throw error;
    }
  }

  async authenticateUser() {
    try {
      const authToken = await this._firebaseClientService.login('', '');
      return authToken;
    } catch (error) {
      throw error;
    }
  }
}
