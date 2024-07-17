import React, { useState } from 'react';
import axios from 'axios';
import UploadCover from './UploadCover';
// import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Buffer } from 'buffer';

const Form = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  // const { publicKey, sendTransaction } = useWallet();
  // const { connection } = useConnection();

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const send = async (e) => {
    e.preventDefault();

    // if (!connection || !publicKey) {
    //   return;
    // }

    if (!selectedFile) {
      alert('Please select an image to upload.');
      return;
    }

    setIsSubmitting(true);

    const form = new FormData();
    form.append('coverImage', selectedFile);
    form.append('title', formData.title);
    form.append('description', formData.description);

    try {
      const response = await axios.post('http://localhost:8000/upload', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);

      setSubmissionMessage('Your Blink is being created');

      let json = {
        "id": response.data.id,
        "icon": response.data.file,
        "title": response.data.title,
        "description": response.data.description
      };

      const jsonstring = JSON.stringify(json);
      const encoded = Buffer.from(jsonstring).toString('base64')

      const response_create_get = await axios.get('http://localhost:8000/router_get/' + encodeURIComponent(encoded),
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      console.log(response_create_get);

      window.open("https://dial.to/?action=solana-action:" + 'http://localhost:8000/router_get/' + encodeURIComponent(encoded), "_blank");
      window.location.reload();

    } catch (error) {
      console.log(error)
      setSubmissionMessage('Internal error, try again later');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // publicKey ?
    <form className="form" onSubmit={send} encType="multipart/form-data">
      <UploadCover onFileSelect={handleFileSelect} />
      <input
        type="text"
        className="form-title"
        placeholder="Title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
      />
      <textarea
        className="form-description"
        placeholder="Description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
      />
      <button type="submit" className="submit-btn" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span>Submitting...</span>
            <span className="loader"></span>
          </>
        ) : (
          'Create blink'
        )}
      </button>
      {submissionMessage && <span style={{ color: 'green', padding: '10px' }}>{submissionMessage}<span className="loader"></span></span>}

    </form>
    // :<span>Connect your wallet</span>
  );
};

export default Form;
