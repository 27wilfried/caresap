import React from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, XCircle, File, Image as ImageIcon, Video, Music } from 'lucide-react';

const FileUploader = ({ label, onFileSelect, uploadedFile, onFileRemove, acceptedFiles }) => {
    
    // Correction : S'assurer que acceptedFiles est un tableau avant de l'utiliser.
    const filesToAccept = Array.isArray(acceptedFiles) ? acceptedFiles : [];

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onFileSelect,
        accept: filesToAccept.reduce((acc, fileType) => {
            acc[fileType] = [];
            return acc;
        }, {}),
        multiple: false,
    });

    const getFileIconAndName = (fileUrl) => {
        if (!fileUrl) return { icon: <File size={48} />, name: 'Aucun fichier sélectionné' };
        
        // Simuler la détection du type de fichier à partir de l'URL
        const extension = fileUrl.split('.').pop().toLowerCase();
        let icon;
        let name;

        switch (extension) {
            case 'pdf':
                icon = <File size={48} />;
                name = 'Fichier PDF';
                break;
            case 'doc':
            case 'docx':
                icon = <File size={48} />;
                name = 'Fichier Word';
                break;
            case 'mp4':
            case 'avi':
            case 'mov':
                icon = <Video size={48} />;
                name = 'Fichier Vidéo';
                break;
            case 'mp3':
            case 'wav':
                icon = <Music size={48} />;
                name = 'Fichier Audio';
                break;
            default:
                // Si l'extension est une image (jpg, png, etc.)
                if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(extension)) {
                    icon = <ImageIcon size={48} />;
                    name = 'Image';
                } else {
                    icon = <File size={48} />;
                    name = 'Fichier';
                }
        }
        return { icon, name };
    };

    const { icon, name } = getFileIconAndName(uploadedFile);

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div
                {...getRootProps()}
                className={`mt-1 flex justify-center w-full px-6 pt-5 pb-6 border-2 border-dashed rounded-lg ${
                    isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
                }`}
            >
                <input {...getInputProps()} />
                {uploadedFile ? (
                    <div className="relative w-full">
                        {name === 'Image' ? (
                            <img src={uploadedFile} alt="Preview" className="h-48 w-full object-cover rounded-lg" />
                        ) : (
                            <div className="h-48 w-full flex flex-col items-center justify-center bg-gray-100 rounded-lg text-gray-500 text-center p-4">
                                {icon}
                                <span className="font-medium mt-2">{name}</span>
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); onFileRemove(); }}
                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md text-red-500 hover:bg-red-100"
                        >
                            <XCircle size={20} />
                        </button>
                    </div>
                ) : (
                    <div className="space-y-1 text-center">
                        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                            <p className="pl-1">
                                {isDragActive ? `Déposez le fichier ici...` : `Glissez-déposez un fichier ou cliquez pour en sélectionner un`}
                            </p>
                        </div>
                        <p className="text-xs text-gray-500">{filesToAccept.join(', ')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUploader;