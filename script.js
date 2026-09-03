let courses = [];

function addCourse() {
    const course = document.getElementById("course").value;
    const unit = Number(document.getElementById("unit").value);
    const score = Number(document.getElementById("score").value);

    if (course === "" || unit <= 0 || score < 0 || score > 100) {
        alert("Please enter valid course information.");
        return;
    }

    let grade;
    let point;

    if (score >= 70) {
        grade = "A";
        point = 5;
    } else if (score >= 60) {
        grade = "B";
        point = 4;
    } else if (score >= 50) {
        grade = "C";
        point = 3;
    } else if (score >= 45) {
        grade = "D";
        point = 2;
    } else if (score >= 40) {
        grade = "E";
        point = 1;
    } else {
        grade = "F";
        point = 0;
    }

    courses.push({
        course,
        unit,
        score,
        grade,
        point
    });

    displayCourses();

    document.getElementById("course").value = "";
    document.getElementById("unit").value = "";
    document.getElementById("score").value = "";
}


function displayCourses() {
    const courseList = document.getElementById("courseList");

    courseList.innerHTML = "";

    courses.forEach(function(item, index) {
        courseList.innerHTML += `
            <tr>
                <td>${item.course}</td>
                <td>${item.unit}</td>
                <td>${item.score}</td>
                <td>${item.grade}</td>
                <td>${item.point}</td>
                <td>
                    <button onclick="removeCourse(${index})">
                        Remove
                    </button>
                </td>
            </tr>
        `;
    });
}


function removeCourse(index) {
    courses.splice(index, 1);

    displayCourses();

    // Reset GPA after removing a course
    document.getElementById("gpa").textContent = "0.00";
    document.getElementById("totalUnit").textContent =
        "Total Units: 0";
}


function calculateGPA() {
    let totalUnits = 0;
    let totalPoints = 0;

    courses.forEach(function(item) {
        totalUnits += item.unit;
        totalPoints += item.unit * item.point;
    });

    if (totalUnits === 0) {
        alert("Add at least one course.");
        return;
    }

    const gpa = totalPoints / totalUnits;

    const previousCGPA =
    parseFloat(document.getElementById("previousCGPA").value) || 0;

const previousUnits =
    parseFloat(document.getElementById("previousUnits").value) || 0;

const totalQualityPoints =
    (previousCGPA * previousUnits) + totalPoints;

const totalCGPAUnits =
    previousUnits + totalUnits;

const cgpa =
    totalCGPAUnits > 0
        ? totalQualityPoints / totalCGPAUnits
        : gpa;

    document.getElementById("resultName").textContent =
    document.getElementById("studentName").value || "-";

document.getElementById("resultMatric").textContent =
    document.getElementById("matricNumber").value || "-";

document.getElementById("resultSession").textContent =
    document.getElementById("session").value || "-";

document.getElementById("resultSemester").textContent =
    document.getElementById("semester").value || "-";

document.getElementById("gpa").textContent = gpa.toFixed(2);

document.getElementById("totalUnit").textContent =
    "Total Units: " + totalUnits;

document.getElementById("displayPreviousCGPA").textContent =
    previousCGPA.toFixed(2);

document.getElementById("displayCurrentGPA").textContent =
    gpa.toFixed(2);

document.getElementById("cgpa").textContent =
    "Overall CGPA: " + cgpa.toFixed(2) + " / 5.00";
}function resetCalculator() {
    courses = [];

    displayCourses();

    document.getElementById("gpa").textContent = "0.00";
    document.getElementById("totalUnit").textContent =
        "Total Units: 0";
}document.getElementById("saveSemester").addEventListener("click", function () {
    const gpa = document.getElementById("gpa").textContent;
    const semester = document.getElementById("semester").value;

    alert(semester + " GPA of " + gpa + " has been saved!");
});
document.getElementById("resetCalculator").addEventListener("click", function () {
    location.reload();
});