import React, {useEffect, useState} from 'react';
import logo from '../../assets/sirius_logo.png'
import './Home.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import Table from "./components/Table";
import Popup from 'react-animated-popup'
import Modal from "./components/Modal";

const Home = (props) => {

    const [charId, setId] = useState(0);
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [actualPage, setActualPage] = useState(1);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch("https://rickandmortyapi.com/api/character/?page=" + actualPage)
            .then((res) => res.json())
            .then((res) => {
                setData(res.results)
                setLoading(false);
            })
    },[actualPage])

    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/character/?page=" + actualPage)
            .then((res) => res.json())
            .then((res) => {
                setData(res.results)
                setLoading(false)
            })
    },[])

    const filterTable = (val) => {
        setLoading(true);
        fetch("https://rickandmortyapi.com/api/character/?name=" + val)
            .then((res) => res.json())
            .then((res) => {
                setData(res.results)
                setLoading(false)
            })
    }

    return (
        <div className={'container'}>
            {visible && <div className="dim-screen"/>}
            <Popup visible={visible} onClose={() => setVisible(false)} style={{borderRadius:'0px', background: '#00222D'}}>
                <Modal id={charId}/>
            </Popup>
            <div className='header'>
                <div/>
                <h2 className='title-text'>Rick and Morty characters</h2>
                <img className='logo' src={logo} alt="Sirius Logo"/>
            </div>
            <div className='main-container'>
                <div className='searchbar-container'>
                    <FontAwesomeIcon className='search-icon' icon={faSearch} size='2x' color='#00EBDD'/>
                    <input type="text" className='search-input' placeholder='Search character...' onChange={ev => filterTable(ev.target.value)}/>
                </div>
                <Table data={data} loading={loading} showModal = {id => {
                    console.log(id);
                    setId(id);
                    setVisible(true)
                }}/>
            </div>
            <div className='footer'>
                <div className='page-count'>
                    <a className={actualPage === 1 && 'disabled-a'}  onClick={() => {
                        if (actualPage >= 1) setActualPage(actualPage - 1)
                    }}>«</a>
                    {
                        [actualPage - 2, actualPage - 1, actualPage, actualPage + 1, actualPage + 2, actualPage + 3].map(num => {
                            if (num > 0 && num < 43){
                                return(
                                    <a className={actualPage === num ? 'selected-page' : 'not-selected-page'} onClick={() => {setActualPage(num)}}>{num}</a>
                                )
                            }
                        })
                    }
                    <a className={actualPage === 42 && 'disabled-a'}  onClick={() => {
                        if (actualPage <= 42) setActualPage(actualPage + 1)
                    }}>»</a>
                </div>
            </div>
        </div>
    );
}

export default Home;