import React from 'react';
import { SAFETY_FEATURES, ADAS_FEATURES_LEVEL1, ADAS_FEATURES_LEVEL2 } from '../../utils/constants';

const Step3_Safety = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      {/* Section C Header */}
      <div className="border-2 border-gray-800 p-4 text-center">
        <h2 className="text-xl font-bold text-gray-900">
          Section C : Safety Features
        </h2>
      </div>

      {/* Show Card Instruction */}
      <div className="bg-blue-600 text-white p-3 text-center font-semibold">
        SHOW CARD AND ASK BELOW QUESTIONS
      </div>

      {/* Q7c Category Reference (First - Above main table) */}
      <div className="bg-white p-4">
        <p className="text-sm text-gray-800 mb-4">
          Q7c. Now we have to bucket these features into three categories ...{' '}
          <span className="font-bold">MOST IMPORTANT / GOOD TO HAVE BUT NOT THAT IMPORTANT</span> and{' '}
          <span className="font-bold">NOT IMPORTANT AND ARE EASILY COMPROMISED BY CUSTOMERS</span>{' '}
          <span className="text-blue-600 font-semibold">SINGLE CODE</span>
        </p>
        <p className="text-sm text-gray-800 mb-3">If you feel the particular feature is ...</p>

        {/* Category Reference Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400 text-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="border border-gray-400 px-4 py-2 text-left font-semibold">RESPONSE</th>
                <th className="border border-gray-400 px-4 py-2 text-center font-semibold w-24">Code</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-400 px-4 py-2 font-semibold">MOST IMPORTANT</td>
                <td className="border border-gray-400 px-4 py-2 text-center">1</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-400 px-4 py-2 font-semibold">GOOD TO HAVE BUT NOT THAT IMPORTANT</td>
                <td className="border border-gray-400 px-4 py-2 text-center">2</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-400 px-4 py-2 font-semibold">NOT IMPORTANT AND ARE EASILY COMPROMISED BY CUSTOMERS</td>
                <td className="border border-gray-400 px-4 py-2 text-center">3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Main Safety Features Table - 26 Features */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400 text-xs">
          <thead className="bg-gray-200">
            <tr>
              <th rowSpan="2" className="border border-gray-400 px-2 py-2 text-center font-semibold w-12">S.No</th>
              <th rowSpan="2" className="border border-gray-400 px-3 py-2 text-left font-semibold">Feature Description</th>
              <th className="border border-gray-400 px-2 py-2 text-center font-semibold">
                Q7a.<br />
                Please look at the below table and tell me which of the Safety related features are <span className="font-bold">available and provided</span> by the OEM (Factory Fitted / Dealer Fitted)<br />
                <span className="text-blue-600 font-semibold">MULTIPLE CODE POSSIBLE</span>
              </th>
              <th className="border border-gray-400 px-2 py-2 text-center font-semibold">
                Q7b.<br />
                Please look at the below table and tell me which of the Safety related features are <span className="font-bold">MOST PREFERRED</span> by customers according to your experience (All Features as per model / variant)<br />
                <span className="text-blue-600 font-semibold">MULTIPLE CODE POSSIBLE</span>
              </th>
              <th className="border border-gray-400 px-2 py-2 text-center font-semibold">
                Q7c.<br />
                1= MOST IMPORTANT<br />
                2= GOOD TO HAVE BUT NOT THAT IMPORTANT<br />
                3 =NOT IMPORTANT AND ARE EASILY COMPROMISED BY CUSTOMERS<br />
                <span className="text-blue-600 font-semibold">INPUT 1,2 OR 3</span>
              </th>
              <th className="border border-gray-400 px-2 py-2 text-center font-semibold">
                Q7d.<br />
                Please look at the below table and tell me which of the Safety related features are <span className="font-bold">ALSO AVAILABLE AFTERMARKET IN AUTOCARE SHOPS</span> according to your experience (All Features as per model / variant)<br />
                <span className="text-blue-600 font-semibold">SINGLE CODE</span>
              </th>
              <th className="border border-gray-400 px-2 py-2 text-center font-semibold">
                Q7e.<br />
                For all features that you feel are <span className="font-bold">ALSO AVAILABLE AFTERMARKET IN AUTOCARE SHOPS</span>, what is the average price according to your experience (All Features as per model / variant)<br />
                <span className="text-blue-600 font-semibold">INPUT AVERAGE PRICE IN INR PER PIECE, INCLUDING INSTALLATION</span>
              </th>
            </tr>
            <tr>
              <th className="border border-gray-400 px-2 py-1 text-center text-xs">Yes – 1  No --- 2</th>
              <th className="border border-gray-400 px-2 py-1 text-center text-xs"></th>
              <th className="border border-gray-400 px-2 py-1 text-center text-xs"></th>
              <th className="border border-gray-400 px-2 py-1 text-center text-xs">Yes – 1  No --- 2</th>
              <th className="border border-gray-400 px-2 py-1 text-center text-xs"></th>
            </tr>
          </thead>
          <tbody>
            {SAFETY_FEATURES.map((feature, index) => (
              <tr key={feature.id} className="hover:bg-gray-50">
                {/* S.No */}
                <td className="border border-gray-400 px-2 py-2 text-center">{feature.id}</td>
                
                {/* Feature Description */}
                <td className="border border-gray-400 px-3 py-2">{feature.name}</td>
                
                {/* Q7a - Available (Yes/No Radio) - REQUIRED */}
                <td className="border border-gray-400 px-2 py-2 text-center">
                  <div className="flex justify-center gap-3">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        value="1"
                        {...register(`Q7a_Available_${feature.id}`, { required: true })}
                        className="w-3 h-3 text-blue-600"
                      />
                      <span className="text-xs">Yes</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        value="2"
                        {...register(`Q7a_Available_${feature.id}`, { required: true })}
                        className="w-3 h-3 text-blue-600"
                      />
                      <span className="text-xs">No</span>
                    </label>
                  </div>
                  {errors[`Q7a_Available_${feature.id}`] && <span className="text-red-500 text-[10px]">Required</span>}
                </td>
                
                {/* Q7b - Most Preferred (Checkbox) */}
                <td className="border border-gray-400 px-2 py-2 text-center">
                  <input
                    type="checkbox"
                    value={feature.id}
                    {...register('Q7b_MostPreferred')}
                    className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                
                {/* Q7c - Importance (1, 2, or 3) - REQUIRED */}
                <td className="border border-gray-400 px-2 py-2 text-center">
                  <div className="flex justify-center gap-2">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        value="1"
                        {...register(`Q7c_Importance_${feature.id}`, { required: true })}
                        className="w-3 h-3 text-blue-600"
                      />
                      <span className="text-xs">1</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        value="2"
                        {...register(`Q7c_Importance_${feature.id}`, { required: true })}
                        className="w-3 h-3 text-blue-600"
                      />
                      <span className="text-xs">2</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        value="3"
                        {...register(`Q7c_Importance_${feature.id}`, { required: true })}
                        className="w-3 h-3 text-blue-600"
                      />
                      <span className="text-xs">3</span>
                    </label>
                  </div>
                  {errors[`Q7c_Importance_${feature.id}`] && <span className="text-red-500 text-[10px]">Required</span>}
                </td>
                
                {/* Q7d - Aftermarket Available (Yes/No Radio) - REQUIRED */}
                <td className="border border-gray-400 px-2 py-2 text-center">
                  <div className="flex justify-center gap-3">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        value="1"
                        {...register(`Q7d_Aftermarket_${feature.id}`, { required: true })}
                        className="w-3 h-3 text-blue-600"
                      />
                      <span className="text-xs">Yes</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        value="2"
                        {...register(`Q7d_Aftermarket_${feature.id}`, { required: true })}
                        className="w-3 h-3 text-blue-600"
                      />
                      <span className="text-xs">No</span>
                    </label>
                  </div>
                  {errors[`Q7d_Aftermarket_${feature.id}`] && <span className="text-red-500 text-[10px]">Required</span>}
                </td>
                
                {/* Q7e - Aftermarket Price */}
                <td className="border border-gray-400 px-2 py-2">
                  <input
                    type="text"
                    {...register(`Q7e_Price_${feature.id}`)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
                    placeholder="₹"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Q7f - ADAS Features */}
      <div className="bg-white p-4 mt-6">
        <h3 className="text-sm font-bold text-gray-800 mb-4">
          Q7f. From all the <span className="font-bold">ADAS features</span> mentioned below, which according to your experience are most Preferred & Used by customers{' '}
          <span className="text-blue-600 font-semibold">MULTIPLE CODE POSSIBLE</span>
        </h3>

        {/* ADAS Level 1 */}
        <div className="mb-4 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400 text-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="border border-gray-400 px-4 py-2 text-left font-semibold">ADAS FEATURES – LEVEL 1</th>
                <th className="border border-gray-400 px-4 py-2 text-center font-semibold w-32">Code Yes – 1 No --2</th>
              </tr>
            </thead>
            <tbody>
              {ADAS_FEATURES_LEVEL1.map((feature) => (
                <tr key={`level1_${feature.id}`} className="hover:bg-gray-50">
                  <td className="border border-gray-400 px-4 py-2">{feature.name}</td>
                  <td className="border border-gray-400 px-4 py-2 text-center">
                    <div className="flex justify-center gap-3">
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          value="1"
                          {...register(`${feature.code}`, { required: true })}
                          className="w-3 h-3 text-blue-600"
                        />
                        <span className="text-xs">Yes</span>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          value="2"
                          {...register(`${feature.code}`, { required: true })}
                          className="w-3 h-3 text-blue-600"
                        />
                        <span className="text-xs">No</span>
                      </label>
                    </div>
                    {errors[feature.code] && <span className="text-red-500 text-[10px]">Required</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ADAS Level 2 */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400 text-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="border border-gray-400 px-4 py-2 text-left font-semibold">ADAS FEATURES – LEVEL 2</th>
                <th className="border border-gray-400 px-4 py-2 text-center font-semibold w-32">Code Yes – 1 No --2</th>
              </tr>
            </thead>
            <tbody>
              {ADAS_FEATURES_LEVEL2.map((feature) => (
                <tr key={`level2_${feature.id}`} className="hover:bg-gray-50">
                  <td className="border border-gray-400 px-4 py-2">{feature.name}</td>
                  <td className="border border-gray-400 px-4 py-2 text-center">
                    <div className="flex justify-center gap-3">
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          value="1"
                          {...register(`${feature.code}`, { required: true })}
                          className="w-3 h-3 text-blue-600"
                        />
                        <span className="text-xs">Yes</span>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          value="2"
                          {...register(`${feature.code}`, { required: true })}
                          className="w-3 h-3 text-blue-600"
                        />
                        <span className="text-xs">No</span>
                      </label>
                    </div>
                    {errors[feature.code] && <span className="text-red-500 text-[10px]">Required</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Step3_Safety;
