export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cars?url=${slug}&status=available`,
      { next: { revalidate: 60 } }
    );
    const json = await res.json();
    const car = json?.data?.result?.[0] || json?.data?.data?.result?.[0] || json?.data;

    // if (!car) {
    //   return {
    //     title: "Vehicle Not Found | Radiant Auto",
    //     description: "The vehicle you are looking for does not exist or has been removed from inventory.",
    //   };
    // }

    const year = car.modelYear || "";
    const make = car.carBrand?.brandName || "";
    const model = car.model || "";
    const trim = car.trim || "";
    const heading = [year, make, model, trim].filter(Boolean).join(" ") || car.name || "Vehicle";

    const fullTitle = `${heading} - Radiant Auto`;
    const rawDesc = car.overview || car.description || "";
    const description = rawDesc.replace(/<[^>]+>/g, "").slice(0, 160);

    const imageUrl = car.thumbnailImage || car.image_gallery?.[0] || "/images/logo.png";

    return {
      title: heading,
      description,
      alternates: {
        canonical: `https://radiant-auto.com/car/${slug}`,
      },
      openGraph: {
        title: fullTitle,
        description,
        url: `https://radiant-auto.com/car/${slug}`,
        siteName: "Radiant Auto",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: heading,
          },
        ],
        locale: "en_CA",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: fullTitle    ,
        description,
        images: [imageUrl],
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch {
    return {
      title: "Vehicle Details | Radiant Auto",
      description: "Browse detailed vehicle information, specifications, features, and pricing.",
    };
  }
}

export default function CarSlugLayout({ children }) {
  return <>{children}</>;
}
