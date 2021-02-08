import React,{ useState } from 'react'
import * as FaIcons from 'react-icons/fa';
import './List.css';

function List({items, removeTask, editTask}) {
    return (
        <div className='task-list'>
            {items.map((item) => {
                const {id, title} =item;
                return <article key={id} className='task-item'>
                    <p clasName='title'>{title}</p>
                    <div className='btn-container'>
                        <button className='edit-btn' onClick={()=> editTask(id)}>
                            <FaIcons.FaEdit/>
                        </button>
                        <button className='delete-btn' onClick={() => removeTask(id)}>
                            <FaIcons.FaTrash/>
                        </button>
                    </div>
                </article>
            })}
        </div>
    )
}

export default List
