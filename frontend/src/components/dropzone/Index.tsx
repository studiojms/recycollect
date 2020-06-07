import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import './styles.css';

interface DropzoneProps {
  text: string;
  onFileUpload: (file: File) => void;
}

function Dropzone({ text, onFileUpload }: DropzoneProps) {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);

      setSelectedFileUrl(fileUrl);
      onFileUpload(file);
    },
    [onFileUpload]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt={text} />
      ) : (
        <p>
          <FiUpload />
          {text}
        </p>
      )}
    </div>
  );
}

export default Dropzone;
