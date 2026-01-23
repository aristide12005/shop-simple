import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.91.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CreateOrderRequest {
  orderId: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId } = await req.json() as CreateOrderRequest;

    if (!orderId) {
      console.error('Missing orderId in request');
      return new Response(
        JSON.stringify({ error: 'Order ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client with service role for server-side operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch the order from database to verify it exists and get the correct amount
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      console.error('Order not found:', orderId, orderError);
      return new Response(
        JSON.stringify({ error: 'Order not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (order.status !== 'pending') {
      console.error('Order already processed:', orderId, order.status);
      return new Response(
        JSON.stringify({ error: 'Order has already been processed' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get PayPal credentials
    const paypalClientId = Deno.env.get('PAYPAL_CLIENT_ID');
    const paypalSecretKey = Deno.env.get('PAYPAL_SECRET_KEY');

    if (!paypalClientId || !paypalSecretKey) {
      console.error('PayPal credentials not configured');
      return new Response(
        JSON.stringify({ error: 'Payment service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use sandbox for testing, production for live
    const paypalBaseUrl = 'https://api-m.sandbox.paypal.com';

    // Get PayPal access token
    const authResponse = await fetch(`${paypalBaseUrl}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${paypalClientId}:${paypalSecretKey}`)}`,
      },
      body: 'grant_type=client_credentials',
    });

    if (!authResponse.ok) {
      const errorText = await authResponse.text();
      console.error('PayPal auth failed:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to authenticate with payment service' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    // Create PayPal order with verified amount from database
    const createOrderResponse = await fetch(`${paypalBaseUrl}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          reference_id: orderId,
          description: `Order ${orderId}`,
          amount: {
            currency_code: 'USD',
            value: Number(order.total_amount).toFixed(2),
          },
        }],
        application_context: {
          return_url: `${req.headers.get('origin') || 'https://artful-collection-shop.lovable.app'}/payment-success?orderId=${orderId}`,
          cancel_url: `${req.headers.get('origin') || 'https://artful-collection-shop.lovable.app'}/payment-cancelled?orderId=${orderId}`,
        },
      }),
    });

    if (!createOrderResponse.ok) {
      const errorText = await createOrderResponse.text();
      console.error('PayPal create order failed:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to create payment order' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const paypalOrder = await createOrderResponse.json();

    // Update order with PayPal order ID
    const { error: updateError } = await supabase
      .from('orders')
      .update({ paypal_order_id: paypalOrder.id })
      .eq('id', orderId);

    if (updateError) {
      console.error('Failed to update order with PayPal ID:', updateError);
    }

    // Find the approval URL
    const approvalUrl = paypalOrder.links?.find((link: { rel: string }) => link.rel === 'approve')?.href;

    console.log('PayPal order created successfully:', paypalOrder.id);

    return new Response(
      JSON.stringify({
        paypalOrderId: paypalOrder.id,
        approvalUrl,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
