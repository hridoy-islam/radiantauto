import Head from "next/head";

const Meta = ({ title, description, keywords, url, image }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords.join(", ")} />}
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="YourSite" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@handle" />
      <meta name="twitter:site" content="@site" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "http://schema.org",
          "@type": "WebPage",
          name: title,
          description: description,
          url: url,
          image: {
            "@type": "ImageObject",
            url: image,
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
          },
        })}
      </script>
    </Head>
  );
};

export default Meta;
