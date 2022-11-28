// let str = "INDIA"

// str.toLowerCase()

// const toTitleCase = str => str.replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase())

// console.log(toTitleCase("LOVE INDIA"));

// function captilize(str) {
//     var wordsArray = str.toLowerCase().split(/\s+/);
//     var upperCased = wordsArray.map(function(word) {
//       return word.charAt(0).toUpperCase() + word.substr(1);
//     });
//     return upperCased.join(" ");
//   }

//   console.log(captilize("DHREETIMAN"))

// const captilizeAllWords = (sentence) => {
//     // if (typeof sentence !== "string") return sentence;
//     return sentence.split(' ')
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(' ');
//   }
  
  
// // console.log(captilizeAllWords('Som'))

// let sentence = "DHREETIMAN PRASAD"


// let a = sentence.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

// console.log(a)


const captilize = (str) => {
    return str.toLowerCase().split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join(' ');
  }

  console.log(captilize("aNiL gUOTA"))