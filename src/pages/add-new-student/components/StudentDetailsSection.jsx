import React, { useRef } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const StudentDetailsSection = ({ formData, errors, onInputChange }) => {
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type and size
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, or GIF)');
        return;
      }

      if (file.size > maxSize) {
        alert('File size must be less than 5MB');
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        onInputChange('photo', {
          file: file,
          preview: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const fakeEvent = { target: { files: [file] } };
      handlePhotoUpload(fakeEvent);
    }
  };

  const handlePhotoDragOver = (event) => {
    event.preventDefault();
  };

  const removePhoto = () => {
    onInputChange('photo', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      {/* Section Header */}
      <div className="bg-primary px-6 py-4">
        <h2 className="text-xl font-semibold text-white">Student Details</h2>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Photo Upload Section */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Photo
            </label>
            <div
              className="relative border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors"
              onDrop={handlePhotoDrop}
              onDragOver={handlePhotoDragOver}
            >
              {formData.photo?.preview ? (
                <div className="space-y-3">
                  <img
                    src={formData.photo.preview}
                    alt="Student preview"
                    className="w-32 h-32 object-cover rounded-lg mx-auto"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={removePhoto}
                    iconName="Trash2"
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-20 h-20 mx-auto bg-primary-50 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-2">
                      Drag and drop photo here, or
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Browse Files
                    </Button>
                  </div>
                  <p className="text-xs text-text-muted">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Form Fields */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  First Name <span className="text-error">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => onInputChange('firstName', e.target.value)}
                  placeholder="Enter first name"
                  className={errors.firstName ? 'border-error' : ''}
                />
                {errors.firstName && (
                  <p className="text-sm text-error mt-1">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Last Name <span className="text-error">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => onInputChange('lastName', e.target.value)}
                  placeholder="Enter last name"
                  className={errors.lastName ? 'border-error' : ''}
                />
                {errors.lastName && (
                  <p className="text-sm text-error mt-1">{errors.lastName}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Date of Birth <span className="text-error">*</span>
                </label>
                <Input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => onInputChange('dateOfBirth', e.target.value)}
                  className={errors.dateOfBirth ? 'border-error' : ''}
                />
                {errors.dateOfBirth && (
                  <p className="text-sm text-error mt-1">{errors.dateOfBirth}</p>
                )}
              </div>

              {/* Place of Birth */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Place of Birth <span className="text-error">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.placeOfBirth}
                  onChange={(e) => onInputChange('placeOfBirth', e.target.value)}
                  placeholder="Enter place of birth"
                  className={errors.placeOfBirth ? 'border-error' : ''}
                />
                {errors.placeOfBirth && (
                  <p className="text-sm text-error mt-1">{errors.placeOfBirth}</p>
                )}
              </div>

              {/* Parent Name */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Parent Name <span className="text-error">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.parentName}
                  onChange={(e) => onInputChange('parentName', e.target.value)}
                  placeholder="Enter parent name"
                  className={errors.parentName ? 'border-error' : ''}
                />
                {errors.parentName && (
                  <p className="text-sm text-error mt-1">{errors.parentName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email <span className="text-error">*</span>
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => onInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                  className={errors.email ? 'border-error' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-error mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Phone <span className="text-error">*</span>
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => onInputChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                  className={errors.phone ? 'border-error' : ''}
                />
                {errors.phone && (
                  <p className="text-sm text-error mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Address <span className="text-error">*</span>
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => onInputChange('address', e.target.value)}
                  placeholder="Enter full address"
                  rows={3}
                  maxLength={500}
                  className={`flex w-full rounded-md border px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none ${
                    errors.address ? 'border-error' : 'border-input bg-background'
                  }`}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.address && (
                    <p className="text-sm text-error">{errors.address}</p>
                  )}
                  <p className="text-xs text-text-muted ml-auto">
                    {formData.address.length}/500
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsSection;