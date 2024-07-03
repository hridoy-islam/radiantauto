// export async function getStaticPaths() {
//     // Fetch your list of blog posts from an API or file system
//     const posts = // ... fetch posts
//     const paths = posts.map((post) => ({
//       params: { slug: post.slug },
//     }));

//     return { paths, fallback: 'blocking' };
//   }

//   export async function getStaticProps({ params }) {
//     // Fetch the blog post data based on the slug
//     const post = // ... fetch post data using params.slug
//     return {
//       props: {
//         post,
//       },
//     };
//   }

const BlogPost = () => {
  return (
    <article>
      <h2>Hello</h2>
    </article>
  );
};

export default BlogPost;
