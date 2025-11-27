"use client";
import React, { useState } from 'react';
import Button from '../ui/button/Button';
import Label from '../form/Label';
import Input from '../form/input/InputField';
import Select from '../form/Select';
import { ChevronDownIcon, EyeCloseIcon, EyeIcon, TimeIcon } from '../../icons';
import DatePicker from '@/components/form/date-picker';

export default function FormEdit() {
  const [showPassword, setShowPassword] = useState(false);
  const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };
  return (
    
      <div className="space-y-6">
       
      </div>
  );
}
