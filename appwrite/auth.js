import { Client, Account, ID } from "appwrite";
import conf from "./conf";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
  /**
   * Creates a new user account.
   *
   * @param {object} data - The data for the new user account.
   * @param {string} data.email - The email address of the new user.
   * @param {string} data.password - The password for the new user.
   * @param {string} [data.name] - The name of the new user.
   * @param {string} [data.type] - The type of the new user. Can be either "normal" or "oauth".
   * @returns {object} The user account object if the creation was successful, otherwise an error.
   */
  async createAccount({ email, password, name, type }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
        type
      );
      if (userAccount) {
        return this.login(email, password);
      } else {
      }
    } catch (error) {
      console.log("Error creating account", error);
    }
  }
  async login(email, password) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Error loggingIn", error);
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Error getting current user", error);
    }
  }
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Error logging out", error);
    }
  }
}

const authService = new AuthService();
export default authService;
