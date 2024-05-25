
import React, { useEffect, useState } from 'react';
import './index.css';
import { useForm, FormProvider } from 'react-hook-form';
 
import Header from '../../components/molecules/header';
import SideBarHome from '../../components/molecules/sideBarHome';
import PointForm from '../../components/molecules/pointForm';

function AddAdoptPoint() {
    return (
        <>
            <Header />
            <img src="./images/green.png" id='green' alt='mancha verde' />
            <img src="./images/yellow.png" id='yellow' alt='mancha amarela' />
            <img src="./images/pink.png" id='pink' alt='mancha rosa' />
            <img src="./images/black.png" id='black' alt='mancha preta' />
            |<div className='pointForm'>
                <PointForm />
            </div>
            {/* Sidebar */}
            <SideBarHome />
        </>

    )
}

export default AddAdoptPoint;