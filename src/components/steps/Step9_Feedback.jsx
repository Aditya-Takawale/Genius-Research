import React from 'react';

const Step9_Feedback = ({ register, errors }) => {
  return (
    <div className="bg-white p-6">
      {/* Q13 Continuation - Second Part (from page 12) */}
      <div className="border-2 border-gray-400 p-4 bg-gray-50 mb-8">
        <div className="mb-4">
          <p className="text-sm text-blue-700 font-semibold">
            Q13. According to customer demands & your experience, which features are missing in this particular model?
            <br />
            (Keep Open end box to write)
          </p>
        </div>

        {/* 10 Input Fields in 2 Columns */}
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <div key={num} className="flex items-center gap-2">
              <label className="text-sm font-medium w-8">{num}.</label>
              <input
                type="text"
                {...register(`Q13_Missing_${num}`)}
                className="flex-1 px-3 py-2 border-2 border-gray-400 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder=""
              />
            </div>
          ))}
        </div>
      </div>

      {/* Q14: Final Open-ended Question */}
      <div className="border-2 border-gray-400 p-4 bg-gray-50 mb-8">
        <div className="mb-4">
          <p className="text-sm text-blue-700 font-semibold">
            Q14. Apart from all the features mentioned above in the lists ... are there any other features that are{' '}
            <span className="font-semibold">preferred / desired / demanded</span> by end customers which are{' '}
            <span className="font-semibold">not listed above?</span>
            <br />
            (Keep Open end box to write)
          </p>
        </div>

        {/* 10 Input Fields in 2 Columns */}
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <div key={num} className="flex items-center gap-2">
              <label className="text-sm font-medium w-8">{num}.</label>
              <input
                type="text"
                {...register(`Q14_Other_${num}`)}
                className="flex-1 px-3 py-2 border-2 border-gray-400 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder=""
              />
            </div>
          ))}
        </div>
      </div>

      {/* THANK & CLOSE */}
      <div className="mt-12 text-center">
        <div className="inline-block border-4 border-blue-600 bg-blue-50 px-12 py-6 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-700">THANK & CLOSE</h2>
        </div>
      </div>

      {/* Optional Completion Message */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 italic">
          Thank you for completing the survey. Your responses have been recorded.
        </p>
      </div>
    </div>
  );
};

export default Step9_Feedback;
