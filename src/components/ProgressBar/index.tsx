import React, { useMemo } from 'react'

import './styles.css'


interface ProgressBarProps {
    progress: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    const currentProgress = useMemo(() => Math.min(progress, 100), [progress])

    return (
        <div className="ProgressBar">
            <div
                className="ProgressBar-progress"
                style={{ width: `${ currentProgress }%` }}
            >
            </div>
        </div>
    )
}

export default React.memo(ProgressBar)