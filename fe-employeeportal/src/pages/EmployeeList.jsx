import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            const response = await api.get('');
            setEmployees(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data", error);
            setLoading(false);
        }
    };

    const deleteEmployee = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            await api.delete(`/${id}`);
            loadEmployees();
        }
    };

    if (loading) return <p>Loading employees...</p>;

    return (
        <div className="card">
            <h3>Employee Directory</h3>
            {employees.length === 0 ? (
                <p>No employees found. Add one to get started.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp.id}>
                                <td>{emp.name}</td>
                                <td>{emp.department}</td>
                                <td className="action-buttons">
                                    <Link to={`/employee/${emp.id}`} className="btn btn-sm btn-info">View</Link>
                                    <Link to={`/edit-employee/${emp.id}`} className="btn btn-sm btn-warning">Edit</Link>
                                    <button onClick={() => deleteEmployee(emp.id)} className="btn btn-sm btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}