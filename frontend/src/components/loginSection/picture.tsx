import './picture.css'
import camera from '../../images/camera.svg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import React from 'react'
import { addProfilePicture } from '../../redux/userSlice'
import { useDispatch } from 'react-redux'
import { usePostUserDataMutation } from '../../redux/apis/userDataApi'

const PictureComponent = () => {

const navigate = useNavigate();
const dispatch = useDispatch();

const [preview, setPreview] = useState<string | null>(null);
const [image, setImage] = useState<File | null>(null);

//rtk querys
const [postUserDataMutation] = usePostUserDataMutation();



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

const handleSave = async () => {
  if (!image) return;

  const formData = new FormData();
  formData.append('profile_image', image);

  try {
    const data = await postUserDataMutation(formData).unwrap()
    console.log(data, 'image successfully returned');
  } catch (error) {
    console.error(error);
  }
  
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