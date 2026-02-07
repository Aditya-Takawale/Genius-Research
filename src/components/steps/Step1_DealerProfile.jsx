import React from 'react';
import { CITIES, OEM_CODES, MODEL_CODES } from '../../utils/constants';

export default function Step1_DealerProfile({ register, errors }) {
  return (
    <div className="space-y-6">
      {/* PDF Introduction Text */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="font-bold text-blue-900 mb-2">
          Greetings from Genius Research Services!!!
        </h3>
        <p className="text-sm text-blue-800 mb-2">
          Thank you for participating in this survey. We want to understand the customer preferences and feedback related to various types of vehicles. At the same time, we are also trying to understand how features are perceived by customers almost daily. We would like to understand your perception on the same and varying importance of features in overall buying journey. This should take about 30-40 minutes of your time and all responses will be kept completely confidential.
        </p>
      </div>

      {/* Q1A - City (Do not ask ... record City) */}
      <div className="bg-white p-4">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Q1A. Do not ask ... record City. <span className="text-red-500">*</span>
          <br />
          <span className="text-xs text-blue-600 italic">Scripting Note – Single Select - [Drop Down List]</span>
        </label>
        
        <div className="overflow-x-auto">
          <table className="w-full max-w-md border-collapse border border-gray-400">
            <thead className="bg-blue-100">
              <tr>
                <th className="border border-gray-400 px-4 py-2 text-left font-semibold">City Name</th>
                <th className="border border-gray-400 px-4 py-2 text-center font-semibold w-24">Code</th>
                <th className="border border-gray-400 px-4 py-2 text-center font-semibold w-16"></th>
              </tr>
            </thead>
            <tbody>
              {CITIES.map((city) => (
                <tr key={city.code} className="hover:bg-gray-50">
                  <td className="border border-gray-400 px-4 py-2 text-sm">{city.name}</td>
                  <td className="border border-gray-400 px-4 py-2 text-center font-medium">{city.code}</td>
                  <td className="border border-gray-400 px-4 py-2 text-center">
                    <input
                      type="radio"
                      value={city.code}
                      {...register('Q1A_City', { required: 'Please select a city' })}
                      className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {errors.Q1A_City && (
          <p className="mt-2 text-sm text-red-600">{errors.Q1A_City.message}</p>
        )}
      </div>

      {/* Q1B - OEM (Do not ask ... record OEM of the dealer being visited) */}
      <div className="bg-white p-4">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Q1B. Do not ask ... record OEM of the dealer being visited. <span className="text-red-500">*</span>
          <br />
          <span className="text-xs text-blue-600 italic">Scripting Note – Single Select - [Drop Down List]</span>
        </label>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400">
            <thead className="bg-blue-100">
              <tr>
                <th className="border border-gray-400 px-4 py-2 text-left font-semibold">DEALER OEM</th>
                <th className="border border-gray-400 px-4 py-2 text-center font-semibold w-20">Code</th>
                <th className="border border-gray-400 px-4 py-2 text-center font-semibold w-16"></th>
                <th className="border border-gray-400 px-4 py-2 text-left font-semibold">DEALER OEM</th>
                <th className="border border-gray-400 px-4 py-2 text-center font-semibold w-20">Code</th>
                <th className="border border-gray-400 px-4 py-2 text-center font-semibold w-16"></th>
              </tr>
            </thead>
            <tbody>
              {/* First 4 OEMs on left, remaining 3 on right */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-400 px-4 py-2 text-sm">{OEM_CODES[0].name}</td>
                <td className="border border-gray-400 px-4 py-2 text-center font-medium">{OEM_CODES[0].code}</td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  <input type="radio" value={OEM_CODES[0].code} {...register('Q1B_OEM', { required: 'Please select an OEM' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
                <td className="border border-gray-400 px-4 py-2 text-sm">{OEM_CODES[4].name}</td>
                <td className="border border-gray-400 px-4 py-2 text-center font-medium">{OEM_CODES[4].code}</td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  <input type="radio" value={OEM_CODES[4].code} {...register('Q1B_OEM', { required: 'Please select an OEM' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-400 px-4 py-2 text-sm">{OEM_CODES[1].name}</td>
                <td className="border border-gray-400 px-4 py-2 text-center font-medium">{OEM_CODES[1].code}</td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  <input type="radio" value={OEM_CODES[1].code} {...register('Q1B_OEM', { required: 'Please select an OEM' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
                <td className="border border-gray-400 px-4 py-2 text-sm">{OEM_CODES[5].name}</td>
                <td className="border border-gray-400 px-4 py-2 text-center font-medium">{OEM_CODES[5].code}</td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  <input type="radio" value={OEM_CODES[5].code} {...register('Q1B_OEM', { required: 'Please select an OEM' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-400 px-4 py-2 text-sm">{OEM_CODES[2].name}</td>
                <td className="border border-gray-400 px-4 py-2 text-center font-medium">{OEM_CODES[2].code}</td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  <input type="radio" value={OEM_CODES[2].code} {...register('Q1B_OEM', { required: 'Please select an OEM' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
                <td className="border border-gray-400 px-4 py-2 text-sm">{OEM_CODES[6].name}</td>
                <td className="border border-gray-400 px-4 py-2 text-center font-medium">{OEM_CODES[6].code}</td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  <input type="radio" value={OEM_CODES[6].code} {...register('Q1B_OEM', { required: 'Please select an OEM' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-400 px-4 py-2 text-sm">{OEM_CODES[3].name}</td>
                <td className="border border-gray-400 px-4 py-2 text-center font-medium">{OEM_CODES[3].code}</td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  <input type="radio" value={OEM_CODES[3].code} {...register('Q1B_OEM', { required: 'Please select an OEM' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
                <td className="border border-gray-400 px-4 py-2" colSpan="3"></td>
              </tr>
            </tbody>
          </table>
        </div>
        {errors.Q1B_OEM && (
          <p className="mt-2 text-sm text-red-600">{errors.Q1B_OEM.message}</p>
        )}
      </div>

      {/* Q1C - Model (Do not ask ... record MODEL of the dealer being visited) */}
      <div className="bg-white p-4">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Q1C. Do not ask ... record MODEL of the dealer being visited. <span className="text-red-500">*</span>
          <br />
          <span className="text-xs text-blue-600 italic">Scripting Note – Single Select [Drop Down List]</span>
        </label>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400">
            <thead className="bg-blue-100">
              <tr>
                <th className="border border-gray-400 px-4 py-2 text-left font-semibold">Model / Variant</th>
                <th className="border border-gray-400 px-4 py-2 text-center font-semibold w-32">Response Code</th>
                <th className="border border-gray-400 px-4 py-2 text-center font-semibold w-16"></th>
                <th className="border border-gray-400 px-4 py-2 text-left font-semibold">Model / Variant</th>
                <th className="border border-gray-400 px-4 py-2 text-center font-semibold w-32">Response Code</th>
                <th className="border border-gray-400 px-4 py-2 text-center font-semibold w-16"></th>
              </tr>
            </thead>
            <tbody>
              {/* Split 7 models: 4 on left, 3 on right */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-400 px-4 py-2 text-sm">{MODEL_CODES[0].name}</td>
                <td className="border border-gray-400 px-4 py-2 text-center font-medium">{MODEL_CODES[0].code}</td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  <input type="radio" value={MODEL_CODES[0].code} {...register('Q1C_Model', { required: 'Please select a model' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
                <td className="border border-gray-400 px-4 py-2 text-sm">{MODEL_CODES[4].name}</td>
                <td className="border border-gray-400 px-4 py-2 text-center font-medium">{MODEL_CODES[4].code}</td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  <input type="radio" value={MODEL_CODES[4].code} {...register('Q1C_Model', { required: 'Please select a model' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-400 px-4 py-2 text-sm">{MODEL_CODES[1].name}</td>
                <td className="border border-gray-400 px-4 py-2 text-center font-medium">{MODEL_CODES[1].code}</td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  <input type="radio" value={MODEL_CODES[1].code} {...register('Q1C_Model', { required: 'Please select a model' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
                <td className="border border-gray-400 px-4 py-2 text-sm">{MODEL_CODES[5].name}</td>
                <td className="border border-gray-400 px-4 py-2 text-center font-medium">{MODEL_CODES[5].code}</td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  <input type="radio" value={MODEL_CODES[5].code} {...register('Q1C_Model', { required: 'Please select a model' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-400 px-4 py-2 text-sm">{MODEL_CODES[2].name}</td>
                <td className="border border-gray-400 px-4 py-2 text-center font-medium">{MODEL_CODES[2].code}</td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  <input type="radio" value={MODEL_CODES[2].code} {...register('Q1C_Model', { required: 'Please select a model' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
                <td className="border border-gray-400 px-4 py-2 text-sm">{MODEL_CODES[6].name}</td>
                <td className="border border-gray-400 px-4 py-2 text-center font-medium">{MODEL_CODES[6].code}</td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  <input type="radio" value={MODEL_CODES[6].code} {...register('Q1C_Model', { required: 'Please select a model' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-400 px-4 py-2 text-sm">{MODEL_CODES[3].name}</td>
                <td className="border border-gray-400 px-4 py-2 text-center font-medium">{MODEL_CODES[3].code}</td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  <input type="radio" value={MODEL_CODES[3].code} {...register('Q1C_Model', { required: 'Please select a model' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
                <td className="border border-gray-400 px-4 py-2" colSpan="3"></td>
              </tr>
            </tbody>
          </table>
        </div>
        {errors.Q1C_Model && (
          <p className="mt-2 text-sm text-red-600">{errors.Q1C_Model.message}</p>
        )}
      </div>

      {/* Section A - Dealer Profile and Screening */}
      <div className="border-t-2 border-gray-300 pt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 bg-gray-100 p-3 rounded">
          Section A: Dealer Profile and Screening
        </h3>
        
        <p className="text-sm font-medium text-gray-700 mb-4">Please share your personal Details: -</p>

        {/* Personal Details Table */}
        <div className="mb-6 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400">
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-400 px-4 py-3 text-sm font-medium text-gray-700 w-1/3">
                  S1.1 – Dealer Name
                </td>
                <td className="border border-gray-400 px-4 py-3">
                  <input
                    type="text"
                    {...register('S1_1_DealerName', { 
                      required: 'Dealer name is required',
                      minLength: { value: 2, message: 'Dealer name must be at least 2 characters' }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter dealer name"
                  />
                  {errors.S1_1_DealerName && (
                    <p className="mt-1 text-sm text-red-600">{errors.S1_1_DealerName.message}</p>
                  )}
                </td>
              </tr>
              
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-400 px-4 py-3 text-sm font-medium text-gray-700">
                  S1.2 – Dealer Address
                </td>
                <td className="border border-gray-400 px-4 py-3">
                  <textarea
                    {...register('S1_2_DealerAddress', { 
                      required: 'Dealer address is required'
                    })}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter complete dealer address"
                  />
                  {errors.S1_2_DealerAddress && (
                    <p className="mt-1 text-sm text-red-600">{errors.S1_2_DealerAddress.message}</p>
                  )}
                </td>
              </tr>
              
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-400 px-4 py-3 text-sm font-medium text-gray-700">
                  S1.3 – District Name (To be selected from list)
                </td>
                <td className="border border-gray-400 px-4 py-3">
                  <input
                    type="text"
                    {...register('S1_3_DistrictName', { 
                      required: 'District name is required',
                      minLength: { value: 2, message: 'District name must be at least 2 characters' }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter district name"
                  />
                  {errors.S1_3_DistrictName && (
                    <p className="mt-1 text-sm text-red-600">{errors.S1_3_DistrictName.message}</p>
                  )}
                </td>
              </tr>
              
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-400 px-4 py-3 text-sm font-medium text-gray-700">
                  S1.4 – State Name ((To be selected from list))
                </td>
                <td className="border border-gray-400 px-4 py-3">
                  <input
                    type="text"
                    {...register('S1_4_StateName', { 
                      required: 'State name is required',
                      minLength: { value: 2, message: 'State name must be at least 2 characters' }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter state name"
                  />
                  {errors.S1_4_StateName && (
                    <p className="mt-1 text-sm text-red-600">{errors.S1_4_StateName.message}</p>
                  )}
                </td>
              </tr>
              
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-400 px-4 py-3 text-sm font-medium text-gray-700">
                  S1.5 – Respondent Name
                </td>
                <td className="border border-gray-400 px-4 py-3">
                  <input
                    type="text"
                    {...register('S1_5_RespondentName', { 
                      required: 'Respondent name is required',
                      minLength: { value: 2, message: 'Respondent name must be at least 2 characters' }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter respondent name"
                  />
                  {errors.S1_5_RespondentName && (
                    <p className="mt-1 text-sm text-red-600">{errors.S1_5_RespondentName.message}</p>
                  )}
                </td>
              </tr>
              
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-400 px-4 py-3 text-sm font-medium text-gray-700">
                  S1.6 – Respondent Contact No
                </td>
                <td className="border border-gray-400 px-4 py-3">
                  <input
                    type="tel"
                    {...register('S1_6_RespondentContact', { 
                      required: 'Contact number is required',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Please enter a valid 10-digit contact number'
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter 10-digit contact number"
                    maxLength="10"
                  />
                  {errors.S1_6_RespondentContact && (
                    <p className="mt-1 text-sm text-red-600">{errors.S1_6_RespondentContact.message}</p>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Q1C - Gender (Do not ask, please record the gender) */}
      <div className="bg-white p-4">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Q1C. Do not ask, please record the gender: <span className="text-red-500">*</span>
          <br />
          <span className="text-xs text-blue-600 italic">Scripting Note – Single Select</span>
        </label>
        
        <div className="overflow-x-auto">
          <table className="w-full max-w-md border-collapse border border-gray-400">
            <thead className="bg-blue-100">
              <tr>
                <th className="border border-gray-400 px-4 py-2 text-left font-semibold">Gender</th>
                <th className="border border-gray-400 px-4 py-2 text-center font-semibold w-24">Code</th>
                <th className="border border-gray-400 px-4 py-2 text-center font-semibold w-16"></th>
                <th className="border border-gray-400 px-4 py-2 text-center font-semibold w-40">INSTRUCTION</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-400 px-4 py-2 text-sm">Male</td>
                <td className="border border-gray-400 px-4 py-2 text-center font-medium">1</td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  <input type="radio" value="1" {...register('Q1C_Gender', { required: 'Please select gender' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
                <td className="border border-gray-400 px-4 py-2 text-center bg-green-50 font-medium" rowSpan="3">
                  CONTINUE FOR ALL
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-400 px-4 py-2 text-sm">Female</td>
                <td className="border border-gray-400 px-4 py-2 text-center font-medium">2</td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  <input type="radio" value="2" {...register('Q1C_Gender', { required: 'Please select gender' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-400 px-4 py-2 text-sm">Others</td>
                <td className="border border-gray-400 px-4 py-2 text-center font-medium">3</td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  <input type="radio" value="3" {...register('Q1C_Gender', { required: 'Please select gender' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {errors.Q1C_Gender && (
          <p className="mt-2 text-sm text-red-600">{errors.Q1C_Gender.message}</p>
        )}
      </div>

      {/* Q2 - Experience */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Q2. Please let me know your total experience in this field in number of years : ___________________
          <br />
          <span className="text-xs text-blue-600 italic">Scripting Note – Provide an open-end box with response ranges between 0-30</span>
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="number"
          {...register('Q2_Experience', { 
            required: 'Experience is required',
            min: { value: 0, message: 'Experience cannot be negative' },
            max: { value: 30, message: 'Experience cannot exceed 30 years' }
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter experience in years (0-30)"
          min="0"
          max="30"
        />
        {errors.Q2_Experience && (
          <p className="mt-1 text-sm text-red-600">{errors.Q2_Experience.message}</p>
        )}
      </div>

      {/* Q3 - Designation */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Q3. Please let us know your designation : ___________________________________________________
          <br />
          <span className="text-xs text-blue-600 italic">Scripting Note: Please provide an open-end text box to record responses</span>
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          {...register('Q3_Designation', { 
            required: 'Designation is required',
            minLength: { value: 2, message: 'Designation must be at least 2 characters' }
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your designation"
        />
        {errors.Q3_Designation && (
          <p className="mt-1 text-sm text-red-600">{errors.Q3_Designation.message}</p>
        )}
      </div>

      {/* Q4 - Model/Variant Experience */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Q4. Please tell me whether you have been personally dealing with _______ models / variants of vehicles in your current role?
          <br />
          <span className="text-xs text-blue-600 italic">Interviewer Note : Please refer to particular models / variants for respective OEM and ask accordingly.</span>
          <span className="text-red-500 ml-1">*</span>
        </label>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Model / Variant</th>
                <th className="border border-gray-300 px-3 py-2 text-center font-semibold w-32">Response Code</th>
                <th className="border border-gray-300 px-3 py-2 text-center font-semibold w-16"></th>
                <th className="border border-gray-300 px-3 py-2 text-center font-semibold">INSTRUCTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-3 py-2 text-sm">Tata Signa 1923.K</td>
                <td className="border border-gray-300 px-3 py-2 text-center font-medium">1</td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  <input type="radio" value="1" {...register('Q4_ModelExperience', { required: 'Please select a model variant' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center bg-blue-50 font-medium" rowSpan="7">
                  CONTINUE ONLY IF<br />PARTICIPANT HAS BEEN<br />DEALING WITH THE<br />PARTICULAR MODEL<br />VARIANT
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 text-sm">Mahindra Supro Profittruck Maxi</td>
                <td className="border border-gray-300 px-3 py-2 text-center font-medium">2</td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  <input type="radio" value="2" {...register('Q4_ModelExperience', { required: 'Please select a model variant' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 text-sm">MSIL Super Carry</td>
                <td className="border border-gray-300 px-3 py-2 text-center font-medium">3</td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  <input type="radio" value="3" {...register('Q4_ModelExperience', { required: 'Please select a model variant' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 text-sm">Tata Curvv Accomplished + A</td>
                <td className="border border-gray-300 px-3 py-2 text-center font-medium">4</td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  <input type="radio" value="4" {...register('Q4_ModelExperience', { required: 'Please select a model variant' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 text-sm">MSIL Dzire ZXi</td>
                <td className="border border-gray-300 px-3 py-2 text-center font-medium">5</td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  <input type="radio" value="5" {...register('Q4_ModelExperience', { required: 'Please select a model variant' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 text-sm">TVS King EV Max</td>
                <td className="border border-gray-300 px-3 py-2 text-center font-medium">6</td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  <input type="radio" value="6" {...register('Q4_ModelExperience', { required: 'Please select a model variant' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 text-sm">TVS Ntorq 150 TFT</td>
                <td className="border border-gray-300 px-3 py-2 text-center font-medium">7</td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  <input type="radio" value="7" {...register('Q4_ModelExperience', { required: 'Please select a model variant' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {errors.Q4_ModelExperience && (
          <p className="mt-2 text-sm text-red-600">{errors.Q4_ModelExperience.message}</p>
        )}
      </div>

      {/* Q5 - Knowledge Level */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Q5. Please tell me which of the following best describes your ability ... whether you are fully aware and equipped to discuss various types of vehicle features with end customers?
          <br />
          <span className="text-xs text-blue-600 italic">SINGLE CODING</span>
          <span className="text-red-500 ml-1">*</span>
        </label>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Knowledge levels wrt Features</th>
                <th className="border border-gray-300 px-3 py-2 text-center font-semibold w-24">Code</th>
                <th className="border border-gray-300 px-3 py-2 text-center font-semibold w-16"></th>
                <th className="border border-gray-300 px-3 py-2 text-center font-semibold">INSTRUCTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-3 py-2 text-sm">YES, Fully Equipped</td>
                <td className="border border-gray-300 px-3 py-2 text-center font-medium">1</td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  <input type="radio" value="1" {...register('Q5_KnowledgeLevel', { required: 'Please select your knowledge level' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center bg-green-50 font-medium">CONTINUE</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 text-sm">YES, But Partially Knowledgeable</td>
                <td className="border border-gray-300 px-3 py-2 text-center font-medium">2</td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  <input type="radio" value="2" {...register('Q5_KnowledgeLevel', { required: 'Please select your knowledge level' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center bg-red-50 font-medium">THANK &amp; TERMINATE</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 text-sm">I can't say for sure</td>
                <td className="border border-gray-300 px-3 py-2 text-center font-medium">3</td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  <input type="radio" value="3" {...register('Q5_KnowledgeLevel', { required: 'Please select your knowledge level' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center bg-red-50 font-medium">THANK &amp; TERMINATE</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 text-sm">No, I am not equipped so well</td>
                <td className="border border-gray-300 px-3 py-2 text-center font-medium">4</td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  <input type="radio" value="4" {...register('Q5_KnowledgeLevel', { required: 'Please select your knowledge level' })} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center bg-red-50 font-medium">THANK &amp; TERMINATE</td>
              </tr>
            </tbody>
          </table>
        </div>
        {errors.Q5_KnowledgeLevel && (
          <p className="mt-2 text-sm text-red-600">{errors.Q5_KnowledgeLevel.message}</p>
        )}
      </div>

      {/* Transition Text */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
        <p className="text-sm text-blue-900 italic">
          Ok, now we shall discuss in detail about various vehicle features according to type
        </p>
      </div>
    </div>
  );
}
