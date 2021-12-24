const { promiseAccess, promiseReadFile, promiseWrite } = require("./promiseFs");

Promise.all([promiseAccess("numbers.txt"), promiseAccess("names.txt")])
  .then(function () {
    return Promise.all([
      promiseReadFile("numbers.txt"),
      promiseReadFile("names.txt"),
    ]);
  })
  .then(parsed)
  .then((data) => promiseWrite("result.txt", data))
  .catch((err) => console.log(err));

function parsed([numbers, names]) {
  // console.log(numbers);
  // console.log(names);

  let person = {};
  let personData = names.split("\r\n");
  for (const element of personData) {
    [key, value] = element.split(" - ");
    person[key] = value;
  }
  let numbersObject = {};
  let numbersData = numbers.split("\r\n");
  for (const element of numbersData) {
    [key, value] = element.split(" - ");
    if (numbersObject[key]) {
      numbersObject[key] = [...numbersObject[key], value];
    } else {
      numbersObject[key] = [value];
    }
  }

  let para = "";
  for (let key in person) {
    switch (numbers[key]?.length) {
      case undefined:
        para += `${person[key]} hasn’t any phone number.\n`;
        break;
      case 1:
        para += `${person[key]}’s phone number is ${numbers[key][0]}.\n`;
        break;
      default:
        para += `${person[key]}’s phone numbers are ${numbers[key].join(
          ", "
        )}.\n`;
        break;
    }
  }
  console.log(para);
  return para;
}
