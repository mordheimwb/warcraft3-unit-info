import React, { useState, useEffect } from 'react';
import axios from 'axios';
import unitsData from '../data/units.json';

const UnitInfo = () => {
  const [unitName, setUnitName] = useState('');
  const [unitCount, setUnitCount] = useState(1);
  const [unitInfo, setUnitInfo] = useState(null);

  useEffect(() => {
    if (unitName) {
      const unit = unitsData[unitName];
      if (unit) {
        setUnitInfo(unit);
      } else {
        setUnitInfo(null);
      }
    }
  }, [unitName]);

  const handleUnitNameChange = (e) => {
    setUnitName(e.target.value);
  };

  const handleUnitCountChange = (e) => {
    setUnitCount(e.target.value);
  };

  const calculateTotalDPS = () => {
    if (unitInfo) {
      const averageDamage = (unitInfo.min_damage + unitInfo.max_damage) / 2;
      const dps = averageDamage / unitInfo.cooldown;
      return dps * unitCount;
    }
    return 0;
  };

  const calculateTotalHealth = () => {
    if (unitInfo) {
      return unitInfo.hit_points * unitCount;
    }
    return 0;
  };

  const calculateTotalGoldCost = () => {
    if (unitInfo) {
      return unitInfo.gold_cost * unitCount;
    }
    return 0;
  };

  return (
    <div>
      <input
        type="text"
        value={unitName}
        onChange={handleUnitNameChange}
        placeholder="Enter unit name"
        list="unit-names"
      />
      <datalist id="unit-names">
        {Object.keys(unitsData).map((name) => (
          <option key={name} value={name} />
        ))}
      </datalist>
      <input
        type="number"
        value={unitCount}
        onChange={handleUnitCountChange}
        placeholder="Enter number of units"
      />
      {unitInfo && (
        <div>
          <p>Total DPS: {calculateTotalDPS()}</p>
          <p>Total Health: {calculateTotalHealth()}</p>
          <p>Total Gold Cost: {calculateTotalGoldCost()}</p>
        </div>
      )}
    </div>
  );
};

export default UnitInfo;
