
const {v1: uuidv1 } = require('uuid');

const Helpers = {
  generateUUID: () => {
     const uuid = uuidv1();  
     return uuid;
  },

  checkTitleLength: (inputString) => {
    if(inputString.length <= 50) {
      return inputString
    }
    return false
  }

}

module.exports = Helpers
