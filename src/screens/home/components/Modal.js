import React, {useEffect, useState} from 'react';
import './Modal.css';

const Modal = (props) => {

        const [data, setData] = useState({});
        const [loading, setLoading] = useState(true);

        useEffect(() => {
                fetch("https://rickandmortyapi.com/api/character/" + props.id)
                    .then((res) => res.json())
                    .then((res) => {
                            console.log(res);
                            setData(res)
                            setLoading(false);
                    })
        },[]);

        if (loading) return <p style={{color: 'white'}}>Loading...</p>

        return (
            <div className={'modal-container'}>
                <img src={data.image} alt="Char Image" className={'image'}/>
                <label htmlFor="" className={'label'}>Name</label>
                <input type="text" disabled value={data.name} className={'input'}/>
                <label htmlFor="" className={'label'}>Status</label>
                <input type="text" disabled value={data.status} className={'input'}/>
                <label htmlFor="" className={'label'}>Species</label>
                <input type="text" disabled value={data.species} className={'input'}/>
                <label htmlFor="" className={'label'}>Type</label>
                <input type="text" disabled value={data.type} className={'input'}/>
                <label htmlFor="" className={'label'}>Gender</label>
                <input type="text" disabled value={data.gender} className={'input'}/>
                <label htmlFor="" className={'label'}>Origin</label>
                <input type="text" disabled value={data.origin.name} className={'input'}/>
                <label htmlFor="" className={'label'}>Location</label>
                <input type="text" disabled value={data.location.name} className={'input'}/>
            </div>
    );
}

export default Modal;