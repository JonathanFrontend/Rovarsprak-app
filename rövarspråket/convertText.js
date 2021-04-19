function convertText(text){
    let arr = text.split('');
    for (let i = 0; i < arr.length; i++){
        if(arr[i].match(/[^aeiouyåäö]/gi) && arr[i] !== ' ') {
            arr[i] += `o${arr[i]}`;
        }
    }
    const newText = arr.join('');
    return newText;
}

module.exports = {convertText}