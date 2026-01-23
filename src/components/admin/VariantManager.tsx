
import { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCreateVariant, useUpdateVariant, useDeleteVariant } from "@/hooks/useCollections";
import { ProductVariant } from "@/types/database";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface VariantManagerProps {
    collectionId: string;
    variants: ProductVariant[];
}

export function VariantManager({ collectionId, variants }: VariantManagerProps) {
    const createVariant = useCreateVariant();
    const updateVariant = useUpdateVariant();
    const deleteVariant = useDeleteVariant();

    const [newVariant, setNewVariant] = useState({ name: "", sku: "", stock_quantity: "0", price: "" });
    const [editingId, setEditingId] = useState<string | null>(null);
    // To keep track of inline edits
    const [editForm, setEditForm] = useState<{ name: string, sku: string, stock_quantity: string, price: string } | null>(null);

    const handleAdd = async () => {
        if (!newVariant.name) return toast.error("Variant name required");
        try {
            await createVariant.mutateAsync({
                collection_id: collectionId,
                name: newVariant.name,
                sku: newVariant.sku || null,
                stock_quantity: parseInt(newVariant.stock_quantity) || 0,
                price: newVariant.price ? parseFloat(newVariant.price) : undefined,
            });
            setNewVariant({ name: "", sku: "", stock_quantity: "0", price: "" });
            toast.success("Variant added");
        } catch (e) {
            toast.error("Failed to add variant");
        }
    };

    const handleStartEdit = (v: ProductVariant) => {
        setEditingId(v.id);
        setEditForm({
            name: v.name,
            sku: v.sku || "",
            stock_quantity: v.stock_quantity.toString(),
            price: v.price?.toString() || ""
        });
    };

    const handleSaveEdit = async () => {
        if (!editingId || !editForm) return;
        try {
            await updateVariant.mutateAsync({
                id: editingId,
                name: editForm.name,
                sku: editForm.sku || null,
                stock_quantity: parseInt(editForm.stock_quantity) || 0,
                price: editForm.price ? parseFloat(editForm.price) : undefined
            });
            setEditingId(null);
            setEditForm(null);
            toast.success("Variant updated");
        } catch (e) {
            toast.error("Failed to update variant");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this variant?")) return;
        try {
            await deleteVariant.mutateAsync(id);
            toast.success("Variant deleted");
        } catch (e) {
            toast.error("Failed to delete");
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="font-medium text-sm">Product Variants</h3>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name (Size/Color)</TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Price Override</TableHead>
                            <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {variants.map(v => (
                            <TableRow key={v.id}>
                                {editingId === v.id && editForm ? (
                                    <>
                                        <TableCell><Input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} className="h-8" /></TableCell>
                                        <TableCell><Input value={editForm.sku} onChange={e => setEditForm({ ...editForm, sku: e.target.value })} className="h-8" /></TableCell>
                                        <TableCell><Input type="number" value={editForm.stock_quantity} onChange={e => setEditForm({ ...editForm, stock_quantity: e.target.value })} className="h-8 w-20" /></TableCell>
                                        <TableCell><Input type="number" step="0.01" value={editForm.price} onChange={e => setEditForm({ ...editForm, price: e.target.value })} className="h-8 w-20" /></TableCell>
                                        <TableCell>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600" onClick={handleSaveEdit}><Save className="h-4 w-4" /></Button>
                                        </TableCell>
                                    </>
                                ) : (
                                    <>
                                        <TableCell onClick={() => handleStartEdit(v)} className="cursor-pointer hover:bg-muted/50">{v.name}</TableCell>
                                        <TableCell>{v.sku || '-'}</TableCell>
                                        <TableCell>
                                            <Badge variant={v.stock_quantity > 0 ? "secondary" : "destructive"}>{v.stock_quantity}</Badge>
                                        </TableCell>
                                        <TableCell>{v.price ? `$${v.price}` : '-'}</TableCell>
                                        <TableCell className="text-right">
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => handleDelete(v.id)}><Trash2 className="h-4 w-4" /></Button>
                                        </TableCell>
                                    </>
                                )}
                            </TableRow>
                        ))}

                        {/* Add Row */}
                        <TableRow className="bg-muted/30">
                            <TableCell><Input placeholder="Size/Color" value={newVariant.name} onChange={e => setNewVariant({ ...newVariant, name: e.target.value })} className="h-8" /></TableCell>
                            <TableCell><Input placeholder="SKU" value={newVariant.sku} onChange={e => setNewVariant({ ...newVariant, sku: e.target.value })} className="h-8" /></TableCell>
                            <TableCell><Input type="number" placeholder="0" value={newVariant.stock_quantity} onChange={e => setNewVariant({ ...newVariant, stock_quantity: e.target.value })} className="h-8 w-20" /></TableCell>
                            <TableCell><Input type="number" placeholder="Overrite" value={newVariant.price} onChange={e => setNewVariant({ ...newVariant, price: e.target.value })} className="h-8 w-20" /></TableCell>
                            <TableCell>
                                <Button size="sm" variant="outline" onClick={handleAdd}><Plus className="h-4 w-4" /></Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
