(function () {
    var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

    for (var i = 0; i < names.length; i++) {
        var firstLetter = names[i].charAt(0).toLowerCase();

        if (firstLetter === 'j') {
            byeSpeaker.speak(names[i]);
        } else {
            helloSpeaker.speak(names[i]);
        }
    }

    console.log("\n=== Додатковий селектор: Сума ASCII-кодів імен > 500 ===");
    names.forEach(function (name) {
        var asciiSum = 0;
        for (var i = 0; i < name.length; i++) {
            asciiSum += name.charCodeAt(i);
        }

        if (asciiSum > 500) {
            console.log(name + " (ASCII sum: " + asciiSum + ")");
        }
    });
})();