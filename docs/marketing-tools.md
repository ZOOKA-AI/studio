# Marketing & SEO Tools - Instagram Hashtag & JSON-LD Generator

## Overview

This feature provides AI-powered tools to help Royal Clean UAE optimize their Instagram presence and search engine visibility through automated hashtag generation and SEO structured data creation.

## Features

### 1. Instagram Hashtag Generator
Automatically generates relevant hashtags for Instagram posts in both Arabic and English, specifically targeting UAE audiences.

**Benefits:**
- Increases post visibility and engagement
- Targets specific UAE cities (Dubai, Abu Dhabi, Al Ain, Sharjah)
- Mixes high-volume and niche hashtags for better reach
- Supports bilingual content (Arabic & English)

**How it works:**
1. Enter your post content describing the cleaning service
2. Specify target cities (defaults to major UAE cities)
3. Select language preference (Arabic, English, or both)
4. Click "إنشاء هاشتاجات" (Generate Hashtags)
5. View categorized hashtags and copy them to clipboard

**Example Output:**
```
English Hashtags:
#CleaningServices #DeepCleaning #DubaiCleaning #UAECleaning
#ProfessionalCleaning #HomeCleaning #OfficeCleaning

Arabic Hashtags:
#تنظيف #تنظيف_منازل #تنظيف_عميق #خدمات_تنظيف
#دبي #ابوظبي #الامارات

Location Hashtags:
#Dubai #AbuDhabi #AlAin #Sharjah #UAE
```

### 2. SEO JSON-LD Generator
Creates structured data (JSON-LD) that helps search engines understand your business and services better, improving search rankings.

**Benefits:**
- Improves visibility in Google search results
- Enables rich snippets (star ratings, business info, etc.)
- Better local SEO for UAE cities
- Complies with schema.org standards

**Schemas Generated:**
- **LocalBusiness**: Business information, location, contact details
- **Service**: Service offerings, pricing, areas served
- **AggregateRating**: Reviews and ratings (when applicable)

**How it works:**
1. Enter your post/service content
2. Specify service type (e.g., "Deep Cleaning", "Home Cleaning")
3. Add price range (e.g., "200-800 AED")
4. Target specific UAE cities
5. Click "إنشاء SEO JSON" (Generate SEO JSON)
6. Copy the generated JSON-LD and add it to your website

**Example Usage:**
The generated JSON-LD should be added to your HTML page within a `<script>` tag:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Royal Clean UAE",
  "description": "Professional cleaning services in UAE...",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dubai",
    "addressCountry": "AE"
  },
  "areaServed": [
    {"@type": "City", "name": "Dubai"},
    {"@type": "City", "name": "Abu Dhabi"},
    {"@type": "City", "name": "Al Ain"},
    {"@type": "City", "name": "Sharjah"}
  ],
  "priceRange": "200-800 AED"
}
</script>
```

## Usage Guide

### Accessing the Marketing Tools
1. Log in to the Royal Clean Dashboard
2. Click on "التسويق والسيو" (Marketing & SEO) in the sidebar
3. Fill in the post information form

### Input Fields

| Field | Description | Required | Example |
|-------|-------------|----------|---------|
| **محتوى المنشور** (Post Content) | Description of your service or post | Yes | "خدمات تنظيف عميق للمنازل والفلل في دبي..." |
| **المدن المستهدفة** (Target Cities) | UAE cities to target | No | "Dubai, Abu Dhabi, Al Ain, Sharjah" |
| **نوع الخدمة** (Service Type) | Type of cleaning service | No | "تنظيف عميق، تنظيف منازل" |
| **نطاق السعر** (Price Range) | Service price range in AED | No | "200-800 AED" |
| **لغة الهاشتاجات** (Hashtag Language) | Language preference | No | عربي وإنجليزي (default) |

### Copy to Clipboard
Both outputs include a "نسخ" (Copy) button to easily copy the generated content for use in your Instagram posts or website.

## Technical Details

### AI Flows
The feature uses Google Genkit AI flows powered by Gemini 2.5 Flash model:

- **generateInstagramHashtags**: Generates relevant hashtags based on post content
- **generateSeoJson**: Creates SEO-optimized JSON-LD structured data

### File Structure
```
src/
├── ai/flows/
│   ├── generate-instagram-hashtags.ts  # Hashtag generation AI flow
│   └── generate-seo-json.ts            # JSON-LD generation AI flow
├── app/marketing/
│   └── page.tsx                        # Marketing tools UI page
└── components/layout/
    └── app-sidebar.tsx                 # Updated with marketing link
```

### Environment Setup
Requires Google AI API key in `.env.local`:
```bash
GOOGLE_GENAI_API_KEY=your-api-key-here
```

Get your API key from: https://aistudio.google.com/app/apikey

## Best Practices

### For Instagram Hashtags
1. Use a mix of 20-30 hashtags per post
2. Combine popular and niche hashtags
3. Include location-specific hashtags for UAE cities
4. Use both Arabic and English for wider reach
5. Rotate hashtags between posts to avoid being flagged as spam

### For SEO JSON-LD
1. Keep business information accurate and up-to-date
2. Add the JSON-LD to all relevant service pages
3. Update pricing information regularly
4. Include actual customer reviews in AggregateRating when available
5. Test your structured data using Google's Rich Results Test tool

## Troubleshooting

### Hashtags Not Generating
- Ensure you've entered post content
- Check that your Google AI API key is valid
- Verify internet connection

### JSON-LD Not Displaying
- Make sure the JSON is valid (use a JSON validator)
- Check that the script tag is properly closed
- Verify the schema.org types are correct

## Future Enhancements
- Save favorite hashtag combinations
- Analytics for hashtag performance
- A/B testing for different hashtag sets
- Automated scheduling integration
- Direct posting to Instagram (requires Instagram API integration)

## Support
For issues or questions about these tools, contact the development team or create an issue in the GitHub repository.
