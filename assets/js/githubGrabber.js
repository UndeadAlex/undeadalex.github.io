const apiUrl = 'https://api.github.com';

function populateProjectDivs(username, includeForkedProjects)
{
    const projectArea = document.getElementById('projectsDiv');
    let xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function ()
    {
        if(xmlHttp.readyState == XMLHttpRequest.DONE && xmlHttp.status == 200)
        {
            const jsonResponse = JSON.parse(xmlHttp.response);

            for(let i in jsonResponse)
            {
                let element = jsonResponse[i];

                if(!includeForkedProjects && element['fork'])
                    continue;

                // Create Root Div
                let rootProjectDiv = document.createElement('div');
                rootProjectDiv.className = "project";
                projectArea.appendChild(rootProjectDiv);

                let title = document.createElement('h3');
                title.innerText = element['name']
                rootProjectDiv.appendChild(title);

                let desc = document.createElement('p');
                desc.innerText = element['description'];
                rootProjectDiv.appendChild(desc);

                let buttonGroup = document.createElement('div');
                buttonGroup.className = "button__group";
                rootProjectDiv.appendChild(buttonGroup);
                
                let sourceButton = document.createElement('button');
                sourceButton.className = "btn";
                sourceButton.innerText = "Source";
                sourceButton.onclick = function ()
                { window.open(`${element['html_url']}`); }
                buttonGroup.appendChild(sourceButton);
                

                console.log(`Found Repo: ${element.name}`);
            }
        }
    }

    let repoUrl = apiUrl + `/users/${username}/repos`;

    xmlHttp.open('GET', repoUrl, true);
    xmlHttp.setRequestHeader('Content-type', 'application/json');
    xmlHttp.send();
}

function OnDocumentLoad() 
{
    populateProjectDivs('dexithezombie', true);
}

document.onload += OnDocumentLoad();