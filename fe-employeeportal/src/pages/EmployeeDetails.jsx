import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

export default function EmployeeDetails() {
    const { id } = useParams(); // Gets the ID from the URL
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await api.get(`/${id}`);
                setEmployee(response.data);
            } catch (error) {
                console.error("Employee not found", error);
            }
        };
        fetchEmployee();
    }, [id]);

    if (!employee) return <p>Loading details...</p>;

    return (
        <div className="card">
            <h3>Employee Details</h3>
            <div className="details-grid">
                <p><strong>ID:</strong> {employee.id}</p>
                <p><strong>Name:</strong> {employee.name}</p>
                <p><strong>Department:</strong> {employee.department}</p>
                <p><strong>Contact Number:</strong> {employee.contactNumber}</p>
            </div>
            <Link to="/" className="btn btn-secondary">Back to Directory</Link>
        </div>
    );
}