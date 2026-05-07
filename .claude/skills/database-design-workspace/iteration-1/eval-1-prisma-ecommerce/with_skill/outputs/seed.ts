// Seed file stub for e-commerce database
// Run with: npx prisma db seed

import { PrismaClient, OrderStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ─── Users ────────────────────────────────────────────

  const user1 = await prisma.user.create({
    data: {
      email: "alice@example.com",
      name: "Alice Johnson",
      passwordHash: "$2b$10$placeholder_hash_alice",
      phone: "+1-555-0101",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "bob@example.com",
      name: "Bob Smith",
      passwordHash: "$2b$10$placeholder_hash_bob",
      phone: "+1-555-0102",
    },
  });

  // ─── Addresses ────────────────────────────────────────

  const address1 = await prisma.address.create({
    data: {
      userId: user1.id,
      label: "Home",
      street: "123 Main St",
      city: "Springfield",
      state: "IL",
      postalCode: "62701",
      country: "US",
      isDefault: true,
    },
  });

  const address2 = await prisma.address.create({
    data: {
      userId: user2.id,
      label: "Work",
      street: "456 Oak Ave",
      city: "Portland",
      state: "OR",
      postalCode: "97201",
      country: "US",
      isDefault: true,
    },
  });

  // ─── Categories ───────────────────────────────────────

  const clothing = await prisma.category.create({
    data: {
      name: "Clothing",
      slug: "clothing",
      description: "Apparel and accessories",
    },
  });

  const tops = await prisma.category.create({
    data: {
      name: "Tops",
      slug: "tops",
      description: "Shirts, blouses, and tees",
      parentId: clothing.id,
    },
  });

  const electronics = await prisma.category.create({
    data: {
      name: "Electronics",
      slug: "electronics",
      description: "Gadgets and devices",
    },
  });

  // ─── Products & Variants ──────────────────────────────

  const tshirt = await prisma.product.create({
    data: {
      name: "Classic Cotton T-Shirt",
      slug: "classic-cotton-tshirt",
      description: "A comfortable everyday t-shirt made from 100% organic cotton.",
      basePrice: 29.99,
      categoryId: tops.id,
      isActive: true,
    },
  });

  const tshirtVariantSmallBlue = await prisma.productVariant.create({
    data: {
      productId: tshirt.id,
      sku: "TSHIRT-S-BLUE",
      size: "S",
      color: "Blue",
      stock: 50,
    },
  });

  const tshirtVariantMediumRed = await prisma.productVariant.create({
    data: {
      productId: tshirt.id,
      sku: "TSHIRT-M-RED",
      size: "M",
      color: "Red",
      stock: 30,
    },
  });

  const headphones = await prisma.product.create({
    data: {
      name: "Wireless Noise-Cancelling Headphones",
      slug: "wireless-nc-headphones",
      description: "Premium over-ear headphones with active noise cancellation.",
      basePrice: 199.99,
      categoryId: electronics.id,
      isActive: true,
    },
  });

  const headphonesBlack = await prisma.productVariant.create({
    data: {
      productId: headphones.id,
      sku: "HDPHN-BLACK",
      color: "Black",
      stock: 20,
    },
  });

  // ─── Orders ───────────────────────────────────────────

  const order1 = await prisma.order.create({
    data: {
      userId: user1.id,
      status: OrderStatus.CONFIRMED,
      shippingAddressId: address1.id,
      totalAmount: 59.98,
      items: {
        create: [
          {
            variantId: tshirtVariantSmallBlue.id,
            quantity: 2,
            unitPrice: 29.99,
          },
        ],
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      userId: user2.id,
      status: OrderStatus.PENDING,
      shippingAddressId: address2.id,
      totalAmount: 229.98,
      items: {
        create: [
          {
            variantId: tshirtVariantMediumRed.id,
            quantity: 1,
            unitPrice: 29.99,
          },
          {
            variantId: headphonesBlack.id,
            quantity: 1,
            unitPrice: 199.99,
          },
        ],
      },
    },
  });

  console.log("Seed data created successfully.");
  console.log({ user1, user2, clothing, tops, electronics, tshirt, headphones, order1, order2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
