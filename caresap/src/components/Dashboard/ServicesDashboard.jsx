import React, { useState } from 'react';
import { Briefcase, Plus, Edit, Trash, ArrowLeft, Layers } from 'lucide-react';

// Données mockées pour simuler l'état initial des services.
// La structure correspond à l'exemple que vous avez fourni.
const initialServices = [
    {
        id: 1,
        icon: Briefcase,
        title: "Évaluation de programmes et interventions de santé",
        description: "Évaluations d’impact, d’efficacité et de rentabilité de projets ou politiques de santé publique.",
        detail: "Évaluations d’impact, d’efficacité et de rentabilité de projets ou politiques de santé publique, avec recommandations stratégiques.",
        beneficiaries: "Projets de santé publique, ONG, agences de coopération, ministères et toute autre personne, particulier ou chercheur indépendant.",
        conditions: "Accès aux documents du programme, aux données existantes et aux parties prenantes.",
        procedure: "Contactez-nous via contact@caresap.org ou le formulaire en bas de page.",
        period: "4 à 10 semaines (possibilité express).",
        slug: "evaluation-de-programmes"
    },
    {
        id: 2,
        icon: Briefcase,
        title: "Analyse de données et recherche opérationnelle",
        description: "Services d'analyse statistique et de recherche pour l'aide à la décision en santé.",
        detail: "Analyse statistique avancée, modélisation épidémiologique et conception d'études de recherche pour des projets complexes.",
        beneficiaries: "Chercheurs, laboratoires pharmaceutiques, institutions académiques.",
        conditions: "Accès aux données brutes et protocoles de recherche.",
        procedure: "Envoyez-nous votre requête via email pour une consultation initiale.",
        period: "Variable selon la complexité.",
        slug: "analyse-de-donnees"
    }
];

/**
 * Composant de tableau de bord pour la gestion des services.
 * Permet d'afficher, d'ajouter, d'éditer et de supprimer des services.
 */
const ServicesDashboard = () => {
    // État pour stocker la liste des services
    const [services, setServices] = useState(initialServices);
    // État pour gérer les données du service en cours d'édition (ou null si on ajoute)
    const [editItem, setEditItem] = useState(null);

    // Fonction de réinitialisation du formulaire
    const resetForm = () => setEditItem(null);

    // Ajoute un nouveau service à la liste
    const handleAddService = (newService) => {
        const newId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
        setServices([...services, { ...newService, id: newId }]);
        resetForm();
    };

    // Met à jour un service existant
    const handleUpdateService = (updatedService) => {
        setServices(services.map(s => s.id === updatedService.id ? updatedService : s));
        resetForm();
    };

    // Supprime un service de la liste
    const handleDeleteService = (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
             setServices(services.filter(s => s.id !== id));
        }
    };
    
    // Composant du formulaire d'ajout/édition
    const ServiceForm = ({ initialData, onSave, onCancel }) => {
        const [formData, setFormData] = useState(initialData);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            onSave(formData);
        };

        return (
            <div className="p-8 bg-white rounded-2xl  mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">{formData.id ? 'Éditer le service' : 'Ajouter un nouveau service'}</h3>
                    <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 transition-colors">
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
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="2"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Détail du service</label>
                        <textarea
                            name="detail"
                            value={formData.detail}
                            onChange={handleChange}
                            rows="4"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bénéficiaires</label>
                        <textarea
                            name="beneficiaries"
                            value={formData.beneficiaries}
                            onChange={handleChange}
                            rows="2"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Conditions d'application</label>
                        <textarea
                            name="conditions"
                            value={formData.conditions}
                            onChange={handleChange}
                            rows="2"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Procédure de demande</label>
                        <textarea
                            name="procedure"
                            value={formData.procedure}
                            onChange={handleChange}
                            rows="2"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Période standard</label>
                        <input
                            type="text"
                            name="period"
                            value={formData.period}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Slug URL</label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                        >
                            Sauvegarder
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="inline-flex justify-center py-3 px-6 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                        >
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    return (
        <div className="p-10">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-6 flex items-center">
                <Briefcase className="mr-4 text-indigo-500" size={32} />
                Gestion des Services
            </h1>
            <div className="flex justify-end mb-6">
                <button
                    onClick={() => setEditItem({ id: null, title: '', description: '', detail: '', beneficiaries: '', conditions: '', procedure: '', period: '', cta: '', slug: '' })}
                    className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
                >
                    <Plus className="mr-2" size={20} />
                    Ajouter un service
                </button>
            </div>
            
            {/* Rendu du formulaire d'édition/ajout si editItem n'est pas null */}
            {editItem && (
                <ServiceForm 
                    initialData={editItem}
                    onSave={editItem.id ? handleUpdateService : handleAddService}
                    onCancel={resetForm}
                />
            )}
            
            {/* Liste des services existants */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {services.map(service => (
                    <div key={service.id} className="bg-white p-6 rounded-2xl  border border-gray-100 hover:border-indigo-300 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                            <div className="flex space-x-2">
                                <button onClick={() => setEditItem(service)} className="text-indigo-500 hover:text-indigo-700 transition-colors"><Edit size={18} /></button>
                                <button onClick={() => handleDeleteService(service.id)} className="text-red-500 hover:text-red-700 transition-colors"><Trash size={18} /></button>
                            </div>
                        </div>
                        <p className="text-gray-600">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesDashboard;
