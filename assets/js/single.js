var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl =document.querySelector("#limit-warning");

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response) {
        // request was succesful
        if (response.ok) {
            response.json().then(function(data) {
                // pass response data to dom functions
                displayIssues(data);
                if (response.headers.get("Link")) {
                    displayWarning(repo)
                }
            });
        }
        else {
            alert("There was a problem with your request!");
        }
    })
};

var displayIssues = function(issues){
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    for (var i = 0; i < issues.length; i++) {
        // create a link elelemtn to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center"
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);

        var typeEl = document.createElement("span");

        //check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        // append to container
        issueEl.appendChild(typeEl);

        issueContainerEl.appendChild(issueEl);
    }
};

var displayWarning = function(repo) {
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    var linkEl = document.createElement("a");
    linkEl.textContent = "this repository's issues page on Github.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    limitWarningEl.appendChild(linkEl);
};



getRepoIssues("facebook/react");