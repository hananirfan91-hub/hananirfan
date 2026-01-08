import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, FileCode, Image as ImageIcon, Globe, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  file_type: string;
  file_name: string;
  uploader_name: string | null;
  created_at: string;
}

const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "text/html",
  "text/css",
  "text/javascript",
  "application/javascript",
  "application/zip",
];

const getFileIcon = (type: string) => {
  if (type.startsWith("image/")) return <ImageIcon className="text-green-400" size={20} />;
  if (type.includes("html") || type.includes("css") || type.includes("javascript")) 
    return <FileCode className="text-blue-400" size={20} />;
  return <Globe className="text-purple-400" size={20} />;
};

export const CommunityProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", uploader_name: "" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
    
    // Subscribe to realtime updates
    const channel = supabase
      .channel('community-projects')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'community_projects' },
        () => fetchProjects()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("community_projects")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error && data) {
      setProjects(data);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload PNG, JPG, HTML, CSS, JS, or ZIP files.",
          variant: "destructive",
        });
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Maximum file size is 10MB.",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !formData.title) {
      toast({
        title: "Missing info",
        description: "Please provide a title and select a file.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("project-files")
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("project-files")
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase.from("community_projects").insert({
        title: formData.title,
        description: formData.description || null,
        file_url: publicUrl,
        file_type: selectedFile.type,
        file_name: selectedFile.name,
        uploader_name: formData.uploader_name || "Anonymous",
      });

      if (dbError) throw dbError;

      toast({
        title: "Project uploaded!",
        description: "Your project is now visible to everyone.",
      });

      setShowUploadModal(false);
      setFormData({ title: "", description: "", uploader_name: "" });
      setSelectedFile(null);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Community Projects</h2>
            <p className="text-muted-foreground">
              Share your work and explore what others have created!
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-blue-500 text-white rounded-xl font-medium shadow-lg shadow-accent/25"
          >
            <Upload size={18} />
            Upload Project
          </motion.button>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.file_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group p-4 rounded-xl bg-card border border-border hover:border-accent/50 transition-all"
            >
              <div className="flex items-start gap-3 mb-3">
                {getFileIcon(project.file_type)}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    by {project.uploader_name || "Anonymous"}
                  </p>
                </div>
              </div>
              {project.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(project.created_at).toLocaleDateString()}
              </p>
            </motion.a>
          ))}
          
          {projects.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              <Globe size={48} className="mx-auto mb-4 opacity-50" />
              <p>No projects yet. Be the first to share!</p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md p-6 rounded-2xl bg-card border border-border shadow-2xl"
            >
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary"
              >
                <X size={18} />
              </button>

              <h3 className="text-xl font-bold mb-6">Upload Your Project</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Project Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:border-accent outline-none"
                    placeholder="My Awesome Project"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    value={formData.uploader_name}
                    onChange={(e) => setFormData({ ...formData, uploader_name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:border-accent outline-none"
                    placeholder="Anonymous"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:border-accent outline-none resize-none h-20"
                    placeholder="Brief description..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">File *</label>
                  <label className="block w-full px-4 py-6 rounded-lg bg-secondary border-2 border-dashed border-border hover:border-accent/50 cursor-pointer text-center transition-colors">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".png,.jpg,.jpeg,.webp,.html,.css,.js,.zip"
                      className="hidden"
                    />
                    {selectedFile ? (
                      <div className="flex items-center justify-center gap-2 text-accent">
                        <Check size={18} />
                        {selectedFile.name}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">
                        PNG, JPG, HTML, CSS, JS, ZIP (max 10MB)
                      </span>
                    )}
                  </label>
                </div>

                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full py-3 bg-gradient-to-r from-accent to-blue-500 text-white rounded-xl font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {uploading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={18} />
                      Upload Project
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
