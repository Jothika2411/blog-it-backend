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
    const posts = [
      {
        title: 'Exploring the Mountains',
        content:
          'Mountains are beautiful and offer a great escape from the hustle and bustle of city life. In this post, we will explore some of the most breathtaking mountain ranges around the world.',
        author: userDocs[0]._id,
      },
      {
        title: 'A Day in the Life of a Software Developer',
        content:
          'Ever wondered what a typical day looks like for a software developer? In this post, we will walk you through a day in the life of a developer, from morning stand-ups to late-night coding sessions.',
        author: userDocs[1]._id,
      },
      {
        title: 'The Benefits of Yoga',
        content:
          'Yoga is not just a physical exercise; it is a way of life. In this post, we will discuss the numerous benefits of practicing yoga, including improved flexibility, mental clarity, and overall well-being.',
        author: userDocs[2]._id,
      },
      {
        title: 'Traveling on a Budget',
        content:
          'Traveling doesn’t have to be expensive. In this post, we will share some tips and tricks on how to travel the world on a budget, from finding cheap flights to affordable accommodations.',
        author: userDocs[0]._id,
      },
      {
        title: 'The Art of Cooking',
        content:
          'Cooking is an art that anyone can master. In this post, we will share some delicious recipes and cooking techniques that will help you become a better cook.',
        author: userDocs[1]._id,
      },
      {
        title: 'The Importance of Mental Health',
        content:
          'Mental health is just as important as physical health. In this post, we will discuss the importance of taking care of your mental health and share some tips on how to maintain a healthy mind.',
        author: userDocs[2]._id,
      },
      {
        title: 'The Future of Technology',
        content:
          'Technology is evolving at a rapid pace. In this post, we will explore some of the latest technological advancements and discuss what the future holds for the tech industry.',
        author: userDocs[0]._id,
      },
      {
        title: 'Fitness Tips for Busy People',
        content:
          'Staying fit can be challenging, especially if you have a busy schedule. In this post, we will share some fitness tips and exercises that you can do even with a tight schedule.',
        author: userDocs[1]._id,
      },
      {
        title: 'The Beauty of Nature',
        content:
          'Nature is full of beauty and wonder. In this post, we will take a closer look at some of the most beautiful natural landscapes and discuss the importance of preserving our environment.',
        author: userDocs[2]._id,
      },
      {
        title: 'Learning a New Language',
        content:
          'Learning a new language can be a rewarding experience. In this post, we will share some tips and resources that can help you learn a new language quickly and effectively.',
        author: userDocs[0]._id,
      },
      {
        title: 'The Joy of Gardening',
        content:
          'Gardening is a relaxing and fulfilling hobby. In this post, we will explore the basics of gardening and how it can bring joy and tranquility to your life.',
        author: userDocs[1]._id,
      },
      {
        title: 'Understanding Cryptocurrency',
        content:
          'Cryptocurrency is a digital asset that is changing the financial landscape. In this post, we will delve into the basics of cryptocurrency and its potential impact on the economy.',
        author: userDocs[2]._id,
      },
      {
        title: 'Mindfulness and Meditation',
        content:
          'Mindfulness and meditation can greatly enhance your quality of life. In this post, we will discuss techniques and benefits of incorporating mindfulness into your daily routine.',
        author: userDocs[0]._id,
      },
    ];

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
