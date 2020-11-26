require("../node_modules/fraction.js/fraction.js")
require("../node_modules/complex.js/complex.js")
var Polynomial = require("../node_modules/polynomial/polynomial.js")
// var q = new Polynomial("a^4+3bx^3+2cx^2+6dx");
// var w = new Polynomial("9x");
// console.log(w.toString());

const hexToBin = (hexArrString) => {
    binArr = [];

    for(let i=0; i<hexArrString.length; i++) {
        let binNotFormatted = parseInt(hexArrString[i], 16).toString(2);
        let binFormatted = '0'.repeat(8 - binNotFormatted.length) + binNotFormatted;
        binArr.push(binFormatted);
    }

    return binArr;
}

const binToHex = (bin) => {

}

const xorHex = (arrHex1, arrHex2) => {
    const xorHexArr = [];
    const arrBin1 = hexToBin(arrHex1);
    const arrBin2 = hexToBin(arrHex2);

    for(let i=0; i<arrBin1.length; i++) {
        let intXor = parseInt(arrBin1[i], 2) ^ parseInt(arrBin2[i], 2);
        let hexNotFormatted = intXor.toString(16)
        let hexXor = '0'.repeat(2 - hexNotFormatted.length) + hexNotFormatted;
        xorHexArr.push(hexXor);
    }

    return xorHexArr;
}

// matrix 4x4
const arrToMatrix = (arr) => {
    const matrix = [];
    let row = [];

    for(let i=0; i<arr.length; i++) {
        row.push(arr[i]);
        if(row.length == 4) {
            matrix.push(row);
            row = [];
        }
    }

    return matrix;
}

const matrixToArr = (matrixArr) => {
    let arrFromMatrix = [];

    for (let i=0; i<matrixArr.length; i++) {
        arrFromMatrix.push(...matrixArr[i]);
    }

    return arrFromMatrix;
}



const transSubBytes = (arr) => {
    const sBox = {
        '0': { '0': '63', '1': '7c', '2': '77', '3': '7b', '4': 'f2', '5': '6b', '6': '6f', '7': 'c5', '8': '30', '9': '01', 'a': '67', 'b': '2b', 'c': 'fe', 'd': 'd7', 'e': 'ab', 'f': '76'},
        '1': { '0': 'ca', '1': '82', '2': 'c9', '3': '7d', '4': 'fa', '5': '59', '6': '47', '7': 'f0', '8': 'ad', '9': 'd4', 'a': 'a2', 'b': 'af', 'c': '9c', 'd': 'a4', 'e': '72', 'f': 'c0'},
        '2': { '0': 'b7', '1': 'fd', '2': '93', '3': '26', '4': '36', '5': '3f', '6': 'f7', '7': 'cc', '8': '34', '9': 'a5', 'a': 'e5', 'b': 'f1', 'c': '71', 'd': 'd8', 'e': '31', 'f': '15'},
        '3': { '0': '04', '1': 'c7', '2': '23', '3': 'c3', '4': '18', '5': '96', '6': '05', '7': '9a', '8': '07', '9': '12', 'a': '80', 'b': 'e2', 'c': 'eb', 'd': '27', 'e': 'b2', 'f': '75'},
        '4': { '0': '09', '1': '83', '2': '2c', '3': '1a', '4': '1b', '5': '6e', '6': '5a', '7': 'a0', '8': '52', '9': '3b', 'a': 'd6', 'b': 'b3', 'c': '29', 'd': 'e3', 'e': '2f', 'f': '84'},
        '5': { '0': '53', '1': 'd1', '2': '00', '3': 'ed', '4': '20', '5': 'fc', '6': 'b1', '7': '5b', '8': '6a', '9': 'cb', 'a': 'be', 'b': '39', 'c': '4a', 'd': '4c', 'e': '58', 'f': 'cf'},
        '6': { '0': 'd0', '1': 'ef', '2': 'aa', '3': 'fb', '4': '43', '5': '4d', '6': '33', '7': '85', '8': '45', '9': 'f9', 'a': '02', 'b': '7f', 'c': '50', 'd': '3c', 'e': '9f', 'f': 'a8'},
        '7': { '0': '51', '1': 'a3', '2': '40', '3': '8f', '4': '92', '5': '9d', '6': '38', '7': 'f5', '8': 'bc', '9': 'b6', 'a': 'da', 'b': '21', 'c': '10', 'd': 'ff', 'e': 'f3', 'f': 'd2'},
        '8': { '0': 'cd', '1': '0c', '2': '13', '3': 'ec', '4': '5f', '5': '97', '6': '44', '7': '17', '8': 'c4', '9': 'a7', 'a': '7e', 'b': '3d', 'c': '64', 'd': '5d', 'e': '19', 'f': '73'},
        '9': { '0': '60', '1': '81', '2': '4f', '3': 'dc', '4': '22', '5': '2a', '6': '90', '7': '88', '8': '46', '9': 'ee', 'a': 'b8', 'b': '14', 'c': 'de', 'd': '5e', 'e': '0b', 'f': 'db'},
        'a': { '0': 'e0', '1': '32', '2': '3a', '3': '0a', '4': '49', '5': '06', '6': '24', '7': '5c', '8': 'c2', '9': 'd3', 'a': 'ac', 'b': '62', 'c': '91', 'd': '95', 'e': 'e4', 'f': '79'},
        'b': { '0': 'e7', '1': 'c8', '2': '37', '3': '6d', '4': '8d', '5': 'd5', '6': '4e', '7': 'a9', '8': '6c', '9': '56', 'a': 'f4', 'b': 'ea', 'c': '65', 'd': '7a', 'e': 'ae', 'f': '08'},
        'c': { '0': 'ba', '1': '78', '2': '25', '3': '2e', '4': '1c', '5': 'a6', '6': 'b4', '7': 'c6', '8': 'e8', '9': 'dd', 'a': '74', 'b': '1f', 'c': '4b', 'd': 'bd', 'e': '8b', 'f': '8a'},
        'd': { '0': '70', '1': '3e', '2': 'b5', '3': '66', '4': '48', '5': '03', '6': 'f6', '7': '0e', '8': '61', '9': '35', 'a': '57', 'b': 'b9', 'c': '86', 'd': 'c1', 'e': '1d', 'f': '9e'},
        'e': { '0': 'e1', '1': 'f8', '2': '98', '3': '11', '4': '69', '5': 'd9', '6': '8e', '7': '94', '8': '9b', '9': '1e', 'a': '87', 'b': 'e9', 'c': 'ce', 'd': '55', 'e': '28', 'f': 'df'},
        'f': { '0': '8c', '1': 'a1', '2': '89', '3': '0d', '4': 'bf', '5': 'e6', '6': '42', '7': '68', '8': '41', '9': '99', 'a': '2d', 'b': '0f', 'c': 'b0', 'd': '54', 'e': 'bb', 'f': '16'} 
    };
    let subBytesArr = [];

    for(let i=0; i<arr.length; i++) {
        let split = arr[i].split('')
        subBytesArr.push(sBox[split[0]][split[1]])
    }

    return subBytesArr;
}

const transShifRows = (arr) => {
    const arrMatrix = arrToMatrix(arr);

    for(let i=0; i<arrMatrix.length; i++) {
        for(let j=0; j<i; j++) {
            arrMatrix[i].push(arrMatrix[i].shift())
        }
    }

    let toArr = matrixToArr(arrMatrix)
    return toArr;
}

const transMixColls = (arrM) => {
    arr = arrToMatrix(arrM);

    const keyMixColls = [
        ['2', '3', '1', '1'],
        ['1', '2', '3', '1'],
        ['1', '1', '2', '3'],
        ['3', '1', '1', '2']
    ];
    let arrMixColls = [];
    let arrMatrixMuliple = [];

    // baris
    for (let i=0; i<arr.length; i++) {
        // kolom
        for(let j=0; j<arr.length; j++) {
            // sel
            let tempArr = [];
            let tempSumPolynom = new Polynomial('0');
            for(let k=0; k<arr.length; k++) {
                
                let matLeft = keyMixColls[i][k];
                let matRight = arr[k][j];
                let binLeft = hexToBin([matLeft]);
                let binRight = hexToBin([matRight]);
                let polLeft = [];
                let polRight = [];

                // make a polynomial number
                for(let l=0; l<8; l++) {
                    // console.log(binLeft[0][l]);
                    if(l==7 && binLeft[0][l] == 1) {
                        // console.log(l)
                        polLeft.push('1');
                    }else if(binLeft[0][l] == 1) {
                        // console.log(l)
                        polLeft.push(`x^${ (7 - l) }`);
                    }
                    
                    if(l==7 && binRight[0][l] == 1) {
                        // console.log(l)
                        polRight.push('1');
                    }else if(binRight[0][l] == 1) {
                        // console.log(l)
                        polRight.push(`x^${ (7 - l) }`);
                    }
                }
                console.log(matLeft, matRight);
                console.log(binLeft, binRight);
                // console.log(polLeft, polRight);
                
                // console.log(polLeft);
                tempArr.push(matLeft, matRight);


                // console.log(multiple);
                let polFormatLeft = new Polynomial(polLeft.join('+'));
                let polFormatRight = new Polynomial(polRight.join('+'));
                let mulPolynom = polFormatLeft.mul(polFormatRight).toString();
                // console.log(polFormatLeft.mul(polFormatRight).toString());
                tempSumPolynom = tempSumPolynom.add(mulPolynom);
                console.log(tempSumPolynom.toString());
            }
            // console.log(JSON.stringify(tempArr));

            arrMatrixMuliple.push(tempArr);
            let arrPolinom = Object.entries(tempSumPolynom.coeff);
            let longPolinom = Object.entries(tempSumPolynom.coeff).length;
            //polynom dalam array
            let tempSelPolynom = [];
            //polynom setelah mod 8;
            let polynomMod2 = {};
            let mod2 = new Polynomial('x^8+x^4+x^3+x+1');
            // console.log(longPolinom);


            // console.log(tempSumPolynom.toString());
            for(let k=0; k<longPolinom; k++) {
                if(arrPolinom[k][1]%2 == 1) {
                    tempSelPolynom.push(arrPolinom[k])
                    arrPolinom[k][1] = 1;
                }
                // console.log(arrPolinom[k]);
            }

            for(let k=0; k<tempSelPolynom.length; k++) {
                polynomMod2[tempSelPolynom[k][0]] = tempSelPolynom[k][1];
            }
            // console.log(tempSelPolynom);
            polynomMod2 = new Polynomial(polynomMod2);
            if(tempSelPolynom[tempSelPolynom.length-1][0] == '8') {
                polynomMod2 = polynomMod2.sub(mod2);
            }

            let arrPolinomMod2 = Object.entries(polynomMod2.coeff);
            let binPolinomMod2 = 0;

            for(let k=0; k<arrPolinomMod2.length; k++) {
                switch(parseInt(arrPolinomMod2[k][0])) {
                    case 0: 
                        binPolinomMod2 += 1;
                        break;
                    case 1: 
                        binPolinomMod2 += 10;
                        break;
                    case 2: 
                        binPolinomMod2 += 100;
                        break;
                    case 3: 
                        binPolinomMod2 += 1000;
                        break;
                    case 4: 
                        binPolinomMod2 += 10000;
                        break;
                    case 5: 
                        binPolinomMod2 += 100000;
                        break;
                    case 6: 
                        binPolinomMod2 += 1000000;
                        break;
                    case 7: 
                        binPolinomMod2 += 10000000;
                        break;
                }
            }

            let hexPolinomMod2 = parseInt(binPolinomMod2, 2).toString(16);
            // console.log(arrPolinomMod2);
            console.log('polinom setelah mod 8x ...' + polynomMod2.toString());
            // console.log(binPolinomMod2);
            // console.log(hexPolinomMod2);
            // console.log("------------");
            // console.log(Object.entries(tempSumPolynom.coeff));

            arrMixColls.push(hexPolinomMod2);
        }
        
    }
    
    // console.log(arrMixColls);


    // console.log(JSON.stringify(arrMatrixMuliple));

    return arrMixColls;
}

const transAddRoundKeys = (arr, roundKeyN) => {
    let xorRoundKey = []

    xorRoundKey = xorHex(arr, roundKeyN);

    return xorRoundKey;
}

const listRoundKey = (firstCipherKey) => {
    const rCon = [
        ['01', '02', '04', '08', '10', '20', '40', '80', '1b', '36'],
        ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00']
    ];
    let allRoundKey = [];
    let cipMatrix = arrToMatrix(firstCipherKey);
    
    for(let h=0; h<10; h++) {
        let roundKey = [];
        let a = [];
        let b = [];
        let sBoxB = [];
        let c = [];
        let xor1 = [];
        let xor2 = [];

        for(let i=0; i<cipMatrix.length; i++) {
            a.push(cipMatrix[i][0]);
            b.push(cipMatrix[i][3]);
            c.push(rCon[i][h]);
        }

        
        b.push(b.shift());
        sBoxB = transSubBytes(b);
        
        xor1 = xorHex(a, sBoxB);
        xor2 = xorHex(xor1, c);
        
        let col1 = xor2;
        let col2 = [];
        let col3 = [];
        let col4 = [];
        
        for( let i=0; i<cipMatrix.length; i++) {
            col2.push(...xorHex([cipMatrix[i][1]], [col1[i]]))
            col3.push(...xorHex([cipMatrix[i][2]], [col2[i]]))
            col4.push(...xorHex([cipMatrix[i][3]], [col3[i]]))
        }
        
        for( let i=0; i<cipMatrix.length; i++) {
            roundKey.push(col1[i]);
            roundKey.push(col2[i]);
            roundKey.push(col3[i]);
            roundKey.push(col4[i]);
        }
        
        cipMatrix = arrToMatrix(roundKey);
        allRoundKey.push(roundKey);
    }

    return allRoundKey;
};

const main = () => {
    const plaintext = [ '32', '88', '31', 'e0', '43', '5a', '31', '37', 'f6', '30', '98', '07', 'a8', '8d', 'a2', '34'];
    const key = ['2b', '28', 'ab', '09', '7e', 'ae', 'f7', 'cf', '15', 'd2', '15', '4f', '16', 'a6', '88', '3c'];
    // const beforeAddRoundKeys = ['04', 'e0', '48', '28', '66', 'cb', 'f8', '06', '81', '19', 'd3', '26', 'e5', '9a', '7a', '4c'];

    let AddRoundKey = xorHex(plaintext, key);
    let afterListRoundKey = listRoundKey(key);
    const AddRoundKeyBin = hexToBin(AddRoundKey);
    console.log('plaintext     ' + plaintext.join('; '))
    console.log('key           ' + key.join('; '))
    console.log('Initial key   ' + AddRoundKey.join('; '));
    console.log();
    console.log('----------------');
    
    for(let i=0; i<10; i++) {
        console.log();
        console.log('Round ' + (i + 1));
        console.log();
        let afterTransSubBytes = transSubBytes(AddRoundKey);
        console.log('after subbytes      ' + afterTransSubBytes.join('; '));
        let afterTransShifRows = transShifRows(afterTransSubBytes);
        console.log('after shiftrows     ' + afterTransShifRows.join('; '));
        let afterTransMixColls = transMixColls(afterTransShifRows);
        console.log('after mixcolls      ' + afterTransMixColls.join('; '));
        let afterAddRoundKeys = transAddRoundKeys(afterTransMixColls, afterListRoundKey[i]);
        if(i == 9) {
            afterTransMixColls = [];
            afterAddRoundKeys = transAddRoundKeys(afterTransShifRows, afterListRoundKey[i]);
        }
        console.log('roundkey            ' + afterListRoundKey[i].join('; '));
        console.log('after addroundkeys  ' + afterAddRoundKeys.join('; '));
        AddRoundKey = afterAddRoundKeys;
        // console.log(afterTransMixColls);
        console.log();
        console.log('-----------------')
    }


    // console.log(afterTransShifRows);
    // const afterMatrix = arrToMatrix(afterTransSubBytes);

    // console.log(plaintexBin);
    // console.log(keyBin);
    // console.log(AddRoundKey);
    // console.log(AddRoundKeyBin);
    // console.log(afterTransSubBytes);
    // console.log(afterTransShifRows);

}

main();