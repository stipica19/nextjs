"use client";

import { useState, useEffect } from "react";
import { PlusCircle, Calendar, User, Edit, Trash2, X } from "lucide-react";
import { useSelector } from "react-redux";
import { CldImage, CldUploadWidget } from "next-cloudinary";

type NewsItem = {
  id: number;
  title: string;
  summary: string;
  image?: string | null;
  url?: string | null;
  createdAt?: string;
};

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Define RootState type for correct typing
  interface RootState {
    user: {
      isAdmin: boolean;
    };
  }
  const { isAdmin } = useSelector((state: RootState) => state.user);
  console.log("first user", isAdmin);

  // Inicijalni podaci
  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        console.log("Fetched news data:", data);
        setNews(data);
      } catch (error) {
        console.error("Greška pri dohvatanju slika:", error);
      } finally {
        setLoading(false); // 👈 Uvijek završi loading
      }
    }
    fetchNews();
  }, []);

  interface NewsFormData {
    title: string;
    content: string;
    author: string;
    category: string;
    featured: boolean;
  }

  //edit
  const handleSubmit = (formData: NewsFormData) => {};

  const handleEdit = (item: NewsItem) => {
    setEditingNews(item);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Da li ste sigurni da želite obrisati ovu vijest?")) {
      setNews(news.filter((item) => item.id !== id));
    }
  };

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleDateString("sr-Latn-BA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-red-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            ENDURO DRIFT VIJESTI
          </h1>
          <p className="text-gray-300 text-lg">
            Najnovije vijesti iz našeg drift kluba
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {isAdmin && (
            <button
              onClick={() => {
                setShowForm(true);
                setEditingNews(null);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <PlusCircle className="h-5 w-5" />
              Dodaj vijest
            </button>
          )}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {news.map((item) => (
            <div
              key={item.id}
              className={`bg-slate-800 rounded-xl p-6 border transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl`}
            >
              <div className="mb-4">
                <span className="inline-block bg-slate-700 text-gray-300 text-xs px-2 py-1 rounded-md">
                  ENDURO
                </span>
              </div>

              {item.url && (
                <div className="h-48 mb-4 overflow-hidden rounded-lg">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                {item.title}
              </h3>

              <p className="text-gray-300 mb-4 line-clamp-3">{item.summary}</p>

              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>MLADEN</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {item.createdAt ? formatDate(item.createdAt) : ""}
                  </span>
                </div>
              </div>

              {isAdmin && (
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                      title="Uredi"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                      title="Obriši"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {news.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              Nema vijesti za prikazivanje
            </p>
          </div>
        )}

        {/* News Form Modal */}
        {showForm && (
          <NewsForm
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingNews(null);
            }}
            editingNews={editingNews}
            categories={["Opšte", "Takmičenja", "Najave", "Rezultati"]}
          />
        )}
      </div>
    </div>
  );
}

type NewsFormProps = {
  onSubmit: (formData: any) => void;
  onCancel: () => void;
  editingNews: any;
  categories: string[];
  loading?: boolean;
};

function NewsForm({
  onSubmit,
  onCancel,
  editingNews,
  categories,
  loading,
}: NewsFormProps) {
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    category: string;
    featured: boolean;
    image: string | null;
  }>({
    title: "",
    content: "",
    category: "Opšte",
    featured: false,
    image: null,
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadUrl] = useState<string | null>(null);

  const [publicId, setPublicId] = useState<string | null>(null);

  useEffect(() => {
    if (editingNews) {
      setFormData(editingNews);
    } else {
      setFormData((prev) => ({ ...prev }));
    }
  }, [editingNews]);

  interface NewsFormData {
    title: string;
    content: string;
    author: string;
    category: string;
    featured: boolean;
    image: string | null;
  }

  const handleUpload = async (result: any) => {
    const uploadedUrl = result?.info?.secure_url;
    const publicId = result?.info?.public_id;
    console.log(uploadedUrl, publicId);
    setUploadUrl(uploadedUrl);
    setPublicId(publicId);
    setImageUrl(uploadedUrl);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: uploadedUrl,
          public_id: publicId,
          title: formData.title,
          summary: formData.content,
        }),
      });
    } catch (error) {
      console.error("Greška:", error);
    }
  };

  const handleImageUpload = (url: string) => {
    setFormData({ ...formData, image: url });
  };

  const removeImage = () => {
    setFormData({ ...formData, image: null });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6">
          {editingNews ? "Uredi vijest" : "Dodaj novu vijest"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Naslov vijesti
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Unesite naslov vijesti..."
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Sadržaj vijesti
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={6}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              placeholder="Unesite sadržaj vijesti..."
              required
              disabled={loading}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Slika vijesti
            </label>
            {formData.image ? (
              <div className="relative">
                <CldImage
                  src={formData.image}
                  alt="News image"
                  width="400"
                  height="200"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  disabled={loading}
                  className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors disabled:opacity-50"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={handleUpload}
              >
                {({ open }) => (
                  <button
                    onClick={() => open?.()}
                    className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded"
                    type="button"
                  >
                    Upload sliku 📷
                  </button>
                )}
              </CldUploadWidget>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Čuva..."
                : editingNews
                ? "Ažuriraj vijest"
                : "Dodaj vijest"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              Otkaži
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
