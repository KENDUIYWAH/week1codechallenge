function checkSpeed() {
    // Prompt the user to enter the speed of the car
    let speed = prompt("Enter the speed of the car (in km/h):");

    // Convert the input to a number
    speed = Number(speed);

    // Validate the input
    if (isNaN(speed) || speed < 0) {
        console.log("Invalid input. Please enter a positive number.");
        return;
    }

    // Speed limit
    const speedLimit = 70;
    // Points for every 5 km/h over the speed limit
    const kmPerPoint = 5;

    if (speed <= speedLimit) {
        console.log("Ok");
    } else {
        const points = Math.floor((speed - speedLimit) / kmPerPoint);
        if (points > 12) {
            console.log("License suspended");
        } else {
            console.log(Points: ${points});
        }
    }
}

// Call the function
checkSpeed();