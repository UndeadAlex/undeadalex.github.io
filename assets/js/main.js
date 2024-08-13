var isNavPinned = false;
var isNavHovered = false;
const docRoot = document.querySelector(':root');
const docSidebar = document.querySelector(".sidebar");
const docSidebarText = document.querySelectorAll(".link-text");
const docSidebarPinSvg = document.querySelector("#sidebar-pin-svg");
const docMainContent = document.querySelector(".main-content");

docSidebarText[docSidebarText.length - 1].textContent = "Pin"

if (docSidebar !== null || docSidebar !== undefined)
{
    docSidebar.addEventListener("mouseenter", (evt) => {
        isNavHovered = true;
        if (isNavPinned) return;
        docRoot.style.setProperty('--main-content-margin', '12rem');
    });
    
    docSidebar.addEventListener("mouseleave", (evt) => {
        isNavHovered = false;
        if (isNavPinned) return;
        docRoot.style.setProperty('--main-content-margin', '5rem');
    });
}

function OnPinButtonClicked()
{
    // console.log(`Pin Button Pressed, SideBarVar: ${docSidebar} SideBarPin: ${docSidebarPinSvg} SideBarTextArray: ${docSidebarText}`)
    if (docSidebar === null || docSidebarPinSvg === null || docMainContent === null || docSidebarText.length <= 0) return;
    isNavPinned = !isNavPinned;
    
    if (isNavPinned)
    {
        docSidebar.id = "pin";
        docSidebarPinSvg.src = "assets/svg/diagonal_pin_solid.svg";
        if (!isNavHovered)
            docMainContent.style.margin = "0px 0px 0px 12rem";
        
        const element = docSidebarText[docSidebarText.length-1];
        element.id = "pin";
        element.textContent = "Unpin";
        
        console.log("Sidebar Pinned");
    }
    else
    {
        docSidebar.id = "";
        docSidebarPinSvg.src = "assets/svg/diagonal_pin_outline.svg";
        if(!isNavHovered)
            docMainContent.style.margin = "0px 0px 0px 5rem";
        
        const element = docSidebarText[docSidebarText.length-1];
        element.id = "";
        element.textContent = "Pin";

        console.log("Sidebar Unpinned");
    }
}