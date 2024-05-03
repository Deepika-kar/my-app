import { Client, Databases, Storage, Query, ID } from "appwrite";
import conf from "./conf";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async getProject(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getProjects():: Error getting project");
      return false;
    }
  }
  async getProjects(queries = [Query.equal("active", true)]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log(
        "Appwrite service :: getProjects():: Error getting projects",
        error
      );
      return false;
    }
  }
  async createProject(data) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        data
      );
    } catch (error) {
      console.log(
        error,
        "Appwrite service :: createProject():: Error creating project"
      );
      return false;
    }
  }
  async updateProject(slug, data) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        data
      );
    } catch (error) {
      console.log(
        "Appwrite service :: updateProject():: Error updating project"
      );
      return false;
    }
  }
  async deleteProject(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(
        "Appwrite service :: deleteProject():: Error deleting project"
      );
      return false;
    }
  }
}

const service = new Service();

export default service;
