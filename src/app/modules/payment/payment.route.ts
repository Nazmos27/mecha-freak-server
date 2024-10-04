import Stripe from 'stripe';
import config from '../../config';
import { Router } from 'express';
import { ProductModel } from '../product/product.model';
const stripe = new Stripe(config.stripe_secret as string);


const router = Router()

// router.post('/create-checkout-session',async(req,res) =>{
//     const products = req.body;
//     const lineItems = products.map((product) => ({
//         price_data : {
//             currency : "usd",
//             product_data : {
//                 name : product.title,
//                 image : product.image
//             },
//             unit_amount : Math.round(product.price*100),
//         },
//         quantity : product.quantity
//     }))
//     const session = await stripe.checkout.sessions.create({
//         payment_method_types : ["card"],
//         line_items : lineItems,
//         mode : "payment",
//         success_url : "http://localhost:5173/",
//         cancel_url : "http://localhost:5173/",
//     })

//     res.json({id : session.id})
// })


router.post('/create-checkout-session', async (req, res) => {
    try {
      const { products } = req.body; // Make sure the request body contains 'products'
      console.log(products);
      // Map the products to Stripe's expected format
      const lineItems = await products?.items.map((product) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.productTitle,
            // You can include metadata if you want to pass image URLs, as Stripe doesn't support 'image' in product_data
            // metadata: { image: product.image }, 
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
        success_url: "http://localhost:5173/payment-success", // URL to redirect the user upon success
        cancel_url: "http://localhost:5173/payment-failure", // URL to redirect the user upon cancellation
      });

      for (const product of products.items) {
        // Assuming you have a Product model where you can update the available quantity
        await ProductModel.updateOne(
          { _id: product.productId }, // Find the product by its ID
          { $inc: { availableQuantity: -product.quantity } } // Decrease the available quantity by the purchased amount
        );
      }
  
      // Respond with the session ID
      res.json({ id: session.id });
  
    } catch (error) {
      console.error("Error creating Stripe checkout session:", error);
      res.status(500).send({ error: 'Failed to create Stripe session' });
    }
  });

export const PaymentRoute = router