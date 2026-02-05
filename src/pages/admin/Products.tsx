import { useState } from "react";
import { Plus, Search, Pencil, Trash2, Image, X, Package, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
} from "@/components/ui/dialog";
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
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useCollections,
  useCreateCollection,
  useUpdateCollection,
  useDeleteCollection,
  useUploadImage,
  useDeleteImage,
} from "@/hooks/useCollections";
import { useCategories } from "@/hooks/useCategories";
import { useProductCollections } from "@/hooks/useProductCollections";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VariantManager } from "@/components/admin/VariantManager";
import { CollectionWithImages } from "@/types/database";
import { CURRENCIES, formatPrice, Currency } from "@/lib/currency";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function ProductsManagement() {
  const { data: products, isLoading } = useCollections();
  const { data: categories } = useCategories();
  const { data: productCollections } = useProductCollections();
  const createCollection = useCreateCollection();
  const updateCollection = useUpdateCollection();
  const deleteCollection = useDeleteCollection();
  const uploadImage = useUploadImage();
  const deleteImage = useDeleteImage();

  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<CollectionWithImages | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "0",
    category_id: "none",
    collection_id: "none",
    currency: "USD" as Currency,
  });

  const filteredProducts = products?.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats
  const totalProducts = products?.length || 0;
  const totalStock = products?.reduce((sum, p) => {
    const variantStock = p.product_variants?.reduce((vs, v) => vs + v.stock_quantity, 0) || 0;
    return sum + (p.stock_quantity || 0) + variantStock;
  }, 0) || 0;
  const lowStockCount = products?.filter((p) => {
    const totalQty = (p.stock_quantity || 0) + (p.product_variants?.reduce((s, v) => s + v.stock_quantity, 0) || 0);
    return totalQty > 0 && totalQty < 10;
  }).length || 0;
  const outOfStockCount = products?.filter((p) => {
    const totalQty = (p.stock_quantity || 0) + (p.product_variants?.reduce((s, v) => s + v.stock_quantity, 0) || 0);
    return totalQty === 0;
  }).length || 0;

  const handleOpenDialog = (product?: CollectionWithImages) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description || "",
        price: product.price.toString(),
        stock_quantity: (product.stock_quantity || 0).toString(),
        category_id: product.category_id || "none",
        collection_id: product.collection_id || "none",
        currency: (product as any).currency || "USD",
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: "", description: "", price: "", stock_quantity: "0", category_id: "none", collection_id: "none", currency: "USD" });
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
        category_id: formData.category_id === "none" ? null : formData.category_id,
        collection_id: formData.collection_id === "none" ? null : formData.collection_id,
        currency: formData.currency,
      };

      if (editingProduct) {
        await updateCollection.mutateAsync({ id: editingProduct.id, ...payload });
        toast.success("Product updated successfully!");
      } else {
        await createCollection.mutateAsync(payload);
        toast.success("Product created successfully!");
        setIsDialogOpen(false);
      }
    } catch (error) {
      toast.error("Failed to save product");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCollection.mutateAsync(id);
      toast.success("Product deleted");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const handleImageUpload = async (productId: string, files: FileList) => {
    setIsUploading(true);
    for (const file of Array.from(files)) {
      try {
        await uploadImage.mutateAsync({ collectionId: productId, file });
        toast.success(`Uploaded ${file.name}`);
      } catch (error) {
        toast.error(`Failed to upload ${file.name}`);
      }
    }
    setIsUploading(false);
  };

  const handleImageDelete = async (imageId: string) => {
    try {
      await deleteImage.mutateAsync(imageId);
      toast.success("Image deleted");
    } catch (error) {
      toast.error("Failed to delete image");
    }
  };

  const getStockStatus = (product: CollectionWithImages) => {
    const totalQty = (product.stock_quantity || 0) +
      (product.product_variants?.reduce((s, v) => s + v.stock_quantity, 0) || 0);
    if (totalQty === 0) return { label: "Out of Stock", variant: "destructive" as const };
    if (totalQty < 10) return { label: "Low Stock", variant: "secondary" as const };
    return { label: "In Stock", variant: "default" as const };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-serif">Products</h2>
          <p className="text-muted-foreground">Manage your product catalog, images, and variants.</p>
        </div>
        <Button onClick={() => handleOpenDialog()} size="lg">
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <Package className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{lowStockCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <Package className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{outOfStockCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 max-w-sm">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Variants</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-32 text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <Package className="h-8 w-8 text-muted-foreground/50" />
                      <p>No products found.</p>
                      <Button variant="outline" size="sm" onClick={() => handleOpenDialog()}>
                        Add your first product
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts?.map((product) => {
                  const status = getStockStatus(product);
                  const primaryImage = product.collection_images?.[0]?.image_url;
                  const totalStock = (product.stock_quantity || 0) +
                    (product.product_variants?.reduce((s, v) => s + v.stock_quantity, 0) || 0);

                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                          {primaryImage ? (
                            <img src={primaryImage} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Image className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {product.description || "No description"}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatPrice(product.price, (product as any).currency || 'USD')}
                      </TableCell>
                      <TableCell>{totalStock} units</TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.product_variants?.length || 0} variants</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/product/${product.id}`} target="_blank">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(product)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Product?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete "{product.name}" and all its images and variants.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(product.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              {editingProduct ? `Edit: ${editingProduct.name}` : "Create New Product"}
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[calc(90vh-120px)]">
            {editingProduct ? (
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="images">Images ({editingProduct.collection_images?.length || 0})</TabsTrigger>
                  <TabsTrigger value="variants">Variants ({editingProduct.product_variants?.length || 0})</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4 pt-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter product name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe your product..."
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price *</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          placeholder="0.00"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency *</Label>
                        <Select
                          value={formData.currency}
                          onValueChange={(value) => setFormData({ ...formData, currency: value as Currency })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Currency" />
                          </SelectTrigger>
                          <SelectContent>
                            {CURRENCIES.map((currency) => (
                              <SelectItem key={currency.value} value={currency.value}>
                                {currency.symbol} - {currency.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="stock">Base Stock Quantity</Label>
                      <Input
                          id="stock"
                          type="number"
                          min="0"
                          value={formData.stock_quantity}
                          onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                          placeholder="0"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={formData.category_id}
                          onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            {categories?.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="collection">Collection</Label>
                        <Select
                          value={formData.collection_id}
                          onValueChange={(value) => setFormData({ ...formData, collection_id: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Collection" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            {productCollections?.map((collection) => (
                              <SelectItem key={collection.id} value={collection.id}>
                                {collection.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      Save Changes
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="images" className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Product Images</Label>
                      <label>
                        <Button variant="outline" size="sm" disabled={isUploading} asChild>
                          <span className="cursor-pointer">
                            <Plus className="h-4 w-4 mr-2" />
                            {isUploading ? "Uploading..." : "Add Images"}
                          </span>
                        </Button>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && editingProduct) {
                              handleImageUpload(editingProduct.id, e.target.files);
                            }
                          }}
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {editingProduct.collection_images?.length === 0 ? (
                        <div className="col-span-3 flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-lg">
                          <Image className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">No images yet</p>
                          <label className="mt-2">
                            <Button variant="link" size="sm" asChild>
                              <span className="cursor-pointer">Upload your first image</span>
                            </Button>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files && editingProduct) {
                                  handleImageUpload(editingProduct.id, e.target.files);
                                }
                              }}
                            />
                          </label>
                        </div>
                      ) : (
                        editingProduct.collection_images?.map((img) => (
                          <div key={img.id} className="relative group aspect-square rounded-lg overflow-hidden border">
                            <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button
                                variant="destructive"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleImageDelete(img.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="variants" className="pt-4">
                  <VariantManager
                    collectionId={editingProduct.id}
                    variants={editingProduct.product_variants || []}
                  />
                </TabsContent>
              </Tabs>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your product..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency *</Label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value) => setFormData({ ...formData, currency: value as Currency })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {CURRENCIES.map((currency) => (
                          <SelectItem key={currency.value} value={currency.value}>
                            {currency.symbol} - {currency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Initial Stock</Label>
                  <Input
                      id="stock"
                      type="number"
                      min="0"
                      value={formData.stock_quantity}
                      onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                      placeholder="0"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category_id}
                      onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="collection">Collection</Label>
                    <Select
                      value={formData.collection_id}
                      onValueChange={(value) => setFormData({ ...formData, collection_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Collection" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {productCollections?.map((collection) => (
                          <SelectItem key={collection.id} value={collection.id}>
                            {collection.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <p className="text-sm text-muted-foreground">
                  After creating the product, you can add images and variants.
                </p>

                <Button type="submit" className="w-full" size="lg">
                  Create Product
                </Button>
              </form>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
