import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery'
import './style.scss'

const MrjudoBook = () => {
    useEffect(()=>{
        console.log('mrjudobook useeffect')
        const reds = $(".red");
        let delay = "0ms";
        for (let i = 1; i <= reds.length; i++) {
          delay = 100 + 100 * (i - 1) + "ms";
          reds.eq(i - 1).css({ animation: "mrjudobook 1s " + delay + " infinite" });
        }
      
        const tiles = $(".tile").not('.red');
        let tilesDelay = "0ms";
        for (let j = 1; j <= tiles.length; j++) {
          tilesDelay = 3000 + 200 * (j - 1) + "ms";
          tiles
            .eq(j - 1)
            .css({ animation: "rotateTiles 4s " + tilesDelay + " infinite" });
        }
     
    })
    return (
        <div className='wrapper'>
        <div className='mrjudobook'>
            <div className='tile red'>m</div>
            <div className='tile'>r</div>
            <div className='tile'>j</div>
            <div className='tile'>u</div>
            <div className='tile'>d</div>
            <div className='tile'>o</div>
            <div className='tile'>b</div>
            <div className='tile'>o</div>
            <div className='tile'>o</div>
            <div className='tile'>k</div>
        </div>
            
        </div>
    );
};


MrjudoBook.propTypes = {
    
};


export default MrjudoBook;
