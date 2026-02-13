import { Product, RentalTool, Enquiry } from '../types';
import { supabase } from '../../lib/supabase';

// Helper function to convert database row to Product type
function dbToProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    category: row.category,
    price: row.price,
    wholesalePrice: row.wholesale_price,
    image: row.image_url, // Map image_url to image
    stock: row.stock,
    inStock: row.stock > 0, // Derive inStock from stock
    description: row.description,
  };
}

// Helper function to convert Product type to database row
function productToDb(product: Partial<Product>): any {
  const dbRow: any = {};

  if (product.name !== undefined) dbRow.name = product.name;
  if (product.brand !== undefined) dbRow.brand = product.brand;
  if (product.category !== undefined) dbRow.category = product.category;
  if (product.price !== undefined) dbRow.price = product.price;
  if (product.wholesalePrice !== undefined) dbRow.wholesale_price = product.wholesalePrice;
  if (product.image !== undefined) dbRow.image_url = product.image; // Map image to image_url
  if (product.stock !== undefined) dbRow.stock = product.stock;
  if (product.description !== undefined) dbRow.description = product.description;

  return dbRow;
}

// Helper function to convert database row to RentalTool type
function dbToRental(row: any): RentalTool {
  return {
    id: row.id,
    name: row.name,
    brand: '', // Not in new schema, use empty string
    image: row.image_url, // Map image_url to image
    rentPerDay: row.rent_per_day,
    rentPerHour: undefined, // Not in new schema
    deposit: row.deposit,
    available: row.availability === 'Available', // Map availability string to boolean
    description: row.description,
  };
}

// Helper function to convert RentalTool type to database row
function rentalToDb(rental: Partial<RentalTool>): any {
  const dbRow: any = {};

  if (rental.name !== undefined) dbRow.name = rental.name;
  if (rental.image !== undefined) dbRow.image_url = rental.image; // Map image to image_url
  if (rental.rentPerDay !== undefined) dbRow.rent_per_day = rental.rentPerDay;
  if (rental.deposit !== undefined) dbRow.deposit = rental.deposit;
  if (rental.available !== undefined) {
    dbRow.availability = rental.available ? 'Available' : 'Unavailable'; // Map boolean to string
  }
  if (rental.description !== undefined) dbRow.description = rental.description;

  return dbRow;
}

// ========== PRODUCTS API ==========

export const productsApi = {
  async getAll(): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        return [];
      }

      return (data || []).map(dbToProduct);
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  async add(product: Omit<Product, 'id'>): Promise<Product | null> {
    try {
      const productData = productToDb(product);

      const { data, error } = await supabase
        .from('products')
        .insert([productData as any])
        .select()
        .single();

      if (error) {
        console.error('Error adding product:', error);
        return null;
      }

      return dbToProduct(data as any);
    } catch (error) {
      console.error('Error adding product:', error);
      return null;
    }
  },

  async update(id: string, product: Product): Promise<boolean> {
    try {
      const productData = productToDb(product);
      delete productData.id; // Don't update the ID


      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id);

      if (error) {
        console.error('Error updating product:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error updating product:', error);
      return false;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting product:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  },
};

// ========== RENTALS API ==========

export const rentalsApi = {
  async getAll(): Promise<RentalTool[]> {
    try {
      const { data, error } = await supabase
        .from('rental_tools')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching rentals:', error);
        return [];
      }

      return (data || []).map(dbToRental);
    } catch (error) {
      console.error('Error fetching rentals:', error);
      return [];
    }
  },

  async add(rental: Omit<RentalTool, 'id'>): Promise<RentalTool | null> {
    try {
      const rentalData = rentalToDb(rental);

      const { data, error } = await supabase
        .from('rental_tools')
        .insert([rentalData as any])
        .select()
        .single();

      if (error) {
        console.error('Error adding rental:', error);
        return null;
      }

      return dbToRental(data as any);
    } catch (error) {
      console.error('Error adding rental:', error);
      return null;
    }
  },

  async update(id: string, rental: RentalTool): Promise<boolean> {
    try {
      const rentalData = rentalToDb(rental);
      delete rentalData.id;

      const { error } = await supabase
        .from('rental_tools')
        .update(rentalData)
        .eq('id', id);

      if (error) {
        console.error('Error updating rental:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error updating rental:', error);
      return false;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('rental_tools')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting rental:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting rental:', error);
      return false;
    }
  },
};

// ========== ENQUIRIES API ==========

export const enquiriesApi = {
  async save(enquiry: Omit<Enquiry, 'id' | 'date'>): Promise<boolean> {
    try {
      // Map frontend type values to database values
      const dbEnquiry = {
        name: enquiry.name,
        phone: enquiry.phone,
        message: enquiry.message,
        type: enquiry.type.charAt(0).toUpperCase() + enquiry.type.slice(1).toLowerCase(), // Capitalize first letter
      };

      const { error } = await supabase
        .from('enquiries')
        .insert([dbEnquiry as any]);

      if (error) {
        console.error('Error saving enquiry:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error saving enquiry:', error);
      return false;
    }
  },

  async getAll(): Promise<Enquiry[]> {
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching enquiries:', error);
        return [];
      }

      // Map database rows to frontend Enquiry type
      return ((data || []) as any[]).map(item => ({
        id: item.id,
        name: item.name,
        phone: item.phone,
        message: item.message,
        type: item.type.toLowerCase() as 'product' | 'rental' | 'general',
        date: item.created_at,
      }));
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      return [];
    }
  },
};
