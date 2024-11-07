"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './UserForm.module.css'; // יבוא הסטיילים

interface FormData {
    idNumber: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
}

interface FormErrors {
    idNumber?: string;
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    email?: string;
}

export default function UserForm() {
    const [formData, setFormData] = useState<FormData>({
        idNumber: 0,
        firstName: '',
        lastName: '',
        birthDate: '',
        email: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // בדיקת תעודת זהות
        if (formData.idNumber>1000000000) {
            newErrors.idNumber = 'String must contain at least 9 character(s)';
        }

        if (formData.firstName.length < 2) {
            newErrors.firstName = 'String must contain at least 2 character(s)';
        }

        if (formData.lastName.length < 2) {
            newErrors.lastName = 'String must contain at least 2 character(s)';
        }

        if (!formData.birthDate || new Date(formData.birthDate) >= new Date()) {
            newErrors.birthDate = 'Date of Birth must be in the past';
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(formData);
            setFormData({ idNumber: 0, firstName: '', lastName: '', birthDate: '', email: '' });
            setErrors({});
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>פרטים אישיים</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formField}>
                    <label>תעודת זהות</label>
                    <input
                        className={styles.inputField}
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={handleChange}
                    />
                    {errors.idNumber && <p className={styles.errorMessage}>{errors.idNumber}</p>}
                </div>

                <div className={styles.formField}>
                    <label>שם פרטי</label>
                    <input
                        className={styles.inputField}
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    {errors.firstName && <p className={styles.errorMessage}>{errors.firstName}</p>}
                </div>

                <div className={styles.formField}>
                    <label>שם משפחה</label>
                    <input
                        className={styles.inputField}
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && <p className={styles.errorMessage}>{errors.lastName}</p>}
                </div>

                <div className={styles.formField}>
                    <label>תאריך לידה</label>
                    <input
                        className={styles.inputField}
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                    />
                    {errors.birthDate && <p className={styles.errorMessage}>{errors.birthDate}</p>}
                </div>

                <h2 className={styles.title}>פרטי התקשרות</h2>
                <div className={styles.formField}>
                    <label>כתובת אימייל</label>
                    <input
                        className={styles.inputField}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
                </div>

                <button className={styles.submitButton} type="submit">שמור</button>
            </form>
        </div>
    );
}
