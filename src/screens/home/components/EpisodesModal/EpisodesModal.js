import React, {useEffect, useMemo, useState} from 'react';
import './EpisodesModal.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faList} from "@fortawesome/free-solid-svg-icons";

const EpisodesModal = (props) => {

        const [episodes, setEpisodes] = useState([]);
        const [loading, setLoading] = useState(true);

        useMemo(() => {
                fetch("https://rickandmortyapi.com/api/character/" + props.id)
                    .then((res) => res.json())
                    .then(res => {
                        console.log(res)
                        res.episode.map(ep => {
                            getEpisode(ep);
                        })
                        setLoading(false);
                    })
        },[]);

        //Width handler
        const [width, setWidth] = useState(window.innerWidth);

        useEffect(() => {
            const handleResize = () => {
                setWidth(window.innerWidth);
            }
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, [width])

            const getEpisode = (ep) => {
                fetch(ep)
                    .then((response) => response.json())
                    .then((resp) => {
                        setEpisodes(episodes => {
                            return episodes.concat( {
                                id: resp.id,
                                name: resp.name,
                                airDate: resp.air_date,
                            })
                        })
                    })
            }

            if (loading) return <p style={{color: 'white'}}>Loading...</p>

            return (
                <div className={'ep-modal-container'}>
                    <div style={
                        {display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                        <label htmlFor="" className={'ep-label'}>Episodes</label>
                        {/* Show a cross button when in mobile*/}
                        {width < 1024 && <a className='close-modal' onClick={() => props.closeModal()}>X</a>}
                    </div>
                    <table className='ep-table' cellSpacing={0}>
                        <thead>
                            <tr className='ep-header-row'>
                                <th className='ep-header-index'>Code</th>
                                <th className='ep-header'>Name</th>
                                <th className='ep-header'>Air Date</th>
                            </tr>
                            <tr><td colSpan={6}><hr/></td></tr>
                        </thead>
                        <tbody>
                        {
                            episodes.sort((a,b) => a.id - b.id).map((row,i) => {
                                return (
                                    <tr className={i % 2 === 0 ? 'even-row' : 'odd-row'}>
                                        <td>{row.id}</td>
                                        <td>{row.name}</td>
                                        <td>{row.airDate}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
        );
}

export default EpisodesModal;