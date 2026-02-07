import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.91.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return new Response(JSON.stringify({ error: 'Order ID required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch order with items
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      console.error('Order not found:', orderId);
      return new Response(JSON.stringify({ error: 'Order not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: items } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId);

    // Fetch delivery zone info
    let zoneName = '';
    if (order.delivery_zone_id) {
      const { data: zone } = await supabase
        .from('delivery_zones')
        .select('name, estimated_delivery_days')
        .eq('id', order.delivery_zone_id)
        .single();
      if (zone) zoneName = zone.name;
    }

    const currencySymbol = order.currency === 'CAD' ? 'CA$' : '$';
    const subtotal = (items || []).reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

    // Build email HTML
    const itemsHtml = (items || []).map((item: any) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-family: sans-serif; font-size: 14px;">
          ${item.collection_name} × ${item.quantity}
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-family: sans-serif; font-size: 14px; text-align: right;">
          ${currencySymbol}${(item.price * item.quantity).toFixed(2)}
        </td>
      </tr>
    `).join('');

    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin:0; padding:0; background:#f5f5f5; font-family: 'Helvetica Neue', sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
          
          <!-- Header -->
          <div style="background: #1a1a1a; padding: 32px; text-align: center;">
            <h1 style="color: white; font-family: Georgia, serif; font-size: 28px; margin: 0; letter-spacing: 3px;">ACCICOA</h1>
          </div>
          
          <!-- Body -->
          <div style="padding: 32px;">
            <h2 style="font-family: Georgia, serif; font-size: 22px; margin: 0 0 8px;">Thank You for Your Order!</h2>
            <p style="color: #666; font-size: 14px; margin: 0 0 24px;">
              Hi ${order.customer_name || 'there'}, your order has been confirmed and is being processed.
            </p>
            
            <div style="background: #f9f9f9; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
              <p style="margin: 0; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Order Number</p>
              <p style="margin: 4px 0 0; font-family: monospace; font-size: 16px; font-weight: bold;">${order.id.slice(0, 8).toUpperCase()}</p>
            </div>
            
            <!-- Items -->
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr>
                  <th style="text-align: left; padding-bottom: 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #999;">Item</th>
                  <th style="text-align: right; padding-bottom: 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #999;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
            
            <!-- Totals -->
            <div style="margin-top: 16px; padding-top: 8px;">
              <table style="width: 100%; font-size: 14px;">
                <tr>
                  <td style="padding: 4px 0; color: #666;">Subtotal</td>
                  <td style="padding: 4px 0; text-align: right;">${currencySymbol}${subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #666;">Delivery${zoneName ? ` (${zoneName})` : ''}</td>
                  <td style="padding: 4px 0; text-align: right;">${currencySymbol}${Number(order.delivery_fee || 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0 0; font-weight: bold; font-size: 18px; border-top: 2px solid #1a1a1a;">Total</td>
                  <td style="padding: 12px 0 0; font-weight: bold; font-size: 18px; text-align: right; border-top: 2px solid #1a1a1a;">${currencySymbol}${Number(order.total_amount).toFixed(2)}</td>
                </tr>
              </table>
            </div>
            
            <!-- Shipping -->
            ${order.shipping_address ? `
            <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #eee;">
              <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #999; margin: 0 0 8px;">Shipping To</p>
              <p style="margin: 0; font-size: 14px; color: #333;">
                ${order.customer_name || ''}<br>
                ${order.shipping_address}<br>
                ${order.shipping_city || ''}${order.shipping_country ? ', ' + order.shipping_country : ''}
              </p>
            </div>
            ` : ''}
            
            <!-- CTA -->
            <div style="text-align: center; margin-top: 32px;">
              <a href="https://artful-collection-shop.lovable.app/order-tracking" 
                 style="display: inline-block; background: #1a1a1a; color: white; padding: 14px 32px; text-decoration: none; border-radius: 50px; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">
                Track Your Order
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="padding: 24px 32px; background: #f9f9f9; text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #999;">
              Questions? Email us at <a href="mailto:djmadeinafrica@gmail.com" style="color: #b8860b;">djmadeinafrica@gmail.com</a>
            </p>
            <p style="margin: 8px 0 0; font-size: 11px; color: #ccc;">
              © ${new Date().getFullYear()} ACCICOA. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;

    // Send email via Resend (if key exists) or log it
    const resendKey = Deno.env.get('RESEND_API_KEY');
    
    if (resendKey) {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: 'ACCICOA <orders@accicoa.com>',
          to: [order.customer_email],
          subject: `Order Confirmed — #${order.id.slice(0, 8).toUpperCase()}`,
          html: emailHtml,
        }),
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error('Email send failed:', errorText);
        // Don't fail the request — email is best-effort
      } else {
        console.log('Confirmation email sent to:', order.customer_email);
      }
    } else {
      console.log('RESEND_API_KEY not configured — skipping email send');
      console.log('Would have sent confirmation to:', order.customer_email);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
