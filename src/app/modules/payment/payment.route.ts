import Stripe from 'stripe';
import config from '../../config';
import { Router } from 'express';
import { ProductModel } from '../product/product.model';
const stripe = new Stripe(config.stripe_secret as string);

const router = Router();

type TCartItem = {
  productId: string;
  image: string;
  productTitle: string;
  brand: string;
  quantity: number;
  price: number;
  subTotal: number;
};

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { products } = req.body;

    const lineItems = await products?.items.map((product: TCartItem) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.productTitle,
        },
        unit_amount: Math.round(product.price * 100), // Amount is expected in cents
      },
      quantity: product.quantity,
    }));

    // Create the Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'https://mecha-freak.vercel.app/payment-success',
      cancel_url: 'https://mecha-freak.vercel.app/payment-failure',
    });

    for (const product of products.items) {
      await ProductModel.updateOne(
        { _id: product.productId },
        { $inc: { availableQuantity: -product.quantity } }, // Decrease the available quantity by the purchased amount
      );
    }

    // Respond with the session ID
    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    res.status(500).send({ error: 'Failed to create Stripe session' });
  }
});

export const PaymentRoute = router;
