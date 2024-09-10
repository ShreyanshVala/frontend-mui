import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Container,
  Alert,
} from "@mui/material";

export const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function getData() {
    try {
      const response = await fetch("http://localhost:5000/get");
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        setData(result);
      }
    } catch (err) {
      setError("Failed to fetch data.");
      console.error(err);
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/delete/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        setError("Deleted Successfully");

        setTimeout(() => {
          setError("");
          getData();
        }, 2000);
      }
    } catch (err) {
      setError("Failed to delete item.");
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container sx={{ my: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        All Data
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={2}>
        {data.length > 0 ? (
          data.map((ele) => (
            <Grid item xs={12} sm={6} md={3} key={ele._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {ele.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {ele.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {ele.age}
                  </Typography>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => {
                      handleDelete(ele._id);
                      navigate("/", { replace: true });
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    size="small"
                    component={Link}
                    to={`/${ele._id}`}
                    sx={{ ml: 1 }}
                  >
                    Edit
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" align="center">
            No data available
          </Typography>
        )}
      </Grid>
    </Container>
  );
};
