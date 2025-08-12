import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { blogPosts } from '../../data/blog';

/**
 * Composant de la page de détail d'un article de blog.
 * Affiche le contenu complet d'un article, ainsi que des articles connexes et une navigation
 * vers l'article précédent et suivant.
 */
const BlogDetailPage = () => {
  // Récupère l'ID de l'article depuis l'URL
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);

  useEffect(() => {
    // Cherche l'article correspondant à l'ID
    const foundPost = blogPosts.find((p) => p.id === parseInt(id));
    setPost(foundPost);

    if (foundPost) {
      // Trouve les 3 premiers articles connexes de la même catégorie, en excluant l'article actuel
      const related = blogPosts
        .filter((p) => p.category === foundPost.category && p.id !== foundPost.id)
        .slice(0, 3);
      setRelatedPosts(related);

      // Trouve l'index de l'article actuel pour la pagination
      const postIndex = blogPosts.findIndex((p) => p.id === foundPost.id);
      
      // Définit les articles précédent et suivant
      setPrevPost(postIndex > 0 ? blogPosts[postIndex - 1] : null);
      setNextPost(postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null);
    }
  }, [id]);

  // Si l'article n'est pas trouvé, affiche un message d'erreur
  if (!post) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Article non trouvé</h1>
          <p className="mt-4 text-lg text-gray-600">
            L'article que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Link
            to="/blog"
            className="mt-6 inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-primary rounded-full border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span>Retour au blog</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* En-tête de la page */}
      <header className="pt-24 pb-16 bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <Link
            to="/blog"
            className="inline-flex items-center text-primary hover:underline font-semibold"
          >
            <ArrowLeft size={16} className="mr-2" />
            Retour au blog
          </Link>
          <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span>Par <span className="font-medium text-gray-700">{post.author}</span></span>
            <span className="mx-2">&bull;</span>
            <span>{post.date}</span>
          </div>
        </div>
      </header>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contenu principal de l'article */}
            <div className="lg:col-span-2">
              <div className="relative rounded-3xl overflow-hidden shadow-xl mb-8">
                <img
                  src={post.image}
                  alt={`Image de l'article : ${post.title}`}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="prose prose-lg max-w-none text-gray-800">
                <p className="font-bold text-xl">{post.summary}</p>
                <p>{post.description}</p>
              </div>
            </div>

            {/* Articles connexes (barre latérale) */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-6 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Articles connexes</h3>
                <div className="space-y-6">
                  {relatedPosts.length > 0 ? (
                    relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        to={`/blog/${relatedPost.id}`}
                        className="flex items-start group hover:bg-gray-50 p-3 rounded-2xl transition-colors duration-200"
                      >
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-24 h-16 object-cover rounded-xl flex-shrink-0"
                        />
                        <div className="ml-4">
                          <p className="text-sm text-primary font-semibold">{relatedPost.category}</p>
                          <h4 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors duration-300">
                            {relatedPost.title}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">{relatedPost.date}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">Aucun article connexe trouvé.</p>
                  )}
                </div>
              </div>
            </aside>
          </div>
          
          {/* Pagination */}
          <div className="mt-16 flex justify-between items-center">
            {prevPost ? (
              <Link
                to={`/blog/${prevPost.id}`}
                className="inline-flex items-center text-primary font-semibold hover:underline"
              >
                <ArrowLeft size={20} className="mr-2" />
                <span>Article précédent</span>
              </Link>
            ) : (
              <div className="w-1/2"></div>
            )}
            {nextPost ? (
              <Link
                to={`/blog/${nextPost.id}`}
                className="inline-flex items-center text-primary font-semibold hover:underline ml-auto"
              >
                <span>Article suivant</span>
                <ArrowRight size={20} className="ml-2" />
              </Link>
            ) : (
              <div className="w-1/2"></div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailPage;
    