import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../lib/prisma';
import { ProductListQuery } from '../../shared';
import { NotFoundError } from '../../lib/errors';

/**
 * Controller for product catalog discovery.
 */
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  const { 
    cursor, 
    limit = 20, 
    category, 
    minPrice, 
    maxPrice, 
    brand, 
    search, 
    sort 
  } = req.query as unknown as ProductListQuery;

  try {
    const where: any = {
      isActive: true,
    };

    if (category) {
      where.categoryId = category;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    if (brand) {
      where.brand = { contains: brand, mode: 'insensitive' };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
      ];
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price_asc') orderBy = { price: 'asc' };
    if (sort === 'price_desc') orderBy = { price: 'desc' };
    if (sort === 'popular') orderBy = { salesCount: 'desc' };

    const products = await prisma.product.findMany({
      where,
      take: limit + 1, // Take one extra to detect if there's a next page
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
      orderBy,
      include: {
        images: {
          select: { url: true, isThumbnail: true },
          where: { isThumbnail: true },
          take: 1
        },
        category: {
          select: { name: true, slug: true }
        }
      }
    });

    let nextCursor: string | undefined = undefined;
    if (products.length > limit) {
      const nextItem = products.pop();
      nextCursor = nextItem?.id;
    }

    res.status(200).json({
      data: products,
      pagination: {
        nextCursor,
        limit,
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getProductBySlug = async (req: Request, res: Response, next: NextFunction) => {
  const { slug } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        images: true,
        category: true,
        specs: true,
        reviews: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: { firstName: true, avatarUrl: true }
            }
          }
        }
      }
    });

    if (!product || !product.isActive) {
      throw new NotFoundError('Product', slug);
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await prisma.category.findMany({
      where: { parentId: null },
      include: {
        children: true
      },
      orderBy: { sortOrder: 'asc' }
    });

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};
