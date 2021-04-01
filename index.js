const inquirer = require('inquirer');
const Employee = require("./lib/employee");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

function managerPrompt () {
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
      return addPrompt();
    })
}

function addPrompt (data) {
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
        return;
      }
    })
}

function employeePrompt () {
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
      if (data.value == "Engineer") {
        return engineerPrompt();
      } else if (data.value == "Intern") {
        return internPrompt();
      } else {
        return console.log(err, "ERROR! How did you get here?")
      }
    })
}

function engineerPrompt () {

};

function internPrompt () {

};

function init () {
  managerPrompt();
};

init();