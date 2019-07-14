// tslint:disable-next-line:cognitive-complexity
const compare: (oldData: any, newData: any) => boolean = (oldData: any, newData: any): boolean => {
  if (oldData === newData) {
    return true;
  }
  if (!(oldData instanceof Object) || !(newData instanceof Object)) {
    return false;
  }
  for (const property in oldData) {
    if (oldData.hasOwnProperty(property)) {
      if (!newData.hasOwnProperty(property)) {
        return false;
      }
      if (oldData[property] === newData[property]) {
        continue;
      }
      if (typeof(oldData[property]) !== 'object') {
        return false;
      }
      if (!compare(oldData[property], newData[property])) {
        return false;
      }
    }
  }
  for (const property in newData) {
    if (newData.hasOwnProperty(property) && !oldData.hasOwnProperty(property)) {
      return false;
    }
  }
  return true;
};

export default compare;
