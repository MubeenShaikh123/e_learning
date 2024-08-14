import React from 'react'

const contents = ({course}) => {
    return (
        <ul>
            {course.modules.map((module) => (
                <li key={module._id} className='p-2 border-b list-disc'>{module.title} : {module.description}</li>
            ))}
            <li className='p-2 border-b list-disc'>...</li>
        </ul>
    )
}

export default contents
