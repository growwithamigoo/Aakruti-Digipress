import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log("Clearing database...")
  await prisma.portfolioProjectImage.deleteMany({});
  await prisma.portfolioProject.deleteMany({});
  await prisma.portfolioCategory.deleteMany({});
  await prisma.albumProductImage.deleteMany({});
  await prisma.albumProductOccasion.deleteMany({});
  await prisma.albumProduct.deleteMany({});
  await prisma.albumCollection.deleteMany({});
  await prisma.albumOccasion.deleteMany({});

  // 1. Portfolio Categories
  const portCategories = [
    { name: 'Wedding', slug: 'wedding' },
    { name: 'Engagement', slug: 'engagement' },
    { name: 'First Birthday', slug: 'first-birthday' },
    { name: 'Shashtipoorthi', slug: 'shashtipoorthi' },
    { name: 'Anniversary', slug: 'anniversary' },
    { name: 'Baby', slug: 'baby' },
    { name: 'Family Celebration', slug: 'family-celebration' },
    { name: 'Other Events', slug: 'other-events' },
  ]
  for (const cat of portCategories) {
    await prisma.portfolioCategory.create({ data: cat })
  }

  // 2. Portfolio Projects
  const featuredProjects = [
    {
      title: 'A Royal Telugu Wedding',
      slug: 'royal-telugu-wedding',
      shortDescription: 'Premium lay-flat album in Vijayawada.',
      description: 'A beautiful traditional Telugu wedding captured in all its glory.',
      eventYear: '2025',
      isPublished: true,
      isFeatured: true,
      coverImage: '/assets/akh1.png',
      categorySlug: 'wedding'
    },
    {
      title: 'Elegant Engagement Ceremony',
      slug: 'elegant-engagement',
      shortDescription: 'Crystal acrylic cover engagement album.',
      description: 'The start of a beautiful journey, printed with exceptional clarity.',
      eventYear: '2024',
      isPublished: true,
      isFeatured: true,
      coverImage: '/assets/akh2.png',
      categorySlug: 'engagement'
    },
    {
      title: 'Grand Shashtipoorthi',
      slug: 'grand-shashtipoorthi',
      shortDescription: 'Sixty years of blessings.',
      description: 'Preserving a once-in-a-lifetime family milestone in a leather-bound heirloom.',
      eventYear: '2023',
      isPublished: true,
      isFeatured: true,
      coverImage: '/assets/akh4.png',
      categorySlug: 'shashtipoorthi'
    },
    {
      title: 'First Birthday Celebrations',
      slug: 'first-birthday-celebration',
      shortDescription: 'Memories of a special day.',
      description: 'Joyous moments printed on archival paper to last generations.',
      eventYear: '2025',
      isPublished: true,
      isFeatured: true,
      coverImage: '/assets/akh3.png',
      categorySlug: 'first-birthday'
    }
  ];

  for (const proj of featuredProjects) {
    await prisma.portfolioProject.create({
      data: {
        title: proj.title,
        slug: proj.slug,
        shortDescription: proj.shortDescription,
        description: proj.description,
        eventYear: proj.eventYear,
        isPublished: proj.isPublished,
        isFeatured: proj.isFeatured,
        coverImage: proj.coverImage,
        category: { connect: { slug: proj.categorySlug } }
      }
    });
  }

  // 3. Album Collections
  const collections = [
    'Aakruti Signature',
    'Aakruti Premium',
    'Aakruti Classic',
    'Aakruti Heritage',
    'Aakruti Celebrations',
    'Aakruti Professional',
    'Aakruti Presentation'
  ]
  for (const c of collections) {
    await prisma.albumCollection.create({
      data: { name: c, slug: c.toLowerCase().replace(/ /g, '-') }
    })
  }

  // 4. Album Occasions
  const occasions = [
    'Wedding', 'Engagement', 'Pre-Wedding', 'First Birthday', 'Baby', 
    'Shashtipoorthi', 'Family', 'Corporate', 'Other Events', 'Studio', 'Portraits'
  ]
  for (const o of occasions) {
    await prisma.albumOccasion.create({
      data: { name: o, slug: o.toLowerCase().replace(/ /g, '-') }
    })
  }

  // Helper to connect occasions
  const getOccasions = (tags: string[]) => tags.map((t: string) => ({
    occasion: { connect: { slug: t.toLowerCase().replace(/ /g, '-') } }
  }))

  // 5. Album Products
  const products = [
    {
      name: 'Premium Acrylic Window Album',
      slug: 'premium-acrylic-window-album',
      collectionSlug: 'aakruti-signature',
      shortDescription: 'Maroon leather album with a large acrylic photo window and matching box.',
      mainImage: '/products/acrylic_window_album_1784800108462.png',
      tags: ['Wedding', 'Engagement']
    },
    {
      name: 'Crystal Edge Album',
      slug: 'crystal-edge-album',
      collectionSlug: 'aakruti-signature',
      shortDescription: 'Glossy crystal-style cover with edge-to-edge wedding image and premium black box.',
      mainImage: '/products/crystal_edge_album_1784800119626.png',
      tags: ['Wedding']
    },
    {
      name: 'Classic Leather Album',
      slug: 'classic-leather-album',
      collectionSlug: 'aakruti-premium',
      shortDescription: 'Rich tan leather album with engraved initials and subtle stitched border.',
      mainImage: '/products/classic_leather_album_1784800129841.png',
      tags: ['Wedding', 'Family']
    },
    {
      name: 'Plush Leather Album',
      slug: 'plush-leather-album',
      collectionSlug: 'aakruti-premium',
      shortDescription: 'Soft brown plush leather cover, embossed monogram and matching box.',
      mainImage: '/products/plush_leather_album_1784800140888.png',
      tags: ['Wedding', 'Pre-Wedding']
    },
    {
      name: 'Designer Fabric Album',
      slug: 'designer-fabric-album',
      collectionSlug: 'aakruti-premium',
      shortDescription: 'Ivory textured fabric cover with a small framed photograph.',
      mainImage: '/products/designer_fabric_album_1784800151320.png',
      tags: ['Wedding', 'Portraits']
    },
    {
      name: 'Velvet Celebration Album',
      slug: 'velvet-celebration-album',
      collectionSlug: 'aakruti-heritage',
      shortDescription: 'Deep maroon velvet album with antique-gold motif and matching presentation case.',
      mainImage: '/products/velvet_celebration_album_1784800174693.png',
      tags: ['Wedding', 'Shashtipoorthi']
    },
    {
      name: 'Photo Window Fabric Album',
      slug: 'photo-window-fabric-album',
      collectionSlug: 'aakruti-classic',
      shortDescription: 'Beige fabric cover with circular or rectangular image window.',
      mainImage: '/products/photo_window_fabric_album_1784800184774.png',
      tags: ['Family', 'Portraits']
    },
    {
      name: 'Lay-Flat Wedding Album',
      slug: 'lay-flat-wedding-album',
      collectionSlug: 'aakruti-professional',
      shortDescription: 'Closed premium cover displayed beside an open seamless panoramic spread.',
      mainImage: '/products/lay_flat_wedding_album_1784800196971.png',
      tags: ['Wedding', 'Engagement']
    },
    {
      name: 'Flush-Mount Studio Album',
      slug: 'flush-mount-studio-album',
      collectionSlug: 'aakruti-professional',
      shortDescription: 'Thick-page professional album with clean black leather cover.',
      mainImage: '/products/flush_mount_studio_album_1784800208156.png',
      tags: ['Wedding', 'Studio']
    },
    {
      name: 'Traditional Telugu Wedding Album',
      slug: 'traditional-telugu-wedding-album',
      collectionSlug: 'aakruti-heritage',
      shortDescription: 'Temple-red cover with subtle gold Telugu-inspired decorative pattern and photo window.',
      mainImage: '/products/telugu_wedding_album_1784800221115.png',
      tags: ['Wedding']
    },
    {
      name: 'First Birthday Album',
      slug: 'first-birthday-album',
      collectionSlug: 'aakruti-celebrations',
      shortDescription: 'Pastel-pink fabric album with baby photo window and matching presentation box.',
      mainImage: '/products/first_birthday_album_1784800245603.png',
      tags: ['First Birthday', 'Baby']
    },
    {
      name: 'Baby Memories Album',
      slug: 'baby-memories-album',
      collectionSlug: 'aakruti-celebrations',
      shortDescription: 'Soft ivory or pastel-blue album with minimal teddy-bear motif.',
      mainImage: '/products/baby_memories_album_1784800257649.png',
      tags: ['Baby', 'Family']
    },
    {
      name: 'Engagement Album',
      slug: 'engagement-album',
      collectionSlug: 'aakruti-celebrations',
      shortDescription: 'Rose-gold cover with couple initials and refined ring motif.',
      mainImage: '/products/engagement_album_1784800269300.png',
      tags: ['Engagement', 'Pre-Wedding']
    },
    {
      name: 'Shashtipoorthi Album',
      slug: 'shashtipoorthi-album',
      collectionSlug: 'aakruti-heritage',
      shortDescription: 'Ivory and antique-gold album with traditional floral motif and premium box.',
      mainImage: '/products/shashtipoorthi_album_1784800281319.png',
      tags: ['Shashtipoorthi', 'Family']
    },
    {
      name: 'Family Celebration Album',
      slug: 'family-celebration-album',
      collectionSlug: 'aakruti-classic',
      shortDescription: 'Green or beige textured cover with elegant family photo window.',
      mainImage: '/products/family_celebration_album_1784800292163.png',
      tags: ['Family', 'Other Events']
    },
    {
      name: 'Premium Album Box Set',
      slug: 'premium-album-box-set',
      collectionSlug: 'aakruti-presentation',
      shortDescription: 'Album inside a rigid premium box with ribbon or magnetic closure.',
      mainImage: '/products/premium_album_box_set_1784800312490.png',
      tags: ['Wedding']
    },
    {
      name: 'Album and Carry Bag Set',
      slug: 'album-and-carry-bag-set',
      collectionSlug: 'aakruti-presentation',
      shortDescription: 'Matching album and structured premium carrying bag.',
      mainImage: '/products/album_carry_bag_set_1784800324952.png',
      tags: ['Wedding', 'Studio']
    },
    {
      name: 'Corporate Presentation Album',
      slug: 'corporate-presentation-album',
      collectionSlug: 'aakruti-professional',
      shortDescription: 'Minimal navy-blue leather album with embossed logo area and matching case.',
      mainImage: '/products/corporate_presentation_album_1784800336893.png',
      tags: ['Corporate']
    }
  ];

  for (const p of products) {
    await prisma.albumProduct.create({
      data: {
        name: p.name,
        slug: p.slug,
        shortDescription: p.shortDescription,
        mainImage: p.mainImage,
        status: 'Published',
        collection: { connect: { slug: p.collectionSlug } },
        occasions: { create: getOccasions(p.tags) }
      }
    });
  }

  // 6. Admin User
  const adminEmail = 'admin@aakrutidigipress.com';
  const existingAdmin = await prisma.admin.findUnique({ where: { email: adminEmail } });
  
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('aakruti123', 10);
    await prisma.admin.create({
      data: {
        email: adminEmail,
        password_hash: passwordHash,
      }
    });
    console.log('Default admin created: admin@aakrutidigipress.com / aakruti123');
  }

  console.log('Database successfully seeded with Portfolios, Physical Album Products, and Admin!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
