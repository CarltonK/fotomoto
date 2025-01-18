import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAdminService {
  private defaultApp: admin.app.App;

  constructor() {
    this.defaultApp = admin.initializeApp({});
  }

  /**
   * Verify the Firebase ID token
   */
  async verifyToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    try {
      const user = await this.defaultApp.auth().verifyIdToken(idToken);
      const { uid } = user;

      // Check if user is disabled
      const disabled = await this.uidValidityCheck(uid);
      if (disabled) throw new UnauthorizedException('Account is disabled');

      return user;
    } catch (error) {
      throw new UnauthorizedException({
        status: false,
        message: error.message,
      });
    }
  }

  async uidValidityCheck(uid: string): Promise<boolean> {
    return (await this.defaultApp.auth().getUser(uid)).disabled;
  }

  /**
   * Disable a user account
   */
  async disableUser(uid: string): Promise<void> {
    await this.defaultApp.auth().updateUser(uid, { disabled: true });
  }

  async triggerEmailVerification(email: string): Promise<void> {
    await this.defaultApp.auth().generateEmailVerificationLink(email);
    return;
  }
}
