import { Metadata } from "next";

type Post = {
  title: string;
  slug: string;
  excerpt: string;
  author: { name: string; url?: string };
  date: string;
  dateModified?: string;
  coverImage: string;
  content: string;
};

type Props = {
  params: { slug: string };
};

// Generate dynamic metadata for each blog post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post: Post = await getPost(params.slug);

  return {
    title: `${post.title} — DevBlog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://devblog.example.com/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url: `https://devblog.example.com/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      siteName: "DevBlog",
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      ...(post.dateModified && { modifiedTime: post.dateModified }),
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

async function getPost(slug: string): Promise<Post> {
  // Replace with your actual data-fetching logic
  throw new Error("Implement getPost");
}

function JsonLd({ post }: { post: Post }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.date,
    ...(post.dateModified && { dateModified: post.dateModified }),
    author: {
      "@type": "Person",
      name: post.author.name,
      ...(post.author.url && { url: post.author.url }),
    },
    publisher: {
      "@type": "Organization",
      name: "DevBlog",
      url: "https://devblog.example.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://devblog.example.com/blog/${post.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default async function BlogPost({ params }: Props) {
  const post = await getPost(params.slug);

  return (
    <>
      <JsonLd post={post} />
      <article>
        <h1>{post.title}</h1>
        <p>
          By {post.author.name} on{" "}
          <time dateTime={post.date}>{post.date}</time>
        </p>
        <img src={post.coverImage} alt={post.title} />
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </>
  );
}
