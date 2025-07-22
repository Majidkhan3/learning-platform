'use client';

import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Form,
  Modal,
  Row,
  Table,
} from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { getUsers, createUser, updateUser, deleteUser } from '@/services';
import { useNotificationContext } from '@/context/useNotificationContext';
import { useRouter } from 'next/navigation';

const UsersPage = () => {
  const { showNotification } = useNotificationContext();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of users per page
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
     languages: [], 
     pseudo: '', 
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      showNotification({
        message: 'Fetching Users.',
        variant: 'success',
      });
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setEditUser(null);
    setFormData({
      email: '',
      password: '',
      pseudo: '', 
      languages: Array.isArray(users.languages) ? users.languages : [],
    });
  };

  const handleSubmit = async () => {
    try {
      if (editUser) {
        await updateUser(editUser._id, formData);
        showNotification({
          message: 'Successfully Updating the User',
          variant: 'success',
        });
      } else {
        await createUser(formData);
        showNotification({
          message: 'Successfully User Created',
          variant: 'success',
        });
      }
      handleCloseModal();
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        showNotification({
          message: 'Successfully User Deleted',
          variant: 'success',
        });
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
    {/* Dropdown for navigation */}
    <div className="mb-3 mt-2 d-flex justify-content-end">
      <Form.Select
        style={{ width: '200px' }}
        onChange={(e) => {
          if (e.target.value === 'home') router.push('/');
        }}
      >
        <option value="">Navigate to...</option>
        <option value="home">Home</option>
      </Form.Select>
    </div>
      <Row>
        <Col xl={12}>
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center border-bottom">
              <div>
                <CardTitle as={'h4'}>User Management</CardTitle>
              </div>
              <Button variant="primary" onClick={handleShowModal}>
                Add User
              </Button>
            </CardHeader>
            <CardBody className="p-0">
              <div className="table-responsive">
                <Table className="table align-middle text-nowrap table-hover table-centered mb-0">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Created At</th>
                      <th>Languages</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map((user) => (
                      <tr key={user._id}>
                         <td>{user.pseudo || 'N/A'}</td>
                        <td>{user.email}</td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                   <td>{user.languages && user.languages.length > 0 ? user.languages.join(', ') : 'N/A'}</td>
                   {console.log('User languages:', user.languages)}





                        <td>
                          <div className="d-flex gap-2">
                            <Button
                              variant="light"
                              size="sm"
                              onClick={() => {
                                setEditUser(user);
                                setFormData({
                                  email: user.email,
                                  password: '',
                                   pseudo: user.pseudo || '', 
                                   languages: user.languages || [],
                                });
                                setShowModal(true);
                              }}
                            >
                              <IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" />
                            </Button>
                            <Button
                              variant="soft-danger"
                              size="sm"
                              onClick={() => handleDelete(user._id)}
                            >
                              <IconifyIcon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </CardBody>
            <CardFooter className="border-top">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li
                      key={index + 1}
                      className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </CardFooter>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editUser ? 'Edit User' : 'Add New User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
  <Form.Label>Pseudo (Username)</Form.Label>
  <Form.Control
    type="text"
    value={formData.pseudo}
    onChange={(e) => setFormData({ ...formData, pseudo: e.target.value })}
    placeholder="Enter user's pseudo"
  />
</Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Form.Group>
            {!editUser && (
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </Form.Group> 
            )}
            <Form.Group className="mb-3">
            <Form.Label>Languages</Form.Label>
            <div className="d-flex gap-3">
              {['Espagnol', 'Portuguese', 'English','French'].map((lang) => (
                <Form.Check
                  key={lang}
                  type="checkbox"
                  label={lang}
                  checked={formData.languages.includes(lang)}
                  onChange={(e) => {
                    const updatedLanguages = e.target.checked
                      ? [...formData.languages, lang]
                      : formData.languages.filter((l) => l !== lang);
                    setFormData({ ...formData, languages: updatedLanguages });
                  }}
                />
              ))}
            </div>
          </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editUser ? 'Update' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UsersPage;