import './App.css'
import logo from './assets/logo.png'
import { useState, useEffect } from 'react'
import './App.css'


const initialForm = { full_name: '', phone: '', email: '', address: '' }
function App() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted , setSubmitted]= useState(false)


  // Change form data 
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  // Validate formdata 
  const validate = () => {
    const newErrors = {}
    if (!form.full_name.trim()) newErrors.full_name = 'Full name is required'
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(form.phone.trim())) {
      newErrors.phone = 'Enter a valid 10-digit phone number'
    }
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Enter a valid email address'
    }
    if (!form.address.trim()) newErrors.address = 'Address is required'
    return newErrors
  }



  // Submit Function 
  const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = validate();
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }
  setLoading(true);
  
  try {
    // const res = await fetch(`${BASE_URL}/register/`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ ...form, device_id: deviceId }),
    // });

    // const data = await res.json();

    // if (!res.ok) {
    //   const errorMessage = data.detail || 'Request failed';
    //   throw new Error(errorMessage);
    // }
    setSubmitted(true);
    console.log('Form submitted successfully');
  } catch (err) {
      setErrors('Something went wrong. Please try again.');
      console.error(err);
  } finally {
    setLoading(false);
  }
};  


  if (submitted) {
    return (
      <div className="page-wrapper">
        <div className="form-card">
          <div className="logo-section">
            <img src={logo} alt="Jivo" className="logo-img" />
          </div>

          <div className="cashback-banner">
            <span className="banner-label">PARTICIPATION FORM</span>
            <h2 className="banner-title">Activity Form</h2>
          </div>

          <div className="success-message">
            <div className="success-icon">&#10003;</div>
            <h2>Thank You!</h2>
            <p>Your details have been submitted successfully. Thanks for participating .</p>
          </div>
        </div>

        <div className="about-card">
          <h3 className="about-title">About Jivo Wellness</h3>
          <p className="about-text">
            Jivo Wellness is a pioneer and leading seller of Canola Oil in India,
            being the first to establish a successful market for Cold Press Canola
            Oil on a PAN India basis. Holding the largest market share (85%) and
            being the largest distributor for healthy oil segments, Jivo has been
            uniting the masses with a diversified range of health-friendly choices
            for years.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-wrapper">
      <div className="form-card">
        <div className="logo-section">
          <img src={logo} alt="Jivo" className="logo-img" />
        </div>

        <div className="cashback-banner">
          <span className="banner-label">PARTICIPATION FORM</span>
          <h2 className="banner-title">Activity Form</h2>
        </div>

        <div className="form-body">
          <div className="form-title-section">
            <h2 className="form-title">Customer Details</h2>
            <p className="form-subtitle">Fill in your details to participate in the activity</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="full_name">
                Full Name <span className="required">*</span>
              </label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                placeholder="Enter your full name"
                value={form.full_name}
                onChange={handleChange}
              />
              {errors.full_name && <span className="error-text">{errors.full_name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                Phone <span className="required">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter 10-digit phone number"
                value={form.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email Address <span className="required">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@gmail.com"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="address">
                Address <span className="required">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                placeholder="Enter your full address"
                value={form.address}
                onChange={handleChange}
              />
              {errors.address && <span className="error-text">{errors.address}</span>}
            </div>

            {errors.submit && <p className="submit-error">{errors.submit}</p>}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit & Claim Coupon'}
            </button>
          </form>

          <div className="form-footer">
            <p>Your information is secure and will not be shared</p>
          </div>
        </div>
      </div>

      <div className="about-card">
        <h3 className="about-title">About Jivo Wellness</h3>
        <p className="about-text">
          Jivo Wellness is a pioneer and leading seller of Canola Oil in India,
          being the first to establish a successful market for Cold Press Canola
          Oil on a PAN India basis. Holding the largest market share (85%) and
          being the largest distributor for healthy oil segments, Jivo has been
          uniting the masses with a diversified range of health-friendly choices
          for years.
        </p>
      </div>
    </div>
  )
}

export default App
