import React from 'react';
import './Table.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faEye} from "@fortawesome/free-solid-svg-icons";
import rickandmorty from '../../../assets/rickandmorty.png';

const Table = (props) => {
    const data = props.data;

    const showModal = (id) => {
        props.showModal(id);
    }

    if (!data) return (
        <div className="table-container">
            <img src={rickandmorty} alt="Error image" className='error-image'/>
            <h3 className='error-msg'>Oops no character was found!</h3>
        </div>
    )

    return (
        <div className='table-container'>
            {
                props.loading ?
                    <div className="sk-folding-cube">
                        <div className="sk-cube1 sk-cube"/>
                        <div className="sk-cube2 sk-cube"/>
                        <div className="sk-cube4 sk-cube"/>
                        <div className="sk-cube3 sk-cube"/>
                    </div>
                    :

                    <table className='table' cellSpacing={0}>
                        <thead>
                        <tr className='header-row'>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Specie</th>
                            <th>Gender</th>
                            <th>Episodes</th>
                            <th>Detail</th>
                        </tr>
                        </thead>
                        <hr className='hr-line'/>
                        <tbody>
                        {
                            data.map((row,i) => {
                                return(
                                    <tr className={i % 2 === 0 ? 'even-row' : 'odd-row'}>
                                        <td>{row.name}</td>
                                        <td>{row.status}</td>
                                        <td>{row.species}</td>
                                        <td>{row.gender}</td>
                                        <td>
                                            <a>
                                                <FontAwesomeIcon icon={faList}/>
                                            </a>
                                        </td>
                                        <td>
                                            <a onClick={() => showModal(row.id)}>
                                                <FontAwesomeIcon icon={faEye}/>
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>

            }
        </div>
    );
}

export default Table;