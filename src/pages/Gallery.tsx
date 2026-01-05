import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ImageLightbox } from "@/components/ImageLightbox";
import { Grid, LayoutGrid, Sparkles, Eye } from "lucide-react";
import { Helmet } from "react-helmet";

import designAgency from "@/assets/gallery/design-agency.jpg";
import foodPoster from "@/assets/gallery/food-poster.jpg";
import independenceDay from "@/assets/gallery/independence-day.jpg";
import businessServices from "@/assets/gallery/business-services.jpg";
import starsAcademy from "@/assets/gallery/stars-academy.png";

const galleryItems = [
  {
    src: designAgency,
    title: "Graphic Design Agency Poster",
    category: "Poster Design",
    description: "Modern agency promotional poster with bold typography",
  },
  {
    src: foodPoster,
    title: "Food Restaurant Flyer",
    category: "Food & Restaurant",
    description: "Appetizing food promotion design with discount offers",
  },
  {
    src: independenceDay,
    title: "14 August Independence Day",
    category: "National Events",
    description: "Pakistan Independence Day celebration design",
  },
  {
    src: businessServices,
    title: "Business Services Banner",
    category: "Business",
    description: "Professional IT services promotional design",
  },
  {
    src: starsAcademy,
    title: "Stars Computer Academy Logo",
    category: "Logo Design",
    description: "Educational institution brand identity design",
  },
];

const categories = ["All", "Poster Design", "Food & Restaurant", "National Events", "Business", "Logo Design"];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const navigateLightbox = (index: number) => {
    if (index >= 0 && index < filteredItems.length) {
      setLightboxIndex(index);
    }
  };

  return (
    <>
      <Helmet>
        <title>Gallery - Hanan Irfan | Graphic Design Portfolio Rahim Yar Khan</title>
        <meta
          name="description"
          content="Explore Hanan Irfan's graphic design portfolio featuring posters, logos, branding, and creative designs. Professional designer from Rahim Yar Khan, Pakistan."
        />
        <meta
          name="keywords"
          content="Hanan Irfan gallery, graphic design portfolio, poster design, logo design, Rahim Yar Khan designer, Pakistan graphic artist"
        />
      </Helmet>

      <Layout>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute top-20 right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
            />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <AnimatedSection className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6"
              >
                <Sparkles size={16} className="animate-pulse" />
                Creative Portfolio
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Design <span className="text-gradient">Gallery</span>
              </h1>

              <p className="text-lg text-muted-foreground">
                A showcase of my graphic design work including posters, logos, branding, and creative designs
                crafted with passion and precision.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Filter & View Controls */}
        <section className="py-8 border-b border-border sticky top-16 bg-background/95 backdrop-blur-lg z-30">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-accent text-accent-foreground shadow-lg shadow-accent/30"
                        : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-secondary rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "grid" ? "bg-card text-accent" : "text-muted-foreground"
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("masonry")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "masonry" ? "bg-card text-accent" : "text-muted-foreground"
                  }`}
                >
                  <LayoutGrid size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <motion.div
              layout
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "columns-1 sm:columns-2 lg:columns-3 space-y-6"
              }`}
            >
              {filteredItems.map((item, index) => (
                <AnimatedSection key={item.title} delay={index * 100}>
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`group relative overflow-hidden rounded-2xl border border-border bg-card cursor-pointer ${
                      viewMode === "masonry" ? "break-inside-avoid mb-6" : ""
                    }`}
                    onClick={() => openLightbox(index)}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={item.src}
                        alt={`${item.title} - Hanan Irfan Design`}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <div className="w-full">
                          <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-xs font-semibold rounded-full mb-2">
                            {item.category}
                          </span>
                          <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        </div>
                      </div>

                      {/* View Icon */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        className="absolute top-4 right-4 p-3 bg-accent rounded-full text-accent-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Eye size={20} />
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </motion.div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No designs found in this category.</p>
              </div>
            )}
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-gradient-to-r from-accent/10 via-transparent to-accent/10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "50+", label: "Designs Created" },
                { value: "30+", label: "Happy Clients" },
                { value: "5+", label: "Categories" },
                { value: "100%", label: "Satisfaction" },
              ].map((stat, index) => (
                <AnimatedSection key={stat.label} delay={index * 100}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 rounded-2xl bg-card/50 border border-border"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        <ImageLightbox
          images={filteredItems}
          currentIndex={lightboxIndex}
          isOpen={lightboxIndex >= 0}
          onClose={() => setLightboxIndex(-1)}
          onNavigate={navigateLightbox}
        />
      </Layout>
    </>
  );
};

export default Gallery;
