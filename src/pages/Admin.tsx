import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, Upload, X, ArrowLeft, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { useAuth } from '@/hooks/useAuth';
import {
  useCollections,
  useCreateCollection,
  useUpdateCollection,
  useDeleteCollection,
  useUploadImage,
  useDeleteImage,
} from '@/hooks/useCollections';
import { CollectionWithImages } from '@/types/database';
import { formatPrice } from '@/lib/currency';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export default function Admin() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { data: collections, isLoading } = useCollections();
  const createCollection = useCreateCollection();
  const updateCollection = useUpdateCollection();
  const deleteCollection = useDeleteCollection();
  const uploadImage = useUploadImage();
  const deleteImage = useDeleteImage();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<CollectionWithImages | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '', price: '' });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      toast.error('Access denied. Admin only.');
      navigate('/');
    }
  }, [user, isAdmin, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      toast.error('Please fill in required fields');
      return;
    }

    try {
      if (editingCollection) {
        await updateCollection.mutateAsync({
          id: editingCollection.id,
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
        });
        toast.success('Collection updated successfully!');
      } else {
        await createCollection.mutateAsync({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
        });
        toast.success('Collection created successfully!');
      }

      setIsDialogOpen(false);
      setEditingCollection(null);
      setFormData({ name: '', description: '', price: '' });
    } catch (error) {
      toast.error('Failed to save collection');
    }
  };

  const handleEdit = (collection: CollectionWithImages) => {
    setEditingCollection(collection);
    setFormData({
      name: collection.name,
      description: collection.description || '',
      price: String(collection.price),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCollection.mutateAsync(id);
      toast.success('Collection deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete collection');
    }
  };

  const handleImageUpload = async (collectionId: string, files: FileList) => {
    for (const file of Array.from(files)) {
      try {
        await uploadImage.mutateAsync({ collectionId, file });
        toast.success('Image uploaded successfully!');
      } catch (error) {
        toast.error(`Failed to upload ${file.name}`);
      }
    }
  };

  const handleImageDelete = async (imageId: string) => {
    try {
      await deleteImage.mutateAsync(imageId);
      toast.success('Image deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete image');
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="font-serif text-2xl font-bold">Admin Dashboard</h1>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingCollection(null);
                  setFormData({ name: '', description: '', price: '' });
                }}
                className="bg-destructive hover:bg-destructive/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Collection
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-serif">
                  {editingCollection ? 'Edit Collection' : 'Create New Collection'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Collection name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your collection..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($) *</Label>
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
                <Button type="submit" className="w-full">
                  {editingCollection ? 'Update Collection' : 'Create Collection'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {!collections || collections.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="mb-4">No collections yet. Create your first one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <Card key={collection.id} className="shadow-card">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="font-serif text-lg">{collection.name}</CardTitle>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEdit(collection)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Collection?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete "{collection.name}" and all its images.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(collection.id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {collection.description || 'No description'}
                    </p>
                    <p className="font-serif text-xl font-bold text-primary mt-2">
                      {formatPrice(collection.price, (collection as any).currency || 'USD')}
                    </p>
                  </div>

                  {/* Images */}
                  <div>
                    <Label className="text-sm font-medium">Images</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {collection.collection_images?.map((image) => (
                        <div
                          key={image.id}
                          className="relative group w-16 h-16 rounded-md overflow-hidden"
                        >
                          <img
                            src={image.image_url}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => handleImageDelete(image.id)}
                            className="absolute inset-0 bg-foreground/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4 text-background" />
                          </button>
                        </div>
                      ))}

                      {/* Upload button */}
                      <label className="w-16 h-16 border-2 border-dashed border-muted-foreground/30 rounded-md flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files) {
                              handleImageUpload(collection.id, e.target.files);
                            }
                          }}
                        />
                        <Image className="h-5 w-5 text-muted-foreground" />
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
