import React from 'react'
import { IProgressBar } from '../types'
import "./Radial.scss"

const RadialProgressbar = ({value}: IProgressBar) => {
    const fillRef = React.useRef<SVGPathElement>(null);

    const max = -220;

    React.useEffect(()=> {
        fillRef!.current!.setAttribute('style', 'stroke-dashoffset: ' + ((100 - value) / 100) * max);
    },[value])

    return (
	<svg className="progress green noselect" x="0px" y="0px" viewBox="0 0 80 80">
		<path className="track" d="M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0" />
		<path className="fill" ref={fillRef} d="M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0" />
    <text className="value" x="50%" y="60%">{value}</text>
		
	</svg>
    )
}

export default RadialProgressbar
