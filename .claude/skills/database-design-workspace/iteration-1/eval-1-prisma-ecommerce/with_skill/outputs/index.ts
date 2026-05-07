// Barrel export for e-commerce database models
// Re-exports all Prisma-generated types for convenient access

export { PrismaClient } from "@prisma/client";
export type {
  User,
  Address,
  Category,
  Product,
  ProductVariant,
  Order,
  OrderItem,
} from "@prisma/client";
export { OrderStatus } from "@prisma/client";
