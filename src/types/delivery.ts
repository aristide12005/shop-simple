 export interface DeliveryZone {
   id: string;
   name: string;
   description: string | null;
   is_active: boolean;
   delivery_fee: number;
   min_order_amount: number;
   estimated_delivery_days: number;
   created_at: string;
   updated_at: string;
 }