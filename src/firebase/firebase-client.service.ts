import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';

@Injectable()
export class FirebaseClientService implements OnModuleInit {
  private firebaseApp: FirebaseApp;
  private firebaseAuth: Auth;

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    const backendSecrets = JSON.parse(
      this.configService.get<string>('BACKEND_SECRETS'),
    );
    const { apiKey, authDomain } = backendSecrets;
    const firebaseConfig = { apiKey, authDomain };

    // Initialize the Firebase app
    this.firebaseApp = initializeApp(firebaseConfig);

    // Initialize the Firebase Auth instance
    this.firebaseAuth = getAuth(this.firebaseApp);
  }

  get auth(): Auth {
    return this.firebaseAuth;
  }

  /**
   * Creates a user
   * Returns a UserCredential instance which contains all user and auth info
   */
  async createUser(email: string, password: string) {
    return await createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    );
  }

  /**
   * Login
   * Returns a JWT
   */
  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    );
    // Generate an ID Token from firebase. Replaces need for a custom passport strategy for auth
    return await userCredential.user.getIdToken();
  }

  /**
   * Logout
   */
  async logout() {
    return await signOut(this.auth);
  }

  /**
   * Trigger a password reset
   */
  async sendPasswordReset(email: string) {
    return await sendPasswordResetEmail(this.firebaseAuth, email);
  }
}
