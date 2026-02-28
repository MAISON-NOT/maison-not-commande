const Stripe = require('stripe');

exports.handler = async (event) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { amount } = JSON.parse(event.body);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Commande Maison Not',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: 'https://rad-dango-648b5c.netlify.app/success.html',
      cancel_url: 'https://rad-dango-648b5c.netlify.app/cancel.html',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
