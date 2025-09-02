'use client';

import React from 'react';
import { useCartStore, CartItem } from '@/config/store/cartStore';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Loader2, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { IMAGE_URL } from '@/core/axios';
import QuantityUpdater from '@/components/atoms/QuantityUpdater';

export default function CartPage() {
  const {
    items,
    loading,
    error,
    updateQuantity,
    subtotal,
    totalItems,
  } = useCartStore();
  const { lang, vendorId } = useParams() as { lang: string; vendorId: string };

  // Handle loading state
  if (loading && items.length === 0) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="text-primary-500 h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="container mx-auto max-w-7xl p-5 text-center text-red-500">
        <p>Error loading cart: {error}</p>
      </div>
    );
  }

  return (
    <div className=" pb-24 h-full">
      <div className="container mx-auto max-w-2xl p-4">
        {/* Header */}
        <div className="mt-12 mb-5 flex items-center gap-3">
          <Link
            href={`/${lang}/${vendorId}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-colors hover:bg-gray-50"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">My Cart</h1>
        </div>

        {!loading && items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="mb-6 rounded-full bg-gray-200 p-6">
              <ShoppingBag className="h-16 w-16 text-gray-400" />
            </div>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">
              Your cart is empty
            </h2>
            <p className="mb-8 max-w-md text-center text-gray-600">
              Looks like you haven&apos;t added anything to your cart yet. Start
              shopping to fill it up!
            </p>
            <Link href={`/${lang}/${vendorId}`}>
              <Button className="bg-primary-500 hover:bg-primary-300 px-8 py-3 text-lg font-semibold shadow-lg">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item: CartItem) => (
              <div
                key={item._id}
                className="flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-sm"
              >
                <div className="flex w-full items-center gap-4">
                  <div className="relative h-[100px] w-[100px]">
                    <Image
                      src={IMAGE_URL + item.product.image}
                      alt={item.product.name}
                      fill
                      className="rounded-2xl object-cover"
                    />
                  </div>
                  <div className="grid w-full gap-4">
                    <p className="w-[200px] truncate text-base font-bold text-black">
                      {item.product.name}
                    </p>
                    <div className="flex w-full items-end justify-between pr-2">
                      <QuantityUpdater
                        quantity={item.quantity}
                        onIncrement={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                        onDecrement={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                        variant="compact"
                        size="md"
                        className="text-black"
                      />
                      <span className="text-primary-500 text-lg font-bold">
                        <span className="text-base text-black/50">
                          {item.quantity} x
                        </span>{' '}
                        AED{' '}
                        {item.product?.offer_price ||
                          item.product?.actual_price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fixed Checkout Button */}
      {items.length > 0 && (
        <div className="fixed right-0 bottom-0 left-0 border-t border-gray-200 bg-white p-4 shadow-lg">
          <div className="container mx-auto max-w-2xl">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm text-gray-600">
                  Total ({totalItems} items)
                </span>
                <span className="text-primary-500 text-xl font-bold">
                  AED {subtotal.toFixed(2)}
                </span>
              </div>
              <Button className="bg-primary-500 hover:bg-primary-300 rounded-xl px-8 py-3 text-lg font-semibold shadow-lg">
                Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
