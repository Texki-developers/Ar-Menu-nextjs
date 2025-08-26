'use client';

import React, { useEffect } from 'react';
import { useCartStore } from '@/config/store/cartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CartItem } from '@/core/services/cartService';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { IMAGE_URL } from '@/core/axios';

export default function CartPage() {
  const {
    items,
    loading,
    error,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalItems,
    fetchCart,
  } = useCartStore();
  const { lang, vendorId } = useParams() as { lang: string; vendorId: string };

  // Fetch cart data on component mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Handle loading state
  if (loading && items.length === 0) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="container mx-auto max-w-7xl p-5 text-center text-red-500">
        <p>Error loading cart: {error}</p>
        <Button onClick={fetchCart} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl p-5 sm:p-6">
      <h1 className="mb-6 text-2xl font-bold sm:text-3xl">Your Cart</h1>
      {!loading && items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <svg
            className="mb-4 h-16 w-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
          <p className="mb-6 text-gray-600">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link href={`/${lang}/${vendorId}`}>
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item: CartItem) => (
                <div
                  key={item._id}
                  className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
                >
                  <div className="h-32 w-full flex-shrink-0 overflow-hidden rounded-md sm:h-20 sm:w-20">
                    <Image
                      src={`${IMAGE_URL}${item.imageUrl}`}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                      priority
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-base text-gray-600">
                      AED {item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-between sm:w-auto sm:justify-end">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={e =>
                          updateQuantity(
                            item._id,
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="h-8 w-12 p-0 text-center"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item._id)}
                      className="ml-2 h-8 text-red-500 hover:bg-red-50 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-red-500 hover:bg-red-50 hover:text-red-700"
              >
                Clear Cart
              </Button>
            </div>
          </div>

          <div className="h-fit rounded-lg border bg-gray-50 p-[0.8rem]">
            <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-base">
                <span>
                  Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                </span>
                <span>AED {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base">
                <span>Delivery Fee</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="my-4 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>AED {subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Button
              className="mt-6 w-full bg-green-600 text-base font-semibold hover:bg-green-700"
              size="lg"
            >
              Proceed to Checkout
            </Button>
            <div className="mt-4 text-center text-sm text-gray-500">
              or{' '}
              <Link
                href={`/${lang}/${vendorId}`}
                className="font-medium text-green-600 hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
