import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial feedbacks...');

  const feedbacks = [
    {
      customerName: 'Rajesh Sharma',
      shopName: 'Sharma Electronics, Sitapura',
      serviceUsed: 'nag-load',
      starRating: 5,
      serviceQuality: 'excellent',
      deliveryOnTime: true,
      staffBehavior: 'excellent',
      wouldRecommend: true,
      comment: 'VKI se Sitapura tak har ek item bilkul sahi count ke sath safely deliver ho gaya. Delivery slip me sab details proper thi. Staff ka behavior bohot achha tha.',
      isApproved: true,
      isFeatured: true,
    },
    {
      customerName: 'Vijay Saini',
      shopName: 'Saini Kirana Store, Vatika',
      serviceUsed: 'part-load',
      starRating: 5,
      serviceQuality: 'excellent',
      deliveryOnTime: true,
      staffBehavior: 'excellent',
      wouldRecommend: true,
      comment: 'Hume thoda sa maal bhejna tha, pure truck ka paisa dene ki zaroorat nahi padi. Part load option bohot badiya hai. Rate bhi bohot sahi hai.',
      isApproved: true,
      isFeatured: true,
    },
    {
      customerName: 'Amit Choudhary',
      shopName: 'Choudhary Agro Industries, Sanganer',
      serviceUsed: 'full-load',
      starRating: 4,
      serviceQuality: 'good',
      deliveryOnTime: true,
      staffBehavior: 'good',
      wouldRecommend: true,
      comment: 'SFC Transport ki service bohot fast aur reliable hai. Hamara full load maal time par bina kisi nuksan ke deliver ho gaya.',
      isApproved: true,
      isFeatured: true,
    },
  ];

  for (const f of feedbacks) {
    await prisma.feedback.create({
      data: f,
    });
  }

  console.log('Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
