import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
}

export function SEO({ title, description, keywords }: SEOProps) {
  const defaultKeywords = "Hanan Irfan, Graphic Designer, Full Stack Developer, Vibe Coder, MS Office Expert, YouTube Automation, Developer, React, Supabase";
  
  return (
    <Helmet>
      <title>{title} | Hanan Irfan</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${title} | Hanan Irfan`} />
      <meta property="og:description" content={description} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={`${title} | Hanan Irfan`} />
      <meta property="twitter:description" content={description} />
    </Helmet>
  );
}
