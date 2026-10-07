import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { Enquiry } from '../models/enquiry.model';
import { connectDB } from '../config/db';

const sampleEnquiries = [
  {
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 9876543210',
    userType: 'Student',
    interest: 'DGCA Remote Pilot Certification (Small Category)',
    message: 'I am a final year aeronautical engineering student interested in the upcoming DGCA pilot license batch. What is the fee structure and schedule?',
    status: 'New',
  },
  {
    name: 'Priya Patel',
    email: 'priya.patel@agrotech.in',
    phone: '+91 9823456781',
    userType: 'Customer',
    interest: 'Agricultural Drone Spraying & Crop Health Survey',
    message: 'We have 150 acres of agricultural land in Gujarat and need weekly multispectral crop monitoring and automated pesticide spraying solutions.',
    status: 'In Progress',
  },
  {
    name: 'Vikramaditya Rao',
    email: 'v.rao@cinevision.com',
    phone: '+91 9711223344',
    userType: 'Customer',
    interest: 'High-Altitude Aerial Cinematography',
    message: 'We are filming a feature documentary in Ladakh and require heavy-lift FPV and RED/ARRI gimbal drone pilots for high altitude filming.',
    status: 'Contacted',
  },
  {
    name: 'Neha Kulkarni',
    email: 'neha.k@buildinfra.org',
    phone: '+91 9123456789',
    userType: 'Customer',
    interest: 'GIS Mapping & 3D Photogrammetry',
    message: 'Need LiDAR and high-resolution 3D terrain modeling for a 45km highway infrastructure project in Maharashtra.',
    status: 'Closed',
  },
  {
    name: 'Rohan Mehta',
    email: 'rohan.mehta@students.edu',
    phone: '+91 9845098450',
    userType: 'Student',
    interest: 'Drone Hardware Engineering & Repair',
    message: 'Interested in hands-on soldering, ESC calibration, and PX4 flight controller firmware programming workshop.',
    status: 'New',
  },
  {
    name: 'Dr. Suresh Nair',
    email: 'suresh.nair@envtech.ac.in',
    phone: '+91 9447112233',
    userType: 'Other',
    interest: 'Forest Canopy & Wildlife Monitoring',
    message: 'Our research institution seeks partnership for thermal drone surveillance to track elephant herd movement near forest corridors.',
    status: 'Contacted',
  },
];

const seedData = async () => {
  try {
    await connectDB();
    console.log('[Seed] Clearing existing enquiries...');
    await Enquiry.deleteMany({});

    console.log('[Seed] Inserting sample enquiries...');
    const inserted = await Enquiry.insertMany(sampleEnquiries);
    console.log(`[Seed] Successfully inserted ${inserted.length} sample enquiries!`);

    await mongoose.connection.close();
    console.log('[Seed] Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('[Seed] Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
