import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, canonical, ogImage, ogType = 'website', schemas = [] }) => {
    const siteTitle = 'Dental Studio London | Premium Cosmetic Dentistry';
    const fullTitle = title ? `${title} | Dental Studio London` : siteTitle;
    const defaultDescription = 'Experience world-class cosmetic dentistry in London. Specializing in veneers, whitening, and smile makeovers in a luxury, anxiety-free environment.';
    const metaDescription = description || defaultDescription;
    const siteUrl = 'https://dentalstudiolondon.com'; // Replace with actual domain
    const fullUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;
    const fullImage = ogImage ? `${siteUrl}${ogImage}` : `${siteUrl}/og-default.jpg`;

    // Default Schema: LocalBusiness (Dentist)
    const defaultSchema = {
        "@context": "https://schema.org",
        "@type": "Dentist",
        "name": "Dental Studio London",
        "image": fullImage,
        "@id": siteUrl,
        "url": siteUrl,
        "telephone": "+442070000000",
        "priceRange": "$$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Oxford Street",
            "addressLocality": "London",
            "postalCode": "W1D 1LL",
            "addressCountry": "UK"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 51.515419,
            "longitude": -0.141099
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "09:00",
            "closes": "18:00"
        },
        "sameAs": [
            "https://www.instagram.com/dentalstudiolondon",
            "https://www.facebook.com/dentalstudiolondon"
        ]
    };

    const schemasToRender = [defaultSchema, ...schemas];

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:site_name" content="Dental Studio London" />
            <meta property="og:locale" content="en_GB" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={fullUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={fullImage} />

            {/* Structured Data (JSON-LD) */}
            {schemasToRender.map((schema, index) => (
                <script key={index} type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            ))}
        </Helmet>
    );
};

export default SEO;
