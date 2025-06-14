import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, File, Image, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const Dropzone = React.forwardRef(({
  className,
  onFilesChange,
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    'application/pdf': ['.pdf'],
    'text/*': ['.txt'],
  },
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB
  disabled = false,
  ...props
}, ref) => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }));

    const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles.map(f => f.file));

    if (rejectedFiles.length > 0) {
      console.warn('Alguns arquivos foram rejeitados:', rejectedFiles);
    }
  }, [files, maxFiles, onFilesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: maxFiles - files.length,
    maxSize,
    disabled: disabled || files.length >= maxFiles,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  const removeFile = (fileId) => {
    const updatedFiles = files.filter(f => f.id !== fileId);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles.map(f => f.file));
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return <Image className="w-4 h-4" />;
    if (fileType === 'application/pdf') return <FileText className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn("w-full", className)} ref={ref} {...props}>
      {/* Dropzone Area */}
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer",
          "hover:bg-muted/50",
          isDragActive || dragActive
            ? "border-primary bg-muted/50"
            : "border-muted-foreground/25",
          disabled && "opacity-50 cursor-not-allowed",
          files.length >= maxFiles && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center text-center">
          <Upload className={cn(
            "w-10 h-10 mb-4 text-muted-foreground",
            (isDragActive || dragActive) && "text-primary"
          )} />
          
          <div className="mb-2">
            {isDragActive || dragActive ? (
              <p className="text-lg font-medium text-primary">
                Solte os arquivos aqui...
              </p>
            ) : (
              <div>
                <p className="text-lg font-medium">
                  Clique para selecionar ou arraste arquivos
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Máximo {maxFiles} arquivo{maxFiles > 1 ? 's' : ''} • Até {formatFileSize(maxSize)} cada
                </p>
              </div>
            )}
          </div>
          
          {files.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {files.length} de {maxFiles} arquivo{maxFiles > 1 ? 's' : ''} selecionado{files.length > 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">
            Arquivos selecionados:
          </h4>
          
          <div className="space-y-2">
            {files.map((fileItem) => (
              <div
                key={fileItem.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border"
              >
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  {fileItem.preview ? (
                    <img
                      src={fileItem.preview}
                      alt="Preview"
                      className="w-10 h-10 object-cover rounded border"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-muted rounded border flex items-center justify-center">
                      {getFileIcon(fileItem.file.type)}
                    </div>
                  )}
                  
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">
                      {fileItem.file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(fileItem.file.size)}
                    </p>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={() => removeFile(fileItem.id)}
                  className="ml-2 p-1 hover:bg-destructive/10 rounded-full transition-colors group"
                  disabled={disabled}
                >
                  <X className="w-4 h-4 text-muted-foreground group-hover:text-destructive" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default Dropzone;