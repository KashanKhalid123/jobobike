import { stripe } from './stripe';
import { PRODUCTS_DATA } from '@/lib/productData';

export async function syncProductsWithStripe() {
  console.log('Starting Stripe product sync...');
  
  for (const product of PRODUCTS_DATA) {
    try {
      // Check if product already exists
      const existingProducts = await stripe.products.search({
        query: `metadata['product_id']:'${product.id}'`,
      });

      let stripeProduct;

      if (existingProducts.data.length > 0) {
        // Update existing product
        stripeProduct = await stripe.products.update(existingProducts.data[0].id, {
          name: product.name,
          description: product.description,
          images: product.image ? [product.image] : [],
          metadata: {
            product_id: product.id,
            
            features: JSON.stringify(product.features),
          },
        });
        console.log(`Updated product: ${product.name}`);
      } else {
        // Create new product
        stripeProduct = await stripe.products.create({
          name: product.name,
          description: product.description,
          images: product.image ? [product.image] : [],
          metadata: {
            product_id: product.id,
            
            features: JSON.stringify(product.features),
          },
        });
        console.log(`Created product: ${product.name}`);
      }

      // Handle pricing
      const existingPrices = await stripe.prices.search({
        query: `product:'${stripeProduct.id}' AND active:'true'`,
      });

      const priceInOre = product.price * 100;

      if (existingPrices.data.length === 0 || 
          existingPrices.data[0].unit_amount !== priceInOre) {
        
        // Deactivate old prices
        for (const oldPrice of existingPrices.data) {
          await stripe.prices.update(oldPrice.id, { active: false });
        }

        // Create new price
        await stripe.prices.create({
          product: stripeProduct.id,
          unit_amount: priceInOre,
          currency: 'nok',
          metadata: {
            product_id: product.id,
          },
        });
        console.log(`Created price for ${product.name}: ${product.price} NOK`);
      }

    } catch (error) {
      console.error(`Error syncing product ${product.name}:`, error);
    }
  }
  
  console.log('Stripe product sync completed!');
}

export async function getStripePrice(productId: string): Promise<string | null> {
  try {
    const products = await stripe.products.search({
      query: `metadata['product_id']:'${productId}'`,
    });

    if (products.data.length === 0) {
      return null;
    }

    const prices = await stripe.prices.search({
      query: `product:'${products.data[0].id}' AND active:'true'`,
    });

    return prices.data.length > 0 ? prices.data[0].id : null;
  } catch (error) {
    console.error(`Error getting Stripe price for ${productId}:`, error);
    return null;
  }
}
