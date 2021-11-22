import Link from "next/link";
import { useState, useEffect, createContext } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";

export default function NewNote() {
  const [form, setForm] = useState({ title: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        createNote();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  };

  const createNote = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const validate = () => {
    let err = {};

    if (!form.title) {
      err.title = "Title is required";
    }
    if (!form.description) {
      err.title = "Title is required";
    }

    return err;
  };

  return (
    <>
      <div className="container">
        <h1>Create Note</h1>
        <div>
          {isSubmitting ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Note Title</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  error={
                    errors.title ? { content: "Please enter a title" } : null
                  }
                  type="text"
                  name="title"
                  label="Title"
                  placeholder="Enter title"
                />
                <Form.Text className="text-muted">
                  Please enter title. Not longer than something.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Note Description</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  error={
                    errors.title
                      ? { content: "Please enter a description" }
                      : null
                  }
                  type="text"
                  name="description"
                  label="Description"
                  placeholder="Enter description"
                />
                <Form.Text className="text-muted">
                  Please enter title. Not longer than 200 letters.
                </Form.Text>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </div>
      </div>
    </>
  );
}
