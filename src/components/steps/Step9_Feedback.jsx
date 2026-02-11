import React, { useState } from 'react';

const Step9_Feedback = ({ register, errors, setValue }) => {
  const [uploadedFiles, setUploadedFiles] = useState({
    filledForms: [],
    brochures: []
  });

  const handleFileUpload = async (e, fileType) => {
    const files = Array.from(e.target.files);
    const processedFiles = [];

    for (const file of files) {
      // Validate file type
      const isImage = file.type.startsWith('image/');
      const isPDF = file.type === 'application/pdf';
      
      if (fileType === 'filledForms' && !isImage) {
        alert(`${file.name} is not an image file. Please upload only images.`);
        continue;
      }
      
      if (fileType === 'brochures' && !isPDF) {
        alert(`${file.name} is not a PDF file. Please upload only PDF files.`);
        continue;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} is too large. Maximum file size is 10MB.`);
        continue;
      }

      // Convert to base64
      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });

      processedFiles.push({
        name: file.name,
        type: file.type,
        size: file.size,
        data: base64
      });
    }

    // Update state
    setUploadedFiles(prev => ({
      ...prev,
      [fileType]: [...prev[fileType], ...processedFiles]
    }));

    // Update form value
    setValue(fileType, [...uploadedFiles[fileType], ...processedFiles]);
  };

  const removeFile = (fileType, index) => {
    const updated = uploadedFiles[fileType].filter((_, i) => i !== index);
    setUploadedFiles(prev => ({ ...prev, [fileType]: updated }));
    setValue(fileType, updated);
  };
  return (
    <div className="bg-white p-6">
      {/* Q13a - Missing Features */}
      <div className="border-2 border-gray-400 p-4 bg-gray-50 mb-8">
        <div className="mb-4">
          <p className="text-sm text-blue-700 font-semibold">
            Q13a. According to customer demands & your experience, which features are <span className="font-bold">MISSING</span> in this particular model?
            <br />
            (Keep Open end box to write)
          </p>
        </div>

        {/* 10 Input Fields in 2 Columns */}
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <div key={num} className="flex items-center gap-2">
              <label className="text-sm font-medium w-8">{num}.</label>
              <input
                type="text"
                {...register(`Q13a_Missing_${num}`)}
                className="flex-1 px-3 py-2 border-2 border-gray-400 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Missing feature"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Q13b - Preferred Features */}
      <div className="border-2 border-gray-400 p-4 bg-gray-50 mb-8">
        <div className="mb-4">
          <p className="text-sm text-blue-700 font-semibold">
            Q13b. According to customer demands & your experience, which features are <span className="font-bold">PREFERRED / DESIRED / DEMANDED</span> by customers for this particular model?
            <br />
            (Keep Open end box to write)
          </p>
        </div>

        {/* 10 Input Fields in 2 Columns */}
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <div key={num} className="flex items-center gap-2">
              <label className="text-sm font-medium w-8">{num}.</label>
              <input
                type="text"
                {...register(`Q13b_Preferred_${num}`)}
                className="flex-1 px-3 py-2 border-2 border-gray-400 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Preferred feature"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Q14: Final Open-ended Question */}
      <div className="border-2 border-gray-400 p-4 bg-gray-50 mb-8">
        <div className="mb-4">
          <p className="text-sm text-blue-700 font-semibold">
            Q14. Apart from all the features mentioned above in the lists ... are there any other features that are{' '}
            <span className="font-semibold">preferred / desired / demanded</span> by end customers which are{' '}
            <span className="font-semibold">not listed above?</span>
            <br />
            (Keep Open end box to write)
          </p>
        </div>

        {/* 10 Input Fields in 2 Columns */}
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <div key={num} className="flex items-center gap-2">
              <label className="text-sm font-medium w-8">{num}.</label>
              <input
                type="text"
                {...register(`Q14_Other_${num}`)}
                className="flex-1 px-3 py-2 border-2 border-gray-400 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder=""
              />
            </div>
          ))}
        </div>
      </div>

      {/* File Upload Section */}
      <div className="border-2 border-gray-400 p-4 bg-gray-50 mb-8">
        <h3 className="text-lg font-bold text-blue-700 mb-4">Document Uploads</h3>
        
        {/* Filled Forms Upload */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Upload Photos of Filled Forms (JPG, PNG, HEIC, WebP, GIF)
          </label>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/heic,image/heif,image/webp,image/gif"
            multiple
            onChange={(e) => handleFileUpload(e, 'filledForms')}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {uploadedFiles.filledForms.length > 0 && (
            <div className="mt-2 space-y-2">
              {uploadedFiles.filledForms.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                  <span className="text-sm text-gray-700">📷 {file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
                  <button
                    type="button"
                    onClick={() => removeFile('filledForms', index)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Brochures Upload */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Upload Brochures (PDF only)
          </label>
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={(e) => handleFileUpload(e, 'brochures')}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
          {uploadedFiles.brochures.length > 0 && (
            <div className="mt-2 space-y-2">
              {uploadedFiles.brochures.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                  <span className="text-sm text-gray-700">📄 {file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
                  <button
                    type="button"
                    onClick={() => removeFile('brochures', index)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-xs text-gray-500 italic">
          * Maximum file size: 10MB per file<br />
          * All image formats supported (JPG, PNG, HEIC from iPhone, WebP, etc.)<br />
          * Files will be stored in Google Drive and linked to your survey response
        </p>
      </div>

      {/* THANK & CLOSE */}
      <div className="mt-12 text-center">
        <div className="inline-block border-4 border-blue-600 bg-blue-50 px-12 py-6 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-700">THANK & CLOSE</h2>
        </div>
      </div>

      {/* Optional Completion Message */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 italic">
          Thank you for completing the survey. Your responses have been recorded.
        </p>
      </div>
    </div>
  );
};

export default Step9_Feedback;
