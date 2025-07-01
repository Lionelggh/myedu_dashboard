import React from 'react';
import Input from '../../../components/ui/Input';

const ParentDetailsSection = ({ formData, errors, onInputChange }) => {
  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      {/* Section Header */}
      <div className="bg-primary px-6 py-4">
        <h2 className="text-xl font-semibold text-white">Parent Details</h2>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Parent First Name */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              First Name <span className="text-error">*</span>
            </label>
            <Input
              type="text"
              value={formData.parentFirstName}
              onChange={(e) => onInputChange('parentFirstName', e.target.value)}
              placeholder="Enter parent first name"
              className={errors.parentFirstName ? 'border-error' : ''}
            />
            {errors.parentFirstName && (
              <p className="text-sm text-error mt-1">{errors.parentFirstName}</p>
            )}
          </div>

          {/* Parent Last Name */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Last Name <span className="text-error">*</span>
            </label>
            <Input
              type="text"
              value={formData.parentLastName}
              onChange={(e) => onInputChange('parentLastName', e.target.value)}
              placeholder="Enter parent last name"
              className={errors.parentLastName ? 'border-error' : ''}
            />
            {errors.parentLastName && (
              <p className="text-sm text-error mt-1">{errors.parentLastName}</p>
            )}
          </div>

          {/* Parent Email */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email <span className="text-error">*</span>
            </label>
            <Input
              type="email"
              value={formData.parentEmail}
              onChange={(e) => onInputChange('parentEmail', e.target.value)}
              placeholder="Enter parent email address"
              className={errors.parentEmail ? 'border-error' : ''}
            />
            {errors.parentEmail && (
              <p className="text-sm text-error mt-1">{errors.parentEmail}</p>
            )}
          </div>

          {/* Parent Phone */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Phone <span className="text-error">*</span>
            </label>
            <Input
              type="tel"
              value={formData.parentPhone}
              onChange={(e) => onInputChange('parentPhone', e.target.value)}
              placeholder="Enter parent phone number"
              className={errors.parentPhone ? 'border-error' : ''}
            />
            {errors.parentPhone && (
              <p className="text-sm text-error mt-1">{errors.parentPhone}</p>
            )}
          </div>

          {/* Parent Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Address <span className="text-error">*</span>
            </label>
            <textarea
              value={formData.parentAddress}
              onChange={(e) => onInputChange('parentAddress', e.target.value)}
              placeholder="Enter parent full address"
              rows={3}
              maxLength={1000}
              className={`flex w-full rounded-md border px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none ${
                errors.parentAddress ? 'border-error' : 'border-input bg-background'
              }`}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.parentAddress && (
                <p className="text-sm text-error">{errors.parentAddress}</p>
              )}
              <p className="text-xs text-text-muted ml-auto">
                {formData.parentAddress.length}/1000
              </p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-primary mb-4">
              Payment Method <span className="text-error">*</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex items-center cursor-pointer">
                <Input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={formData.paymentMethod === 'cash'}
                  onChange={(e) => onInputChange('paymentMethod', e.target.value)}
                />
                <span className="ml-2 text-sm text-text-primary">Cash</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <Input
                  type="radio"
                  name="paymentMethod"
                  value="debit"
                  checked={formData.paymentMethod === 'debit'}
                  onChange={(e) => onInputChange('paymentMethod', e.target.value)}
                />
                <span className="ml-2 text-sm text-text-primary">Debit</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDetailsSection;