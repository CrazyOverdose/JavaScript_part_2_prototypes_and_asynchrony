/**
 * @param {Function[]} operations
 * @param {Function} callback
 */


module.exports = function (operations, callback) {
    var promises = [];
    operations.forEach(operation => {  
        
        var promise = new Promise(function (resolve, reject){

            operation(function (err, data){
            if (err)
                reject(err);
            else 
                resolve(data);
            });
        });

        promises.push(promise);
    });

    Promise.all(promises).then(data => callback(null, data)).catch(error => callback(error));
}; 
