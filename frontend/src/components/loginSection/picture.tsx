import './picture.css'
import camera from '../../images/camera.svg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import React from 'react'

const PictureComponent = () => {

const navigate = useNavigate();

const [preview, setPreview] = useState<string | null>(null);
const [image, setImage] = useState<File | null>(null);



const handleSkip = () => {

  navigate('/dashboard');
}

const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
}

const handleSave = () => {
    console.log("image ready to be uplaoded:", image);
}




    return (
        <section>
            <div className='header-div'>
                <h3>Now that we are all logged in, add a profile picture for your account</h3>
            </div>
            <div className='upload-section'>
                {preview ? (
                    <img src={preview} alt="image" className='preview-image'/>
                ) : (
                 <div className='camera-img-div'>
                 <img src={camera} alt="image" className='camera-image'/>
                </div>
                )}
                <input type="file" accept='image/*' onChange={handleImageUpload} />
           
            </div>
            
            <div className='button-group'>
                <button onClick={handleSave}>Save</button>
                <p onClick={handleSkip}><u>Skip for now</u></p>
            </div>
            

        </section>
        
    )
}

export default PictureComponent;