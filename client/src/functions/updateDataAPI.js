export const updateDataAPI = (rawData) => {
    return rawData.map((item) => ({
      ...item,
      multiplier: 1,
      finalCost: item.Cur_OfficialRate,
    }));
  };