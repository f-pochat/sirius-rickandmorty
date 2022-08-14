import React, {useEffect, useState} from 'react';
import './Table.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faEye} from "@fortawesome/free-solid-svg-icons";
import rickandmorty from '../../../../assets/rickandmorty.png';

const Table = (props) => {
    const data = props.data;

    // Get width even when resizing
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [width])

    //Shows episodes and info modals
    const showModal = (id) => {
        props.showModal(id);
    }

    const showEpisodesModal = (id) => {
        props.showEpisodesModal(id);
    }

    //Spinner
    if (props.loading) {
        return (
            <div className="table-container">
                <div className="sk-folding-cube">
                    <div className="sk-cube1 sk-cube"/>
                    <div className="sk-cube2 sk-cube"/>
                    <div className="sk-cube4 sk-cube"/>
                    <div className="sk-cube3 sk-cube"/>
                </div>
            </div>
        )
        //No characters found
    }else if (!data) return (
        <div className="table-container">
            <img src={rickandmorty} alt="Error image" className='error-image'/>
            <h3 className='error-msg'>Oops! No characters were found</h3>
        </div>
    )

    //Tabe
    return (
        <div className='table-container'>
            {
                <table className='table' cellSpacing={0}>
                    {
                        // Desktop
                        width > 1024 ?
                            <>
                                <thead className='thead'>
                                    <tr className='header-row'>
                                        <th>Name</th>
                                        <th>Status</th>
                                        <th>Specie</th>
                                        <th>Gender</th>
                                        <th className='link-header'>Episodes</th>
                                        <th className='link-header'>Detail</th>
                                    </tr>
                                    <tr><td colSpan={6}><hr/></td></tr>
                                </thead>
                                <tbody>

                                {
                                    data.map((row,i) => {
                                        return(
                                            <tr className={i % 2 === 0 ? 'even-row' : 'odd-row'}>
                                                <td>{row.name}</td>
                                                <td>{row.status}</td>
                                                <td>{row.species}</td>
                                                <td>{row.gender}</td>
                                                <td className='link-data'>
                                                    <a onClick={() => showEpisodesModal(row.id)}>
                                                        <FontAwesomeIcon icon={faList}/>
                                                    </a>
                                                </td>
                                                <td className='link-data'>
                                                    <a onClick={() => showModal(row.id)}>
                                                        <FontAwesomeIcon icon={faEye}/>
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </>
                            //Mobile - Only three columns (name, epsiodes and detail) because the other are already
                            // shown in detail
                        :
                            <>
                                <thead className='thead'>
                                    <tr className='header-row'>
                                        <th>Name</th>
                                        <th className='link-header'>Episodes</th>
                                        <th className='link-header'>Detail</th>
                                    </tr>
                                    <tr><td colSpan={6}><hr/></td></tr>
                                </thead>
                                <tbody>
                                {
                                    data.map((row,i) => {
                                        return(
                                            <tr className={i % 2 === 0 ? 'even-row' : 'odd-row'}>
                                                <td>{row.name}</td>
                                                <td className='link-data'>
                                                    <a onClick={() => showEpisodesModal(row.id)}>
                                                        <FontAwesomeIcon icon={faList}/>
                                                    </a>
                                                </td>
                                                <td className='link-data'>
                                                    <a onClick={() => showModal(row.id)}>
                                                        <FontAwesomeIcon icon={faEye}/>
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </>
                    }
                </table>
            }
        </div>
    );
}

export default Table;