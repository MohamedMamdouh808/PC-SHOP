import { http, HttpResponse } from 'msw';

const mockUsers: any[] = [
  // Pre-create a test user so login works immediately
  {
    id: 'user_123456',
    email: 'admin1@gmail.com',
    password: 'Mohamed12@#',
    firstName: 'mohamed',
    lastName: 'mamdouh',
    role: 'CUSTOMER',
  }
];
const mockSessions: any[] = [];

export const handlers = [
  // Health check
  http.get('/health', () => {
    return HttpResponse.json({ status: 'ok', service: 'pc-shop-api-mock' });
  }),

  // Register
  http.post('/api/auth/register', async ({ request }) => {
    const data = await request.json() as any;
    
    const existingUser = mockUsers.find(u => u.email === data.email);
    if (existingUser) {
      return HttpResponse.json({
        errors: [{ code: 'CONFLICT', message: 'A user with this email already exists.', field: 'email' }]
      }, { status: 409 });
    }

    const user = {
      id: 'user_' + Date.now(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: 'CUSTOMER',
    };
    
    mockUsers.push({ ...user, password: data.password });
    
    return HttpResponse.json({
      message: 'Registration successful! You can now login.',
      user,
    }, { status: 201 });
  }),

  // Login
  http.post('/api/auth/login', async ({ request }) => {
    const data = await request.json() as any;
    
    const user = mockUsers.find(u => u.email === data.email && u.password === data.password);
    
    if (!user) {
      return HttpResponse.json({
        errors: [{ code: 'UNAUTHORIZED', message: 'Invalid email or password' }]
      }, { status: 401 });
    }

    const accessToken = 'mock_jwt_token_' + Date.now();
    
    return HttpResponse.json({
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  }),

  // Logout
  http.post('/api/auth/logout', () => {
    return HttpResponse.json({ message: 'Logged out successfully' });
  }),

  // Products list
  http.get('/api/products', () => {
    return HttpResponse.json({
      products: [
        {
          id: 'prod_1',
          name: 'NVIDIA GeForce RTX 4090',
          slug: 'nvidia-geforce-rtx-4090',
          description: 'The ultimate GeForce GPU.',
          price: 1599.99,
          images: ['https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800'],
          category: 'Graphics Cards',
          brand: 'NVIDIA',
          stock: 10,
          rating: 4.9,
          reviewCount: 128,
          features: ['DLSS 3', 'Ray Tracing', '24GB GDDR6X'],
          specs: { memory: '24GB', boost_clock: '2.52 GHz' },
          isNew: true,
        },
        {
          id: 'prod_2',
          name: 'AMD Ryzen 9 7950X',
          slug: 'amd-ryzen-9-7950x',
          description: '16-core, 32-thread processor.',
          price: 549.99,
          images: ['https://images.unsplash.com/photo-1555664424-778a69022365?w=800'],
          category: 'Processors',
          brand: 'AMD',
          stock: 25,
          rating: 4.8,
          reviewCount: 89,
          features: ['Zen 4 Architecture', '5nm Process', 'PCIe 5.0'],
          specs: { cores: '16', threads: '32', base_clock: '4.5 GHz' },
          isNew: false,
        },
      ],
      pagination: { page: 1, limit: 10, total: 2, totalPages: 1 },
    });
  }),

  // Single product
  http.get('/api/products/:slug', ({ params }) => {
    return HttpResponse.json({
      id: 'prod_1',
      name: 'NVIDIA GeForce RTX 4090',
      slug: params.slug,
      description: 'The ultimate GeForce GPU with massive leap in performance.',
      price: 1599.99,
      images: [
        'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800',
        'https://images.unsplash.com/photo-1587202372634-32705e3e568e?w=800',
      ],
      category: 'Graphics Cards',
      brand: 'NVIDIA',
      stock: 10,
      rating: 4.9,
      reviewCount: 128,
      features: ['DLSS 3', 'Ray Tracing', '24GB GDDR6X', 'Ada Lovelace Architecture'],
      specs: { 
        memory: '24GB GDDR6X', 
        boost_clock: '2.52 GHz',
        cuda_cores: '16384',
        tdp: '450W'
      },
      isNew: true,
    });
  }),

  // Create order (checkout)
  http.post('/api/orders', async () => {
    return HttpResponse.json({
      id: 'order_' + Date.now(),
      status: 'CONFIRMED',
      message: 'Order placed successfully!',
      total: 1599.99,
      createdAt: new Date().toISOString(),
    }, { status: 201 });
  }),

  // Get user orders
  http.get('/api/orders', () => {
    return HttpResponse.json({
      orders: [
        {
          id: 'order_1',
          status: 'DELIVERED',
          total: 1599.99,
          items: [{ product: { name: 'NVIDIA GeForce RTX 4090' }, quantity: 1, price: 1599.99 }],
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        }
      ],
    });
  }),

  // Get single order
  http.get('/api/orders/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      status: 'CONFIRMED',
      total: 1599.99,
      items: [{ 
        product: { 
          name: 'NVIDIA GeForce RTX 4090', 
          slug: 'nvidia-geforce-rtx-4090',
          images: ['https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800']
        }, 
        quantity: 1, 
        price: 1599.99 
      }],
      shippingAddress: {
        firstName: 'John',
        lastName: 'Doe',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
      },
      createdAt: new Date().toISOString(),
    });
  }),

  // Refresh token
  http.post('/api/auth/refresh', () => {
    return HttpResponse.json({
      accessToken: 'mock_jwt_token_' + Date.now(),
    });
  }),
];
