import React from 'react'

const Contents = ({ course }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
        Course Curriculum
      </h2>
      <div className="space-y-6">
        {course.modules.map((module, index) => (
          <div key={module._id} className="backdrop-blur-xl bg-white/60 border border-white/50 shadow-lg rounded-3xl p-8 transition-all duration-500 hover:scale-[1.01] hover:shadow-xl hover:bg-white/70">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Module {index + 1}: {module.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{module.description}</p>
              </div>
              <div className="flex-shrink-0">
                <span className="px-4 py-2 bg-blue-500/20 backdrop-blur-sm text-blue-700 rounded-full text-sm font-semibold border border-blue-500/30">
                  {module.duration} mins
                </span>
              </div>
            </div>
            <div className="mt-6 pl-6 border-l-4 border-gradient-to-b from-blue-500 to-cyan-500 rounded-l">
              <div className="border-l-4 border-blue-500 pl-4">
                {module.content.map((item, idx) => (
                  <div key={idx} className="flex items-center py-3 transition-all duration-200 hover:translate-x-1">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Contents