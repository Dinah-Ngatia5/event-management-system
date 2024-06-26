
import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/index.css';



const Dashboard = () => {
    const [attendances, setAttendances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await fetch('https://events-management-backend-4q19.onrender.com/attendances',{
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch attendances');
                }
                const data = await response.json();
                setAttendances(data.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching attendances: ' + err.message);
                setLoading(false);
            }
        };

        fetchAttendanceData();
    }, []);

    const renderContent = () => {
        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        return (
            <div>
            
                <h1>Attending Events</h1>

                <Row className="mt-4">
                    {attendances.map((attendance) => (
                        <Col key={attendance.event.id} md={4} className="mb-4">
                            <Link to={`/event-details/${attendance.event.id}`} className="card-link">
                                <Card className="h-100 shadow-sm card-event">
                                    <div className="card-img-wrapper">
                                        <Card.Img
                                            variant="top"
                                            src={attendance.event.image}
                                            className="card-img"
                                        />
                                    </div>
                                    <Card.Body className="card-body">
                                        <Card.Title className="card-title">{attendance.event.name}</Card.Title>
                                        <Card.Text className="card-text">{attendance.event.description}</Card.Text>
                                        <div className="card-details">
                                            <div>
                                                <i className="fas fa-calendar-alt"></i>{' '}
                                                <strong>Date:</strong>{' '}
                                                {new Date(attendance.event.date).toLocaleDateString()}
                                            </div>
                                            <div>
                                                <i className="fas fa-clock"></i>{' '}
                                                <strong>Time:</strong> {attendance.event.time}
                                            </div>
                                            <div>
                                                <i className="fas fa-map-marker-alt"></i>{' '}
                                                <strong>Location:</strong> {attendance.event.location}
                                            </div>
                                            <div>
                                                <i className="fas fa-dollar-sign"></i>{' '}
                                                <strong>Price:</strong> ${attendance.event.price}
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </div>
        );
    };

    return (
        <div className="find-events-bg">
            <Container>
                {renderContent()}
            </Container>
        </div>
    );
};

export default Dashboard;

