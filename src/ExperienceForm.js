import React, { useState } from 'react';
import './ExperienceForm.css';

function ExperienceForm() {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    start_date: '',
    end_date: '',
    description: '',
    logo: ''
  });

  const [currentlyWorking, setCurrentlyWorking] = useState(false); // New state for checkbox

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = () => {
    setCurrentlyWorking(!currentlyWorking);
    if (!currentlyWorking) {
      setFormData({ ...formData, end_date: '' }); // Reset end date when checked
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/resume/experience', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert('Experience added successfully!');
        // Optionally clear the form here
        setFormData({
          title: '',
          company: '',
          start_date: '',
          end_date: '',
          description: '',
          logo: ''
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error adding experience.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Company:
          <input type="text" name="company" value={formData.company} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Start Date:
          <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          End Date:
          <input 
            type="date" 
            name="end_date" 
            value={formData.end_date} 
            onChange={handleChange} 
            disabled={currentlyWorking} // Disable if checkbox is checked
            required={!currentlyWorking} // Required only if checkbox is not checked
          />
        </label>
      </div>
      <div className="checkbox-container">
        <input 
          type="checkbox" 
          id="currentlyWorkingCheckbox"
          checked={currentlyWorking} 
          onChange={handleCheckboxChange} 
        />
        <label htmlFor="currentlyWorkingCheckbox">Currently Working Here</label>
      </div>
      <div>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
        </label>
      </div>
      <div>
        <label>
          Logo URL:
          <input type="text" name="logo" value={formData.logo} onChange={handleChange} required />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ExperienceForm;
