import React, { useState, useEffect } from 'react';
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
  const [isFormValid, setIsFormValid] = useState(false);

  // const { publicKey, sendTransaction } = useWallet();
  // const { connection } = useConnection();
  const [fields, setFields] = useState([
    { id: 1, type: 'text', placeholder: 'Field 1', value: '' },
    { id: 2, type: 'text', placeholder: 'Field 2', value: '' },
  ]);

  const addField = () => {
    const newField = {
      id: fields.length + 1,
      type: 'text',
      placeholder: `Field ${fields.length + 1}`,
      value: ''
    };
    setFields([...fields, newField]);
  };

  const deleteField = (id) => {
    setFields(fields.filter(field => field.id !== id));
  };

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

  const handleFieldChange = (id, value) => {
    setFields(fields.map(field => field.id === id ? { ...field, value } : field));
  };

  useEffect(() => {
    const isFormDataValid = formData.title.trim() !== '' && formData.description.trim() !== '';
    const areFieldsValid = fields.every(field => field.value.trim() !== '');
    setIsFormValid(isFormDataValid && areFieldsValid && selectedFile !== null);
  }, [formData, fields, selectedFile]);

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
        "description": response.data.description,
        "fields": fields
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

      {fields.map(field => (
        <div key={field.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type={field.type}
            placeholder={field.placeholder}
            style={{ flex: 1, padding: '8px', border: '1px solid #d3d3d3', borderRadius: '4px' }}
            value={field.value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
          <button type="button" onClick={() => deleteField(field.id)} style={{ backgroundColor: '#d9534f', color: '#ffffff', padding: '8px', borderRadius: '4px' }}>🗑️</button>
        </div>
      ))}

      <button type="button" onClick={addField} style={{ backgroundColor: '#e0e0e0', width: '100%', padding: '8px', borderRadius: '4px' }}>➕ Add input field</button>

      <button
        type="submit"
        className="submit-btn"
        disabled={!isFormValid || isSubmitting}
        style={{
          backgroundColor: isSubmitting ? '#e0e0e0' : '#007bff',
          cursor: isFormValid && !isSubmitting ? 'pointer' : 'not-allowed',
          opacity: !isFormValid || isSubmitting ? 0.6 : 1
        }}
      >
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
