import { useState } from "react";
import { Plus, Search, Pencil, Trash2, Image, Loader2, Link as LinkIcon } from "lucide-react";
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
    DialogFooter,
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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useProductCollections, useCreateProductCollection, useUpdateProductCollection, useDeleteProductCollection } from "@/hooks/useProductCollections";
import { ProductCollection } from "@/types/database";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function CollectionsManagement() {
    const { data: collections, isLoading } = useProductCollections();
    const createCollection = useCreateProductCollection();
    const updateCollection = useUpdateProductCollection();
    const deleteCollection = useDeleteProductCollection();

    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCollection, setEditingCollection] = useState<ProductCollection | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        banner_image_url: "",
        is_active: true,
    });

    const filteredCollections = collections?.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenDialog = (collection?: ProductCollection) => {
        if (collection) {
            setEditingCollection(collection);
            setFormData({
                name: collection.name,
                description: collection.description || "",
                banner_image_url: collection.banner_image_url || "",
                is_active: collection.is_active,
            });
        } else {
            setEditingCollection(null);
            setFormData({ name: "", description: "", banner_image_url: "", is_active: true });
        }
        setIsDialogOpen(true);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `banners/${Date.now()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('collection-images') // Reusing existing bucket
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('collection-images')
                .getPublicUrl(fileName);

            setFormData(prev => ({ ...prev, banner_image_url: publicUrl }));
            toast.success("Banner image uploaded");
        } catch (error) {
            console.error(error);
            toast.error("Failed to upload image");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name) {
            toast.error("Name is required");
            return;
        }

        try {
            if (editingCollection) {
                await updateCollection.mutateAsync({ id: editingCollection.id, ...formData });
                toast.success("Collection updated successfully!");
            } else {
                await createCollection.mutateAsync(formData);
                toast.success("Collection created successfully!");
            }
            setIsDialogOpen(false);
        } catch (error) {
            toast.error("Failed to save collection");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteCollection.mutateAsync(id);
            toast.success("Collection deleted");
        } catch (error) {
            toast.error("Failed to delete collection");
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight font-serif">Collections</h2>
                    <p className="text-muted-foreground">Manage product collections (e.g., Summer 2025, New Arrivals).</p>
                </div>
                <Button onClick={() => handleOpenDialog()} size="lg">
                    <Plus className="mr-2 h-4 w-4" /> Create Collection
                </Button>
            </div>

            <div className="flex items-center gap-2 max-w-sm">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search collections..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Banner</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCollections?.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-32 text-muted-foreground">
                                        <div className="flex flex-col items-center gap-2">
                                            <p>No collections found.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredCollections?.map((collection) => (
                                    <TableRow key={collection.id}>
                                        <TableCell>
                                            <div className="w-16 h-10 rounded overflow-hidden bg-muted flex items-center justify-center">
                                                {collection.banner_image_url ? (
                                                    <img src={collection.banner_image_url} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <Image className="h-4 w-4 text-muted-foreground" />
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">{collection.name}</TableCell>
                                        <TableCell className="max-w-[300px] truncate text-muted-foreground">
                                            {collection.description || "-"}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={collection.is_active ? "default" : "secondary"}>
                                                {collection.is_active ? "Active" : "Draft"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex justify-end gap-1">
                                                <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(collection)}>
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
                                                            <AlertDialogTitle>Delete Collection?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This will permanently delete "{collection.name}". Products in this collection will be unassigned.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => handleDelete(collection.id)}
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
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingCollection ? "Edit Collection" : "Create Collection"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Banner Image</Label>
                            <div className="flex items-center gap-4">
                                {formData.banner_image_url && (
                                    <div className="w-20 h-20 rounded border overflow-hidden relative group">
                                        <img src={formData.banner_image_url} alt="Banner" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, banner_image_url: "" })}
                                            className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                                <div className="flex-1">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={isUploading}
                                    />
                                    {isUploading && <p className="text-xs text-muted-foreground mt-1">Uploading...</p>}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <Label htmlFor="active-mode">Active Status</Label>
                                <p className="text-[0.8rem] text-muted-foreground">
                                    Visible to customers
                                </p>
                            </div>
                            <Switch
                                id="active-mode"
                                checked={formData.is_active}
                                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={isUploading}>
                                {isUploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
