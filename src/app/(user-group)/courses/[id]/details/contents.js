import React from 'react'

const Contents = ({ course }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Course Curriculum</h2>
      <div className="space-y-4">
        {course.modules.map((module, index) => (
          <div key={module._id} className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">
                  Module {index + 1}: {module.title}
                </h3>
                <p className="text-gray-600 mt-1">{module.description}</p>
              </div>
              <span className="text-gray-500">{module.duration} mins</span>
            </div>
            <div className="mt-4 pl-4 border-l-2 border-indigo-600">
              {module.content.map((item, idx) => (
                <div key={idx} className="flex items-center py-2">
                  <svg className="w-4 h-4 text-indigo-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Contents