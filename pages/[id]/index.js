import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Spinner } from "react-bootstrap";

export default function Note({ note }) {
  //   const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isDeleting) {
      deleteNote();
    }
  }, [isDeleting]);

  const handleDelete = async () => {
    setIsDeleting(true);
  };

  const deleteNote = async () => {
    const noteId = router.query.id;
    try {
      const deleted = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isDeleting ? (
        <Spinner variant="primary" />
      ) : (
        <>
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <Button
            onClick={handleDelete}
            variant="outline-danger"
            className="mr-2"
          >
            Delete
          </Button>
        </>
      )}
    </div>
  );
}

Note.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/notes/${id}`);
  const { data } = await res.json();

  return { note: data };
};
