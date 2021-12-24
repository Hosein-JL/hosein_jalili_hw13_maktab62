const { promiseAccess, promiseReadFile, promiseWrite } = require("./promiseFs");

function parsed(names, numbers) {
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
    if (!!numbersObject[key]) {
      numbersObject[key] = [...numbersObject[key], value];
    } else {
      numbersObject[key] = [value];
    }
  }
  let para = "";
  for (const key in person) {
    switch (numbersObject[key]?.length) {
      case undefined:
        para += `${person[key]} does not have a number. \n`;
        break;
      case 1:
        para += `${person[key]}'s phone number is ${numbersObject[key][0]}. \n`;
        break;
      default:
        para += `${person[key]}'s phone numbers are ${numbersObject[key].join(
          " ,"
        )}. \n`;
        break;
    }
  }

  return para;
}

async function promise() {
  try {
    if ((await promiseAccess("names.txt")) && promiseAccess("names.txt")) {
      // await Promise.all([promiseAccess("names.txt"), promiseAccess("names.txt")]);
      const [names, numbers] = await Promise.all([
        promiseReadFile("names.txt"),
        promiseReadFile("numbers.txt"),
      ]);

      const result = parsed(names, numbers);
      await promiseWrite("result.txt", result);

      console.log(result);
    }
  } catch (err) {
    console.log(err);
  }
}

promise();
