import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../src/models/User';
import Post from '../src/models/Post';
import connectDB from '../src/config/db';

const seedData = async () => {
  console.log('Connecting to the database...');
  await connectDB();
  console.log('Database connected.');

  try {
    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Post.deleteMany({});
    console.log('Existing data cleared.');

    // Create users
    console.log('Creating users...');
    const users = [
      { username: 'Jothika', email: 'jothika@example.com', password: 'Hello@2025' },
      { username: 'Pavi', email: 'pavi@example.com', password: 'Hello@2025' },
      { username: 'Guest', email: 'guest@example.com', password: 'Hello@2025' },
    ];

    const userDocs = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await new User({ ...user, password: hashedPassword }).save();
        console.log(`User created: ${newUser.username}`);
        return newUser;
      })
    );

    // Create posts
    console.log('Creating posts...');
    const posts = Array.from({ length: 10 }, (_, i) => ({
      title: `Sample Post ${i + 1}`,
      content: `This is the content for post ${i + 1}.`,
      author: userDocs[i % userDocs.length]._id,
    }));

    await Post.insertMany(posts);
    console.log('Posts created.');

    console.log('Data seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
    console.log('Database connection closed.');
  }
};

seedData().catch((error) => {
  console.error('Error in seedData function:', error);
  mongoose.connection.close();
});
