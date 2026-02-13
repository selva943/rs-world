export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            products: {
                Row: {
                    id: string
                    name: string
                    brand: string
                    category: string
                    price: number
                    wholesale_price: number | null
                    stock: number
                    description: string | null
                    image_url: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    brand: string
                    category: string
                    price: number
                    wholesale_price?: number | null
                    stock: number
                    description?: string | null
                    image_url: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    brand?: string
                    category?: string
                    price?: number
                    wholesale_price?: number | null
                    stock?: number
                    description?: string | null
                    image_url?: string
                    created_at?: string
                }
            }
            rental_tools: {
                Row: {
                    id: string
                    name: string
                    rent_per_day: number
                    deposit: number
                    availability: string
                    description: string | null
                    image_url: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    rent_per_day: number
                    deposit: number
                    availability?: string
                    description?: string | null
                    image_url: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    rent_per_day?: number
                    deposit?: number
                    availability?: string
                    description?: string | null
                    image_url?: string
                    created_at?: string
                }
            }
            enquiries: {
                Row: {
                    id: string
                    name: string
                    phone: string
                    message: string
                    type: 'Product' | 'Rental' | 'General'
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    phone: string
                    message: string
                    type: 'Product' | 'Rental' | 'General'
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    phone?: string
                    message?: string
                    type?: 'Product' | 'Rental' | 'General'
                    created_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
