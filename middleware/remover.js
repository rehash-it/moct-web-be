/**- removes item from the object 
* @param {*} data-object data 
* @param {*} item-array of string to remove item
* @returns 
*/
const removeItem = (data, item) => {
    let value = {}

    for (var i in data) {

        if (i !== item.find(f => f === i) ? true : false)
            value[i] = data[i]
    }



    return value
}

module.exports = { removeItem }