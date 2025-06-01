import './picture.css'
import camera from '../../images/camera.svg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import React from 'react'
import { usePostUserProfilePictureMutation } from '../../redux/apis/userDataApi'
import { addProfilePicture } from '../../redux/userSlice'
import { useDispatch } from 'react-redux'


const PictureComponent = () => {

const navigate = useNavigate();

const [preview, setPreview] = useState<string | null>(null);
const [image, setImage] = useState<File | null>(null);
const dispatch = useDispatch();

//rtk query
const [postUserProfilePicture] = usePostUserProfilePictureMutation();

const handleSkip = () => {

  navigate('/dashboard');
}

const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); 
    try {
      const base64 = await convertFileToBase64(file)
      dispatch(addProfilePicture(base64))
    } catch (err) {
      console.error("base64 conversion failed", err);
    }
      
    }
}


const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result as string);

      } else {
        reject("Could not convert file.");
      }
    };
    reader.onerror = () => reject("File reading error");
    reader.readAsDataURL(file);
  });
};


const handleSave = async () => {
  if (!image) return;

  const formData = new FormData();
  formData.append('profile_image', image);
  console.log(formData, 'huh');

  try {
    await postUserProfilePicture(formData).unwrap();

    navigate('/dashboard')

  } catch (error) {
    console.error(error);
  }
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