import sequelize from "sequelize";
import { Table, Model, Column , DataType, AutoIncrement, PrimaryKey} from "sequelize-typescript";

@Table({
  tableName:'users',
})
export class User extends  Model { 

      @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      })
      userId: number;


    @Column({ 
      type: DataType.STRING,
      allowNull: false,
      unique: false,
    })
    userName: string;

    @Column({
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    })
    email: string;
 


 } 

