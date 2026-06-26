import { NextResponse } from "next/server";

// Hardcoded price map matching your product IDs to prevent client-side tampering
const PRICE_MAP: Record<string, { name: string; amount: number }> = {
  "1": { name: "Firosa Heavyweight Staple Tee", amount: 2800 }, // $28.00 in cents
  "2": { name: "Independence Firework Hoodie", amount: 4500 }, // $45.00 in cents
  "3": { name: "Firosa Signature Neon Cap", amount: 2200 },     // $22.00 in cents
};

export async function POST(request: Request) {
  try {
    const { cartItems } = await request.json();

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Build the line items for Stripe out of the user's current items
    const lineItems = cartItems.map((item: any) => {
      // Extract the original product ID (stripping size endings like "-M" if present)
      const baseId = item.id.split("-")[0];
      const productInfo = PRICE_MAP[baseId] || { name: item.title, amount: 2500 };

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title, // Keeps the custom size label if appended
            images: [item.imageSrc],
          },
          unit_amount: productInfo.amount,
        },
        quantity: item.quantity,
      };
    });

    // Instead of forcing npm installation errors in StackBlitz, we mock the final link generator response
    const mockStripeCheckoutUrl = "https://checkout.stripe.com/c/pay/mock_session_firosa_apparel";

    return NextResponse.json({ url: mockStripeCheckoutUrl });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}