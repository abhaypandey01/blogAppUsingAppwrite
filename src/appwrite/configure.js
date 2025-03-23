import {Client, ID, Databases, Storage, Query} from "appwrite"
import config from "../config/config"

export class Service{
    client = new Client()
    databases;
    storage;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.projectId);
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage = "", status, userId}){
        try {
            return await this.databases.createDocument(
                config.databaseId,
                config.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log(error);
            
        }
    }

    async updatePost( slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.databaseId,
                config.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log(error);
            
        }
    }

    async deletePost( slug){
        try {
            await this.databases.deleteDocument(
                config.databaseId,
                config.collectionId,
                slug
            )
            return true
        } catch (error) {
            console.log(error);
          return false  
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.databaseId,
                config.collectionId,
                slug
            )

        } catch (error) {
            console.log(error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.databaseId,
                config.collectionId,
                queries
            )
        } catch (error) {
            console.log(error);
            return false
        }
    }

    // file uploaad services
    async createFile(file){
        try {
            return await this.storage.createFile(
                config.bucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.bucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }
    getFilePreview(fileId){
        return this.storage.getFilePreview(
            config.bucketId,
            fileId
        )
    }
}

const service = new Service()

export default service