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

const ImageDragDrop = () => {
    const [formData, setFormData] = useState({
        modelName: '',
        description: '',
        price: ''
    });
    const [dragging, setDragging] = useState(false);
    const [files, setFiles] = useState([]);
    const [output, setOutput] = useState("Loading");

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

        const url = 'http://34.42.69.196:5000/runmodel';
        const data = new FormData();
        data.append('input_data', files[0]);
        data.append('username', "ashotwin");
        data.append('model', 'New Model');

        try {
            const response = await axios.post(url, data);
            setOutput("(" + response.data.result[0] + ")")
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
            <div>{output}</div>
        </Container>
    );
};

export default ImageDragDrop;
