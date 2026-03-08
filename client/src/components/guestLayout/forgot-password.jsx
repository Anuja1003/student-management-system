import React from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert, Spinner, Card } from "react-bootstrap";

const API_BASE = "http://localhost:8000/api/users";

export default class ForgotPassword extends React.Component {
  state = {
    email: "",
    loading: false,
    error: "",
    success: "",
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ error: "", success: "" });

    const { email } = this.state;
    if (!email) return this.setState({ error: "Please enter your email address." });

    this.setState({ loading: true });
    try {
      const res = await axios.post(`${API_BASE}/forgot-password`, { email });
      this.setState({
        success: res.data?.message || "Temporary password sent to your email.",
        email: "",
      });
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to send temporary password. Try again.";
      this.setState({ error: msg });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { email, loading, error, success } = this.state;

    return (
      <Container className="py-4 mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <h4 className="mb-3 text-center">Forgot Password</h4>
                {success && <Alert variant="success">{success}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group className="mb-3" controlId="fpEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={this.handleChange}
                      required
                    />
                  </Form.Group>
                  <div className="d-grid">
                    <Button variant="primary" type="submit" disabled={loading}>
                      {loading ? <><Spinner size="sm" /> Sending...</> : "Send Temporary Password"}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}