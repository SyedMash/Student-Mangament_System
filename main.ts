#! /usr/bin/env node
import inquirer from "inquirer"
import chalk from "chalk"

let userObj: object[] = []

async function intro() {

    let heading = ("WELCOME TO OUR FOOTBALL TRAINING ACADEMY SIGN IN PORTAL")
    let styleHeading = chalk.bold.blue(heading.toUpperCase())
    let divided = chalk.gray("=".repeat(heading.length * 2))

    console.log(divided)
    console.log(styleHeading)
    console.log(divided)

    const createAccount: { cAorSI: string } = await inquirer.prompt([{
        type: 'list',
        name: 'cAorSI',
        message: 'Create account or sign in if you have one: ',
        choices: ["SIGN IN"]
    }]);

    if (createAccount.cAorSI === "SIGN IN") {

        let nameExist: boolean = false
        let passExist: boolean = false

        const userNameAnd: { userName: string } = await inquirer.prompt([{
            type: 'input',
            name: 'userName',
            message: 'Enter Your User Name: '
        }]);

        for (let i = 0; i < userObj.length; i++) {
            if ((userObj[i] as { name: string }).name === userNameAnd.userName) {
                nameExist = true
            }
        }

        if (nameExist === false) {
            console.log('USER NAME DOEST NOT EXIST! PLEASE TAKE ADMISSION FIRST')
        } else {
            const userPass: { userPassword: string } = await inquirer.prompt([{
                type: 'password',
                name: 'userPassword',
                message: 'Enter Your User Password: '
            }]);

            for (let j = 0; j < userObj.length; j++) {
                if ((userObj[j] as { password: string }).password === userPass.userPassword) {
                    passExist = true
                }
            }
        }

        if (nameExist === true) {

            if (passExist === true) {
                console.log("SIGNED IN SUCCESSFULLY")

                function showProfile() {
                    for (let i = 0; i < userObj.length; i++) {
                        if ((userObj[i] as { name: string }).name === userNameAnd.userName) {
                            console.log(`YOUR USER NAME IS ${(userObj[i] as { name: string }).name} \nYOUR PASSWORD IS ${(userObj[i] as { password: string }).password}\nYOUR TIMING IS ${(userObj[i] as { timing: string }).timing} \nYOUR FEES STATUS IS ${(userObj[i] as { fees: number }).fees}`)
                        }
                    }
                }

                const afterSignIn: { after: string } = await inquirer.prompt([{
                    type: 'list',
                    name: 'after',
                    message: chalk.bold.blueBright('PRESS ENTER TO CHECK PROFILE, OR CHOOSE RETURN TO MAIN MENU OR EXIT: '),
                    choices: ["SHOW PROFILE"]
                }]);

                if (afterSignIn.after === "SHOW PROFILE") {
                    showProfile()
                }
            } else {
                console.log('INCORRECT PASSWORD')
            }
        }
    }
}

async function options() {

    interface choose {
        fees: Function
        facilities: Function
        Trainers: Function
        Venue: Function
        Admission: Function
    }
    let chooseObj: choose = {
        fees: function () {
            console.log('THE FEES STRUCTURE OF THIS PROGRAM IS: ')
            console.log('3 MONTHS PROGRAM AND YOU HAVE TO PAY $100 FOR EACH MONTH')
        },
        facilities: function () {
            console.log('STUDENTS ARE OUR HIGHEST PRIORITY SO WE TAKE CARE OF THEM')
            console.log('THE FACILITIES INCLUDES BUT NOT LIMITED TO')
            console.log('1: FUTSAL GROUND \n2: FULL FIELD GROUND\n3: Swimming Pool\n4: Launch')
        },
        Trainers: function () {
            console.log("WE HAVE THE WORLD CLASS TRAINERS \n1: CRISTIANO RONALDO\n2: Lionel Messi\n3: Neymar Jr \nAND MANY MORE")
        },
        Venue: function () {
            console.log("VENUE OF THIS PROGRAM IS MADRID, SPAIN AND OUR MAIN GROUND IS SANTIAGO BERNABEU")
        },
        Admission: async function () {

            let heading = ("WELCOME TO OUR FOOTBALL TRAINING ACADEMY ADMISSION PORTAL")
            let styleHeading = chalk.bold.blue(heading.toUpperCase())
            let divided = chalk.gray("=".repeat(heading.length * 2))

            console.log(divided)
            console.log(styleHeading)
            console.log(divided)

            const writeUser: { Name: string, Pass: string, timing: string } = await inquirer.prompt([{
                type: 'input',
                name: 'Name',
                message: 'ENTER YOUR NAME MUST BE UNIQUE: '
            }, {
                type: 'password',
                name: 'Pass',
                message: 'ENTER PASSWORD'
            }, {
                type: 'list',
                name: 'timing',
                message: 'CHOOSE TIMING',
                choices: ["5pm-7pm", "8pm-10pm"]
            }
            ]);

            let validFees = false;

            while (!validFees) {
                const FeesPayment: { fees: number } = await inquirer.prompt([{
                    type: "number",
                    name: 'fees',
                    message: 'PLEASE PAY FEES TO FINALIZE THE ADMISSION $300'
                }]);
                if (FeesPayment.fees === 300) {
                    validFees = true;
                } else {
                    console.log("PLEASE PAY $300 TO FINALIZE THE ADMISSION");
                }
            }

            let newUser = {
                name: writeUser.Name,
                password: writeUser.Pass,
                timing: writeUser.timing,
                fees: "PAID"
            }

            userObj.push(newUser)

            let adHead = "ADMISSION SUCCESSFUL"
            let stAdHeading = chalk.bold.blueBright(adHead.toUpperCase())
            let divider = chalk.gray("=".repeat(adHead.length * 2))

            console.log(divider)
            console.log(stAdHeading)
            console.log(divider)
        }
    }

    while (true) {
        const listOfOptions: { listOfOp: string } = await inquirer.prompt([{
            type: 'list',
            name: 'listOfOp',
            message: chalk.whiteBright('WELCOME TO ALL START FOOTBALL TRAINING SUMMER CAMP: '),
            choices: ["--- ALREADY HAVE ACCOUNT? SIGN IN", "--- FEES", "--- FACILITIES", "--- TRAINERS", "--- VENUE", "--- ADMISSION"]
        }]);

        if (listOfOptions.listOfOp === "--- FEES") {
            chooseObj.fees()
        } else if (listOfOptions.listOfOp === "--- FACILITIES") {
            chooseObj.facilities()
        } else if (listOfOptions.listOfOp === "--- TRAINERS") {
            chooseObj.Trainers()
        } else if (listOfOptions.listOfOp === "--- VENUE") {
            chooseObj.Venue()
        } else if (listOfOptions.listOfOp === "--- ADMISSION") {
            await chooseObj.Admission()
        } else if (listOfOptions.listOfOp === "--- ALREADY HAVE ACCOUNT? SIGN IN") {
            await intro()
        }

        const repeat: { ret: string } = await inquirer.prompt([{
            type: 'list',
            name: 'ret',
            message: chalk.bold.red('RETURN TO MAINE MENU'),
            choices: ["YES", "EXIT"]
        }]);
        if (repeat.ret === "EXIT") {
            break
        }

    }
}
options()

