const inquirer = require('inquirer');
const fs = require("fs");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
// const template = require("./src/template");

let employeeArray = [];

function managerPrompt() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: "Please enter the team manager's name: ",
        name: "managerName",
      },
      {
        type: "input",
        message: "Please enter their Employee ID: ",
        name: "managerId",
      },
      {
        type: "input",
        message: "Please enter their Email: ",
        name: "managerEmail",
      },
      {
        type: "input",
        message: "Please enter their office number: ",
        name: "officeNumber",
      },
    ])
    .then((data) => {
      let manager = new Manager(data.managerName, data.managerId, data.managerEmail, data.officeNumber);
      employeeArray.push(manager);
      return addPrompt();
    })
}

function addPrompt() {
  inquirer
    .prompt([
      {
        type: "confirm",
        message: "Would you like to add more team members?",
        name: "addEmployee",
      },
    ])
    .then((confirm) => {
      if (confirm.addEmployee) {
        employeePrompt();
      } else {
        return finish();
      }
    })
}

function employeePrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to add an engineer or an intern?",
        choices: ["Engineer", "Intern"],
        name: "employeeType",
      },
    ])
    .then((data, err) => {
      data.employeeType == "Engineer" ? engineerPrompt()
        : data.employeeType == "Intern" ? internPrompt()
          : console.log(err, "ERROR! How did you get here?")
    })
}

function engineerPrompt() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: "Please enter this engineer's name: ",
        name: "name",
      },
      {
        type: "input",
        message: "Please enter their Employee ID: ",
        name: "id",
      },
      {
        type: "input",
        message: "Please enter their Email: ",
        name: "email",
      },
      {
        type: "input",
        message: "Please enter their github: ",
        name: "github",
      },
    ])
    .then((data) => {
      let engineer = new Engineer(data.name, data.id, data.email, data.github);
      employeeArray.push(engineer);
      return addPrompt();
    })
};

function internPrompt() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: "Please enter this intern's name: ",
        name: "name",
      },
      {
        type: "input",
        message: "Please enter their Employee ID: ",
        name: "id",
      },
      {
        type: "input",
        message: "Please enter their Email: ",
        name: "email",
      },
      {
        type: "input",
        message: "Please enter their school name: ",
        name: "school",
      },
    ])
    .then((data) => {
      let intern = new Intern(data.name, data.id, data.email, data.school);
      employeeArray.push(intern);
      return addPrompt();
    })
};

function finish() {
  console.log(employeeArray);
  const filePath = __dirname + `/dist/${employeeArray[0].name}'s-Team.html`;
  let cardArray = [];
  for (i = 0; i < employeeArray.length; i++) {
    if (employeeArray[i].role === "manager") {
      console.log(employeeArray[i]) 
      cardArray.push(
        (`<li class="list-group-item mt-4 mr-2 ml-2 col-3">
        <h2>Manager: ${employeeArray[i].name}</h2>
        <hr>
        <h2>ID: ${employeeArray[i].id}</h2>
        <h2>Email: ${employeeArray[i].email}</h2>
        <h2>Office Number: ${employeeArray[i].officeNumber}</h2>
        </li>`).toString())
    };
    if (employeeArray[i].role === "engineer") {
      console.log(employeeArray[i])  
      cardArray.push(
        (`<li class="list-group-item mt-4 mr-2 ml-2 col-3">
        <h2>Engineer: ${employeeArray[i].name}</h2>
        <hr>
        <h2>ID: ${employeeArray[i].id}</h2>
        <h2>Email: ${employeeArray[i].email}</h2>
        <h2>Github: <a href="https://github.com/${employeeArray[i].github}">${employeeArray[i].github}</a></h2>
        </li>`).toString())
    };
    if (employeeArray[i].role === "intern") {
      console.log(employeeArray[i])  
      cardArray.push(
        (`<li class="list-group-item mt-4 mr-2 ml-2 col-3">
        <h2>Intern: ${employeeArray[i].name}</h2>
        <hr>
        <h2>ID: ${employeeArray[i].id}</h2>
        <h2>Email: ${employeeArray[i].email}</h2>
        <h2>School: ${employeeArray[i].school}</h2>
        </li>`).toString())
    };
  }
  fs.writeFile(filePath, 
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
      <title>${employeeArray[0].name}'s Team</title>
    </head>
    <body>
    <div class="jumbotron jumbotron-fluid text-center">
      <div class="container">
        <h1 class="display-4">${employeeArray[0].name}'s Team</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card-body">
          <ul class="d-flex flex-wrap">
            ${cardArray.join(`\n`)}
          </ul>
        </div>
      </div>
    </div>
    </body>
    </html>`, (err) => err ? console.log(err) : console.log("Page created successfully!"));
};

function init() {
  managerPrompt();
};

init();

const exportArray = function () {
  return employeeArray;
} 

module.exports = exportArray(employeeArray);