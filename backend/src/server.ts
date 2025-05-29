import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const fastify = Fastify({ logger: true });

fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

// =========================
// Service Routes
// =========================

fastify.get("/services", async (req, reply) => {
  const { name } = req.query as { name?: string };
  const services = await prisma.serviceType.findMany({
    where: name ? { name: { contains: name, mode: "insensitive" } } : {},
  });
  return services;
});

fastify.post("/services", async (req, reply) => {
  const data = req.body as { name: string };
  const service = await prisma.serviceType.create({ data });
  return service;
});

fastify.put("/services/:id", async (req, reply) => {
  const { id } = req.params as { id: string };
  const data = req.body as { name?: string };

  const service = await prisma.serviceType.update({
    where: { id: Number(id) },
    data,
  });

  return service;
});

// =========================
// User Routes with filtering and ranking
// =========================

// GET /users?service=Petsitting
fastify.get("/users", async (req, reply) => {
  const { service, sortBy } = req.query as {
    service?: string;
    sortBy?: "rating" | "reviews";
  };

  const users = await prisma.user.findMany({
    where: service
      ? {
          services: {
            some: {
              name: {
                equals: service,
                mode: "insensitive",
              },
            },
          },
        }
      : {},
    include: {
      reviews: true,
      services: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  const usersWithRating = users.map((user: (typeof users)[number]) => {
    const totalReviews = user.reviews.length;
    const averageRating =
      totalReviews === 0
        ? 0
        : user.reviews.reduce(
            (sum: number, r: (typeof user.reviews)[number]) => sum + r.rating,
            0
          ) / totalReviews;

    return {
      ...user,
      totalReviews,
      averageRating: Number(averageRating.toFixed(2)),
    };
  });

  // Se sortBy estiver definido, ordenar manualmente após calcular os ratings
  if (sortBy === "rating") {
    usersWithRating.sort((a: any, b: any) => b.averageRating - a.averageRating);
  } else if (sortBy === "reviews") {
    usersWithRating.sort((a: any, b: any) => b.totalReviews - a.totalReviews);
  } else {
    usersWithRating.sort((a: any, b: any) => a.id - b.id);
  }

  return usersWithRating;
});

// Create user with connected services
fastify.post("/users", async (req, reply) => {
  const data = req.body as {
    name: string;
    region: string;
    serviceIds: number[];
  };

  const user = await prisma.user.create({
    data: {
      name: data.name,
      region: data.region,
      services: {
        connect: data.serviceIds.map((id) => ({ id })),
      },
    },
    include: {
      services: true,
    },
  });

  return user;
});

// Update user
fastify.put("/users/:id", async (req, reply) => {
  const { id } = req.params as { id: string };
  const data = req.body as {
    name?: string;
    region?: string;
    serviceIds?: number[];
  };

  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      name: data.name,
      region: data.region,
      services: data.serviceIds
        ? {
            set: data.serviceIds.map((id) => ({ id })),
          }
        : undefined,
    },
    include: {
      services: true,
    },
  });

  return user;
});

// POST /users/:id/reviews
fastify.post("/users/:id/reviews", async (req, reply) => {
  const { id } = req.params as { id: string };
  const { rating, comment } = req.body as {
    rating: number;
    comment: string;
  };

  if (!rating || rating < 0.5 || rating > 5 || !comment) {
    return reply.status(400).send({ error: "Invalid rating or comment" });
  }

  const review = await prisma.review.create({
    data: {
      userId: Number(id),
      rating,
      comment,
    },
  });

  return review;
});

// DELETE /users/:id
fastify.delete("/users/:id", async (req, reply) => {
  const { id } = req.params as { id: string };
  const userId = Number(id);

  try {
    await prisma.review.deleteMany({
      where: { userId },
    });

    await prisma.user.delete({
      where: { id: userId },
    });

    return reply.send({ message: "User and comments deleted successfully." });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "Error deleting user" });
  }
});

// =========================
// Start Server
// =========================

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    console.log("🚀 Server running at http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
