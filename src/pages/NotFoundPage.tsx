import { Link } from 'react-router-dom';
import { Icons } from '../components/Icons';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <Icons.Cpu size={80} className="mx-auto text-brand-primary/50" />
        </div>
        <h1 className="text-6xl font-heading font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-heading text-slate-300 mb-4">Page Not Found</h2>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. 
          Check the URL or browse our products.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary px-8 py-3 inline-flex items-center justify-center gap-2">
            <Icons.Home size={20} />
            Go Home
          </Link>
          <Link to="/products" className="btn-secondary px-8 py-3 inline-flex items-center justify-center gap-2">
            <Icons.ShoppingBag size={20} />
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
