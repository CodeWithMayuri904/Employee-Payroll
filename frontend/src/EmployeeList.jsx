import React, { useState, useEffect } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
//import {getEmployees, addEmployee } from "./api/employeeApi";
import { getEmployees, addEmployee, deleteEmployee, updateEmployee } from "./api/employeeApi";

export default function EmployeeList() {
    // const [employees, setEmployees] = useState([
    // { id: 1, name: "John Doe", email: "john.doe@gmail.com", department: "HR", salary: "$75,000" },
    // { id: 2, name: "Jane Smith", email: "jane.smith@gmail.com", department: "Marketing", salary: "$65,000" },
    // { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", department: "IT", salary: "$60,000" },
    // { id: 4, name: "Bob", email: "bob@gmail.com", department: "Sales", salary: "$60,000" },
    // ]);

    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        department: "",
        salary: ""
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        getEmployees() 
            .then((res) => setEmployees(res.data))
            .catch((err) => console.error(err));
            //console.log(res.data);
    }, []);



    const handleAdd = (employeeData) => {
        if (!employeeData.name || !employeeData.email) {
            alert("Name and Email are required");
            return;
        }

        addEmployee(employeeData)
            .then((res) => {
            setEmployees([...employees, res.data]);
            })
            .catch((err) => console.error(err));
    };

    const handleEdit = (id, updatedData) => {
        updateEmployee(id, updatedData)
            .then((res) => setEmployees(employees.map(emp => emp.id === id ? res.data : emp)))
            .catch((err) => console.error(err));
    };

    const handleDelete = (id) => {
        deleteEmployee(id)
            .then(() => setEmployees(employees.filter(emp => emp.id !== id)) )
            .catch((err) => console.error(err));
    }

    return (
        <div>
            <h1 className="text-center text-4xl font-bold text-blue-500 mt-8">Employee Payroll System</h1>

            <form className="mt-4 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md pl-2 "
            onSubmit={(e) => {
                e.preventDefault();

                if (editingId) {
                    // UPDATE
                    handleEdit(editingId, formData);
                    setEditingId(null);
                } else {
                    // ADD
                    handleAdd(formData);
                }

                setFormData({ name: "", email: "", department: "", salary: "" });
                }}>

                <div>
                    <label className="font-semibold text-gray-500" htmlFor="name">Name :</label>
                    <input className="ml-4 p-1 border border-gray-300 text-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 mb-4"
                     type="text" 
                     placeholder="enter the name"
                     value={formData.name}
                     onChange={(e) => setFormData({ ...formData, name: e.target.value})}/>
                </div>

                <div>
                    <label className="font-semibold text-gray-500" htmlFor="email">Email :</label>
                    <input className="ml-4 p-1 border border-gray-300 text-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 mb-4"
                    type="text" placeholder="enter the email"
                    value={formData.email}
                    onChange = {(e) => setFormData({ ...formData, email: e.target.value })}/>
                </div>

                <div>
                    <label className="font-semibold text-gray-500" htmlFor="dept">Department :</label>
                    <input className="ml-4 p-1 text-gray-500 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 mb-4"
                    type="text" placeholder="enter the department"
                    value = {formData.department}
                    onChange = {(e) => setFormData({ ...formData, department: e.target.value })} />
                </div>

                <div>
                    <label className="font-semibold text-gray-500" htmlFor="salary">Salary :</label>
                    <input className="ml-4 p-1 border border-gray-300 text-gray-500 mb-4" 
                        type="number"
                        placeholder="enter the salary"
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
                        
                    />
                </div>

                

                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition cursor-pointer hover:bg-blue-800 font-semibold">
                    Add Employee
                </button>
            </form>

            <table className="mt-20 mx-auto bg-white p-6 rounded-lg shadow-md pl-2 w-2/4 overflow-hidden">
                <thead className="bg-blue-400 text-white">
                    <tr>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Email</th>
                        <th className="border border-gray-300 p-2">Department</th>
                        <th className="border border-gray-300 p-2">Salary</th>
                        <th className="border border-gray-300 p-2">Status</th>
                    </tr>
                </thead>

                <tbody>
                      {employees.map((emp, index) => (
                      <tr key={`${emp.id}-${emp.email}-${index}`} className="hover:bg-gray-100">
                    
                            <td className="border border-gray-300 text-gray-400 font-semibold px-4 py-2">{emp.name}</td>
                            <td className="border border-gray-300 text-gray-400 font-semibold px-4 py-2">{emp.email}</td>
                            <td className="border border-gray-300 text-gray-400 font-semibold px-4 py-2">{emp.department}</td>
                            <td className="border border-gray-300 text-gray-400 font-semibold px-4 py-2">{emp.salary}</td>
                            <td className="px-4 py-2 flex gap-4 items-center justify-center">
                                <LiaEditSolid className="text-green-500 hover:text-green-700 cursor-pointer w-6 h-6" 
                                onClick={() => {
                                    setFormData({
                                    name: emp.name,
                                    email: emp.email,
                                    department: emp.department,
                                    salary: emp.salary
                                    });
                                    setEditingId(emp.id);
                                }} />
                                <RiDeleteBin6Line className="text-red-500 hover:text-red-700 cursor-pointer w-5 h-5"
                                onClick = {() => handleDelete(emp.id)}/>
                            </td>
                            
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}