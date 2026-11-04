import { Material } from '../types';
import { FileText, File, FolderOpen } from 'lucide-react';

interface MaterialsProps {
  materials: Material[];
}

function getFileIcon(type: Material['type']) {
  switch (type) {
    case 'pdf':
      return <FileText className="w-5 h-5 text-red-500" />;
    case 'doc':
    case 'docx':
      return <FileText className="w-5 h-5 text-blue-500" />;
    case 'ppt':
    case 'pptx':
      return <FileText className="w-5 h-5 text-orange-500" />;
    default:
      return <File className="w-5 h-5 text-gray-500" />;
  }
}

function getTypeLabel(type: Material['type']) {
  switch (type) {
    case 'pdf': return 'PDF';
    case 'doc': return 'DOC';
    case 'docx': return 'DOCX';
    case 'ppt': return 'PPT';
    case 'pptx': return 'PPTX';
    default: return 'FILE';
  }
}

export default function Materials({ materials }: MaterialsProps) {
  if (materials.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <FolderOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p>No materials available for this subject yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
        Study Materials ({materials.length})
      </h3>
      <div className="grid gap-3">
        {materials.map((material) => (
          <a
            key={material.id}
            href={material.path}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-sm transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
              {getFileIcon(material.type)}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">
                {material.title}
              </p>
              <p className="text-sm text-gray-400 mt-0.5">
                {getTypeLabel(material.type)} • {material.path.split('/').pop()}
              </p>
            </div>
            <div className="text-gray-300 group-hover:text-indigo-500 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
