// simple sample data
var cases = [
    { dog: "Bheema", location: "Indiranagar", priority: "urgent", status: "open" },
    { dog: "Luna", location: "Koramangala", priority: "normal", status: "in-progress" },
    { dog: "Max", location: "BTM Layout", priority: "urgent", status: "closed" }
];

var urgentFilter = document.getElementById("urgentFilter");
var caseList = document.getElementById("caseList");
var totalRescues = document.getElementById("totalRescues");
var openCases = document.getElementById("openCases");
var volunteers = document.getElementById("volunteers"); // fixed value in HTML
var caseForm = document.getElementById("caseForm");
var dogNameInput = document.getElementById("dogName");
var locationInput = document.getElementById("location");
var prioritySelect = document.getElementById("priority");
var statusSelect = document.getElementById("status");
var formMessage = document.getElementById("formMessage");
var greetingBox = document.getElementById("greeting");

// set greeting based on time
function setGreeting() {
    var now = new Date();
    var hour = now.getHours();
    var text;

    if (hour < 12) {
        text = "Good morning 👋";
    } else if (hour < 17) {
        text = "Good afternoon 👋";
    } else {
        text = "Good evening 👋";
    }

    greetingBox.textContent = text + " | " +
        now.toLocaleDateString();
}

// render case list
function renderCases() {
    caseList.innerHTML = "";

    var onlyUrgent = urgentFilter.checked;
    var openCount = 0;

    for (var i = 0; i < cases.length; i++) {
        var c = cases[i];

        if (onlyUrgent && c.priority !== "urgent") {
            continue;
        }

        if (c.status !== "closed") {
            openCount++;
        }

        var li = document.createElement("li");
        li.className = "case-item";

        var left = document.createElement("span");
        left.textContent = c.dog + " – " + c.location;

        var tags = document.createElement("span");

        var priorityTag = document.createElement("span");
        priorityTag.className = "tag " + (c.priority === "urgent" ? "tag-urgent" : "tag-normal");
        priorityTag.textContent = c.priority;

        var statusTag = document.createElement("span");
        statusTag.className = "tag tag-status";
        statusTag.textContent = c.status;

        tags.appendChild(priorityTag);
        tags.appendChild(statusTag);

        li.appendChild(left);
        li.appendChild(tags);

        caseList.appendChild(li);
    }

    totalRescues.textContent = cases.length;
    openCases.textContent = openCount;
}

// handle filter
urgentFilter.addEventListener("change", function () {
    renderCases();
});

// handle form submit
caseForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var dog = dogNameInput.value.trim();
    var loc = locationInput.value.trim();
    var pr = prioritySelect.value;
    var st = statusSelect.value;

    if (dog === "" || loc === "" || pr === "" || st === "") {
        formMessage.textContent = "Please fill all fields.";
        formMessage.style.color = "red";
        return;
    }

    cases.push({
        dog: dog,
        location: loc,
        priority: pr,
        status: st
    });

    renderCases();

    formMessage.textContent = "Case saved (demo only, not in database).";
    formMessage.style.color = "green";

    // clear fields
    dogNameInput.value = "";
    locationInput.value = "";
    prioritySelect.value = "";
    statusSelect.value = "open";
});

// initial setup
setGreeting();
renderCases();
