import React from 'react';
import { CONNECTIVITY_FEATURES } from '../../utils/constants';

const Step7_Connectivity = ({ register, errors }) => {
  return (
    <div className="bg-white p-6">
      {/* Section G Header */}
      <div className="border-2 border-gray-800 bg-gray-100 p-3 mb-4">
        <h2 className="text-center font-bold text-lg">Section G : Connectivity Features</h2>
      </div>

      {/* Show Card Instruction */}
      <div className="bg-blue-100 border border-blue-300 p-3 mb-4 rounded">
        <p className="font-semibold text-center">SHOW CARD AND ASK BELOW QUESTIONS</p>
      </div>

      {/* Question Text Q11a */}
      <div className="mb-4">
        <p className="text-sm">
          <span className="font-semibold">Q11a.</span> Please look at the below table and tell me which of the Connectivity related features are{' '}
          <span className="font-semibold">available and provided</span> by the OEM (Factory Fitted / Dealer Fitted){' '}
          <span className="text-blue-600 font-semibold">MULTIPLE CODE POSSIBLE</span>
        </p>
      </div>

      {/* Question Text Q11b */}
      <div className="mb-4">
        <p className="text-sm">
          <span className="font-semibold">Q11b.</span> Please look at the below table and tell me which of the Connectivity related features are{' '}
          <span className="font-semibold">MOST PREFERRED</span> by customers according to your experience (All Features as per model / variant){' '}
          <span className="text-blue-600 font-semibold">MULTIPLE CODE POSSIBLE</span>
        </p>
      </div>

      {/* Question Text Q11c */}
      <div className="mb-4">
        <p className="text-sm">
          <span className="font-semibold">Q11c.</span> Now we have to bucket these features into three categories ...{' '}
          <span className="font-semibold">MOST IMPORTANT / GOOD TO HAVE BUT NOT THAT IMPORTANT</span> and{' '}
          <span className="font-semibold">NOT IMPORTANT AND ARE EASILY COMPROMISED BY CUSTOMERS</span>{' '}
          <span className="text-blue-600 font-semibold">SINGLE CODE</span>
          <br />
          If you feel the particular feature is …
        </p>
      </div>

      {/* Q11c Category Reference Table */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border-2 border-gray-400 text-xs">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 px-3 py-2 text-left font-semibold">RESPONSE</th>
              <th className="border border-gray-400 px-3 py-2 text-center font-semibold w-20">Code</th>
              <th className="border border-gray-400 px-3 py-2 text-center font-semibold w-16"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-400 px-3 py-2 font-semibold">MOST IMPORTANT</td>
              <td className="border border-gray-400 px-3 py-2 text-center">1</td>
              <td className="border border-gray-400 px-3 py-2 text-center">
                <input
                  type="radio"
                  value="1"
                  {...register('Q11c_Category')}
                  className="w-4 h-4"
                />
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-400 px-3 py-2 font-semibold">GOOD TO HAVE BUT NOT THAT IMPORTANT</td>
              <td className="border border-gray-400 px-3 py-2 text-center">2</td>
              <td className="border border-gray-400 px-3 py-2 text-center">
                <input
                  type="radio"
                  value="2"
                  {...register('Q11c_Category')}
                  className="w-4 h-4"
                />
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-400 px-3 py-2 font-semibold">NOT IMPORTANT AND ARE EASILY COMPROMISED BY CUSTOMERS</td>
              <td className="border border-gray-400 px-3 py-2 text-center">3</td>
              <td className="border border-gray-400 px-3 py-2 text-center">
                <input
                  type="radio"
                  value="3"
                  {...register('Q11c_Category')}
                  className="w-4 h-4"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Question Text Q11d */}
      <div className="mb-4">
        <p className="text-sm">
          <span className="font-semibold">Q11d.</span> Please look at the below table and tell me which of the Connectivity related features are{' '}
          <span className="font-semibold">ALSO AVAILABLE AFTERMARKET IN AUTOCARE SHOPS</span> according to your experience (All Features as per model / variant){' '}
          <span className="text-blue-600 font-semibold">SINGLE CODE</span>
        </p>
      </div>

      {/* Question Text Q11e */}
      <div className="mb-4">
        <p className="text-sm">
          <span className="font-semibold">Q11e.</span> For all features that you feel are{' '}
          <span className="font-semibold">ALSO AVAILABLE AFTERMARKET IN AUTOCARE SHOPS</span>, what is the average price according to your experience (All Features as per model / variant){' '}
          <span className="text-blue-600 font-semibold">INPUT AVERAGE PRICE IN INR PER PRICE, INCLUDING INSTALLATION</span>
        </p>
      </div>

      {/* Main Feature Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-2 border-gray-400 text-xs">
          <thead className="bg-gray-200">
            <tr>
              <th rowSpan="2" className="border border-gray-400 px-2 py-2 text-center font-semibold w-12">S.No</th>
              <th rowSpan="2" className="border border-gray-400 px-3 py-2 text-left font-semibold min-w-[200px]">
                Feature Description
              </th>
              <th className="border border-gray-400 px-3 py-2 text-center font-semibold">
                Q11a.<br/>
                Please look at the below table and tell me which of the Connectivity related features are available and provided by the OEM (Factory Fitted / Dealer Fitted)
                <br/>
                <span className="text-blue-600">MULTIPLE CODE POSSIBLE</span>
              </th>
              <th className="border border-gray-400 px-3 py-2 text-center font-semibold">
                Q11b.<br/>
                Please look at the below table and tell me which of the Connectivity related features are MOST PREFERRED by customers according to your experience (All Features as per model / variant)
                <br/>
                <span className="text-blue-600">MULTIPLE CODE POSSIBLE</span>
              </th>
              <th className="border border-gray-400 px-3 py-2 text-center font-semibold">
                Q11c.<br/>
                = MOST IMPORTANT
                <br/><br/>
                = GOOD TO HAVE BUT NOT THAT IMPORTANT
                <br/><br/>
                = NOT IMPORTANT AND ARE EASILY COMPROMISED
                <br/>
                <span className="text-blue-600">INPUT 1,2 OR 3</span>
              </th>
              <th className="border border-gray-400 px-3 py-2 text-center font-semibold">
                Q11d.<br/>
                Please look at the below table and tell me which of the Connectivity related features are ALSO AVAILABLE AFTERMARKET IN AUTOCARE SHOPS according to your experience (All Features as per model / variant)
                <br/>
                <span className="text-blue-600">SINGLE CODE</span>
              </th>
              <th className="border border-gray-400 px-3 py-2 text-center font-semibold">
                Q11e.<br/>
                For all features that you feel are ALSO AVAILABLE AFTERMARKET IN AUTOCARE SHOPS, what is the average price according to your experience (All Features as per model / variant)
                <br/>
                <span className="text-blue-600">INPUT AVERAGE PRICE IN INR PER PRICE, INCLUDING INSTALLATION</span>
              </th>
            </tr>
            <tr>
              <th className="border border-gray-400 px-2 py-2 text-center font-semibold bg-gray-100">
                Yes = 1 No --- 2
              </th>
              <th className="border border-gray-400 px-2 py-2 text-center font-semibold bg-gray-100">
                <input
                  type="checkbox"
                  {...register('Q11b_MostPreferred')}
                  className="w-4 h-4"
                  disabled
                />
              </th>
              <th className="border border-gray-400 px-2 py-2 text-center font-semibold bg-gray-100">
                INPUT 1,2 OR 3
              </th>
              <th className="border border-gray-400 px-2 py-2 text-center font-semibold bg-gray-100">
                Yes = 1 No --- 2
              </th>
              <th className="border border-gray-400 px-2 py-2 text-center font-semibold bg-gray-100">
                ₹
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {CONNECTIVITY_FEATURES.map((feature) => (
              <tr key={feature.id} className="hover:bg-gray-50">
                {/* S.No */}
                <td className="border border-gray-400 px-2 py-2 text-center">{feature.id}</td>
                
                {/* Feature Description */}
                <td className="border border-gray-400 px-3 py-2">{feature.name}</td>
                
                {/* Q11a: Available (Yes=1, No=2) */}
                <td className="border border-gray-400 px-2 py-2 text-center">
                  <div className="flex justify-center gap-4">
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        value="1"
                        {...register(`Q11a_Available_${feature.id}`)}
                        className="w-4 h-4"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        value="2"
                        {...register(`Q11a_Available_${feature.id}`)}
                        className="w-4 h-4"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </td>
                
                {/* Q11b: Most Preferred (Checkbox) */}
                <td className="border border-gray-400 px-2 py-2 text-center">
                  <input
                    type="checkbox"
                    value={feature.id}
                    {...register('Q11b_MostPreferred')}
                    className="w-4 h-4"
                  />
                </td>
                
                {/* Q11c: Importance (1/2/3) */}
                <td className="border border-gray-400 px-2 py-2 text-center">
                  <div className="flex justify-center gap-2">
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        value="1"
                        {...register(`Q11c_Importance_${feature.id}`)}
                        className="w-4 h-4"
                      />
                      <span>1</span>
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        value="2"
                        {...register(`Q11c_Importance_${feature.id}`)}
                        className="w-4 h-4"
                      />
                      <span>2</span>
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        value="3"
                        {...register(`Q11c_Importance_${feature.id}`)}
                        className="w-4 h-4"
                      />
                      <span>3</span>
                    </label>
                  </div>
                </td>
                
                {/* Q11d: Aftermarket (Yes=1, No=2) */}
                <td className="border border-gray-400 px-2 py-2 text-center">
                  <div className="flex justify-center gap-4">
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        value="1"
                        {...register(`Q11d_Aftermarket_${feature.id}`)}
                        className="w-4 h-4"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        value="2"
                        {...register(`Q11d_Aftermarket_${feature.id}`)}
                        className="w-4 h-4"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </td>
                
                {/* Q11e: Price (Text Input) */}
                <td className="border border-gray-400 px-2 py-2">
                  <input
                    type="text"
                    {...register(`Q11e_Price_${feature.id}`)}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="₹"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Step7_Connectivity;
