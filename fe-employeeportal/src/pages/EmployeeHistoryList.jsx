import { useEffect, useState } from 'react';
import api from '../services/api';

export default function EmployeeHistoryList() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.get('/history');
                setHistory(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching history", error);
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const formatAction = (action) => {
        switch (action) {
            case 'CREATE': return <span style={{color: 'green', fontWeight: 'bold'}}>Created</span>;
            case 'UPDATE': return <span style={{color: 'orange', fontWeight: 'bold'}}>Updated</span>;
            case 'DELETE': return <span style={{color: 'red', fontWeight: 'bold'}}>Deleted</span>;
            default: return action;
        }
    };

    if (loading) return <p>Loading history logs...</p>;

    return (
        <div className="card">
            <h3>System Audit History</h3>
            {history.length === 0 ? (
                <p>No history records found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Action</th>
                            <th>Emp ID</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((record) => (
                            <tr key={record.id}>
                                <td>{new Date(record.actionTimestamp).toLocaleString()}</td>
                                <td>{formatAction(record.action)}</td>
                                <td>{record.employeeId}</td>
                                <td>{record.name}</td>
                                <td>{record.department}</td>
                                <td>{record.contactNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}