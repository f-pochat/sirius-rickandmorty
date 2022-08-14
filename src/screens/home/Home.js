import React, {useEffect, useState} from 'react';
import logo from '../../assets/sirius_logo.png'
import './Home.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import Table from "./components/Table/Table";
import Popup from 'react-animated-popup'
import InfoModal from "./components/InfoModal/InfoModal";
import EpisodesModal from "./components/EpisodesModal/EpisodesModal";

const Home = (props) => {

    // State
    const [charId, setId] = useState(0);
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [actualPage, setActualPage] = useState(1);
    const [visible, setVisible] = useState(false);
    const [episodesVisible, setEpisodesVisible] = useState(false);
    const [nameFilter, setNameFilter] = useState('');
    const [pages, setPages] = useState(42);

    //Requests
    useEffect(() => {
        setLoading(true);
        fetch("https://rickandmortyapi.com/api/character/?page=" + actualPage + "&name=" + nameFilter)
            .then((res) => res.json())
            .then((res) => {
                try {
                    setPages(res.info.pages);
                    setData(res.results)
                    setLoading(false)
                }catch (e) {
                    setPages(0);
                    setData(undefined);
                    setLoading(false)
                }
            })
    },[actualPage])

    const filterTable = (val) => {
        setNameFilter(val);
        setLoading(true);
        fetch("https://rickandmortyapi.com/api/character/?name=" + val)
            .then((res) => res.json())
            .then((res) => {
                try {
                    setPages(res.info.pages);
                    setData(res.results)
                    setLoading(false)
                }catch (e) {
                    setPages(0);
                    setData(undefined);
                    setLoading(false)
                }
            })
    }

    return (
        <div className={'container'}>
            {/* Pop Up used when the links are clicked, a div is added to create a darker backgorund */}
            {(visible || episodesVisible) && <div className="dim-screen"/>}
            <Popup visible={visible} onClose={() => setVisible(false)} style={{borderRadius:'0px', background: '#00222D'}}>
                <InfoModal id={charId} closeModal={() => setVisible(false)}/>
            </Popup>
            <Popup visible={episodesVisible} onClose={() => setEpisodesVisible(false)} style={{borderRadius:'0px', background: '#00222D', maxWidth: '90%', padding: '10px'}}>
                <EpisodesModal id={charId} closeModal={() => setEpisodesVisible(false)}/>
            </Popup>

            {/* Header contains the title and the Sirius logo */}
            <div className='header'>
                <div/>
                <h2 className='title-text'>Rick and Morty characters</h2>
                <img className='logo' src={logo} alt="Sirius Logo"/>
            </div>

            {/* Includes the table and the searchbar */}
            <div className='main-container'>
                <div className='searchbar-container'>
                    <FontAwesomeIcon className='search-icon' icon={faSearch} size='2x' color='#00EBDD'/>
                    <input type="text" className='search-input' placeholder='Search character...' onChange={ev => filterTable(ev.target.value)}/>
                </div>
                <Table data={data} loading={loading}
                       showModal = {id => {
                            setId(id);
                            setVisible(true)}}
                       showEpisodesModal = {id => {
                           setId(id);
                           setEpisodesVisible(true)}}
                />
            </div>

            {/* Used for the page indicators*/}
            <div className='footer'>
                <div className='page-count'>
                    <a className={actualPage === 1 && 'disabled-a'}  onClick={() => {
                        if (actualPage >= 1) setActualPage(actualPage - 1)
                    }}>«</a>
                    {
                        [actualPage - 2, actualPage - 1, actualPage, actualPage + 1, actualPage + 2, actualPage + 3].map(num => {
                            if (num > 0 && num <= pages){
                                return(
                                    <a className={actualPage === num ? 'selected-page' : 'not-selected-page'} onClick={() => {setActualPage(num)}}>{num}</a>
                                )
                            }
                        })
                    }
                    <a className={actualPage === pages && 'disabled-a'}  onClick={() => {
                        if (actualPage <= pages) setActualPage(actualPage + 1)
                    }}>»</a>
                </div>
            </div>
        </div>
    );
}

export default Home;