import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

/**
 * Composant de formulaire d'avis.
 * Gère la soumission des avis des utilisateurs.
 */
const ReviewForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [rating, setRating] = useState(0); // État pour l'évaluation par étoiles
  const [hoverRating, setHoverRating] = useState(0); // État pour l'effet de survol

  // Fonction pour gérer la soumission du formulaire d'avis
  const handleReviewSubmit = (data) => {
    // Ajoute la note à l'objet de données du formulaire
    const reviewData = {
      ...data,
      rating,
    };
    console.log('Avis soumis :', reviewData);
    // Dans une application réelle, vous enverriez ces données à votre API
    setSubmissionStatus('Merci ! Votre avis a été soumis avec succès.');
    reset(); // Réinitialise le formulaire après l'envoi
    setRating(0); // Réinitialise les étoiles
    setTimeout(() => {
      setSubmissionStatus(null);
    }, 5000); // Le message disparaît après 5 secondes
  };

  const Star = ({ selected, onSelect, onHover, onMouseOut }) => (
    <span
      className={`cursor-pointer text-2xl transition-colors duration-200 ${
        selected ? 'text-yellow-400' : 'text-gray-300'
      }`}
      onClick={onSelect}
      onMouseEnter={onHover}
      onMouseLeave={onMouseOut}
    >
      ★
    </span>
  );

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Laisser un avis
      </h2>
      {submissionStatus && (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4 text-center">
          {submissionStatus}
        </div>
      )}
      <form onSubmit={handleSubmit(handleReviewSubmit)} className="space-y-6">
        {/* Champ pour la profession */}
        <div>
          <label htmlFor="profession" className="block text-sm font-medium text-gray-700">
            Votre profession
          </label>
          <input
            type="text"
            id="profession"
            name="profession"
            {...register('profession')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
            placeholder="Ex: Consultant en Data Science"
          />
        </div>

        {/* Champ pour l'image */}
        <div>
          <label htmlFor="userImage" className="block text-sm font-medium text-gray-700">
            Votre photo
          </label>
          <input
            type="file"
            id="userImage"
            name="userImage"
            {...register('userImage')}
            className="mt-1 block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
          />
        </div>
        
        {/* Système d'étoiles */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Votre note
          </label>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <Star
                  key={index}
                  selected={starValue <= (hoverRating || rating)}
                  onSelect={() => setRating(starValue)}
                  onHover={() => setHoverRating(starValue)}
                  onMouseOut={() => setHoverRating(0)}
                />
              );
            })}
          </div>
        </div>

        {/* Champ de texte pour l'avis */}
        <div>
          <label htmlFor="review" className="block text-sm font-medium text-gray-700">
            Votre avis
          </label>
          <textarea
            id="review"
            name="review"
            rows="4"
            {...register('review', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
            placeholder="Partagez vos impressions sur nos services ou formations..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Envoyer l'avis
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
