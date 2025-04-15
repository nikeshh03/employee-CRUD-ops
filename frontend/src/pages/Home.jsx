import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/Home.css"

function Home() {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        department: "IT",
        salary: "",
        hire_date: ""
    });
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getEmployees();
    }, []);

    const getEmployees = () => {
        api.get("/api/employees/")
            .then(res => setEmployees(res.data))
            .catch(err => alert(err));
    };

    const deleteEmployee = (id) => {
        api.delete(`/api/employees/${id}/`)
            .then(res => {
                alert("Employee deleted successfully!");
                getEmployees();
            })
            .catch(error => alert(error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            api.put(`/api/employees/${editingId}/`, formData)
                .then(res => {
                    alert("Employee updated successfully!");
                    setEditingId(null);
                    getEmployees();
                    resetForm();
                })
                .catch(err => alert(err));
        } else {
            api.post("/api/employees/", formData)
                .then(res => {
                    alert("Employee created successfully!");
                    getEmployees();
                    resetForm();
                })
                .catch(err => alert(err));
        }
    };

    const handleEdit = (employee) => {
        setFormData({
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            department: employee.department,
            salary: employee.salary,
            hire_date: employee.hire_date
        });
        setEditingId(employee.id);
    };

    const resetForm = () => {
        setFormData({
            first_name: "",
            last_name: "",
            email: "",
            department: "IT",
            salary: "",
            hire_date: ""
        });
        setEditingId(null);
    };

    const handleLogout = () => {
        navigate("/logout");
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Employee Management System</h1>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            
            <div className="form-section">
                <h2>{editingId ? 'Edit Employee' : 'Add New Employee'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={formData.first_name}
                            onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={formData.last_name}
                            onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <select
                            value={formData.department}
                            onChange={(e) => setFormData({...formData, department: e.target.value})}
                            required
                        >
                            <option value="IT">Information Technology</option>
                            <option value="HR">Human Resources</option>
                            <option value="FIN">Finance</option>
                            <option value="MKT">Marketing</option>
                            <option value="OPS">Operations</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            placeholder="Salary"
                            value={formData.salary}
                            onChange={(e) => setFormData({...formData, salary: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="date"
                            value={formData.hire_date}
                            onChange={(e) => setFormData({...formData, hire_date: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-buttons">
                        <button type="submit">{editingId ? 'Update' : 'Add'} Employee</button>
                        {editingId && (
                            <button type="button" onClick={resetForm}>Cancel</button>
                        )}
                    </div>
                </form>
            </div>

            <div className="employees-list">
                <h2>Employees List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Salary</th>
                            <th>Hire Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{`${employee.first_name} ${employee.last_name}`}</td>
                                <td>{employee.email}</td>
                                <td>{employee.department}</td>
                                <td>${employee.salary}</td>
                                <td>{new Date(employee.hire_date).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => handleEdit(employee)}>Edit</button>
                                    <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;