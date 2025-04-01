function triangle(value1, type1, value2, type2) {
    let triangleData = { a: null, b: null, c: null, alpha: null, beta: null };
    const DEG_TO_RAD = Math.PI / 180;
    const RAD_TO_DEG = 180 / Math.PI;

    if (value1 <= 0 || value2 <= 0 || value1 > 1000000 || value2 > 1000000) {
        console.log("Усі значення повинні бути додатними та не надто великими.");
        return;
    }

    const types = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];
    if (!types.includes(type1) || !types.includes(type2)) {
        console.log("Вказано неіснуючий тип.");
        return;
    }

    if (type1.includes("angle") || type2.includes("angle")) {
        const angleValue = type1.includes("angle") ? value1 : value2;
        if (angleValue <= 0 || angleValue >= 90) {
            console.log("Кут повинен бути в межах (0°, 90°).");
            return;
        }
    }

    if (type1 === "leg" && type2 === "leg") {
        triangleData.a = value1;
        triangleData.b = value2;
        triangleData.c = Math.sqrt(triangleData.a ** 2 + triangleData.b ** 2);
        triangleData.alpha = Math.atan(triangleData.b / triangleData.a) * RAD_TO_DEG;
        triangleData.beta = 90 - triangleData.alpha;
    } else if ((type1 === "leg" && type2 === "hypotenuse") || (type1 === "hypotenuse" && type2 === "leg")) {
        const leg = type1 === "leg" ? value1 : value2;
        const hypotenuse = type1 === "hypotenuse" ? value1 : value2;

        if (leg >= hypotenuse) {
            console.log("Катет не може бути більшим або рівним гіпотенузі.");
            return;
        }

        triangleData.a = leg;
        triangleData.c = hypotenuse;
        triangleData.b = Math.sqrt(triangleData.c ** 2 - triangleData.a ** 2);
        triangleData.alpha = Math.asin(triangleData.a / triangleData.c) * RAD_TO_DEG;
        triangleData.beta = 90 - triangleData.alpha;
    } else if ((type1 === "leg" && type2 === "adjacent angle") || (type1 === "adjacent angle" && type2 === "leg")) {
        const leg = type1 === "leg" ? value1 : value2;
        const angleRad = (type1 === "adjacent angle" ? value1 : value2) * DEG_TO_RAD;

        triangleData.b = leg;
        triangleData.beta = angleRad * RAD_TO_DEG;
        triangleData.a = triangleData.b * Math.tan(angleRad);
        triangleData.c = Math.sqrt(triangleData.a ** 2 + triangleData.b ** 2);
        triangleData.alpha = 90 - triangleData.beta;
    } else if ((type1 === "leg" && type2 === "opposite angle") || (type1 === "opposite angle" && type2 === "leg")) {
        const leg = type1 === "leg" ? value1 : value2;
        const angleRad = (type1 === "opposite angle" ? value1 : value2) * DEG_TO_RAD;

        triangleData.a = leg;
        triangleData.alpha = angleRad * RAD_TO_DEG;
        triangleData.b = triangleData.a / Math.tan(angleRad);
        triangleData.c = Math.sqrt(triangleData.a ** 2 + triangleData.b ** 2);
        triangleData.beta = 90 - triangleData.alpha;
    } else if ((type1 === "hypotenuse" && type2 === "angle") || (type1 === "angle" && type2 === "hypotenuse")) {
        const hypotenuse = type1 === "hypotenuse" ? value1 : value2;
        const angleRad = (type1 === "angle" ? value1 : value2) * DEG_TO_RAD;

        triangleData.c = hypotenuse;
        triangleData.alpha = angleRad * RAD_TO_DEG;
        triangleData.a = triangleData.c * Math.sin(angleRad);
        triangleData.b = triangleData.c * Math.cos(angleRad);
        triangleData.beta = 90 - triangleData.alpha;
    } else {
        console.log("Неправильна комбінація типів.");
        return;
    }

    console.log(`a: ${triangleData.a.toFixed(6)}\nb: ${triangleData.b.toFixed(6)}\nc: ${triangleData.c.toFixed(6)}\nalpha: ${triangleData.alpha.toFixed(6)}°\nbeta: ${triangleData.beta.toFixed(6)}°`);

    document.getElementById("output").innerText = `
        a: ${triangleData.a.toFixed(6)}
        b: ${triangleData.b.toFixed(6)}
        c: ${triangleData.c.toFixed(6)}
        alpha: ${triangleData.alpha.toFixed(6)}°
        beta: ${triangleData.beta.toFixed(6)}°
    `;

    return triangleData;
}

function calculateTriangle() {
    const value1 = parseFloat(document.getElementById("value1").value);
    const type1 = document.getElementById("type1").value;
    const value2 = parseFloat(document.getElementById("value2").value);
    const type2 = document.getElementById("type2").value;
    triangle(value1, type1, value2, type2);
}
