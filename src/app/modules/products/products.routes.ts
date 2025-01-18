import express, { Request, Response } from 'express';
import { FilterProductsParams, ProductController } from './products.controller';

const router = express.Router();

// Get the product list as a normal user
router.get('/', ProductController.getProducts);
// Product Filter
router.get('/filter', (req: Request, res: Response) => {
  try {
    const filters = req.query.filters
      ? JSON.parse(req.query.filters as string)
      : {};
    const page =
      typeof req.query.page === 'string' || typeof req.query.page === 'number'
        ? Number(req.query.page)
        : 1;

    const limit =
      typeof req.query.limit === 'string' || typeof req.query.limit === 'number'
        ? Number(req.query.limit)
        : 20;
    const search = typeof req.query.search === 'string' ? req.query.search : '';
    const sortBy =
      typeof req.query.sortBy === 'string' ? req.query.sortBy : 'createdAt';
    const order = typeof req.query.order === 'string' ? req.query.order : 'asc';
    const params: FilterProductsParams = {
      filters,
      page,
      limit,
      search,
      sortBy,
      order,
    };

    ProductController.filterProducts(params)
      .then((result) => res.json(result))
      .catch((err) => res.status(500).json({ error: err.message }));
  } catch (err) {
    res.status(400).json({ error: 'Invalid query parameters' });
  }
});

// Create Product As an Admin
router.post('/admin/create', ProductController.createProduct);
// Update Product as an Admin
router.put('/admin/update', ProductController.updateProduct);

export default router;

export const ProductRoutes = router;
