// src/components/Dashboard/BlogDashboard.jsx
import React, { useState } from 'react';
import { Plus, Edit, Trash, ArrowLeft } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';

// Modale de confirmation de suppression
const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="p-8 bg-white rounded-2xl shadow-xl w-96">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    Confirmer la suppression
                </h3>
                <p className="text-gray-600 mb-6 text-center">
                    Êtes-vous sûr de vouloir supprimer cet article de blog ? Cette action est irréversible.
                </p>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                        Supprimer
                    </button>
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
};

// Formulaire d'ajout/édition
const PostForm = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState(
        initialData || {
            title: '',
            summary: '',
            description: '',
            date: new Date().toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }),
            author: '',
            image: null,
            category: ''
        }
    );

    const [preview, setPreview] = useState(initialData?.image || null);

    const categories = [
        'Data Science',
        'Intelligence Artificielle',
        'Développement Web',
        'Cybersécurité',
        'Marketing Digital'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Fonction pour gérer le changement de contenu de l'éditeur TinyMCE
    const handleEditorChange = (content) => {
        setFormData((prev) => ({ ...prev, description: content }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="p-8 bg-white rounded-2xl shadow-xl mb-8">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                    {formData.id ? 'Éditer l\'article' : 'Ajouter un nouvel article'}
                </h3>
                <button
                    onClick={onCancel}
                    className="text-gray-500 hover:text-gray-700 transition"
                >
                    <ArrowLeft size={24} />
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Titre</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Résumé</label>
                    <textarea
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Description complète
                    </label>
                    {/* Intégration de l'éditeur TinyMCE */}
                    <Editor
                        apiKey="qaung5mvnrg5qc559fcwltcm9dujp3p9446d73doct6md738" // REMPLACEZ CETTE CHAÎNE PAR VOTRE CLÉ API
                        init={{
                            height: 300,
                            menubar: false,
                            plugins: 'advlist autolink lists link image charmap print preview anchor',
                            toolbar: 'undo redo | formatselect | bold italic backcolor | \
                                      alignleft aligncenter alignright alignjustify | \
                                      bullist numlist outdent indent | removeformat | help'
                        }}
                        value={formData.description}
                        onEditorChange={handleEditorChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Auteur</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full"
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Aperçu"
                            className="mt-3 w-full h-48 object-cover rounded-lg"
                        />
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                        required
                    >
                        <option value="">-- Sélectionner une catégorie --</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="py-3 px-6 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        Sauvegarder
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="py-3 px-6 text-sm font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                    >
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    );
};

// Composant principal Dashboard
const BlogDashboard = () => {
    const [posts, setPosts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    const handleAdd = () => {
        setEditingPost(null);
        setShowForm(true);
    };

    const handleEdit = (post) => {
        setEditingPost(post);
        setShowForm(true);
    };

    const handleDelete = (post) => {
        setPostToDelete(post);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        setPosts(posts.filter((p) => p.id !== postToDelete.id));
        setShowConfirm(false);
    };

    const handleSave = (data) => {
        if (data.id) {
            setPosts(posts.map((p) => (p.id === data.id ? data : p)));
        } else {
            setPosts([...posts, { ...data, id: Date.now() }]);
        }
        setShowForm(false);
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Gestion des articles</h2>
                {!showForm && (
                    <button
                        onClick={handleAdd}
                        className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-700"
                    >
                        <Plus size={18} className="mr-2" />
                        Nouvel article
                    </button>
                )}
            </div>

            {showForm ? (
                <PostForm
                    initialData={editingPost}
                    onSave={handleSave}
                    onCancel={() => setShowForm(false)}
                />
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden"
                        >
                            {post.image && (
                                <img
                                    src={typeof post.image === 'string' ? post.image : URL.createObjectURL(post.image)}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                                <p className="text-sm text-gray-500 mb-2">
                                    {post.date} - {post.author} | {post.category}
                                </p>
                                <p className="text-gray-700 mb-4">{post.summary}</p>
                                {/* Affichage de la description avec dangerouslySetInnerHTML */}
                                {post.description && (
                                    <div
                                        className="text-gray-700 mb-4 prose max-w-none"
                                        dangerouslySetInnerHTML={{ __html: post.description }}
                                    ></div>
                                )}
                                <div className="flex justify-between">
                                    <button
                                        onClick={() => handleEdit(post)}
                                        className="flex items-center text-blue-600 hover:underline"
                                    >
                                        <Edit size={16} className="mr-1" /> Éditer
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post)}
                                        className="flex items-center text-red-600 hover:underline"
                                    >
                                        <Trash size={16} className="mr-1" /> Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ConfirmationModal
                isOpen={showConfirm}
                onConfirm={confirmDelete}
                onCancel={() => setShowConfirm(false)}
            />
        </div>
    );
};

export default BlogDashboard;