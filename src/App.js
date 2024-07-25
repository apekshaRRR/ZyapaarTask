// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = 'http://localhost:8082/admin';
function App() {
    const [employees, setEmployees] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [emailLog, setEmailLog] = useState('');

    useEffect(() => {
        axios.get(`${API_URL}/employees`).then(response => setEmployees(response.data));
        axios.get(`${API_URL}/vendors`).then(response => setEmployees(response.data));

    }, []);

    const handleAddEmployee = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const employee = {
            email: formData.get('email'),
            name: formData.get('name'),
            designation: formData.get('designation'),
            ctc: formData.get('ctc')
        };
        axios.post(`${API_URL}/employee`,employee).then(response => {
            setEmployees([...employees, response.data]);
        });
    };

    const handleAddVendor = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const vendor = {
            email: formData.get('email'),
            name: formData.get('name'),
            upi: formData.get('upi')
        };
        axios.post(`${API_URL}/vendor`,vendor).then(response => {
            setVendors([...vendors, response.data]);
        });
    };

    const handleSendEmail = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const vendorEmails = formData.getAll('vendorEmails');
        axios.post(`${API_URL}/send-email`,vendorEmails).then(response => {
            setEmailLog(response.data);
        });
    };

    return (
        <div>
            <h1>Credmarg SME Payment Flow</h1>
            
            <h2>Add Employee</h2>
            <form onSubmit={handleAddEmployee}>
                <input name="name" placeholder="Name" required />
                <input name="designation" placeholder="Designation" required />
                <input name="ctc" placeholder="CTC" type="number" required />
                <input name="email" placeholder="Email" type="email" required />
                <button type="submit">Add Employee</button>
            </form>

            <h2>Add Vendor</h2>
            <form onSubmit={handleAddVendor}>
                <input name="name" placeholder="Name" required />
                <input name="email" placeholder="Email" type="email" required />
                <input name="upi" placeholder="UPI" required />
                <button type="submit">Add Vendor</button>
            </form>

            <h2>Send Email to Vendors</h2>
            <form onSubmit={handleSendEmail}>
                {vendors.map(vendor => (
                    <div key={vendor.email}>
                        <input type="checkbox" name="vendorEmails" value={vendor.email} />
                        {vendor.name} ({vendor.email})
                    </div>
                ))}
                <button type="submit">Send Email</button>
            </form>

            <h2>Email Log</h2>
            <pre>{emailLog}</pre>

            <h2>All Employees</h2>
            <ul>
                {employees.map(employee => (
                    <li key={employee.email}>{employee.name} ({employee.email})</li>
                ))}
            </ul>

            <h2>All Vendors</h2>
            <ul>
                {vendors.map(vendor => (
                    <li key={vendor.email}>{vendor.name} ({vendor.email})</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
