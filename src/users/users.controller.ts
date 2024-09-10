import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';

@Controller('users')
export class UsersController {
    // injecting a service to the controller
    constructor(private readonly userService: UsersService) {}
 
    // Create user - POST - http://localhost:3000/users
    @Post()
    async createUser(@Body() user: User) : Promise<User> {
        return this.userService.createUser(user);
    }

    // Get All users - GET - http://localhost:3000/users
    @Get() 
    async getAllUsers(): Promise<User[]>{
        return this.userService.getAllUsers();
    }   

    // Get user by Id - GET - http://localhost:3000/users/{id}
    @Get(':id')
    async getUserById(@Param('id') id: number): Promise<User>{
        return this.userService.getUserById(id);
    } 

    // Updtade user by id - PUT - http://localhost:3000/users/{id}
    @Put(':id')
    async updateUserById(@Param('id') id : number,@Body() user : Partial<User>) : Promise<User> {
        return this.userService.updateUserById(id,user);
    }

    // Delete user by id - DELETE - http://localhost:3000/users/{id}
    @Delete(':id')
    async deleteUserById(@Param('id') id : number){
        return this.userService.deleteUserById(id);
    }

}








