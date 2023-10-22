import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BSON } from 'realm-web';
import { useEffect } from 'react';
import ImageDragDrop from './ImageDragDrop';

const RunModel = () => {
    const {model_id} = useParams()
    const [model, setModelState] = useState(null)
    const [signedIn, setSigned] = useState(null);
    const [modelUser, setModelUserState] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const url = `http://34.42.69.196:5000/getmodel` + model_id;
            const response = await axios.get(url);
            setModelState(response.data.model);
            setLoading(false)
          } catch (error) {
            // Handle request or server errors
            console.error('Error:', error);
          }
        };
        fetchData();
      }, []); 

    
    
    return (
        <div>
          <ImageDragDrop></ImageDragDrop>
        </div>
    );
};

export default RunModel;