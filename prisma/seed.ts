import { PrismaClient } from '@prisma/client';
import * as bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  try {
    console.log('📋 Creating roles...');

    // Create roles - Prisma will auto-generate UUID
    const userRole = await prisma.role.create({
      data: {
        name: 'user',
        description: 'Regular user role',
      },
    });

    const adminRole = await prisma.role.create({
      data: {
        name: 'admin',
        description: 'Administrator role with full access',
      },
    });

    console.log('✅ Roles created:', {
      user: userRole.name,
      admin: adminRole.name,
    });

    console.log('👤 Creating users...');

    // Hash passwords
    const hashedPasswordUser = await bcryptjs.hash('user123456', 10);
    const hashedPasswordAdmin = await bcryptjs.hash('admin123456', 10);

    // Create regular user - Prisma will auto-generate UUIDs
    const regularUser = await prisma.user.create({
      data: {
        email: 'user@example.com',
        password: hashedPasswordUser,
        profile: {
          create: {
            name: 'Regular User',
            phone: '081234567890',
            address: 'Jl. User Street No. 1',
            bio: 'I am a regular user',
          },
        },
        userRoles: {
          create: {
            roleId: userRole.id,
          },
        },
      },
      include: {
        userRoles: true,
        profile: true,
      },
    });

    // Create admin user - Prisma will auto-generate UUIDs
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: hashedPasswordAdmin,
        profile: {
          create: {
            name: 'Administrator',
            phone: '089876543210',
            address: 'Jl. Admin Street No. 1',
            bio: 'I am an administrator',
          },
        },
        userRoles: {
          create: {
            roleId: adminRole.id,
          },
        },
      },
      include: {
        userRoles: true,
        profile: true,
      },
    });

    console.log('✅ Users created:', {
      user: regularUser.email,
      admin: adminUser.email,
    });

    console.log('✨ Database seeding completed successfully!');
    console.log('\n📝 Login Credentials:');
    console.log(`User - Email: user@example.com | Password: user123456`);
    console.log(`Admin - Email: admin@example.com | Password: admin123456`);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
