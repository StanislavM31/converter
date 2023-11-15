// так как мы установили finalCost: newMultiplierValue
// для валюты в инпуте которой поменяли значение, то
// все остальные валюты пересчитываем по формуле newMultiplier * cur.Cur_OfficialRate

const updateMultiplier = (arrayOfCur, newMultiplier, onFocusValue) => {
    console.log('onFocusValue:', onFocusValue.name);

    const updatedArray = arrayOfCur.map((cur) => (
      cur.Cur_Abbreviation !== onFocusValue.name
        ? {
            ...cur,
            multiplier: Number(newMultiplier),
            finalCost: (Number(newMultiplier * cur.Cur_OfficialRate)).toFixed(2),
          }
        : {
            ...cur,
            multiplier: 1,
            finalCost: newMultiplier,
          }
    ));
console.log("массив обновлен");
    return updatedArray;
  };

  export default updateMultiplier;
