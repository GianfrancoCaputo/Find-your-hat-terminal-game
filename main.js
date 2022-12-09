const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field){
        this.field = field;
    }
    print(){
        console.log('\n');
        for (let i = 0; i < this.field.length; i++){
            console.log(this.field[i].join(' '))
        }
        console.log('');
    }
    static generateField(h, w){
        let field = [];
        if (typeof h !== 'number' || typeof w !== 'number') {
            throw Error ('Height and width must be numbers >= 3')
        } else if (h < 3 || w < 3) {
            throw Error ('Height and width must be >= 3')
        } else {
            const optionsArr = [hole, fieldCharacter];
            const randomOp = () => {return Math.floor(Math.random()*2)}
            while (field.length < h){
                let row = [];
                let maxRatio = 0.89;
                while (row.length < w){
                    let option = '';
                    if (maxRatio <= (w * 0.3)){
                        option = optionsArr[randomOp()];
                        if (option === hole){
                            maxRatio++ ;
                        }
                    } else {
                        option = optionsArr[1]
                    }
                    row.push(option);
                }
                field.push(row);
            }
            field[0][0] = pathCharacter;
            field[h -2][Math.floor(Math.random()*w)] = hat;
            if (field[0][1] === hole && field[1][0] === hole){
                field[0][1] = fieldCharacter;
                field[0][2] = hole;
            }
        }
        return field;
    }
}


const startGame = (height, width) => {
    const myField = new Field(Field.generateField(height, width));

    let won = false;
    let lost = false;
    let i = 0;
    let j = 0;

    myField.print();

    while (!won && !lost){
         
        const input = prompt('Wich way? >'); 
        const direction = input.toUpperCase();
        switch (direction) {
            case('U'): 
            if (i === 0) {
                console.log('\nYou lost! try again.\n'); lost = true; break
            } else {i--; break}
            
            case('D'):
            if (i >= height - 1) {
                console.log('\nYou lost! try again.\n'); lost = true; break
            } else {i++; break}
            
            case('L'):
            if (j === 0) {
                console.log('\nYou lost! try again.\n'); lost = true; break
            } else {j--; break}
            
            case('R'): 
            if (j >= width) {
                console.log('\nYou lost! try again.\n'); lost = true; break
            } else {j++; break}
            
            default: console.log('\nType the first letter of the direction you want to go (U, D, L, R)\n');
        }
        const position = myField.field[i][j];
        switch (position) {
            case('*'): break;
            case('░'): myField.field[i][j] = pathCharacter; myField.print(); break;
            case('^'): console.log('\nCongratulations, you\'ve won!\n'); won = true; break;
            default: console.log('\nYou lost! try again\n'); lost = true;
        }
    }
}

const intro = () => {
    console.log('');
    const input1 = prompt('Enter your name: ');
    console.log(`\nHey ${input1}!\nYou * have lost your hat ^ somewhere in the field ░ \nFind it to win and be carefull not to exit the field or fall into a hole`);
}


intro();
startGame(8, 4);
