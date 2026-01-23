
import { useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useCollections, useCreateCollection, useUpdateCollection, useDeleteCollection } from "@/hooks/useCollections";
import { CollectionWithImages } from "@/types/database";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { VariantManager } from "@/components/admin/VariantManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function StockManagement() {
    const { data: collections, isLoading } = useCollections();
    const createCollection = useCreateCollection();
    const updateCollection = useUpdateCollection();
    const deleteCollection = useDeleteCollection();

    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCollection, setEditingCollection] = useState<CollectionWithImages | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock_quantity: "",
    });

    const filteredCollections = collections?.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenDialog = (collection?: CollectionWithImages) => {
        if (collection) {
            setEditingCollection(collection);
            setFormData({
                name: collection.name,
                description: collection.description || "",
                price: collection.price.toString(),
                stock_quantity: collection.stock_quantity?.toString() || "0",
            });
        } else {
            setEditingCollection(null);
            setFormData({ name: "", description: "", price: "", stock_quantity: "0" });
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.price) {
            toast.error("Name and Price are required");
            return;
        }

        try {
            const payload = {
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                stock_quantity: parseInt(formData.stock_quantity) || 0,
            };

            if (editingCollection) {
                await updateCollection.mutateAsync({ id: editingCollection.id, ...payload });
                toast.success("Product updated");
            } else {
                await createCollection.mutateAsync(payload);
                toast.success("Product created");
            }
            setIsDialogOpen(false);
        } catch (error) {
            toast.error("Failed to save product");
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteCollection.mutateAsync(id);
                toast.success("Product deleted");
            } catch (error) {
                toast.error("Failed to delete product");
            }
        }
    }

    if (isLoading) return <div>Loading inventory...</div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight font-serif">Stock Management</h2>
                    <p className="text-muted-foreground">Manage products and inventory levels.</p>
                </div>
                <Button onClick={() => handleOpenDialog()}>
                    <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
            </div>

            <div className="flex items-center gap-2 max-w-sm">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock Level</TableHead>
                            <TableHead>Variants</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCollections?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                    No products found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredCollections?.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>${product.price.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Badge variant={product.stock_quantity > 0 ? "outline" : "destructive"}>
                                            {product.stock_quantity}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {product.product_variants?.length || 0} variants
                                    </TableCell>
                                    <TableCell className="text-right flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(product)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(product.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{editingCollection ? "Edit Product" : "Add Product"}</DialogTitle>
                    </DialogHeader>
                    {editingCollection ? (
                        <Tabs defaultValue="details" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="details">Details</TabsTrigger>
                                <TabsTrigger value="variants">Variants</TabsTrigger>
                            </TabsList>
                            <TabsContent value="details">
                                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description (Optional)</Label>
                                        <Input id="description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="price">Price ($)</Label>
                                            <Input id="price" type="number" step="0.01" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="stock">Base Stock</Label>
                                            <Input id="stock" type="number" value={formData.stock_quantity} onChange={e => setFormData({ ...formData, stock_quantity: e.target.value })} />
                                        </div>
                                    </div>
                                    <Button type="submit" className="w-full">Save Changes</Button>
                                </form>
                            </TabsContent>
                            <TabsContent value="variants" className="pt-4">
                                <VariantManager
                                    collectionId={editingCollection.id}
                                    variants={editingCollection.product_variants || []}
                                />
                            </TabsContent>
                        </Tabs>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description (Optional)</Label>
                                <Input id="description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price ($)</Label>
                                    <Input id="price" type="number" step="0.01" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="stock">Initial Stock</Label>
                                    <Input id="stock" type="number" value={formData.stock_quantity} onChange={e => setFormData({ ...formData, stock_quantity: e.target.value })} />
                                </div>
                            </div>
                            <Button type="submit" className="w-full">Create Product</Button>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
