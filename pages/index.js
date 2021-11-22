import { get } from "mongoose";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Card, Button } from "react-bootstrap";
import CommonLayout from "../layout/CommonLayout";
import styles from "../styles/Home.module.css";

export default function Home({ notes }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>MERN app</title>
      </Head>

      <main className={styles.main}>
        <h1>Notes</h1>
        <div className="container">
          <div className="d-flex">
            {notes.map((note) => {
              return (
                <div key={note._id} className="mx-2">
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>{note.title}</Card.Title>
                      <Card.Text>{note.description}</Card.Text>
                      <Link href={`/${note._id}`}>
                        <Button variant="primary" className="mr-2">
                          View
                        </Button>
                      </Link>
                      <Link href={`/${note._id}/edit`}>
                        <Button variant="outline-primary" className="mr-2">
                          Edit
                        </Button>
                      </Link>
                      <Link href={`/${note._id}/delete`}>
                        <Button variant="outline-danger" className="mr-2">
                          Delete
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

// Runs serversice
Home.getInitialProps = async () => {
  const res = await fetch("http://localhost:3000/api/notes");
  const { data } = await res.json();

  return { notes: data };
};
