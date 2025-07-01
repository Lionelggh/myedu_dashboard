import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActions from '../../components/ui/QuickActions';
import Button from '../../components/ui/Button';
import StudentDetailsSection from './components/StudentDetailsSection';
import ParentDetailsSection from './components/ParentDetailsSection';

const AddNewStudent = () => {
  const [formData, setFormData] = useState({
    // Student Details
    photo: null,
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    placeOfBirth: '',
    parentName: '',
    email: '',
    phone: '',
    address: '',
    
    // Parent Details
    parentFirstName: '',
    parentLastName: '',
    parentEmail: '',
    parentPhone: '',
    parentAddress: '',
    paymentMethod: 'cash'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Student Details validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.placeOfBirth.trim()) newErrors.placeOfBirth = 'Place of birth is required';
    if (!formData.parentName.trim()) newErrors.parentName = 'Parent name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    // Parent Details validation
    if (!formData.parentFirstName.trim()) newErrors.parentFirstName = 'Parent first name is required';
    if (!formData.parentLastName.trim()) newErrors.parentLastName = 'Parent last name is required';
    if (!formData.parentEmail.trim()) {
      newErrors.parentEmail = 'Parent email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail)) {
      newErrors.parentEmail = 'Please enter a valid email';
    }
    if (!formData.parentPhone.trim()) newErrors.parentPhone = 'Parent phone is required';
    if (!formData.parentAddress.trim()) newErrors.parentAddress = 'Parent address is required';

    return newErrors;
  };

  const handleSaveAsDraft = () => {
    console.log('Saving as draft:', formData);
    // TODO: Implement save as draft functionality
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('Submitting student data:', formData);
      // TODO: Implement actual submission logic
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form or redirect to students list
      console.log('Student created successfully');
    } catch (error) {
      console.error('Error creating student:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16">
        <div className="p-6">
          <Breadcrumb />
          
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-text-primary">Add New Student</h1>
                <p className="text-text-secondary mt-2">
                  Register a new student with complete personal and parent information
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* Student Details Section */}
            <StudentDetailsSection
              formData={formData}
              errors={errors}
              onInputChange={handleInputChange}
            />

            {/* Parent Details Section */}
            <ParentDetailsSection
              formData={formData}
              errors={errors}
              onInputChange={handleInputChange}
            />

            {/* Action Buttons */}
            <div className="bg-surface rounded-lg border border-border p-6">
              <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleSaveAsDraft}
                  disabled={isSubmitting}
                  className="sm:order-1"
                >
                  Save as Draft
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleSubmit}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  className="sm:order-2"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <QuickActions />
    </div>
  );
};

export default AddNewStudent;