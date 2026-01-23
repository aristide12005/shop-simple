import { useState } from "react";
import { Plus, Trash2, Save, X, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCreateVariant, useUpdateVariant, useDeleteVariant } from "@/hooks/useCollections";
import { ProductVariant } from "@/types/database";
import { toast } from "sonner";

interface VariantManagerProps {
  collectionId: string;
  variants: ProductVariant[];
}

export function VariantManager({ collectionId, variants }: VariantManagerProps) {
  const createVariant = useCreateVariant();
  const updateVariant = useUpdateVariant();
  const deleteVariant = useDeleteVariant();

  const [isAdding, setIsAdding] = useState(false);
  const [newVariant, setNewVariant] = useState({
    name: "",
    sku: "",
    stock_quantity: "0",
    price: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    name: string;
    sku: string;
    stock_quantity: string;
    price: string;
  } | null>(null);

  const handleAdd = async () => {
    if (!newVariant.name.trim()) {
      toast.error("Variant name is required");
      return;
    }

    try {
      await createVariant.mutateAsync({
        collection_id: collectionId,
        name: newVariant.name.trim(),
        sku: newVariant.sku.trim() || undefined,
        stock_quantity: parseInt(newVariant.stock_quantity) || 0,
        price: newVariant.price ? parseFloat(newVariant.price) : undefined,
      });
      setNewVariant({ name: "", sku: "", stock_quantity: "0", price: "" });
      setIsAdding(false);
      toast.success("Variant added successfully");
    } catch (error) {
      toast.error("Failed to add variant");
    }
  };

  const handleStartEdit = (v: ProductVariant) => {
    setEditingId(v.id);
    setEditForm({
      name: v.name,
      sku: v.sku || "",
      stock_quantity: v.stock_quantity.toString(),
      price: v.price?.toString() || "",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editForm) return;
    if (!editForm.name.trim()) {
      toast.error("Variant name is required");
      return;
    }

    try {
      await updateVariant.mutateAsync({
        id: editingId,
        name: editForm.name.trim(),
        sku: editForm.sku.trim() || undefined,
        stock_quantity: parseInt(editForm.stock_quantity) || 0,
        price: editForm.price ? parseFloat(editForm.price) : undefined,
      });
      setEditingId(null);
      setEditForm(null);
      toast.success("Variant updated");
    } catch (error) {
      toast.error("Failed to update variant");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete variant "${name}"?`)) return;
    try {
      await deleteVariant.mutateAsync(id);
      toast.success("Variant deleted");
    } catch (error) {
      toast.error("Failed to delete variant");
    }
  };

  const totalVariantStock = variants.reduce((sum, v) => sum + v.stock_quantity, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Product Variants</h3>
          <p className="text-sm text-muted-foreground">
            Add sizes, colors, or other variations. Total stock: {totalVariantStock} units
          </p>
        </div>
        {!isAdding && (
          <Button variant="outline" size="sm" onClick={() => setIsAdding(true)}>
            <Plus className="h-4 w-4 mr-2" /> Add Variant
          </Button>
        )}
      </div>

      {/* Add new variant form */}
      {isAdding && (
        <Card className="border-primary/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">New Variant</CardTitle>
            <CardDescription>Add a new product variation like size or color</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="variant-name">Name *</Label>
                <Input
                  id="variant-name"
                  placeholder="e.g., Small, Red, 32GB"
                  value={newVariant.name}
                  onChange={(e) => setNewVariant({ ...newVariant, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="variant-sku">SKU</Label>
                <Input
                  id="variant-sku"
                  placeholder="Optional SKU"
                  value={newVariant.sku}
                  onChange={(e) => setNewVariant({ ...newVariant, sku: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="variant-stock">Stock Quantity</Label>
                <Input
                  id="variant-stock"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={newVariant.stock_quantity}
                  onChange={(e) => setNewVariant({ ...newVariant, stock_quantity: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="variant-price">Price Override ($)</Label>
                <Input
                  id="variant-price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Leave empty to use base price"
                  value={newVariant.price}
                  onChange={(e) => setNewVariant({ ...newVariant, price: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd} disabled={createVariant.isPending}>
                {createVariant.isPending ? "Adding..." : "Add Variant"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Variants list */}
      {variants.length === 0 && !isAdding ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Package className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground text-center">
              No variants yet. Add variants for different sizes, colors, etc.
            </p>
          </CardContent>
        </Card>
      ) : variants.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Variant Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Price Override</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {variants.map((v) => (
                <TableRow key={v.id}>
                  {editingId === v.id && editForm ? (
                    <>
                      <TableCell>
                        <Input
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="h-8"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={editForm.sku}
                          onChange={(e) => setEditForm({ ...editForm, sku: e.target.value })}
                          className="h-8"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          value={editForm.stock_quantity}
                          onChange={(e) => setEditForm({ ...editForm, stock_quantity: e.target.value })}
                          className="h-8 w-20"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          value={editForm.price}
                          onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                          className="h-8 w-24"
                          placeholder="Base"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-green-600"
                            onClick={handleSaveEdit}
                            disabled={updateVariant.isPending}
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={handleCancelEdit}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell
                        onClick={() => handleStartEdit(v)}
                        className="cursor-pointer hover:bg-muted/50 font-medium"
                      >
                        {v.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{v.sku || "—"}</TableCell>
                      <TableCell>
                        <Badge variant={v.stock_quantity > 0 ? (v.stock_quantity < 10 ? "secondary" : "outline") : "destructive"}>
                          {v.stock_quantity}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {v.price ? `$${Number(v.price).toFixed(2)}` : "—"}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(v.id, v.name)}
                          disabled={deleteVariant.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : null}
    </div>
  );
}
