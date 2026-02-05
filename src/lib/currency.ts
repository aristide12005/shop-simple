 export type Currency = 'USD' | 'CAD';
 
 export const CURRENCIES: { value: Currency; label: string; symbol: string }[] = [
   { value: 'USD', label: 'US Dollar', symbol: '$' },
   { value: 'CAD', label: 'Canadian Dollar', symbol: 'CA$' },
 ];
 
 export function getCurrencySymbol(currency: Currency | string): string {
   const found = CURRENCIES.find(c => c.value === currency);
   return found?.symbol || '$';
 }
 
 export function formatPrice(amount: number, currency: Currency | string = 'USD'): string {
   const symbol = getCurrencySymbol(currency);
   return `${symbol}${Number(amount).toFixed(2)}`;
 }
 
 export function getCurrencyLabel(currency: Currency | string): string {
   const found = CURRENCIES.find(c => c.value === currency);
   return found?.label || 'US Dollar';
 }