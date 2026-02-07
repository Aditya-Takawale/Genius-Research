import React from 'react';
import { AVAILABILITY_OPTIONS, DEMAND_OPTIONS, IMPORTANCE_OPTIONS, PRICE_IMPACT_OPTIONS } from '../utils/constants';

const FeatureGrid = ({ features, sectionName, register, errors, questionPrefix }) => {
  return (
    <div className="overflow-x-auto -mx-6 px-6">
      <table className="w-full border-collapse min-w-[800px]">
        <thead>
          <tr className="bg-genius-blue text-white">
            <th className="border border-blue-600 px-4 py-3 text-left text-sm font-semibold sticky left-0 bg-genius-blue z-10">
              Feature
            </th>
            <th className="border border-blue-600 px-4 py-3 text-left text-sm font-semibold">
              (a) Availability <span className="text-red-300">*</span>
            </th>
            <th className="border border-blue-600 px-4 py-3 text-left text-sm font-semibold">
              (b) Customer Demand <span className="text-red-300">*</span>
            </th>
            <th className="border border-blue-600 px-4 py-3 text-left text-sm font-semibold">
              (c) Importance <span className="text-red-300">*</span>
            </th>
            <th className="border border-blue-600 px-4 py-3 text-left text-sm font-semibold">
              (d) Price Impact <span className="text-red-300">*</span>
            </th>
            <th className="border border-blue-600 px-4 py-3 text-left text-sm font-semibold">
              (e) Premium (₹)
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr
              key={feature.id}
              className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
            >
              {/* Feature Name */}
              <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-genius-dark sticky left-0 bg-inherit z-10">
                {feature.name}
              </td>

              {/* (a) Availability */}
              <td className="border border-gray-300 px-2 py-1">
                <select
                  {...register(`${questionPrefix}_${feature.id}_Availability`, {
                    required: 'Required'
                  })}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-genius-blue focus:border-transparent"
                >
                  <option value="">Select...</option>
                  {AVAILABILITY_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {errors[`${questionPrefix}_${feature.id}_Availability`] && (
                  <p className="text-xs text-red-600 mt-1">Required</p>
                )}
              </td>

              {/* (b) Customer Demand */}
              <td className="border border-gray-300 px-2 py-1">
                <select
                  {...register(`${questionPrefix}_${feature.id}_Demand`, {
                    required: 'Required'
                  })}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-genius-blue focus:border-transparent"
                >
                  <option value="">Select...</option>
                  {DEMAND_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {errors[`${questionPrefix}_${feature.id}_Demand`] && (
                  <p className="text-xs text-red-600 mt-1">Required</p>
                )}
              </td>

              {/* (c) Importance */}
              <td className="border border-gray-300 px-2 py-1">
                <select
                  {...register(`${questionPrefix}_${feature.id}_Importance`, {
                    required: 'Required'
                  })}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-genius-blue focus:border-transparent"
                >
                  <option value="">Select...</option>
                  {IMPORTANCE_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {errors[`${questionPrefix}_${feature.id}_Importance`] && (
                  <p className="text-xs text-red-600 mt-1">Required</p>
                )}
              </td>

              {/* (d) Price Impact */}
              <td className="border border-gray-300 px-2 py-1">
                <select
                  {...register(`${questionPrefix}_${feature.id}_PriceImpact`, {
                    required: 'Required'
                  })}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-genius-blue focus:border-transparent"
                >
                  <option value="">Select...</option>
                  {PRICE_IMPACT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {errors[`${questionPrefix}_${feature.id}_PriceImpact`] && (
                  <p className="text-xs text-red-600 mt-1">Required</p>
                )}
              </td>

              {/* (e) Premium Price */}
              <td className="border border-gray-300 px-2 py-1">
                <input
                  type="number"
                  {...register(`${questionPrefix}_${feature.id}_Premium`)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-genius-blue focus:border-transparent"
                  placeholder="0"
                  min="0"
                  step="1000"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeatureGrid;
