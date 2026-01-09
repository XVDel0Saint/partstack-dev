<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // sample data for products
        Product::insert([
            ['name' => 'Laptop', 'price' => 49999, 'stock' => 10],
            ['name' => 'Mouse', 'price' => 599, 'stock' => 30],
            ['name' => 'Keyboard', 'price' => 1299, 'stock' => 15],
            ['name' => 'Monitor', 'price' => 10999, 'stock' => 12],
            ['name' => 'Gaming Chair', 'price' => 8999, 'stock' => 8],
            ['name' => 'External Hard Drive', 'price' => 3999, 'stock' => 25],
            ['name' => 'USB Flash Drive', 'price' => 499, 'stock' => 50],
            ['name' => 'Webcam', 'price' => 2599, 'stock' => 20],
            ['name' => 'Microphone', 'price' => 3499, 'stock' => 18],
            ['name' => 'Headphones', 'price' => 2999, 'stock' => 22],
            ['name' => 'Graphics Card', 'price' => 34999, 'stock' => 5],
            ['name' => 'Motherboard', 'price' => 8999, 'stock' => 10],
            ['name' => 'CPU', 'price' => 17999, 'stock' => 7],
            ['name' => 'RAM 16GB', 'price' => 4499, 'stock' => 30],
            ['name' => 'SSD 1TB', 'price' => 7499, 'stock' => 20],
            ['name' => 'Power Supply', 'price' => 4999, 'stock' => 15],
            ['name' => 'Router', 'price' => 2599, 'stock' => 25],
            ['name' => 'Smartphone', 'price' => 29999, 'stock' => 12],
            ['name' => 'Tablet', 'price' => 19999, 'stock' => 10],
            ['name' => 'Bluetooth Speaker', 'price' => 1999, 'stock' => 35],
            ['name' => 'Smartwatch', 'price' => 8999, 'stock' => 18],
            ['name' => 'Laptop Cooling Pad', 'price' => 1499, 'stock' => 20],
            ['name' => 'Graphics Tablet', 'price' => 10999, 'stock' => 8]
        ]);
    }
}
