import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileSpreadsheet, CheckCircle, XCircle, LogOut, Users, BookOpen, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { verifyAdminToken, getUploadedBatches, publishBatch } from '@/api/mockApi';
import { UploadBatch } from '@/api/mockData';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [batches, setBatches] = useState<UploadBatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [publishingId, setPublishingId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (!await verifyAdminToken()) {
        toast.error('Please login first');
        navigate('/admin');
        return;
      }
      loadBatches();
    };
    checkAuth();
  }, [navigate]);

  const loadBatches = async () => {
    try {
      const data = await getUploadedBatches();
      setBatches(data);
    } catch (error) {
      toast.error('Failed to load batches');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('resultify-admin-token');
    toast.success('Logged out successfully');
    navigate('/admin');
  };

  const handleUploadClick = () => {
    const el = document.getElementById('result-upload-input') as HTMLInputElement | null;
    el?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0];
    if (f) setSelectedFile(f);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please choose a file first');
      return;
    }

    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', selectedFile);
      const token = localStorage.getItem('resultify-admin-token');

      const res = await fetch(`${import.meta.env.VITE_API_URL}/students/upload`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: form
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Upload failed' }));
        toast.error(err.error || 'Upload failed');
        return;
      }

      const data = await res.json();
      // backend /api/students/upload returns { message, inserted, missing, duplicates }
      const inserted = data.inserted ?? data.imported ?? 0;
      const missing = data.missing ?? 0;
      const duplicates = data.duplicates ?? 0;
      toast.success(`Imported ${inserted} rows. Duplicates: ${duplicates}, Missing roll_no: ${missing}`);
      setSelectedFile(null);
      // refresh batches
      setLoading(true);
      await loadBatches();
    } catch (err) {
      console.error(err);
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handlePublish = async (batchId: string) => {
    setPublishingId(batchId);
    try {
      const ok = await publishBatch(batchId);
      if (ok) {
        toast.success('Batch published');
        setLoading(true);
        await loadBatches();
      } else {
        toast.error('Failed to publish');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to publish');
    } finally {
      setPublishingId(null);
    }
  };

  const stats = [
    { icon: Users, label: 'Total Students', value: '10,234', color: 'text-primary' },
    { icon: BookOpen, label: 'Published Exams', value: '47', color: 'text-accent' },
    { icon: TrendingUp, label: 'Average Score', value: '78.5%', color: 'text-primary' },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage and publish student results</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="glass glass-hover">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass border-0 glass-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-primary/10 ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="glass border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload New Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <FileSpreadsheet className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Drop Excel/CSV here</h3>
                <p className="text-muted-foreground mb-4">
                  We'll preview the data before saving. Supports .xlsx, .xls, .csv formats
                </p>
                <input id="result-upload-input" type="file" accept=".xlsx,.xls,.csv" onChange={onFileChange} className="hidden" />
                <div className="flex items-center justify-center gap-3">
                  <Button onClick={handleUploadClick} size="lg" className="bg-gradient-to-r from-primary to-accent">
                    <Upload className="mr-2 h-4 w-4" />
                    Choose File
                  </Button>
                  <Button onClick={handleUpload} size="lg" disabled={!selectedFile || uploading} className="glass">
                    {uploading ? 'Uploading...' : 'Upload to DB'}
                  </Button>
                </div>
                {selectedFile && (
                  <p className="text-sm text-muted-foreground mt-3">Selected: {selectedFile.name}</p>
                )}
                <p className="text-xs text-muted-foreground mt-4">
                  Maximum file size: 10MB
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Uploaded Batches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass border-0">
            <CardHeader>
              <CardTitle>Uploaded Batches</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center text-muted-foreground py-8">Loading...</p>
              ) : batches.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No batches uploaded yet</p>
              ) : (
                <div className="space-y-4">
                  {batches.map((batch) => {
                    const b = batch as unknown as { id?: string; _id?: string };
                    const bid = b.id ?? b._id ?? '';
                    return (
                      <div
                        key={bid}
                        className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{batch.college}</h3>
                            <Badge variant="outline">{batch.course}</Badge>
                            {batch.published ? (
                              <Badge className="bg-green-500/20 text-green-700 dark:text-green-300">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Published
                              </Badge>
                            ) : (
                              <Badge variant="secondary">
                                <XCircle className="mr-1 h-3 w-3" />
                                Draft
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {batch.rowCount} students • {new Date(batch.timestamp).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="glass">
                            Preview
                          </Button>
                          {!batch.published && (
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-primary to-accent"
                              disabled={publishingId === bid}
                              onClick={() => handlePublish(bid)}
                            >
                              {publishingId === bid ? 'Publishing...' : 'Publish'}
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
