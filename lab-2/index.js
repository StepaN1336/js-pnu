// 1.2.3 Створення об'єкта car1 за допомогою new Object()
var car1 = new Object();
car1.color = "blue";
car1.maxSpeed = 120;
car1.driver = {
    name: "Stepan Syhil",
    category: "C",
    personalLimitations: "No driving at night"
};
car1.tuning = true;
car1.numberOfAccidents = 0;

console.log(car1);

// 1.2.4 Створення об'єкта car2 за допомогою літерала об'єкта
var car2 = {
    color: "red",
    maxSpeed: 150,
    driver: {
        name: "Stepan Syhil",
        category: "B",
        personalLimitations: null
    },
    tuning: false,
    numberOfAccidents: 2
};

console.log(car2);

// 1.2.5 Додавання методу drive до об'єкта car1
car1.drive = function() {
    console.log("I am not driving at night");
};
car1.drive();

// 1.2.6 Додавання методу drive до об'єкта car2
car2.drive = function() {
    console.log("I can drive anytime");
};
car2.drive();

// 1.2.7 Створення конструктора для класу Truck
function Truck(color, weight, avgSpeed, brand, model) {
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;
}

// 1.2.8 Створення статичного методу AssignDriver для класу Truck
Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    };
};

// 1.2.9 Додавання методу trip до конструктора Truck
Truck.prototype.trip = function() {
    if (!this.driver) {
        console.log("No driver assigned");
    } else {
        var message = "Driver " + this.driver.name + " ";
        if (this.driver.nightDriving) {
            message += "drives at night";
        } else {
            message += "does not drive at night";
        }
        message += " and has " + this.driver.experience + " years of experience.";
        console.log(message);
    }
};

// 1.2.10 Створення 2 об'єктів Truck і демонстрація роботи методу trip
var truck1 = new Truck("blue", 5000, 80, "Volvo", "FH16");
truck1.AssignDriver("John Doe", true, 5);
truck1.trip();

var truck2 = new Truck("red", 4000, 70, "Mercedes", "Actros");
truck2.AssignDriver("Jane Doe", false, 3);
truck2.trip();


// 1.2.12 Створення класу Square
class Square {
    constructor(a) {
        this.a = a;
    }
}

// 1.2.13 Визначення конструктора для класу Square
const square = new Square(5);

// 1.2.14 Визначення статичного методу help для класу Square
Square.help = function() {
    console.log("A square is a quadrilateral with all sides equal.");
};

// 1.2.15 Визначення методів для класу Square
Square.prototype.length = function() {
    console.log("Perimeter (sum of sides): " + 4 * this.a);
};

Square.prototype.square = function() {
    console.log("Area of the square: " + this.a * this.a);
};

Square.prototype.info = function() {
    console.log("Sides: " + this.a + " (all sides are equal)");
    console.log("Angles: 90° (all angles are right angles)");
    console.log("Perimeter: " + 4 * this.a);
    console.log("Area: " + this.a * this.a);
};

square.length();
square.square();
square.info();

// 1.2.16 Створення класу Rectangle через успадкування від Square
class Rectangle extends Square {
    constructor(a, b) {
        super(a);
        this.b = b;
    }
}

// 1.2.17 Перевизначення методів для класу Rectangle
Rectangle.help = function() {
    console.log("A rectangle has opposite sides equal, and its angles are all right angles.");
};

Rectangle.prototype.length = function() {
    console.log("Perimeter (sum of sides): " + 2 * (this.a + this.b));
};

Rectangle.prototype.square = function() {
    console.log("Area of the rectangle: " + this.a * this.b);
};

Rectangle.prototype.info = function() {
    console.log("Sides: " + this.a + " and " + this.b);
    console.log("Angles: 90° (all angles are right angles)");
    console.log("Perimeter: " + 2 * (this.a + this.b));
    console.log("Area: " + this.a * this.b);
};

const rectangle = new Rectangle(6, 4);
rectangle.length();
rectangle.square();
rectangle.info();

// 1.2.18 Створення класу Rhombus через успадкування від Square
class Rhombus extends Square {
    constructor(a, alpha, beta) {
        super(a);
        this.alpha = alpha;
        this.beta = beta;
    }
}

// 1.2.19 Перевизначення методів для класу Rhombus
Rhombus.help = function() {
    console.log("A rhombus is a quadrilateral with all sides equal, but its angles are not necessarily 90°.");
};

Rhombus.prototype.length = function() {
    console.log("Perimeter (sum of sides): " + 4 * this.a);
};

Rhombus.prototype.square = function() {
    console.log("Area of the rhombus: " + this.a * this.a * Math.sin(this.alpha * Math.PI / 180));
};

Rhombus.prototype.info = function() {
    console.log("Sides: " + this.a + " (all sides are equal)");
    console.log("Angles: " + this.alpha + "° (obtuse angle) and " + this.beta + "° (acute angle)");
    console.log("Perimeter: " + 4 * this.a);
    console.log("Area: " + this.a * this.a * Math.sin(this.alpha * Math.PI / 180));
};

const rhombus = new Rhombus(5, 60, 120);
rhombus.length();
rhombus.square();
rhombus.info();

// 1.2.20 Створення класу Parallelogram через успадкування від Rectangle
class Parallelogram extends Rectangle {
    constructor(a, b, alpha, beta) {
        super(a, b);
        this.alpha = alpha;
        this.beta = beta;
    }
}

// 1.2.21 Перевизначення методів для класу Parallelogram
Parallelogram.help = function() {
    console.log("A parallelogram is a quadrilateral with opposite sides equal, and opposite angles equal.");
};

Parallelogram.prototype.length = function() {
    console.log("Perimeter (sum of sides): " + 2 * (this.a + this.b));
};

Parallelogram.prototype.square = function() {
    console.log("Area of the parallelogram: " + this.a * this.b * Math.sin(this.alpha * Math.PI / 180));
};

Parallelogram.prototype.info = function() {
    console.log("Sides: " + this.a + " and " + this.b);
    console.log("Angles: " + this.alpha + "° (obtuse angle) and " + this.beta + "° (acute angle)");
    console.log("Perimeter: " + 2 * (this.a + this.b));
    console.log("Area: " + this.a * this.b * Math.sin(this.alpha * Math.PI / 180));
};

const parallelogram = new Parallelogram(6, 4, 60, 120);
parallelogram.length();
parallelogram.square();
parallelogram.info();

// 1.2.22 Визначення геттерів і сеттерів для властивостей класу Rectangle
Object.defineProperty(Rectangle.prototype, 'a', {
    get: function() {
        return this._a;
    },
    set: function(value) {
        this._a = value;
    }
});

Object.defineProperty(Rectangle.prototype, 'b', {
    get: function() {
        return this._b;
    },
    set: function(value) {
        this._b = value;
    }
});

// 1.2.23 Виклик статичного методу help для кожного з класів
Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

// 1.2.24 Створення об'єктів для класів Square, Rectangle, Rhombus та Parallelogram
const squareObj = new Square(5);
const rectangleObj = new Rectangle(6, 4);
const rhombusObj = new Rhombus(7, 60, 120);
const parallelogramObj = new Parallelogram(8, 6, 60, 120);

squareObj.info();
rectangleObj.info();
rhombusObj.info();
parallelogramObj.info();

// 1.2.25 Функція Triangular для створення об'єктів трикутників
function Triangular(a = 3, b = 4, c = 5) {
    return { a, b, c };
}

const { a: sideA, b: sideB, c: sideC } = Triangular();
console.log(sideA, sideB, sideC);

// 1.2.26 Створення та виведення трьох об'єктів з Triangular
const triangle1 = Triangular();
const triangle2 = Triangular(6, 8, 10);
const triangle3 = Triangular(5, 12, 13);

console.log(triangle1, triangle2, triangle3);

// 1.2.27 Функція PiMultiplier
function PiMultiplier(num) {
    return function() {
        return Math.PI * num;
    };
}

// 1.2.28 Створення трьох функцій за допомогою PiMultiplier
const multiplyBy2 = PiMultiplier(2);
const multiplyBy32 = PiMultiplier(3 / 2);
const divideBy2 = PiMultiplier(1 / 2);

console.log(multiplyBy2());
console.log(multiplyBy32());
console.log(divideBy2());

// 1.2.29 Функція Painter
function Painter(color) {
    return function(obj) {
        if (obj.type) {
            console.log(`The object is ${color} and its type is ${obj.type}.`);
        } else {
            console.log("No 'type' property occurred!");
        }
    };
}

// 1.2.30 Створення функцій для фарбування об'єктів
const PaintBlue = Painter("blue");
const PaintRed = Painter("red");
const PaintYellow = Painter("yellow");

// 1.2.31 Тестові об'єкти для функцій PaintBlue, PaintRed та PaintYellow
const object1 = { maxSpeed: 280, type: "Sportcar", color: 'magenta' };
const object2 = { type: "Truck", avgSpeed: 90, loadCapacity: 2400 };
const object3 = { maxSpeed: 180, color: "purple", isCar: true };

PaintBlue(object1);
PaintRed(object2);
PaintYellow(object3);
