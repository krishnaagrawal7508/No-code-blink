import React, { useState } from 'react';
import axios from 'axios';
import UploadCover from './UploadCover';

const Form = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

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

      const response_create_get = await axios.get('http://localhost:8000/router_get/' + response.data.id + '/' + response.data.file + '/' + response.data.title + '/' + response.data.description,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      console.log(response_create_get);

      window.open("https://dial.to/?action=solana-action:" + 'http://localhost:8000/router_get/' + response.data.id + '/' + response.data.file + '/' + response.data.title + '/' + response.data.description, "_blank");
      window.location.reload();

    } catch (error) {
      console.log(error)
      setSubmissionMessage('Internal error, try again later');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="form" onSubmit={send} encType="multipart/form-data">
      <UploadCover onFileSelect={handleFileSelect} />
      <input
        type="text"
        className="form-title"
        placeholder="Form Title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
      />
      <textarea
        className="form-description"
        placeholder="Detailed description about the form"
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
          'Send it'
        )}
      </button>
      {submissionMessage && <span style={{ color: 'green', padding: '10px' }}>{submissionMessage}<span className="loader"></span></span>}

    </form>
  );
};

export default Form;
