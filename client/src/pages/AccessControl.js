import React, { useState, useEffect } from "react";
import { Container, Table, Button, Form, InputGroup } from "react-bootstrap";
import { FaUser, FaShieldAlt } from "react-icons/fa";
import toast from "react-hot-toast";

import { getUsersByRole, updateUserRole } from "../api";

const RoleChangeForm = ({ setUsers }) => {
    const [email, setEmail] = useState("");
    const [newRole, setNewRole] = useState("");

    const handleRoleChange = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter an email");
            return;
        }
        try {
            await updateUserRole(email, newRole);
            const allUsers = await getUsersByRole("");
            setUsers(allUsers);
            setEmail("");
            setNewRole("");
            toast.success("User role updated!");
        } catch (error) {
            toast.error("User not found");
        }
    };

    return (
        <Container className="mb-5">
            <Form onSubmit={handleRoleChange} className="mb-4">
                <Form.Group controlId="formEmailInput" className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                            <FaUser />
                        </InputGroup.Text>
                        <Form.Control
                            type="email"
                            placeholder="Enter user email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group controlId="formRoleSelect" className="mb-3">
                    <Form.Label>Select New Role</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                            <FaShieldAlt />
                        </InputGroup.Text>
                        <Form.Control
                            as="select"
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                            required
                        >
                            <option value="">Select role</option>
                            <option value="ADMIN">Admin</option>
                            <option value="MANAGER">Manager</option>
                            <option value="ATTENDEE">Attendee</option>
                        </Form.Control>
                    </InputGroup>
                </Form.Group>

                <Button variant="success" type="submit">
                    Update Role
                </Button>
            </Form>
        </Container>
    );
};

const Filters = ({ view, setView }) => {
    return (
        <div className="mb-3">
            <Button
                variant={view === "ADMIN" ? "primary" : "secondary"}
                onClick={() => setView("ADMIN")}
            >
                View Admins
            </Button>
            <Button
                variant={view === "MANAGER" ? "primary" : "secondary"}
                onClick={() => setView("MANAGER")}
                className="ms-2"
            >
                View Managers
            </Button>
            <Button
                variant={view === "ALL" ? "primary" : "secondary"}
                onClick={() => setView("ALL")}
                className="ms-2"
            >
                View All
            </Button>
        </div>
    );
};

const AccessControl = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [view, setView] = useState("ADMIN");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const allUsers = await getUsersByRole("");
                setUsers(allUsers);
                setFilteredUsers(allUsers);
            } catch (error) {
                toast.error("Failed to fetch users");
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (view === "ALL") {
            setFilteredUsers(users);
        } else {
            setFilteredUsers(users.filter((user) => user.role === view));
        }
    }, [view, users]);

    return (
        <Container className="p-3 mb-5 min-vh-100">
            <h1 className="px-3 mb-5 text-center text-sm-start">
                Access Control
            </h1>
            <RoleChangeForm setUsers={setUsers} />

            <Container>
                <Filters view={view} setView={setView} />

                <Table responsive bordered hover>
                    <thead style={{ verticalAlign: "middle" }}>
                        <tr>
                            <th className="table-header">ID</th>
                            <th className="table-header">Username</th>
                            <th className="table-header">Email</th>
                            <th className="table-header">Role</th>
                        </tr>
                    </thead>
                    <tbody style={{ verticalAlign: "middle" }}>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    No users available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </Container>
    );
};

export default AccessControl;
