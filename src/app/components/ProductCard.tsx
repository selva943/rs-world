import { Product } from '../types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { MessageCircle, Package } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in ${product.name} (₹${product.price}). Is it available?`;
    const url = `https://wa.me/919361919109?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {product.brand === 'INGCO' && (
          <Badge className="absolute top-2 left-2 bg-[var(--ingco-yellow)] text-black hover:bg-yellow-500">
            INGCO
          </Badge>
        )}
        {product.inStock ? (
          <Badge className="absolute top-2 right-2 bg-green-600">In Stock</Badge>
        ) : (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Out of Stock
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="line-clamp-2 min-h-[3rem]">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.category}</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl text-[var(--ingco-yellow)]">₹{product.price}</span>
            <span className="text-sm text-muted-foreground">Retail</span>
          </div>
          {product.wholesalePrice && (
            <div className="flex items-baseline gap-2">
              <span className="text-lg">₹{product.wholesalePrice}</span>
              <span className="text-sm text-green-600">Wholesale</span>
            </div>
          )}
        </div>

        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Package className="w-4 h-4" />
          <span>Stock: {product.stock} units</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleWhatsApp}
          className="w-full bg-[var(--ingco-yellow)] text-black hover:bg-yellow-500"
          disabled={!product.inStock}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Enquire on WhatsApp
        </Button>
      </CardFooter>
    </Card>
  );
}
