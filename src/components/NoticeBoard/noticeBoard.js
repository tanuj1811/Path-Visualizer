import React from 'react'
import './noticeBoard.scss'

const NoticeBoard = () => {
  return (
    <div className='console'>
        <h4>Please Note</h4>
        <ol>
            <li>Please wait till animations is working, any actions b/w animation may leads to serious crashes</li>
            <li> if you find bugs or anything unusual. Post it on github issues section. </li>
            <li> This project is open-source. So, if you know more pathfinding algo's or board pattern contribute it on github. </li>
        </ol>
        <p className='thank'>Thank You</p>
    </div>
  )
}

export default NoticeBoard