let userInput = document.getElementById("date");
userInput.max = new Date().toISOString().split("T")[0];

function calculateAge() {
    const birthDate = new Date(userInput.value);
    const today = new Date();

    if (!userInput.value) {
        alert("Please select a valid date");
        return;
    }

    const ageDetails = getAgeDetails(birthDate, today);
    const countdown = getBirthdayCountdown(birthDate, today);

    displayResults(ageDetails, countdown);
    displayAgeChart(ageDetails);
}

function getAgeDetails(birthDate, today) {
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        days += getDaysInMonth(today.getFullYear(), today.getMonth());
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
}

function getBirthdayCountdown(birthDate, today) {
    let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const diffTime = nextBirthday - today;
    const daysUntilNextBirthday = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return daysUntilNextBirthday;
}

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function displayResults(ageDetails, countdown) {
    document.getElementById("age-result").innerHTML = `You are <span>${ageDetails.years}</span> years, <span>${ageDetails.months}</span> months, and <span>${ageDetails.days}</span> days old.`;
    document.getElementById("birthday-countdown").innerHTML = `Your next birthday is in <span>${countdown}</span> days!`;
}

function displayAgeChart(ageDetails) {
    const ctx = document.getElementById("ageChart").getContext("2d");
    document.getElementById("ageChart").style.display = "block";

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Years', 'Months', 'Days'],
            datasets: [{
                data: [ageDetails.years, ageDetails.months, ageDetails.days],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
}