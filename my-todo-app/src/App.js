
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Tab } from 'react-bootstrap';
import { todos } from './todoItems'; // Ensure this is the correct path

function App() {
  const [todoItems, setTodoItems] = useState(todos || []);

  // Helper function to get the number of days between two dates
  const getVariant = (dueDate) => {
    const currentDate = new Date();
    const todoDate = new Date(dueDate); // Ensure proper parsing
    const diffDays = Math.ceil((todoDate - currentDate) / (1000 * 60 * 60 * 24)); // Difference in days

    if (diffDays > 7) return 'primary';
    if (diffDays <= 7 && diffDays >= 4) return 'success';
    if (diffDays < 4 && diffDays >= 2) return 'warning';
    if (diffDays < 2) return 'danger';

    return 'primary';
  };

  // Inline styles
  const formStyle = {
    backgroundColor: '#d4edda', // Light green background
    padding: '20px',
    borderRadius: '5px', // Optional: rounded corners
  };

  const buttonStyle = {
    width: '100%', // Make the button full width
  };

  return (
    <Container>
      <h1 style={{ textAlign: 'center' }}>Assignment 2: Nimisha's ToDo List</h1>
      <br />
      <br />

      <Row>
        <Col sm={4}>
          <Form style={formStyle}> {/* Apply the inline form styles */}
            <Form.Group controlId="formTitle">
              <Form.Label>ToDo Item</Form.Label>
              <Form.Control type="text" placeholder="Add todo item" />
            </Form.Group>

            <Form.Group controlId="formDueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            

            <Button style={buttonStyle} variant="primary" type="submit">Add ToDo</Button> {/* Apply the inline button styles */}
          </Form>
        </Col>

        <Col sm={8}>
          <Tab.Container id="list-group-tabs" defaultActiveKey="#link0">
            <Row>
              <Col sm={4}>
                <ListGroup>
                  {todoItems.length > 0 ? (
                    todoItems.map((todo, index) => (
                      <ListGroup.Item
                        action
                        href={`#link${index}`}
                        key={index}
                        variant={getVariant(todo.dueDate)} // Apply the color variant here
                      >
                        {todo.title}
                      </ListGroup.Item>
                    ))
                  ) : (
                    <p>No todo items available.</p>
                  )}
                </ListGroup>
              </Col>

              <Col sm={8}>
                <Tab.Content>
                  {todoItems.length > 0 && todoItems.map((todo, index) => (
                    <Tab.Pane eventKey={`#link${index}`} key={index}>
                      <h4>{todo.title}</h4>
                      <p contentEditable="true">{todo.description}</p>
                      <Form.Group>
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control 
                          type="date" 
                          defaultValue={todo.dueDate} 
                        />
                      </Form.Group>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
