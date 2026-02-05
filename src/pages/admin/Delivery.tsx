 import { useState } from 'react';
 import { Plus, Pencil, Trash2, Truck, MapPin } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { Textarea } from '@/components/ui/textarea';
 import { Switch } from '@/components/ui/switch';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
 } from '@/components/ui/dialog';
 import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
 } from '@/components/ui/alert-dialog';
 import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
 } from '@/components/ui/table';
 import { Badge } from '@/components/ui/badge';
 import {
   useDeliveryZones,
   useCreateDeliveryZone,
   useUpdateDeliveryZone,
   useDeleteDeliveryZone,
 } from '@/hooks/useDeliveryZones';
 import { DeliveryZone } from '@/types/delivery';
 import { toast } from 'sonner';
 
 export default function Delivery() {
   const { data: zones, isLoading } = useDeliveryZones(true);
   const createZone = useCreateDeliveryZone();
   const updateZone = useUpdateDeliveryZone();
   const deleteZone = useDeleteDeliveryZone();
 
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [editingZone, setEditingZone] = useState<DeliveryZone | null>(null);
   const [formData, setFormData] = useState({
     name: '',
     description: '',
     delivery_fee: '',
     min_order_amount: '',
     estimated_delivery_days: '',
     is_active: true,
   });
 
   const resetForm = () => {
     setFormData({
       name: '',
       description: '',
       delivery_fee: '',
       min_order_amount: '',
       estimated_delivery_days: '',
       is_active: true,
     });
     setEditingZone(null);
   };
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
 
     if (!formData.name || !formData.delivery_fee) {
       toast.error('Please fill in required fields');
       return;
     }
 
     try {
       const zoneData = {
         name: formData.name,
         description: formData.description || null,
         delivery_fee: parseFloat(formData.delivery_fee),
         min_order_amount: parseFloat(formData.min_order_amount) || 0,
         estimated_delivery_days: parseInt(formData.estimated_delivery_days) || 3,
         is_active: formData.is_active,
       };
 
       if (editingZone) {
         await updateZone.mutateAsync({ id: editingZone.id, ...zoneData });
         toast.success('Delivery zone updated!');
       } else {
         await createZone.mutateAsync(zoneData);
         toast.success('Delivery zone created!');
       }
 
       setIsDialogOpen(false);
       resetForm();
     } catch (error) {
       toast.error('Failed to save delivery zone');
     }
   };
 
   const handleEdit = (zone: DeliveryZone) => {
     setEditingZone(zone);
     setFormData({
       name: zone.name,
       description: zone.description || '',
       delivery_fee: String(zone.delivery_fee),
       min_order_amount: String(zone.min_order_amount),
       estimated_delivery_days: String(zone.estimated_delivery_days),
       is_active: zone.is_active,
     });
     setIsDialogOpen(true);
   };
 
   const handleDelete = async (id: string) => {
     try {
       await deleteZone.mutateAsync(id);
       toast.success('Delivery zone deleted!');
     } catch (error) {
       toast.error('Failed to delete zone');
     }
   };
 
   const handleToggleActive = async (zone: DeliveryZone) => {
     try {
       await updateZone.mutateAsync({
         id: zone.id,
         is_active: !zone.is_active,
       });
       toast.success(`${zone.name} is now ${!zone.is_active ? 'active' : 'inactive'}`);
     } catch (error) {
       toast.error('Failed to update zone status');
     }
   };
 
   if (isLoading) {
     return (
       <div className="flex items-center justify-center h-64">
         <div className="text-muted-foreground">Loading delivery zones...</div>
       </div>
     );
   }
 
   const activeZones = zones?.filter(z => z.is_active).length || 0;
   const totalZones = zones?.length || 0;
 
   return (
     <div className="space-y-6">
       {/* Header */}
       <div className="flex items-center justify-between">
         <div>
           <h1 className="text-2xl font-bold font-serif">Delivery Zones</h1>
           <p className="text-muted-foreground text-sm">
             Manage delivery areas, pricing, and availability
           </p>
         </div>
 
         <Dialog open={isDialogOpen} onOpenChange={(open) => {
           setIsDialogOpen(open);
           if (!open) resetForm();
         }}>
           <DialogTrigger asChild>
             <Button>
               <Plus className="h-4 w-4 mr-2" />
               Add Zone
             </Button>
           </DialogTrigger>
           <DialogContent>
             <DialogHeader>
               <DialogTitle className="font-serif">
                 {editingZone ? 'Edit Delivery Zone' : 'Create Delivery Zone'}
               </DialogTitle>
             </DialogHeader>
             <form onSubmit={handleSubmit} className="space-y-4">
               <div className="space-y-2">
                 <Label htmlFor="name">Zone Name *</Label>
                 <Input
                   id="name"
                   value={formData.name}
                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                   placeholder="e.g., Local, Regional, International"
                   required
                 />
               </div>
 
               <div className="space-y-2">
                 <Label htmlFor="description">Description</Label>
                 <Textarea
                   id="description"
                   value={formData.description}
                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                   placeholder="Describe the coverage area..."
                   rows={2}
                 />
               </div>
 
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label htmlFor="delivery_fee">Delivery Fee ($) *</Label>
                   <Input
                     id="delivery_fee"
                     type="number"
                     step="0.01"
                     min="0"
                     value={formData.delivery_fee}
                     onChange={(e) => setFormData({ ...formData, delivery_fee: e.target.value })}
                     placeholder="0.00"
                     required
                   />
                 </div>
 
                 <div className="space-y-2">
                   <Label htmlFor="min_order_amount">Min. Order ($)</Label>
                   <Input
                     id="min_order_amount"
                     type="number"
                     step="0.01"
                     min="0"
                     value={formData.min_order_amount}
                     onChange={(e) => setFormData({ ...formData, min_order_amount: e.target.value })}
                     placeholder="0.00"
                   />
                 </div>
               </div>
 
               <div className="space-y-2">
                 <Label htmlFor="estimated_delivery_days">Est. Delivery Days</Label>
                 <Input
                   id="estimated_delivery_days"
                   type="number"
                   min="1"
                   value={formData.estimated_delivery_days}
                   onChange={(e) => setFormData({ ...formData, estimated_delivery_days: e.target.value })}
                   placeholder="3"
                 />
               </div>
 
               <div className="flex items-center justify-between rounded-lg border p-4">
                 <div className="space-y-0.5">
                   <Label>Zone Active</Label>
                   <p className="text-xs text-muted-foreground">
                     Customers can select this zone at checkout
                   </p>
                 </div>
                 <Switch
                   checked={formData.is_active}
                   onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                 />
               </div>
 
               <Button type="submit" className="w-full">
                 {editingZone ? 'Update Zone' : 'Create Zone'}
               </Button>
             </form>
           </DialogContent>
         </Dialog>
       </div>
 
       {/* Stats Cards */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <Card>
           <CardHeader className="pb-2">
             <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
               <MapPin className="h-4 w-4" />
               Total Zones
             </CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">{totalZones}</div>
           </CardContent>
         </Card>
 
         <Card>
           <CardHeader className="pb-2">
             <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
               <Truck className="h-4 w-4" />
               Active Zones
             </CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold text-green-600">{activeZones}</div>
           </CardContent>
         </Card>
 
         <Card>
           <CardHeader className="pb-2">
             <CardTitle className="text-sm font-medium text-muted-foreground">
               Inactive Zones
             </CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold text-muted-foreground">{totalZones - activeZones}</div>
           </CardContent>
         </Card>
       </div>
 
       {/* Zones Table */}
       <Card>
         <CardHeader>
           <CardTitle className="font-serif">All Delivery Zones</CardTitle>
         </CardHeader>
         <CardContent>
           {!zones || zones.length === 0 ? (
             <div className="text-center py-8 text-muted-foreground">
               <Truck className="h-12 w-12 mx-auto mb-4 opacity-50" />
               <p>No delivery zones yet. Create your first one!</p>
             </div>
           ) : (
             <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead>Zone</TableHead>
                   <TableHead>Delivery Fee</TableHead>
                   <TableHead>Min. Order</TableHead>
                   <TableHead>Est. Days</TableHead>
                   <TableHead>Status</TableHead>
                   <TableHead className="text-right">Actions</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {zones.map((zone) => (
                   <TableRow key={zone.id}>
                     <TableCell>
                       <div>
                         <p className="font-medium">{zone.name}</p>
                         {zone.description && (
                           <p className="text-xs text-muted-foreground">{zone.description}</p>
                         )}
                       </div>
                     </TableCell>
                     <TableCell className="font-mono">
                       ${Number(zone.delivery_fee).toFixed(2)}
                     </TableCell>
                     <TableCell className="font-mono">
                       ${Number(zone.min_order_amount).toFixed(2)}
                     </TableCell>
                     <TableCell>{zone.estimated_delivery_days} days</TableCell>
                     <TableCell>
                       <div className="flex items-center gap-2">
                         <Switch
                           checked={zone.is_active}
                           onCheckedChange={() => handleToggleActive(zone)}
                         />
                         <Badge variant={zone.is_active ? "default" : "secondary"}>
                           {zone.is_active ? 'Active' : 'Inactive'}
                         </Badge>
                       </div>
                     </TableCell>
                     <TableCell className="text-right">
                       <div className="flex justify-end gap-1">
                         <Button
                           variant="ghost"
                           size="icon"
                           onClick={() => handleEdit(zone)}
                         >
                           <Pencil className="h-4 w-4" />
                         </Button>
                         <AlertDialog>
                           <AlertDialogTrigger asChild>
                             <Button
                               variant="ghost"
                               size="icon"
                               className="text-destructive hover:text-destructive"
                             >
                               <Trash2 className="h-4 w-4" />
                             </Button>
                           </AlertDialogTrigger>
                           <AlertDialogContent>
                             <AlertDialogHeader>
                               <AlertDialogTitle>Delete Zone?</AlertDialogTitle>
                               <AlertDialogDescription>
                                 This will permanently delete the "{zone.name}" delivery zone.
                               </AlertDialogDescription>
                             </AlertDialogHeader>
                             <AlertDialogFooter>
                               <AlertDialogCancel>Cancel</AlertDialogCancel>
                               <AlertDialogAction
                                 onClick={() => handleDelete(zone.id)}
                                 className="bg-destructive hover:bg-destructive/90"
                               >
                                 Delete
                               </AlertDialogAction>
                             </AlertDialogFooter>
                           </AlertDialogContent>
                         </AlertDialog>
                       </div>
                     </TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
           )}
         </CardContent>
       </Card>
     </div>
   );
 }