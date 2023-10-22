import React, { useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';

const ModelDragForm = () => {
    const [formData, setFormData] = useState({
        modelName: '',
        description: '',
        price: ''
    });
    const [dragging, setDragging] = useState(false);
    const [files, setFiles] = useState([]);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        const newFiles = [...e.dataTransfer.files];
        setFiles([...files, ...newFiles]);
    };

    const handleDelete = (fileToDelete) => {
        const filteredFiles = files.filter((file) => file !== fileToDelete);
        setFiles(filteredFiles);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formData.modelName || !formData.description || !formData.price || files.length < 3) {
            alert('Please provide model name, description, price, and at least 3 files.');
            return;
        }

        const url = 'http://34.42.69.196:5000/upload';
        const data = new FormData();
        data.append('model', formData.modelName);
        data.append('description', formData.description);
        data.append('price', formData.price);
        files.forEach((file, index) => data.append(`file${index + 1}`, file));

        try {
            const response = await axios.post(url, data);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
            <Paper elevation={3}>
                <Typography variant="h4" align="center" style={{ padding: '20px 0', background: '#2196F3', color: '#fff' }}>
                    Model Form
                </Typography>
                <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Model Name"
                                name="modelName"
                                value={formData.modelName}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                    </Grid>
                    <div
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        style={{
                            width: '100%',
                            height: '150px',
                            border: '2px dashed #ccc',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: dragging ? '#f50057' : 'black',
                            marginBottom: '20px',
                            background: '#f0f0f0',
                            borderRadius: '5px'
                        }}
                    >
                        {files.length > 0 ? (
                            <div>
                                <Typography variant="h6" gutterBottom>
                                    Dropped files:
                                </Typography>
                                <ul>
                                    {files.map((file, index) => (
                                        <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                            {file.name}
                                            <Button
                                                onClick={() => handleDelete(file)}
                                                color="secondary"
                                                style={{ marginLeft: '10px' }}
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <Typography>
                                Drag and drop files here in the order of the .h5, README, and a run.py file
                            </Typography>
                        )}
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        startIcon={<CloudUploadIcon />}
                        style={{ background: '#2196F3', color: '#fff' }}
                    >
                        Submit
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default ModelDragForm;
