import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

export default function EmployeeForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        department: ''
    });

    useEffect(() => {
        if (isEditMode) {
            api.get(`/${id}`).then((response) => {
                setFormData(response.data);
            });
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (isEditMode) {
                await api.put(`/${id}`, formData);
            } else {
                await api.post('', formData);
            }
            navigate('/');
        } catch (error) {
            console.error("Error saving employee", error);
        }
    };

    return (
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h3>{isEditMode ? 'Update Employee' : 'Add New Employee'}</h3>
            <form onSubmit={handleSubmit} className="form-group">
                <label>Name (Required)</label>
                <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                />

                <label>Contact Number</label>
                <input 
                    type="text" 
                    name="contactNumber" 
                    value={formData.contactNumber} 
                    onChange={handleChange} 
                />

                <label>Department (Required)</label>
                <input 
                    type="text" 
                    name="department" 
                    value={formData.department} 
                    onChange={handleChange} 
                    required 
                    disabled={isEditMode}
                />

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        {isEditMode ? 'Save Changes' : 'Create Employee'}
                    </button>
                    <button type="button" onClick={() => navigate('/')} className="btn btn-secondary">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}