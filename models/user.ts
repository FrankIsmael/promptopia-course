import { Schema, model, models } from 'mongoose';

interface IUser {
  email: string;
  username: string;
  image: string;
}

export type UserDocument = IUser & Document;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email already exists'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: [true, 'Username already exists'],
    // match validator should contain 8-20 alphanumeric characters and be unique
    match: [
      /^[a-zA-Z0-9]{8,20}$/,
      'Username should contain 8-20 alphanumeric characters',
    ],
  },
  image: { type: String },
});

// on nextjs we need to check if the model is already defined
// because this route is called every time the connection is stablished
const User = models.User ||  model('User', userSchema);



export default User;