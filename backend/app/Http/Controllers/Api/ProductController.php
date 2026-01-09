<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Cache;
use App\Models\Product;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Http\Controllers\Controller;
use App\Jobs\LogProductCreated;

class ProductController extends Controller
{

    public function index()
    {

        $products = Cache::remember('products', 60, function () {
            return Product::all();
        });

         return response()->json([
            'success' => true,
            'message' => 'Products retrieved successfully',
            'data' => ProductResource::collection($products)
        ]);

    }

    public function show(Product $product)
    {
        return response()->json([
            'success' => true,
            'message' => 'Product retrieved successfully',
            'data' => new ProductResource($product)
        ]);
    }

    public function store(ProductRequest $request)
    {
        $data = $request->validated();

        // Handle the physical file upload
        if ($request->hasFile('image')) {
            // This saves the file to storage/app/public/products
            $path = $request->file('image')->store('products', 'public');

            // Overwrite the 'image' key in the data array with the path string
            $data['image'] = $path;
        }

        $product = Product::create($data);

        Cache::forget('products');
        LogProductCreated::dispatch($product);

        return response()->json([
            'success' => true,
            'message' => 'Product created successfully',
            'data' => new ProductResource($product)
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $data['image'] = $path;
        }

        $product->update($data);

        Cache::forget('products');

        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully',
            'data' => new ProductResource($product)
        ]);
    }

    public function destroy(Product $product)
    {
        $product->delete();

        Cache::forget('products');

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully',
            'data' => null
        ]);
    }
}
