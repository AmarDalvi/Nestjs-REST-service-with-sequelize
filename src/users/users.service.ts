import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import sequelize, { where } from 'sequelize';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User)
        private userModel: typeof User,
      ) {}

    // Get all users
    public async getAllUsers(): Promise<User[]> {
        return this.userModel.findAll();
    }

    // Get user by id
    public async getUserById(id : number): Promise<User> {
        const user =  await this.userModel.findOne({
            where:{
                userId: id,
            }
        });
        // check if user already exist
        if(!user){
            throw new NotFoundException(`User with Id ${id} not found`);
        }
        return user;
    }


    // Create new user
    public async createUser(user: Partial<User>): Promise<User>{
        const checkUser = await this.userModel.findOne({
            where:{
                email : user.email,
            }
        })
        // check if user already exist
        if(checkUser){
            throw new ConflictException (`User with email ${user.email} already exist`);
        }
        const newUser = await this.userModel.create(user);
        return newUser;
    }


    // update user by id
    public async updateUserById(id : number, user:Partial<User>) : Promise<User>{
        const existingUser = await this.userModel.findOne({
            where:{
                userId: id 
            }
        })
        // check if user doesn't exist
        if(!existingUser){
            throw new NotFoundException(`user with id ${id} not found`);
        }
        // check if updated data's email already present
        const checkUser = await this.userModel.findOne({
            where:{
                email : user.email,
            }
        })
        if(checkUser){
            throw new ConflictException (`User with email ${user.email} already exist`);
        }

        const updatedUser = await existingUser.update({ ...user });
        return updatedUser; 
    }

    // delete user by id
    public async deleteUserById(id : number){
       const user = await this.userModel.destroy({
            where: {
                userId: id,
            }
        })
        // check if user is not present
        if(!user)throw new NotFoundException(`user with Id ${id} not found`)

        return `User with id ${id} deleted successfully`;
    }
}

