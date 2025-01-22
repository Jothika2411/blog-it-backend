import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const removePassword = (user: IUser) => {
  const { password: _, ...userWithoutPassword } = user.toJSON();
  return userWithoutPassword;
};

export const signUpUser = async (username: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  const userWithoutPassword = removePassword(user);
  const token = jwt.sign(userWithoutPassword, process.env.JWT_SECRET!);
  return { token, user: userWithoutPassword };
};

export const signInUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid password');
  const userWithoutPassword = removePassword(user);
  const token = jwt.sign(userWithoutPassword, process.env.JWT_SECRET!);
  return { token, user: userWithoutPassword };
};
