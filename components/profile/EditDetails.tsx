"use client";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

type UserProps = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
};

type props = {
  show: boolean;
  onClose: React.Dispatch<React.SetStateAction<void>>;
  user: UserProps;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditDetails: React.FC<props> = ({ show, onClose, setShowEdit, user }) => {
  const [form, setForm] = useState<UserProps>(user);
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL_AUTH;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const handlePhoneChange = (value: string) => {
    setForm((prev) => ({ ...prev, phone_number: "+" + value }));
    console.log(form);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleSave = async (updated: any) => {
    try {
      await axios.patch(`${baseUrl}/auth/edit-user`, updated, {
        withCredentials: true,
      });
      location.reload();
      setShowEdit(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit your details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>First name</Form.Label>
            <Form.Control
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              type="text"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              type="text"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              value={form.email}
              type="email"
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone number</Form.Label>
            <PhoneInput
              country={"us"}
              value={form.phone_number}
              onChange={handlePhoneChange}
              inputStyle={{ width: "100%" }}
              containerStyle={{ width: "100%" }}
              inputProps={{
                name: "phone_number",
              }}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            style={{ width: "100%" }}
            onClick={() => handleSave(form)}>
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditDetails;
