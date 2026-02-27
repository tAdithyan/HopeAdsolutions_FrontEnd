import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, canonical, ogImage, ogType, twitterHandle }) => {
    const siteName = "Billford Advertising";
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const defaultDescription = "Premium advertising and marketing solutions to grow your business. Billboards, digital marketing, and creative strategies.";
    const metaDescription = description || defaultDescription;
    const currentUrl = window.location.href;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name='description' content={metaDescription} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="author" content="Billford Advertising" />
            <meta name="theme-color" content="#FF8A00" />
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Open Graph tags */}
            <meta property="og:site_name" content={siteName} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:url" content={currentUrl} />
            {ogType && <meta property="og:type" content={ogType} />}
            {ogImage && <meta property="og:image" content={ogImage} />}

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:url" content={currentUrl} />
            {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
            {ogImage && <meta name="twitter:image" content={ogImage} />}
        </Helmet>
    );
};

export default SEO;
