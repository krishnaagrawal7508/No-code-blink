// import React, { useState } from 'react';

// const allowedTypes = ['image/webp', 'image/jpeg', 'image/png'];

// const UploadCover = ({ onFileSelect }) => {
//   const [isUploaded, setIsUploaded] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       if (allowedTypes.includes(file.type)) {
//         setIsUploaded(true);
//         setErrorMessage('');
//         onFileSelect(file);
//       } else {
//         setIsUploaded(false);
//         setErrorMessage('Only webp, jpeg, and png files are allowed');
//       }
//     } else {
//       setIsUploaded(false);
//     }
//   };

//   return (
//     <div className="upload-cover">
//       <input
//         type="file"
//         id="coverImage"
//         style={{ display: 'none' }}
//         accept={allowedTypes.join(',')}
//         onChange={handleFileChange}
//       />
//       <label htmlFor="coverImage" className="upload-cover-label">Upload Cover Image</label>
//       {isUploaded && <span style={{ color: 'green' }}>Image Selected</span>}
//       {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
//     </div>
//   );
// };

// export default UploadCover;
