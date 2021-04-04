const Employee = require("./employee");

class Intern extends Employee{
  constructor(name, id, email, school){
    super(name, id, email);
    this.school = school;
    this.role = "intern";
  };
};

module.exports = Intern;