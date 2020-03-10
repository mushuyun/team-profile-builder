const Manager = require("./Lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./Lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./Lib/render");

var employees = [];
function outputTeam (){
    fs.writeFileSync(outputPath, render(employees), "utf8");
}

//create team members
async function createTeam(){
    try{ 
    const userChoice = await inquirer
    .prompt([
        {
            type: "list",
            name: "employeeChoice",
            message: "What is the emloyee type you'd like to add?",
            choices: [
                "manager",
                "engineer", 
                "intern",
                "No more employee to add"
            ]
        }
    ])
            switch(userChoice.employeeChoice){
            case "manager":
            addManager();
            break;

            case "engineer":
            addEngineer();
            break;

            case "intern":
            addIntern();
            break;

            default:
            outputTeam();
            }
    } catch (err){
        console.log(err);
    }
}
    //add manager
    async function addManager() {
        try {
        const userInputM = await inquirer
        .prompt([
            {
                type: "input",
                name: "managerName",
                Message: "What is this manager's name?"
            },
            {
                type: "input",
                name: "managerId",
                message: "what is this manager's Id?"
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is this manager's email?"
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "what is this manager's office number?"
            }
        ]) 
        const manager = new Manager(userInputM.managerName, userInputM.managerId, userInputM.managerEmail, userInputM.managerOfficeNumber)

        employees.push(manager);
            
        createTeam();
        } catch(err){
          console.log(err);
        }
    }
    //add Engineer
    async function addEngineer() {
        try{
        const userInputE = await inquirer
        .prompt([
            {
                type: "Input",
                name: "engineerName",
                message: "What is this engineer's name?"
            },

            {
                type: "Input",
                name: "engineerId",
                message: "What is this engineer's Id?"
            },
        
            {
                type: "Input",
                name: "engineerEmail",
                message: "What is this engineer's email?"
            },
        
            {
                type: "Input",
                name: "engineerGithub",
                message: "What is this engineer's github?"
            }        
        ])
            const engineer = new Engineer(userInputE.engineerName, userInputE.engineerId, userInputE.engineerEmail, userInputE.engineerGithub);
            employees.push(engineer);

        createTeam();
        } catch (err){
            console.log(err);
        }
    }
   
    // add Intern

    async function addIntern() {
        try{
        const userInputI = await inquirer
        .prompt([
            {
                type: "input",
                name: "internName",
                message: "What is this intern's name?"
            },
            {
                type: "input",
                name: "internId",
                message: "What is this intern's Id?"
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is this intern's email?"
            },
            {
                type: "input",
                name: "internSchool",
                message: "What is this intern's school?"
            }    
        ]) 
            const intern = new Intern (userInputI.internName, userInputI.internId, userInputI.internEmail, userInputI.internSchool);
            employees.push(intern);
        createTeam();
        } catch(err){
            console.log(err);
        }
    }

createTeam();
