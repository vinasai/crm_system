const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../backend/src/models/coreModels/Admin'); // Adjust the path if needed
const AdminPassword = require('../backend/src/models/coreModels/AdminPassword'); // Adjust the path if needed

// MongoDB connection
const mongoURI =
  'mongodb+srv://Dilini:Dil_1234@crm.tmeww.mongodb.net/CRM?retryWrites=true&w=majority&appName=CRM';

async function insertAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully!');

    // Admin details
    const adminData = {
      removed: false,
      enabled: true,
      email: 'admin@gmail.com',
      name: 'Dilini',
      surname: 'Navodya',
      photo: 'https://example.com/photo.jpg',
    };

    // Check if admin already exists
    let existingAdmin = await Admin.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('❌ Admin already exists!');
      mongoose.connection.close();
      return;
    }

    // Create and save the Admin
    const newAdmin = new Admin(adminData);
    await newAdmin.save();
    console.log('✅ Admin created successfully!');

    // Generate salt and hash the password
    const salt = bcrypt.genSaltSync(10);
    const password = 'Admin@123'; // Change this to a secure password
    const hashedPassword = bcrypt.hashSync(salt + password);

    // Create and save the AdminPassword
    const newAdminPassword = new AdminPassword({
      user: newAdmin._id,
      password: hashedPassword,
      salt: salt,
      emailVerified: false,
      authType: 'email',
    });

    await newAdminPassword.save();
    console.log('✅ Admin password saved successfully!');

    // Close the MongoDB connection
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error);
    mongoose.connection.close();
  }
}

// Run the function
insertAdmin();
